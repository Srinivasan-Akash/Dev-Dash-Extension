import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri) {} 

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const staticFolderPath = path.join(this._extensionUri.fsPath, "static");
    const indexPath = path.join(staticFolderPath, "index.html");
    const stylesPath = path.join(staticFolderPath, "styles.css");
    const scriptsPath = path.join(staticFolderPath, "index.js");

    const cssCode = fs.readFileSync(stylesPath, 'utf8');
    const htmlCode = fs.readFileSync(indexPath, "utf8");
    const scriptsUri = webview.asWebviewUri(vscode.Uri.file(scriptsPath));
    
    return htmlCode + `<style> ${cssCode} </style>` + `<script src="${scriptsUri}"> </script>`;
  }
}
