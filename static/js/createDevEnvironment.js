// const DEV_ENV = {
//     "web": {
//         "frontendFramework": ["Vanilla", "React", "Angular", "Svelte", "Vue", "Next.js"],
//         "backendFramework": ["Express.js", "Koa.js", "Fastify", "Nest.js", "Sails.js"],
//         "BaaS": ["App Write", "App Smith", "Firebase", "Supabase"],
//         "cssFrameworks": ["Tailwind CSS", "Bootstrap", "Material-UI", "Bulma", "Pico CSS"],
//         "stateManagement": {
//             "React": ["Redux", "Mobx", "Context API"],
//             "Angular": ["NgRx"],
//             "Svelte": ["Built-in state management"],
//             "Vue": ["Vuex"],
//             "Next.js": ["Redux", "Mobx", "Context API", "Next.js data fetching"],
//             "default": []
//         },
//         "routing": {
//             "React": ["React Router"],
//             "Angular": ["Angular Router"],
//             "Svelte": ["Svelte Router"],
//             "Vue": ["Vue Router"],
//             "Next.js": ["Next.js Router"],
//             "default": []
//         },
//         "testing": ["Jest", "React Testing Library", "Cypress", "Jasmine", "Enzyme"],
//         "formHandling": ["Formik", "Angular Forms", "Svelte Form", "Vue Form", "React Hook Form"],
//         "dataVisualization": ["D3.js", "Chart.js", "Plotly", "Vega", "ApexCharts"],
//         "authentication": ["Passport.js", "Firebase Authentication", "Auth0", "Okta", "IdentityServer"],
//         "animation": ["GSAP", "Anime.js", "React Spring", "Framer Motion", "Lottie"],
//         "3DGraphics": ["Three.js", "Babylon.js", "A-Frame", "PlayCanvas", "Cannon.js"],
//         "utilityLibraries": ["Lodash", "Day.js", "Axios", "Moment.js", "Underscore.js"]
//     },
//     "game": {},
//     "mobile": {},
//     "desktop": {},
//     "cli": {},
//     "extension": {}
// };

const frontendContainer = document.querySelector(".frontendContainer");
const BaaSContainer = document.querySelector(".BaaS-container");
const backendContainer = document.querySelector(".backendContainer");
const componentLibrary = document.querySelector(".componentLibrary");
const devEnvironment = document.querySelector(".devEnvironment")
const extras = document.querySelector(".extras");

let selectedPills = [];

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
