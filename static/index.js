// Elements
const SIGN_IN_BUTTON = document.querySelector("#google-signin-button");
const SIGN_OUT_BUTTON = document.querySelector(".log-out");

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
