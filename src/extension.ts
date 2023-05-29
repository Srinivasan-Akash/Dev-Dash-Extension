/* eslint-disable @typescript-eslint/naming-convention */
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { SidebarProvider } from "./SlidebarProvider";
import { obfuscate } from 'javascript-obfuscator';

/**
 * @param {vscode.ExtensionContext} context
*/

export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);

  // Start Of Minify Code BTN
  context.subscriptions.push(vscode.commands.registerCommand('devDash.minify', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.selection;
      const text = editor.document.getText(selection);
      const codeWithoutComments = text.replace(/\/\/.*|\/\*[^]*?\*\//g, '');
      const minifiedCode = codeWithoutComments.replace(/\s+/g, ' ');
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, minifiedCode);
      });
      vscode.window.showInformationMessage('Minified successfully from Dev Dash');
    }
  }));

  // Start of Excali draw
  context.subscriptions.push(vscode.commands.registerCommand('devDash.openToDo', () => {
    // Create a new WebView panel
    const panel = vscode.window.createWebviewPanel(
      'fullWebView',
      'White Board From Dev-Dash',
      vscode.ViewColumn.One, // Choose the column to show the new WebView
      {
        enableScripts: true, // Enable scripts in the WebView
        retainContextWhenHidden: true, // Keep the WebView's context when it's hidden
        enableFindWidget: true, // Enable find widget in the WebView
      }
    );

    // Set the WebView's HTML content to occupy the whole space
    const htmlPath = vscode.Uri.file(path.join(context.extensionPath, 'static', 'todo.html'));
    const cssPath = vscode.Uri.file(path.join(context.extensionPath, 'static', 'styles.css'));

    // Read the file contents
    const htmlContent = fs.readFileSync(htmlPath.fsPath, 'utf-8');
    const cssContent = fs.readFileSync(cssPath.fsPath, 'utf-8');
    const jsUri = panel.webview.asWebviewUri(vscode.Uri.file(path.join(context.extensionPath, 'static', 'js', 'todo.js')));

    // Set the WebView's HTML content
    panel.webview.html = htmlContent + "<style>" + cssContent + "</style>" + `<script src="${jsUri}"></script>`;
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
      if (!fs.existsSync(vscodeFolderPath)) { fs.mkdirSync(vscodeFolderPath); }
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

  // Obfuscate Code
  context.subscriptions.push(vscode.commands.registerCommand('devDash.obfuscateCode', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      const selection = editor.selection;
      const text = document.getText(selection);

      const obfuscationOptions = {
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        stringArray: true
      };
      const obfuscatedCode = obfuscate(text, obfuscationOptions).getObfuscatedCode();
      editor.edit(editBuilder => {
        editBuilder.replace(selection, obfuscatedCode);
      });
  
      vscode.window.showInformationMessage('Obfuscated The Code');
    }
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
      const range = new vscode.Range(selection.start, selection.end);
      const colors = ['#FF4136', '#FF851B', '#FFDC00', '#3D9970', '#39CCCC', '#0074D9', '#B10DC9', '#F012BE', '#85144b', '#AAAAAA', '#01FF70', '#FF7F50'];
      const decorationType = vscode.window.createTextEditorDecorationType({
        backgroundColor: colors[Math.floor(Math.random() * colors.length)], // Set the desired background color
      });
      const decoration = { range, hoverMessage: 'Highlighted code' };
      editor.setDecorations(decorationType, [decoration]);
      myDecorations = { decorationType, range };
      vscode.window.showInformationMessage('Highlighted the selected code.');
    }
  }));


  // Next.js Conversion 
  context.subscriptions.push(vscode.commands.registerCommand('devDash.convertToNext', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.selection;
      const text = editor.document.getText(selection);
      const convertedCode = text.replace(/class="([^"]*)"/g, 'className={styles["$1"]}');
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, convertedCode);
      });
    }

    vscode.window.showInformationMessage("Converted To Next.js Code");
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

  // Start Of Intial Commands
  checkInitialCommands();

  // Function to check and run initial commands
  function checkInitialCommands() {
    const rootPath = vscode.workspace.rootPath;
    if (!rootPath) {
      return; // No workspace opened
    }

    const vscodeFolderPath = path.join(rootPath, ".vscode");
    const initialCommandsPath = path.join(vscodeFolderPath, "initialCommands.json");

    if (fs.existsSync(initialCommandsPath)) {
      try {
        const commandsData = fs.readFileSync(initialCommandsPath, 'utf8');
        const commandsObj = JSON.parse(commandsData);
        const initialCommands = commandsObj.intial_commands;

        if (Array.isArray(initialCommands) && initialCommands.length > 0) {
          executeCommands(initialCommands);
          vscode.window.showInformationMessage("Executed initial commands from initialCommands.json.");
        }
      } catch (error) {
        console.error('Error reading or parsing initialCommands.json:', error);
      }
    }
  }

  // Function to execute commands in the terminal
  function executeCommands(commands: any) {
    const terminal = vscode.window.createTerminal();
    commands.forEach((command: any) => {
      terminal.sendText(command);
      terminal.show();
    });
  }
}

export function deactivate() { }
