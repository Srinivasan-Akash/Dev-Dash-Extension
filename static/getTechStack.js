// Elements
const WEBSITE_URL_INPUT = document.querySelector(".website-url-input");
const SUBMIT_BUTTON = document.querySelector(".WebsiteInfo .submit-btn");
const RESULT_WINDOW = document.querySelector(".techstack-show");

SUBMIT_BUTTON.addEventListener('click', () => {
    const websiteUrl = WEBSITE_URL_INPUT.value;
    console.log(websiteUrl);

    fetch(`http://localhost:3000/getTechStack?url=${encodeURIComponent(websiteUrl)}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.data.results);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});