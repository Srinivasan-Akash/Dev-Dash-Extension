// Elements
const SIGN_IN_BUTTON = document.querySelector("#google-signin-button");
const SIGN_OUT_BUTTON = document.querySelector(".log-out");
const MOTIVATIONAL_QUOTE = document.querySelector(".quote");
const MOTIVATONAL_QUOTE_FOUNDER = document.querySelector(".quote-founder");

// Screens
const SIGN_IN_SCREEN = document.querySelector(".sign-in");
const DASHBOARD_SCREEN = document.querySelector(".dashboard");

// Props
const RED_NEON_BLOB = document.querySelector(".red");
const BLUE_NEON_BLOB = document.querySelector(".blue");

// Event Listeners
SIGN_IN_BUTTON.addEventListener("click", () => {
  RED_NEON_BLOB.style.left = "50%";
  BLUE_NEON_BLOB.style.right = "50%";
  SIGN_IN_SCREEN.style.scale = "0";
  DASHBOARD_SCREEN.style.scale = "1";

  // TODO: Auth Logic Goes Here....
});

SIGN_OUT_BUTTON.addEventListener("click", () => {
  RED_NEON_BLOB.style.left = "0%";
  BLUE_NEON_BLOB.style.right = "0%";
  SIGN_IN_SCREEN.style.scale = "1";
  DASHBOARD_SCREEN.style.scale = "0";

  // TODO: LOG OUT Logic Goes Here....
});

// API's
fetch("https://type.fit/api/quotes")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let randomQuote = data[Math.floor(Math.random() * data.length)];
    MOTIVATIONAL_QUOTE.innerText = randomQuote.text;
    MOTIVATONAL_QUOTE_FOUNDER.innerText = `~${randomQuote.author === null? "unknown": randomQuote.author}`;
  });
