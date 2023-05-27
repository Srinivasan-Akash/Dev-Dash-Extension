const SIGN_IN_EMAIL_PASSWORD_BTN = document.querySelector(".sign-up-email-password-btn");
const SIGN_IN_PAGE_IFRAME = document.querySelector(".sign-in");
const EXCALI_DRAW_IFRAME = document.querySelector(".excali-draw-iframe");

SIGN_IN_EMAIL_PASSWORD_BTN.addEventListener('click', () => {
    SIGN_IN_PAGE_IFRAME.style.display = "none";
    EXCALI_DRAW_IFRAME.style.display = "block";
});