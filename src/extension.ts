import * as vscode from "vscode"
import { SidebarProvider } from "./SlidebarProvider";

/**
 * @param {vscode.ExtensionContext} context
 */

export function activate(context :any) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("devDash-sidebar", sidebarProvider)
  );
}

export function deactivate() {}
