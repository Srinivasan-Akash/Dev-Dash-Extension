// Elements
const SIGN_IN_BUTTON = document.querySelector("#google-signin-button");
const SIGN_OUT_BUTTON = document.querySelector(".log-out");
const MOTIVATIONAL_QUOTE = document.querySelector(".quote");
const MOTIVATONAL_QUOTE_FOUNDER = document.querySelector(".quote-founder");
const GO_BACK_FROM_WEBSITE_INFO = document.querySelector(".goBack-websiteInfo");
const GO_BACK_FROM_MINI_TOOLS = document.querySelector(".goBack-miniTools");
const MINI_TOOLS_BUTTON = document.querySelector(".tools");

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

// Props
const RED_NEON_BLOB = document.querySelector(".red");
const BLUE_NEON_BLOB = document.querySelector(".blue");

// Event Listeners
// Form & To Dashboard & Login
SIGN_IN_BUTTON.addEventListener("click", () => {
  RED_NEON_BLOB.style.left = "50%";
  BLUE_NEON_BLOB.style.right = "50%";
  SIGN_IN_SCREEN.style.scale = "0";
  DASHBOARD_SCREEN.style.scale = "1";
});

SIGN_OUT_BUTTON.addEventListener("click", () => {
  RED_NEON_BLOB.style.left = "0%";
  BLUE_NEON_BLOB.style.right = "0%";
  SIGN_IN_SCREEN.style.scale = "1";
  DASHBOARD_SCREEN.style.scale = "0";
});

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
      setTimeout(() => EMAIL_SUBMIT_BUTTON.innerText = "Submit Form");
    }, function(error) {
      EMAIL_SUBMIT_BUTTON.innerText = "Operation Failed !!";
      setTimeout(() => EMAIL_SUBMIT_BUTTON.innerText = "Submit Form");
    });
});

// From & To (GetWebsiteInfo To Dashboard)
GET_WEBSITE_INFO_BUTTON.addEventListener('click', () => {
  RED_NEON_BLOB.style.left = "0%";
  BLUE_NEON_BLOB.style.right = "0%";
  WEBSITE_INFO.style.scale = "1";
  DASHBOARD_SCREEN.style.scale = "0";
});

GO_BACK_FROM_WEBSITE_INFO.addEventListener('click', () => {
  RED_NEON_BLOB.style.left = "50%";
  BLUE_NEON_BLOB.style.right = "50%";
  WEBSITE_INFO.style.scale = "0";
  DASHBOARD_SCREEN.style.scale = "1";
});

// From & To (miniTools To Dashboard)
MINI_TOOLS_BUTTON.addEventListener('click', () => {
  RED_NEON_BLOB.style.left = "0%";
  BLUE_NEON_BLOB.style.right = "0%";
  DASHBOARD_SCREEN.style.scale = "0";
  MINI_TOOLS.style.scale = "1";
});

GO_BACK_FROM_MINI_TOOLS.addEventListener('click', () => {
  RED_NEON_BLOB.style.left = "50%";
  BLUE_NEON_BLOB.style.right = "50%";
  MINI_TOOLS.style.scale = "0";
  DASHBOARD_SCREEN.style.scale = "1";
});

// Functionality
getJoke();

// API Functions
function getJoke() {
  fetch("https://type.fit/api/quotes")
    .then((response) => response.json())
    .then((data) => {
      let randomQuote = data[Math.floor(Math.random() * data.length)];
      MOTIVATIONAL_QUOTE.innerText = randomQuote.text.length >= 100?randomQuote.text.substring(0, 100): randomQuote.text;
      MOTIVATONAL_QUOTE_FOUNDER.innerText = `~${randomQuote.author === null ? "unknown" : randomQuote.author}`;
  });
}