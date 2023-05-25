/* eslint-disable @typescript-eslint/naming-convention */
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { SidebarProvider } from "./SlidebarProvider";
/**
 * @param {vscode.ExtensionContext} context
*/

export function activate(context: any) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);

  // Start Of Minify Code BTN
  context.subscriptions.push(vscode.commands.registerCommand('devDash.minify', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.selection;
      const text = editor.document.getText(selection);
  
      // Remove comments from the code
      const codeWithoutComments = text.replace(/\/\/.*|\/\*[^]*?\*\//g, '');
  
      // Minify the code by removing extra spaces
      const minifiedCode = codeWithoutComments.replace(/\s+/g, ' ');
  
      // Replace the selected code with the minified code
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, minifiedCode);
      });
  
      vscode.window.showInformationMessage('Minified successfully from Dev Dash');
    }
  }));
  

  // Start Of Change Workspace Color
  context.subscriptions.push(
    vscode.commands.registerCommand('devDash.randomColor', () => {
      const colors = ["#6cc24a", "#ff6347", "#3498db", "#f39c12", "#9b59b6", "#2ecc71", "#e74c3c", "#1abc9c", "#f1c40f", "#8e44ad", "#27ae60", "#d35400", "#2980b9", "#e67e22", "#c0392b", "#16a085", "#f39c12", "#7f8c8d", "#95a5a6", "#bdc3c7"];
      const randomIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors[randomIndex];

      const settings = {
        "workbench.colorCustomizations": {
          "activityBar.background": randomColor,
          "activityBar.foreground": "#ffffff",
          "titleBar.activeBackground": randomColor,
          "titleBar.activeForeground": "#ffffff",
          "titleBar.inactiveBackground": randomColor,
          "titleBar.inactiveForeground": "#ffffff",
          "statusBar.background": randomColor,
          "statusBar.foreground": "#ffffff"
        }
      };

      const vscodeFolderPath = vscode.workspace.rootPath ? path.join(vscode.workspace.rootPath, ".vscode") : "";
      if (!fs.existsSync(vscodeFolderPath)) {fs.mkdirSync(vscodeFolderPath);}
      const settingsPath = path.join(vscodeFolderPath, "settings.json");
      fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 4));

      vscode.commands.executeCommand("workbench.action.reloadWindow");
      vscode.window.showInformationMessage("Changed Workspace Color to " + randomColor);
    })
  );

  context.subscriptions.push(vscode.commands.registerCommand('devDash.resetColor', () => {
    const settings = {
      "workbench.colorCustomizations": {}
    };

    const vscodeFolderPath = vscode.workspace.rootPath ? path.join(vscode.workspace.rootPath, ".vscode") : "";
    if (!fs.existsSync(vscodeFolderPath)) {
      fs.mkdirSync(vscodeFolderPath);
    }

    const settingsPath = path.join(vscodeFolderPath, "settings.json");
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 4));

    vscode.commands.executeCommand("workbench.action.reloadWindow");
    vscode.window.showInformationMessage("Reset Workspace Color");
  }));

  // React Conversion
  context.subscriptions.push(vscode.commands.registerCommand('devDash.convertToReact', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.selection;
      const text = editor.document.getText(selection);
  
      // Replace 'class' with 'className' in the selected code
      const convertedCode = text.replace(/class="/g, 'className="');
  
      // Replace the selected code with the converted code
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, convertedCode);
      });
    }
  
    vscode.window.showInformationMessage("Converted To React Code");
  }));

  // Highlight Code
  let myDecorations: { decorationType: vscode.TextEditorDecorationType, range: vscode.Range } | undefined;

context.subscriptions.push(vscode.commands.registerCommand('devDash.highlightCode', () => {
  const editor = vscode.window.activeTextEditor;
  vscode.window.showInformationMessage('Highlighted the selected code. Before');
  if (editor) {
    const selection = editor.selection;

    // Get the range of the selected code
    const range = new vscode.Range(selection.start, selection.end);

    // Define the decoration type for highlighting
    const colors = ['#FF4136', '#FF851B', '#FFDC00', '#3D9970', '#39CCCC', '#0074D9', '#B10DC9', '#F012BE', '#85144b', '#AAAAAA', '#01FF70', '#FF7F50'];
    const decorationType = vscode.window.createTextEditorDecorationType({
      backgroundColor: colors[Math.floor(Math.random() * colors.length)], // Set the desired background color
    });

    // Create a DecorationOptions object to hold the decoration type and range
    const decoration = { range, hoverMessage: 'Highlighted code' };

    // Highlight the selected code with the defined decoration type using DecorationOptions
    editor.setDecorations(decorationType, [decoration]);

    // Store the decoration type and range in the global variable for persistence
    myDecorations = { decorationType, range };

    // Show a message indicating that the code has been highlighted
    vscode.window.showInformationMessage('Highlighted the selected code.');
  }
}));

  
  // Next.js Conversion 
  context.subscriptions.push(vscode.commands.registerCommand('devDash.convertToNext', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.selection;
      const text = editor.document.getText(selection);
  
      // Replace 'class="hello"' with 'className={styles["hello"]}'
      const convertedCode = text.replace(/class="([^"]*)"/g, 'className={styles["$1"]}');
      
      // Replace the selected code with the converted code
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, convertedCode);
      });
    }
  
    vscode.window.showInformationMessage("Converted To React Code");
  }));  

  const changeColorButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
  changeColorButton.text = "$(paintcan) Change Workspace Color";
  changeColorButton.command = "devDash.randomColor";
  changeColorButton.tooltip = "Change To random Color";
  changeColorButton.show();
  context.subscriptions.push(changeColorButton);

  // Start Of Side Bar
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("devDash-sidebar", sidebarProvider)
  );
}

export function deactivate() { }
