// inputs
const COMMANDS = document.querySelector(".initialRunner .share-feature textarea");
const SUBMIT_BTN_INTIAL_RUNNER = document.querySelector(".initialRunner .share-feature button");

SUBMIT_BTN_INTIAL_RUNNER.addEventListener('click', () => {
    vscode.postMessage({
        command: "commandsIntialRunner",
        intialCommands: COMMANDS.value
    });

    console.log("SENT:- ", COMMANDS.value);
});