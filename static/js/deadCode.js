// Dead Code
const HTML_PATH = document.querySelector("#html-input");
const CSS_PATH = document.querySelector("#css-input");
const JS_PATH = document.querySelector("#js-input");
const WHITELIST_CLASSES = document.querySelector("#classes-input");
const DEAD_CSS_SUBMIT_BTN = document.querySelector(".submit-dead-css");

DEAD_CSS_SUBMIT_BTN.addEventListener('click', () => {
    const htmlPaths = HTML_PATH.value.split(",");
    const cssPaths = CSS_PATH.value.split(",");
    const jsPaths = JS_PATH.value.split(",");

    const paths = htmlPaths.concat(cssPaths, jsPaths);
    const whitelist = WHITELIST_CLASSES.value.split(",");
    console.log(paths, whitelist);
    vscode.postMessage({ command: 'dead-css', paths: paths, whitelist: whitelist });
});