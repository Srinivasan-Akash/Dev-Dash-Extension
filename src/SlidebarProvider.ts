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
    const scriptsPath = path.join(staticFolderPath, "js", "index.js");
    const getTechStackScript = path.join(staticFolderPath, "js","getTechStack.js");
    const getSnippetScript = path.join(staticFolderPath, "js","getSnippet.js");
    const createDevEnvScript = path.join(staticFolderPath, "js","createDevEnvironment.js");

    const cssCode = fs.readFileSync(stylesPath, 'utf8');
    const htmlCode = fs.readFileSync(indexPath, "utf8");
    const scriptsUri = webview.asWebviewUri(vscode.Uri.file(scriptsPath));
    const techStackUri = webview.asWebviewUri(vscode.Uri.file(getTechStackScript));
    const snippetUri = webview.asWebviewUri(vscode.Uri.file(getSnippetScript));
    const createDevelopmentUri = webview.asWebviewUri(vscode.Uri.file(createDevEnvScript));
    
    return htmlCode + `<style> ${cssCode} </style>` + `<script src="${scriptsUri}"> </script>` + `<script src="${techStackUri}"> </script>` + `<script src="${snippetUri}"> </script>` + `<script src="${createDevelopmentUri}"> </script>`;
  }
}
