const WEBSITE_URL_INPUT = document.querySelector(".website-url-input");
const SUBMIT_BUTTON = document.querySelector(".WebsiteInfo .submit-btn");
const RESULT_WINDOW = document.querySelector(".techstack-show");

SUBMIT_BUTTON.addEventListener('click', () => {
  const websiteUrl = WEBSITE_URL_INPUT.value;
  console.log(websiteUrl);

  let multimediaUrls = [];

  fetch(`https://dev-dash-extension-backend-indratejreddy.vercel.app/?url=${encodeURIComponent(websiteUrl)}`)
    .then(res => res.json())
    .then(data => {
      const techStacks = data.data.results;
      let html = '';

      for (let key in techStacks) {
        if (techStacks.hasOwnProperty(key)) {
          const values = techStacks[key];
          html += `<div class="techstack analytics">
                      <h2 class="title">${key}</h2>
                      <ul>`;

          values.forEach(value => {
            const name = value.data.name;
            const description = value.data.description;
            html += `<li>
                        <img width="20" src="https://chat.openai.com/favicon-32x32.png"/>
                        <span class="tooltip" title="${description}">${name}</span>
                     </li>`;
          });

          html += `</ul>
                   </div>`;
        }
      }

      // Fetch font families and multimedia URLs from the same API endpoint
      fetch(`https://dev-dash-extension-backend-indratejreddy.vercel.app/?url=${encodeURIComponent(websiteUrl)}`)
        .then(res => res.json())
        .then(data => {
          const fontFamilies = data.fontFamilyNames;
          multimediaUrls = data.images;

          // Append font family section
          html += `<div class="techstack analytics">
                      <h2 class="title">Font Family</h2>
                      <ul>`;

          fontFamilies.forEach(fontFamily => {
            html += `<li>
                        <img width="20" src="https://chat.openai.com/favicon-32x32.png"/>
                        <span class="tooltip" title="${fontFamily}">${fontFamily}</span>
                     </li>`;
          });

          html += `</ul>
                   </div>`;

          // Append multimedia section with individual links for each image
          html += `<div class="techstack analytics">
                      <h2 class="title">Multimedia</h2>
                      <ul>`;

          multimediaUrls.forEach((url, index) => {
            html += `<li>
                        <img width="20" src="https://chat.openai.com/favicon-32x32.png"/>
                        <a class="image-link" href="${url}" target="_blank" rel="noopener noreferrer">Image ${index + 1}</a>
                     </li>`;
          });

          html += `</ul>
                   </div>`;

          RESULT_WINDOW.innerHTML = html;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
