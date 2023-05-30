// Elements
const SIGN_IN_BUTTON = document.querySelector("#google-signin-button");
const SIGN_OUT_BUTTON = document.querySelector(".log-out");
const MOTIVATIONAL_QUOTE = document.querySelector(".quote");
const MOTIVATONAL_QUOTE_FOUNDER = document.querySelector(".quote-founder");
const MINI_TOOLS_BUTTON = document.querySelector(".tools");
const GITHUB_VIEW_BUTTON = document.querySelector(".github-view-btn");
const CAPTURE_BTN = document.querySelector(".capture");
const DEV_ENV_BUTTON = document.querySelector(".dev-env-btn");
const TODO = document.querySelector(".todo");
const FILE_SHARING = document.querySelector(".fileSharing");
const INTIAL_RUNNER = document.querySelector(".goToIntialRunner");
const DATA_MOCKING_BTN = document.querySelector(".data-mocking-btn");
const DATA_MOCKING_SCREEN = document.querySelector(".data-mocking-screen");
const DOCUMENT_API_BTN = document.querySelector(".documentAPI");

// Back Btns
const GO_BACK_FROM_DEV_ENV = document.querySelector(".goBack-dev-env");
const GO_BACK_FROM_GITHUB_VIEW = document.querySelector(".goBack-gitubView");
const GO_BACK_FROM_WEBSITE_INFO = document.querySelector(".goBack-websiteInfo");
const GO_BACK_FROM_MINI_TOOLS = document.querySelector(".goBack-miniTools");
const GO_BACK_FROM_CAPTURE = document.querySelector(".goBack-capture-window");
const GO_BACK_FROM_INTIAL_RUNNER = document.querySelector(".goBack-initialRunner");
const GO_BACK_FROM_DATA_MOCKING = document.querySelector(".GO_BACK_FROM_DATA_MOCKING");
const GO_BACK_FROM_DOCUMENT_API = document.querySelector(".GO_BACK_FROM_DOCUMENTATION");

TODO.addEventListener('click', () => vscode.postMessage({ command: 'openTodo' }));
FILE_SHARING.addEventListener('click', () => vscode.postMessage({ command: 'openFileSharing' }));

// Email Form elements
const EMAIL_SUBMIT_BUTTON = document.querySelector(".share-feature button");
const NAME_INPUT = document.querySelector("#name-input");
const EMAIL_INPUT = document.querySelector("#email-input");
const FEATURE_INPUT = document.querySelector(".share-feature textarea");
const GET_WEBSITE_INFO_BUTTON = document.querySelector(".util.websiteInfo");

// Screens
const SIGN_IN_SCREEN = document.querySelector(".sign-in");
const DASHBOARD_SCREEN = document.querySelector(".dashboard");
const WEBSITE_INFO = document.querySelector(".WebsiteInfo");
const MINI_TOOLS = document.querySelector(".mini-tools");
const GITHUB_VIEW = document.querySelector(".github-view");
const CAPTURE_WINDOW = document.querySelector(".capture-window");
const DEV_ENV_WINDOW = document.querySelector(".dev-env");
const INITIAL_RUNNER_SCREEN = document.querySelector(".initialRunner");
const DOCUMENT_API_SCREEN = document.querySelector(".documentAPI-screen");

// Props
const RED_NEON_BLOB = document.querySelector(".red");
const BLUE_NEON_BLOB = document.querySelector(".blue");

// Navigation Utils
function goTo(goTo, from) {
  RED_NEON_BLOB.style.left = "50%";
  BLUE_NEON_BLOB.style.right = "50%";
  goTo.style.scale = "0";
  from.style.scale = "1";
  console.log(goTo, from)
}

function back(backTo, from) {
  RED_NEON_BLOB.style.left = "0%";
  BLUE_NEON_BLOB.style.right = "0%";
  backTo.style.scale = "1";
  from.style.scale = "0";
  console.log(backTo, from)
}

SIGN_IN_BUTTON.addEventListener("click", () => goTo(SIGN_IN_SCREEN, DASHBOARD_SCREEN));
SIGN_OUT_BUTTON.addEventListener("click", () => back(SIGN_IN_SCREEN, DASHBOARD_SCREEN));

// From & To (GetWebsiteInfo To Dashboard)
GET_WEBSITE_INFO_BUTTON.addEventListener('click', () => goTo(DASHBOARD_SCREEN, WEBSITE_INFO));
GO_BACK_FROM_WEBSITE_INFO.addEventListener('click', () => back(DASHBOARD_SCREEN, WEBSITE_INFO));

// From & To (DevEnv To Dashboard)
DEV_ENV_BUTTON.addEventListener('click', () => goTo(DASHBOARD_SCREEN, DEV_ENV_WINDOW));
GO_BACK_FROM_DEV_ENV.addEventListener('click', () => back(DASHBOARD_SCREEN, DEV_ENV_WINDOW));

// From & To (miniTools To Dashboard)
MINI_TOOLS_BUTTON.addEventListener('click', () => goTo(DASHBOARD_SCREEN, MINI_TOOLS));
GO_BACK_FROM_MINI_TOOLS.addEventListener('click', () => back(DASHBOARD_SCREEN, MINI_TOOLS));

// From & To (Capture To Dashboard)
CAPTURE_BTN.addEventListener('click', () => goTo(DASHBOARD_SCREEN, CAPTURE_WINDOW));
GO_BACK_FROM_CAPTURE.addEventListener('click', () => back(DASHBOARD_SCREEN, CAPTURE_WINDOW));

// From & To (Github View to Dashboard)
GITHUB_VIEW_BUTTON.addEventListener('click', () => goTo(DASHBOARD_SCREEN, GITHUB_VIEW));
GO_BACK_FROM_GITHUB_VIEW.addEventListener('click', () => back(DASHBOARD_SCREEN, GITHUB_VIEW));

// From & To (INTIAL_RUNNER to Dashboard)
INTIAL_RUNNER.addEventListener('click', () => goTo(DASHBOARD_SCREEN, INITIAL_RUNNER_SCREEN));
GO_BACK_FROM_INTIAL_RUNNER.addEventListener('click', () => back(DASHBOARD_SCREEN, INITIAL_RUNNER_SCREEN));

// From & To (DATA_MOCKING to Dashboard)
DATA_MOCKING_BTN.addEventListener('click', () => goTo(DASHBOARD_SCREEN, DATA_MOCKING_SCREEN));
GO_BACK_FROM_DATA_MOCKING.addEventListener('click', () => back(DASHBOARD_SCREEN, DATA_MOCKING_SCREEN));

// From & To (DOCUMENT_API to Dashboard)
DOCUMENT_API_BTN.addEventListener('click', () => goTo(DASHBOARD_SCREEN, DOCUMENT_API_SCREEN));
GO_BACK_FROM_DOCUMENT_API.addEventListener('click', () => back(DASHBOARD_SCREEN, DOCUMENT_API_SCREEN));

// GET JOKE
function getJoke() {
  fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((data) => {
      let randomQuote = data[Math.floor(Math.random() * data.length)];
      MOTIVATIONAL_QUOTE.innerText = randomQuote.text.length >= 100?randomQuote.text.substring(0, 100): randomQuote.text;
      MOTIVATONAL_QUOTE_FOUNDER.innerText = `~${randomQuote.author === null ? "unknown" : randomQuote.author}`;
  });
}

getJoke();

// MAIL
EMAIL_SUBMIT_BUTTON.addEventListener('click', () => {
  alert('Message Sent Successfully!!');

  const [name, email, feature] = [NAME_INPUT.value, EMAIL_INPUT.value, FEATURE_INPUT.value];
  const templateParams = {
    to_name: name,
    from_name: name,
    message: feature + " By " + email
  };

  emailjs.send('service_xh55xqi', 'template_0aagqwn', templateParams)
    .then(function(response) {
      NAME_INPUT.value = "";
      EMAIL_INPUT.value = "";
      FEATURE_INPUT.value = "";
      EMAIL_SUBMIT_BUTTON.innerText = "Message Sent !!";
      setTimeout(() => EMAIL_SUBMIT_BUTTON.innerText = "Submit Form", 2000);
    }, function(error) {
      EMAIL_SUBMIT_BUTTON.innerText = "Operation Failed !!";
      setTimeout(() => EMAIL_SUBMIT_BUTTON.innerText = "Submit Form", 2000);
    });
});