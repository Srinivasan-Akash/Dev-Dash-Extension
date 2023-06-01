const express = require('express');
const cors = require('cors');
const toImage = require('./api/to-image.js')
const fs = require('fs');
const path = require('path');

const app = express();

// Enable CORS
app.use(cors());
app.use(express.text()); // Parse text request bodies

// Routes and middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Define your routes here
app.post('/toImage', (req, res) => {
    const code = req.body;
    toImage(req, res, code)
});

app.get('/preview.html', async (req, res) => {
    const theme = req.query.theme;

    try {
        const filePath = path.join(__dirname, 'public', 'preview.html');
        const filePathJs = path.join(__dirname, 'public', 'app.js');
        const filePathTheme = path.join(__dirname, 'public', 'prism-themes', `prism-${theme}.css`);
        const prismPath = path.join(__dirname, 'public', `prism.js`);
        const baseCSSPath = path.join(__dirname, 'public', `base.css`);

        const [js, css, html, prism, baseCSS] = await Promise.all([
            readFileAsync(filePathJs, 'utf-8'),
            readFileAsync(filePathTheme, 'utf-8'),
            readFileAsync(filePath, 'utf-8'),
            readFileAsync(prismPath, 'utf-8'),
            readFileAsync(baseCSSPath, 'utf-8')
        ]);

        let modifiedHtml = html
            .replace('<script src="./prism.js"></script>', `<script>${prism}</script>`)
            .replace('<script src="./app.js" type="text/javascript"></script>', `<script>${js}</script>`)
            .replace('<!-- BASE CSS DO NOT DELETE COMMENT-->', `<style>${baseCSS}</style>`)
            .replace('<style></style>', `<style>${css}</style>`);

        res.send(modifiedHtml);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

function readFileAsync(filePath, encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}


// Start the server
const port = 3000; // Specify the port number you want to use
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
