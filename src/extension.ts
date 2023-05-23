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
  context.subscriptions.push(
    vscode.commands.registerCommand('devDash.minify', () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const selection = editor.selection;
        const text = editor.document.getText(selection);

        // Minify the code by removing extra spaces
        const minifiedCode = text.replace(/\s+/g, ' ');

        // Replace the selected code with the minified code
        editor.edit((editBuilder) => {
          editBuilder.replace(selection, minifiedCode);
        });
      }
    })
  );

  // Start Of Format Code BTN
  


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
