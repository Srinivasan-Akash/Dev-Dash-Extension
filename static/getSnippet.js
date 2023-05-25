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
const IMAGE_PARENT = document.querySelector(".image");

const API_ENDPOINT = 'http://localhost:3000';
const FILE_EXTENSION = "png";
const FILENAME_PREFIX = "Dev-Dash";

let scale = 1;
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

IMAGE_PARENT.addEventListener('mousedown', dragStart);
IMAGE_PARENT.addEventListener('mouseup', dragEnd);
IMAGE_PARENT.addEventListener('mousemove', drag);

function dragStart(event) {
  initialX = event.clientX - xOffset;
  initialY = event.clientY - yOffset;

  if (event.target === IMAGE) {
    isDragging = true;
  }
}

function dragEnd() {
  initialX = currentX;
  initialY = currentY;

  isDragging = false;
}

function drag(event) {
  if (isDragging) {
    event.preventDefault();
    currentX = event.clientX - initialX;
    currentY = event.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    setTranslate(currentX, currentY, IMAGE);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) scale(${scale})`;
}

IMAGE_PARENT.addEventListener('wheel', (event) => {
  event.preventDefault();
  scale += event.deltaY * -0.01;
  scale = Math.min(Math.max(0.125, scale), 4);
  IMAGE.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) scale(${scale})`;
});

SUBMIT_BUTTON_SNIPPET.addEventListener('click', () => {
    console.log("Clicked")
    let queryParams = new URLSearchParams();
    queryParams.set('language', LANGUAGE.value);
    queryParams.set('theme', THEME.value);
    queryParams.set('background-color', BACKGROUND_COLOR.value);
    queryParams.set('show-background', BACKGROUND_IMAGE.value);
    queryParams.set('line-numbers', showLineNumbers);
    queryParams.set('background-image', BACKGROUND_IMAGE.value);
    queryParams.set('padding', PADDING.value);

    let requestUrl = `${API_ENDPOINT}/toImage?${queryParams.toString()}`;
    console.log(requestUrl);
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
            IMAGE.style.scale = "1";
            
            // let downloadFileName = `${FILENAME_PREFIX}_${stringPart}_${numberPart}.${FILE_EXTENSION}`;
            // const vscode = acquireVsCodeApi();
            // vscode.postMessage({
            //     command: 'downloadFile',
            //     url: imageBlobUrl,
            //     filename: downloadFileName
            // });

            console.log(downloadFileName, imageBlobUrl);

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
