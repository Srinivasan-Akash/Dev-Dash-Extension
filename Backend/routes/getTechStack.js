const axios = require("axios");

async function getTechStack(url) {
    const options = {
        method: "GET",
        url: "https://www.genelify.com/api/v1/technology-lookup",
        params: { url: url },
        headers: {
            "Content-Type": "application/json",
            "X-GENELIFY-API-KEY": "c7e690bd3e1f68da0aaf8fe20be9e418045a0287062feec8e8725b420c2f2890",
        },
    }

    try {
        const response = await axios.request(options);
        return response;
    } catch (error) {
        return error;
    }
}

module.exports = getTechStack;