import * as vscode from "vscode";
import { SidebarProvider } from "./SlidebarProvider";

/**
 * @param {vscode.ExtensionContext} context
 */

export function activate(context: any) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  // Start Of Change Workspace Color
  context.subscriptions.push(
    vscode.commands.registerCommand("devDash.randomColor", () => {
      const colors = ["#6cc24a", "#ff6347", "#3498db", "#f39c12", "#9b59b6", "#2ecc71", "#e74c3c", "#1abc9c", "#f1c40f", "#8e44ad", "#27ae60", "#d35400", "#2980b9", "#e67e22", "#c0392b", "#16a085", "#f39c12", "#7f8c8d", "#95a5a6", "#bdc3c7"];

      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      vscode.workspace.getConfiguration().update(
        "workbench.colorCustomizations",
        {
          "activityBar.background": randomColor,
          "activityBar.foreground": "#ffffff",
          "titleBar.activeBackground": randomColor,
          "titleBar.activeForeground": "#ffffff",
          "titleBar.inactiveBackground": randomColor,
          "titleBar.inactiveForeground": "#ffffff",
          "statusBar.background": randomColor,
          "statusBar.foreground": "#ffffff"
        },
        vscode.ConfigurationTarget.Workspace
      );

      vscode.window.showInformationMessage("Changed Workspace Color to " + randomColor);
    })
  );

  context.subscriptions.push(vscode.commands.registerCommand('devDash.resetColor', () => {
    vscode.workspace.getConfiguration().update('workbench.colorCustomizations', {}, vscode.ConfigurationTarget.Workspace);
    vscode.window.showInformationMessage("Reseted Color");
  }));

  const changeColorButton = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );

  changeColorButton.text = "$(paintcan) Change Workspace Color";
  changeColorButton.command = "devDash.randomColor";
  changeColorButton.tooltip = "Change the workspace color to Node.js green";
  changeColorButton.show();

  // Start Of Side Bar
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "devDash-sidebar",
      sidebarProvider
    )
  );
}

export function deactivate() {}
