const TOPIC_INPUT = document.querySelector(".data-mocking-screen #topic-input");
const STRUCTURE_INPUT = document.querySelector(".data-mocking-screen #structure-input");
const NUMBER_ENTRIES = document.querySelector("#number-input");
const MOCK_DATA_SUBMIT_BTN = document.querySelector(".submit-mock-data");
const GPT_KEY = "Bearer key";

MOCK_DATA_SUBMIT_BTN.addEventListener('click', () => {
    console.log("clicked")
    // Inputs
    const topic = TOPIC_INPUT.value;
    const structure = STRUCTURE_INPUT.value;
    const resultNumber = NUMBER_ENTRIES.value;
    const prompt = `Give Me ${resultNumber} entries on ${topic} in this format ${structure}  in json format only. all in one file only. I want only the json nothing else`;

    console.log(prompt);
    MOCK_DATA_SUBMIT_BTN.innerText = "Loading...";

    // API HEADERS
    const HEADERS = new Headers();
    HEADERS.append("Authorization", GPT_KEY);
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
            console.log(result);
            const content = result.choices[0].message.content;
            const items = JSON.parse(content);
            document.querySelector(".data-mocking-screen").innerHTML += "<div class='result'><pre>" + JSON.stringify(items, null, 2) + "</pre></div>";
        })
        .catch((error) => console.log("error", error))
        .finally(() => {
            MOCK_DATA_SUBMIT_BTN.innerText = "Submit Form";
        });
})