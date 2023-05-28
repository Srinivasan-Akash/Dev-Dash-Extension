const SIGN_IN_EMAIL_PASSWORD_BTN = document.querySelector(".sign-up-email-password-btn");
const SIGN_IN_PAGE_IFRAME = document.querySelector(".sign-in");
const EXCALI_DRAW_IFRAME = document.querySelector(".excali-draw-iframe");
const LOADING = document.querySelector(".loading");

const EMAIL_INPUT = document.querySelector(".excali .email");
const PASSWORD_INPUT = document.querySelector(".excali .password");
const NAME_INPUT = document.querySelector(".excali .name");
// client_appwrite
function generateUUID() {
    const min = 1000;
    const max = 9999999999999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const uuid = randomNumber.toString().padStart(4, '0');
    return uuid;
}

const { Client, Account } = Appwrite;

const client_appwrite = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64666a86e7d116b4dea2');

const account = new Account(client_appwrite);

function isAuthenticated() {    
    const accountDetails = account.get();
   
    accountDetails.then((res) => {
        SIGN_IN_PAGE_IFRAME.style.display = "none";
        EXCALI_DRAW_IFRAME.style.display = "block";
        LOADING.style.display = "none";
        vscode.postMessage({ command: "authFinished" });
    },
    (err) => {
        SIGN_IN_PAGE_IFRAME.style.display = "block";
        EXCALI_DRAW_IFRAME.style.display = "none";
        LOADING.style.display = "none";
    });
}

isAuthenticated()

SIGN_IN_EMAIL_PASSWORD_BTN.addEventListener('click', () => {
    const promise = account.create(generateUUID(), EMAIL_INPUT.value, PASSWORD_INPUT.value, NAME_INPUT.value)
    promise.then(async (response) => {
        SIGN_IN_PAGE_IFRAME.style.display = "none";
        EXCALI_DRAW_IFRAME.style.display = "block";
        vscode.postMessage({ command: "authFinished" });
        await account.createEmailSession(EMAIL_INPUT.value, PASSWORD_INPUT.value);
    })
        .catch(error => {
            vscode.postMessage({ command: "authFailed" });
            console.error('Authentication failed:', error);
        });
});