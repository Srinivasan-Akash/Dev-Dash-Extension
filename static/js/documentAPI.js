// inputs
const CODE_INPUT = document.querySelector("#code-input");
const API_DOC_SUBMIT = document.querySelector(".submit-apiDoc");

API_DOC_SUBMIT.addEventListener('click', () => {
    // Value
    const API_ROUTE_CODE = CODE_INPUT.value;
    const prompt = `Document this API Route it should contain request schema, response schema with examples code on how to use it. ${API_ROUTE_CODE}`;
    API_DOC_SUBMIT.innerText = "Loading...";

    const HEADERS = new Headers();
    HEADERS.append("Authorization", "Bearer key");
    HEADERS.append("Content-Type", "application/json");

    // API BODY
    const BODY = JSON.stringify({
        model: "gpt-3.5-turbo-0301",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    const requestOptions = {
        method: "POST",
        headers: HEADERS,
        body: BODY,
        redirect: "follow",
    };

    fetch("https://api.openai.com/v1/chat/completions", requestOptions)
        .then((response) => response.json()) // Parse response as JSON
        .then((result) => {
            const content = result.choices[0].message.content;

            console.log(content);

            document.querySelector(".documentAPI-screen").innerHTML +=
                "<div class='result'><pre>" + content + "</pre></div>";
        })
        .catch((error) => console.log("error", error))
        .finally(() => {
            API_DOC_SUBMIT.innerText = "Submit Form";
        });



})