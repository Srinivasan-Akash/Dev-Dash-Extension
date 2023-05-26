const DEV_ENV = {
    "web": {
        "frontendFramework": ["Vanilla", "React", "Angular", "Svelte", "Vue", "Next.js"],
        "backendFramework": ["Express.js", "Koa.js", "Fastify", "Nest.js", "Sails.js"],
        "BaaS": ["App Write", "App Smith", "Firebase", "Supabase"],
        "cssFrameworks": ["Tailwind CSS", "Bootstrap", "Material-UI", "Bulma", "Pico CSS"],
        "stateManagement": {
            "React": ["Redux", "Mobx", "Context API"],
            "Angular": ["NgRx"],
            "Svelte": ["Built-in state management"],
            "Vue": ["Vuex"],
            "Next.js": ["Redux", "Mobx", "Context API", "Next.js data fetching"],
            "default": []
        },
        "routing": {
            "React": ["React Router"],
            "Angular": ["Angular Router"],
            "Svelte": ["Svelte Router"],
            "Vue": ["Vue Router"],
            "Next.js": ["Next.js Router"],
            "default": []
        },
        "testing": ["Jest", "React Testing Library", "Cypress", "Jasmine", "Enzyme"],
        "formHandling": ["Formik", "Angular Forms", "Svelte Form", "Vue Form", "React Hook Form"],
        "dataVisualization": ["D3.js", "Chart.js", "Plotly", "Vega", "ApexCharts"],
        "authentication": ["Passport.js", "Firebase Authentication", "Auth0", "Okta", "IdentityServer"],
        "animation": ["GSAP", "Anime.js", "React Spring", "Framer Motion", "Lottie"],
        "3DGraphics": ["Three.js", "Babylon.js", "A-Frame", "PlayCanvas", "Cannon.js"],
        "utilityLibraries": ["Lodash", "Day.js", "Axios", "Moment.js", "Underscore.js"]
    },
    "game": {},
    "mobile": {},
    "desktop": {},
    "cli": {},
    "extension": {}
};

let selectedPills = [];

function handlePillClick(event) {
    const pill = event.target;
    const domain = pill.getAttribute("data-domain");
    const isSelected = selectedPills.includes(domain);

    if (isSelected) {
        selectedPills = selectedPills.filter((item) => item !== domain);
        pill.classList.remove("selected");
    } else {
        selectedPills.push(domain);
        pill.classList.add("selected");
    }

    // Handle specific logic for "web" selection
    if (selectedPills.includes("web")) {
        // Render frontend frameworks
        const frontendFrameworks = DEV_ENV.web.frontendFramework;
        const frontendContainer = document.querySelector(".frontendContainer .pills");
        frontendContainer.innerHTML = "";

        frontendFrameworks.forEach((framework) => {
            const frameworkElement = document.createElement("div");
            frameworkElement.classList.add("pill");
            frameworkElement.textContent = framework;
            frameworkElement.setAttribute("data-domain", framework);
            frontendContainer.appendChild(frameworkElement);
        });

        // Add click event listeners to frontend framework pills
        const frontendPills = frontendContainer.querySelectorAll(".pill");
        frontendPills.forEach((pill) => {
            pill.addEventListener("click", handlePillClick);
        });

        // Render backend frameworks
        const backendFrameworks = DEV_ENV.web.backendFramework;
        const backendContainer = document.querySelector(".backendContainer .pills");
        backendContainer.innerHTML = "";

        backendFrameworks.forEach((framework) => {
            const backendElement = document.createElement("div");
            backendElement.classList.add("pill");
            backendElement.textContent = framework;
            backendElement.setAttribute("data-domain", framework);
            backendContainer.appendChild(backendElement);
        });

        // Add click event listeners to backend framework pills
        const backendPills = backendContainer.querySelectorAll(".pill");
        backendPills.forEach((pill) => {
            pill.addEventListener("click", handlePillClick);
        });

        frontendContainer.parentElement.style.scale = 1;
        backendContainer.parentElement.style.scale = 1;
    } else {
        // Clear frontend and backend containers
        const frontendContainer = document.querySelector(".frontendContainer .pills");
        const backendContainer = document.querySelector(".backendContainer .pills");
        frontendContainer.parentElement.style.scale = 0;
        backendContainer.parentElement.style.scale = 0;
        frontendContainer.innerHTML = "";
        backendContainer.innerHTML = "";

        // Handle other cases if needed
    }

    console.log("Selected Pills:", selectedPills);
}

// Add click event listeners to top-level pills
const pills = document.querySelectorAll(".pill");
pills.forEach((pill) => {
    pill.addEventListener("click", handlePillClick);
});
