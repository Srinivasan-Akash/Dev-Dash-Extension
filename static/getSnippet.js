// Inputs
const THEME = document.querySelector("#theme");
const LANGUAGE = document.querySelector("#language");
const PADDING = document.querySelector("#Padding");
const BACKGROUND_COLOR = document.querySelector("#BackgroundColor");
const BACKGROUND_IMAGE = document.querySelector("#BackgroundImage");
const CODE = document.querySelector(".paddingAndColor textarea");
const SUBMIT_BUTTON_SNIPPET = document.querySelector(".getSnippet");
const OVERLAY_TEXT = document.querySelector(".image p");
const showLineNumbers = true;

// Outputs
const IMAGE = document.querySelector(".image img");
const API_ENDPOINT = 'https://code2img.vercel.app';
const FILE_EXTENSION = "png";
const FILENAME_PREFIX = "Dev-Dash";

SUBMIT_BUTTON_SNIPPET.addEventListener('click', () => {
    let queryParams = new URLSearchParams();
    queryParams.set('language', LANGUAGE.value);
    queryParams.set('theme', THEME.value);
    queryParams.set('background-color', BACKGROUND_COLOR.value);
    queryParams.set('show-background', BACKGROUND_IMAGE.value);
    queryParams.set('line-numbers', showLineNumbers.value);
    queryParams.set('background-image', BACKGROUND_IMAGE.value);
    queryParams.set('padding', PADDING.value);

    let requestUrl = `${API_ENDPOINT}/api/to-image?${queryParams.toString()}`;

    fetch(requestUrl, {
        method: 'POST',
        body: CODE.value,
    })
        .then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                throw new Error('Image generation failed.');
            }
        })
        .then(blob => {
            const imageBlobUrl = window.URL.createObjectURL(blob);
            IMAGE.src = imageBlobUrl;
            IMAGE.style.scale = "1"
            const stringPart = Math.random().toString(36).substring(2, 6); // Generate a random string of 4 characters
            const numberPart = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
            
            let downloadFileName = `${FILENAME_PREFIX}_${stringPart}_${numberPart}.${FILE_EXTENSION}`;

            // Download the image to the VS Code workspace
            // vscode.postMessage({
            //     command: 'downloadImage',
            //     url: imageBlobUrl,
            //     filename: downloadFileName
            // });

            clearOverlay();
        })
        .catch(error => {
            console.error(error);
            OVERLAY_TEXT.innerText = "Sorry, something went wrong 🤷‍♂️";
        });

    function clearOverlay() {
        OVERLAY_TEXT.innerText = "";
    }
});
