import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as childProcess from "child_process";

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri) { }

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.onDidReceiveMessage((message) => {
      if (message.command === 'dead-css') {
        // TODO: Remove Dead Code
      }

      if (message.command === 'openGames') {
        (async () => await vscode.commands.executeCommand('devDash.openGames'))();
      }

      if (message.command === "openTodo") {
        (async () => await vscode.commands.executeCommand('devDash.openToDo'))();
      }

      if (message.command === "openFileSharing") {
        (async () => await vscode.commands.executeCommand('devDash.openFileShare'))();
      }

      if (message.command === "commandsIntialRunner") {
        console.log(message.intialCommands.split(","));

        const vscodeFolderPath = vscode.workspace.rootPath ? path.join(vscode.workspace.rootPath, ".vscode") : "";
        if (!fs.existsSync(vscodeFolderPath)) {
          fs.mkdirSync(vscodeFolderPath);
        }
        const initialCommandsPath = path.join(vscodeFolderPath, "initialCommands.json");
        try {
          let commands = message.intialCommands.split(",").map((command: String) => command.trim());
          fs.writeFileSync(initialCommandsPath, JSON.stringify({ intial_commands: commands }, null, 4));
          vscode.window.showInformationMessage("Saved Commands.");
        } catch {
          vscode.window.showInformationMessage("Some Error Occurred.");
        }
      }

      if (message.command === "installTechStack") {
        console.log("Tech stack to install:", message.techStack);
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
          const workspacePath = workspaceFolders[0].uri.fsPath;
          const backendFolderPath = path.join(workspacePath, "backend");
          const frontendFolderPath = path.join(workspacePath, "frontend");

          if (!fs.existsSync(backendFolderPath) && !fs.existsSync(frontendFolderPath)) {
            fs.mkdirSync(backendFolderPath);
            fs.mkdirSync(frontendFolderPath);
          }

          // Remove the first element from the tech stack array
          const techStack = message.techStack.slice(1);

          // Categorize tech stack components
          const backendTechStack = ["express", "koa", "fastify", "nest", "axios"];
          const frontendTechStack = techStack.filter(
            (tech: any) => !backendTechStack.includes(tech)
          );

          // Install backend tech stack components
          process.chdir(backendFolderPath);
          for (const tech of backendTechStack) {
            if (techStack.includes(tech)) {
              childProcess.execSync(`npm install --save ${tech.toLowerCase()}`, {
                stdio: "inherit",
              });
            }
          }

          // Install frontend tech stack components
          process.chdir(frontendFolderPath);
          for (const tech of frontendTechStack) {
            if (tech === "react" || tech === "next") {
              try {
                childProcess.execSync(
                  `npx create-${tech.toLowerCase()}-app .`,
                  { stdio: "inherit" }
                );
              } catch (error: any) {
                console.error(`Error occurred while installing ${tech}:`, error.message);
              }
            } else if (tech !== "vanilla-js") {
              childProcess.execSync(`npm install --save ${tech.toLowerCase()}`, {
                stdio: "inherit",
              });
            }
          }

          // Create folder structure for vanilla-js
          if (message.techStack.includes("vanilla-js")) {
            const frontendStaticPath = path.join(frontendFolderPath, "static");
            const frontendStylesPath = path.join(frontendFolderPath, "styles");
            const frontendUtilsPath = path.join(frontendFolderPath, "utils");
            const frontendScriptsPath = path.join(frontendFolderPath, "scripts");

            fs.mkdirSync(frontendStaticPath);
            fs.mkdirSync(frontendStylesPath);
            fs.mkdirSync(frontendUtilsPath);
            fs.mkdirSync(frontendScriptsPath);

            fs.writeFileSync(path.join(frontendStaticPath, "index.html"), "");
            fs.writeFileSync(path.join(frontendStylesPath, "styles.css"), "");
            fs.writeFileSync(path.join(frontendUtilsPath, "utils.js"), "");
            fs.writeFileSync(path.join(frontendScriptsPath, "index.js"), "");
          }

          if (message.techStack.includes("express")) {
            fs.writeFileSync(path.join(backendFolderPath, "index.js"), "// Express server code");
            fs.writeFileSync(
              path.join(backendFolderPath, "package.json"),
              JSON.stringify({
                name: "backend",
                version: "1.0.0",
                scripts: {
                  dev: "nodemon index.js",
                },
                dependencies: {
                  cors: "^2.8.5",
                  mongoose: "^6.0.12",
                  nodemon: "^2.0.12",
                },
              })
            );

            const routesFolderPath = path.join(backendFolderPath, "routes");
            const modelsFolderPath = path.join(backendFolderPath, "models");
            const utilsFolderPath = path.join(backendFolderPath, "utils");

            fs.mkdirSync(routesFolderPath);
            fs.mkdirSync(modelsFolderPath);
            fs.mkdirSync(utilsFolderPath);

            fs.writeFileSync(path.join(routesFolderPath, "example.js"), "// Example route code");
            fs.writeFileSync(path.join(modelsFolderPath, "model.js"), "// Model code");
            fs.writeFileSync(path.join(utilsFolderPath, "db.js"), "// Database utility code");
          }

          // Install React and Next.js specifically
          if (message.techStack.includes("react")) {
            process.chdir(frontendFolderPath);
            try {
              childProcess.execSync(`npx create-react-app .`, { stdio: "inherit" });
            } catch (error: any) {
              console.error("Error occurred while installing React:", error.message);
            }
          }
          if (message.techStack.includes("next")) {
            process.chdir(frontendFolderPath);
            try {
              childProcess.execSync(`npx create-next-app .`, { stdio: "inherit" });
            } catch (error: any) {
              console.error("Error occurred while installing Next.js:", error.message);
            }
          }

          vscode.window.showInformationMessage("Tech stack installed successfully.");
        }
      }
    });

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const staticFolderPath = path.join(this._extensionUri.fsPath, "static");

    const indexPath = path.join(staticFolderPath, "index.html");
    const stylesPath = path.join(staticFolderPath, "styles.css");
    const scriptsPath = path.join(staticFolderPath, "js", "index.js");
    const getTechStackScript = path.join(staticFolderPath, "js", "getTechStack.js");
    const getSnippetScript = path.join(staticFolderPath, "js", "getSnippet.js");
    const createDevEnvScript = path.join(staticFolderPath, "js", "createDevEnvironment.js");
    const intialRunnerScript = path.join(staticFolderPath, "js", "intialRunner.js");
    const mockDataScript = path.join(staticFolderPath, "js", "data-mocking.js");
    const documentApiScript = path.join(staticFolderPath, "js", "documentAPI.js");
    const deadCodeScript = path.join(staticFolderPath, "js", "deadCode.js");

    const cssCode = fs.readFileSync(stylesPath, 'utf8');
    const htmlCode = fs.readFileSync(indexPath, "utf8");
    const scriptsUri = webview.asWebviewUri(vscode.Uri.file(scriptsPath));
    const techStackUri = webview.asWebviewUri(vscode.Uri.file(getTechStackScript));
    const snippetUri = webview.asWebviewUri(vscode.Uri.file(getSnippetScript));
    const createDevelopmentUri = webview.asWebviewUri(vscode.Uri.file(createDevEnvScript));
    const mockDataUri = webview.asWebviewUri(vscode.Uri.file(mockDataScript));
    const intialRunnerUri = webview.asWebviewUri(vscode.Uri.file(intialRunnerScript));
    const documentAPIUri = webview.asWebviewUri(vscode.Uri.file(documentApiScript));
    const deadCodeUri = webview.asWebviewUri(vscode.Uri.file(deadCodeScript));

    return htmlCode +
      `<style>${cssCode}</style>` +
      `<script src="${scriptsUri}"></script>` +
      `<script src="${techStackUri}"></script>` +
      `<script src="${snippetUri}"></script>` +
      `<script src="${createDevelopmentUri}"></script>` +
      `<script src="${intialRunnerUri}"></script>` +
      `<script src="${mockDataUri}"></script>` +
      `<script src="${documentAPIUri}"></script>` +
      `<script src="${deadCodeUri}"></script>`;
  }
}
