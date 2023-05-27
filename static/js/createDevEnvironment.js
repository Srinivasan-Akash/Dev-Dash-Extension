const frontendContainer = document.querySelector(".frontendContainer");
const BaaSContainer = document.querySelector(".BaaS-container");
const backendContainer = document.querySelector(".backendContainer");
const componentLibrary = document.querySelector(".componentLibrary");
const devEnvironment = document.querySelector(".devEnvironment");
const extras = document.querySelector(".extras");
const dev_env_submit_btn = document.querySelector(".devEnvironment button");
const project_name = document.querySelector(".devEnvironment input");

let selectedPills = [];

dev_env_submit_btn.addEventListener('click', ()=> {
    vscode.postMessage({
        command: "installTechStack",
        techStack: selectedPills,
        projectName: project_name.value
    });
});

function handlePillClick(event) {
    const pill = event.target;
    const domain = pill.getAttribute("data-domain");
    const isSelected = selectedPills.includes(domain);
    const isDomainPill = ["web", "game", "cli", "extension", "mobile", "desktop"].includes(domain);

    if (isDomainPill) {
        const domainPills = selectedPills.filter(item => ["web", "game", "cli", "extension", "mobile", "desktop"].includes(item));
        const selectedElements = document.querySelectorAll(".selected");

        for (let i = 1; i < selectedElements.length; i++) {
            selectedElements[i].classList.remove("selected");
        }
        domainPills.forEach(item => {
            const pillElement = document.querySelector(`[data-domain="${item}"]`);
            pillElement.classList.remove("selected");
        });

        selectedPills = [domain];
        pill.classList.add("selected");
    } else {
        if (isSelected) {
            selectedPills = selectedPills.filter((item) => item !== domain);
            pill.classList.remove("selected");
        } else {
            selectedPills.push(domain);
            pill.classList.add("selected");
        }
    }

    if (selectedPills.includes("web")) {
        frontendContainer.style.scale = 1;
        backendContainer.style.scale = 1;
        BaaSContainer.style.scale = 1;
        componentLibrary.style.scale = 1;
        extras.style.scale = 1;
        devEnvironment.style.scale = 1;
    } else {
        frontendContainer.style.scale = 0;
        backendContainer.style.scale = 0;
        componentLibrary.style.scale = 0;
        BaaSContainer.style.scale = 0;
        devEnvironment.style.scale = 0;
        extras.style.scale = 0;
    }

    console.log("Selected Pills:", selectedPills);
}

const pills = document.querySelectorAll(".pill");
pills.forEach((pill) => {
    pill.addEventListener("click", handlePillClick);
});
