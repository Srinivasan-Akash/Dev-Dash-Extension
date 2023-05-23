const cheerio = require('cheerio');
const axios = require('axios');

async function fetchHTML(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching HTML:', error);
        return null;
    }
}

function extractInformation(html) {
    const $ = cheerio.load(html);

    // Extract img src
    const imgSrcList = [];
    $('img').each((index, element) => {
        const src = $(element).attr('src');
        imgSrcList.push(src);
    });

    // Extract font family names
    const fontFamilySet = new Set();
    $('style').each((index, element) => {
        const style = $(element).html();
        const fontFamilyMatches = style.match(/font-family:\s*([^;]+)/ig);
        if (fontFamilyMatches) {
            const fontFamily = fontFamilyMatches[0].replace(/font-family:\s*/i, '').replace(/['"]/g, '').trim();
            const fontFamilyFirst = fontFamily.split(',')[0].trim();
            fontFamilySet.add(fontFamilyFirst);
        }
    });
    const fontFamilyList = Array.from(fontFamilySet);

    // Extract favicon URL
    const faviconURL = $('link[rel="icon"]').attr('href');

    // Extract page title
    const pageTitle = $('title').text();

    return {
        imgSrcList,
        fontFamilyList,
        faviconURL,
        pageTitle
    };
}

async function getMultiMedia(url) {
    const html = await fetchHTML(url);
    if (html) {
        const extractedData = extractInformation(html);
        return {
            "images": extractedData.imgSrcList,
            "fontFamilyNames": extractedData.fontFamilyList,
            "favIcon": extractedData.faviconURL,
            "pageTitle": extractedData.pageTitle
        }
    }
}

module.exports = getMultiMedia;