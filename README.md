# Team Members Info

| Names | HashNode ID | Gmail |
| --- | --- | --- |
| Akash Srinivasan | @[Akash Srinivasan](@AkashSrinivas) | prashanthiakash@gmail.com |
| Indratej Reddy | @[Indratej Reddy](@indratejreddy) | indratejreddy@gmail.com |
| Sparsh Kumar Singh | @[sparsh kumar singh](@sparsh18) | [singh12sparsh@gmail.com](mailto:singh12sparsh@gmail.com) |

# Brief Description

We have developed a Visual Studio Code (VS Code) extension that aims to enhance developer productivity by providing several useful features. Here's a brief and easy-to-understand description of the extension:

1. **Motivational Quotes:** The extension includes motivational quotes to keep developers inspired while they work. It also offers subtle UI enhancements, smooth transitions, and additional assets to improve the coding experience.
    
    **<mark>Under The Hood Process:</mark>** We are using an API to get motivational quotes, and also utilized some of the UI/UX principles like color theory, spacing, etc. Finally, We had some transitions
    
2. **Code Snippet Image Creator:** This feature allows developers to create images of their code snippets, which can be easily shared using a shareable link.
    
    **<mark>Under The Hood Process:</mark>** We have built a frontend in HTML, CSS & JS that gets the inputs and sends that to the backend API which further injects them to a view (html file with code editor-like looking layout) using puppeteer we are just screenshotting it & uploading it to **app-write storage bucket.** Further rendering the image to the user and a download button with the shareable link.
    
3. **Mini Productive AI Tools:** The extension includes various development resources, AI-powered tools to assist developers in different tasks, such as writing articles, coding, generating email templates, creating text-to-image conversions, accessing free Canva illustrations, providing useful libraries, offering personalized AI chatbots, providing Notion templates, enhancing web design, analyzing algorithm time complexity, generating ORM queries, assisting UI/UX developers, suggesting free software tools, offering productivity tips, providing travel guides, offering DIY guides, helping with pet behavior, emojifying text, finding gifts, providing brainstorming assistance, performing sentiment analysis, offering AI-powered Excel capabilities, acting as a research assistant, tutoring, telling jokes, providing recipe suggestions, and much more.
    
    **<mark>Under The Hood Process:</mark>** We have integrated a web view that renders a third-party website containing various tools.
    
4. **Website Info Tool:** Developers can use this feature to extract information about a website, including the tech stack used, font families, images, and colors.
    
    **<mark>Under The Hood Process:</mark>** We have integrated Genelify Technology Lookup API along with that we have built our own API that uses Cheerio and scrapes the font family, assets, etc.
    
5. **Development Environment Generator:** With a single click, developers can set up a development environment for various frameworks, such as vanilla JavaScript or Express.js. The extension provides a boilerplate code and a professional folder structure. It also aims to add support for other libraries and frameworks, including game development, React Native, Flutter, Electron, etc., with customizable folder structures and boilerplate code.
    
    **<mark>Under The Hood Process:</mark>** We are using a frontend to get all the inputs later using the child\_processes library from the node.js which can run terminal commands. Further, we use the same library to define a folder structure and download the packages.
    
6. **API Route Documentation:** Using AI capabilities, the extension helps developers document API routes efficiently.
    
    **<mark>Under The Hood Process:</mark>** We are utilizing Open AI's API with `gpt-3.5-turbo` model to document the API.
    
7. **Initial Runner:** To prevent developers from forgetting to start the server, the extension allows them to enter the server start command, which automatically runs whenever the VS Code workspace opens.
    
    **<mark>Under The Hood Process:</mark>** We are utilizing a frontend to get the commands later we store the commands in the form of a file in a hidden folder called `.vscode` Later every time the user opens the workspace it runs the commands using `vscode` library which gives us access to the in-built terminal.
    
8. **Integrated Whiteboard:** The extension includes an integrated whiteboard similar to Excalidraw, enabling developers to visualize and sketch ideas directly within the editor. My extension leverages the power of Excalidraw, a popular collaborative drawing tool, to provide users with an enhanced drawing experience within the VS Code environment. Emphasize the benefits and unique aspects of your extension, such as seamless integration, real-time collaboration, or any additional features you have implemented.
    
    **<mark>Under The Hood Process:</mark>** ur extension utilizes app-write authentication to ensure secure access to the integrated whiteboard. By integrating Excali-Draw into the core architecture of VS Code, we have harnessed the full potential of this collaborative drawing tool, allowing developers to seamlessly switch between coding and visualizing their ideas. This integration not only improves productivity but also streamlines the creative process, enabling developers to effortlessly communicate and iterate on their concepts within a single environment.
    
9. **Coding Games:** Our VS Code extension takes learning and fun to the next level by providing developers with a collection of interactive coding games, all within the familiar environment of VS Code. With a combination of HTML, CSS, JavaScript, and Git integration, our extension empowers developers to enhance their skills while having a blast.
    
    **<mark>Under The Hood Process:</mark>** We are getting the list of games from the app-write database and rendering them.
    
10. **File Bin:** The extension provides a convenient way to share code files directly from within VS Code.
    
    **<mark>Under The Hood Process:</mark>** We have integrated one of my previous projects which is a file-sharing platform built on top of supabase.
    
11. **Social Card:** Developers can create a 3D business card with their information, such as a resume link, social media handles, and name, which can be shared with others.
    
    **<mark>Under The Hood Process:</mark>** We are passing the user data in the form of URL-encoded and even the profile pics are stored inside app-write-storage-bucket.
    
12. **Dead Code Remover:** This feature helps identify and remove unused code (dead code) from HTML, CSS, and JS files, improving code cleanliness and reducing file size.
    
    **<mark>Under The Hood Process:</mark>** We are utilizing the CSS Purge library by passing the file path to it and it will remove the dead code and return the result.
    
13. **Data Mocking:** Developers can generate mock data for frontend projects by providing a topic, JSON structure, and the desired number of entries.
    
    **<mark>Under The Hood Process:</mark>** We integrated OpenAI API with our extension with a good prompt so it generates the dummy data. And we skim out the prompt and get only the `JSON` and provide it to the user
    
14. **Task Reminder and Alarm:** The extension allows developers to set reminders and alarms within VS Code to manage their time effectively. They can receive alerts for tasks like lunch or gym breaks.
    
    **<mark>Under The Hood Process:</mark>** We are storing the remainder of timing etc. into a json file and storing it in `.vscode` a hidden folder. And alerting & changing the VS Code theme to remind the developer.
    
15. **Inbuilt Tutorial:** The extension provides an inbuilt tutorial to guide users on how to make the most of its features.
    
    **<mark>Under The Hood Process:</mark>** The extension is linked to our youtube channel where we have tutorials on various features of dev-dash
    
16. **Codebase Colorization:** To ease switching between multiple codebases, the extension allows users to customize the color of the VS Code window, helping them visually differentiate between different projects. Users can also reset the color to its default state.
    
    **<mark>Under The Hood Process:</mark>** We are using `VS Code` library to add a menu option and a button at the bottom right corner. Later we are also saving the colors into the `settings.json` inside `.vscode` which is a hidden folder inside the workspace and according to that it saves information like which workspace has which color
    
17. **Code Minification:** Users can select code, right-click, and remove spaces, and comments, and consolidate it into a single line. This is especially useful when working with large SVG files.
    
    **<mark>Under The Hood Process:</mark>** We are utilizing `regEx` from JS and removing all the comments and extra spaces.
    
18. **HTML to (React/Next Conversion):** The extension provides the ability to convert selected code snippets from HTML/CSS to React.js or Next.js, simplifying the process of transitioning between different syntaxes and frameworks.
    
    **<mark>Under The Hood Process:</mark>** We are utilizing String Methods of JS and `vscode` package to get selected code and convert attributes like `class` to `className` or even change some of the syntaxes in case of `Next.js`
    
19. **Code Obfuscation:** Developers can select code and convert it to obfuscated code to make it harder to understand and discourage unauthorized copying.
    
    **<mark>Under The Hood Process:</mark>** We are utilizing `JavaScript-Obfuscation` the library to obfuscate the selected code. Also, we are using `vscode` package to get the selected code.
    
20. **Custom Snippet Creation:** Users can select code and create custom snippets by assigning a key and body, allowing them to create personalized code snippets for efficient code reuse.
    
    **<mark>Under The Hood Process:</mark>** We are directly storing the selected code and key input from the user to User snippets in vs code
    
21. **Code Highlighting:** Developers can select code and highlight it to easily identify specific pieces of code within larger codebases.
    
    **<mark>Under The Hood Process:</mark>** We are utilizing `vscode` package to get the selected code and highlight it.
    
22. **HTML Component Snippets:** The extension offers a collection of component snippets for HTML, Tailwind, allowing developers to quickly generate code for common elements like navigation bars ("navbar", "CTA", "Hero Section" etc..) in the DevUI style.
    
    **<mark>Under The Hood Process:</mark>** We are utilizing `vscode` package to give IntelliSense on some of the components which are from `DevUI` a tailwind CSS component library.
    

These features aim to improve developer productivity and provide a more enjoyable coding experience within the VS Code environment.

# Tech Stack Utilized

| Languages | Frame-Works | BaaS | Other Packages | Dev-Dependencies | Third-Party APIs | Package Manager | CLI Tools | Other Tools | Image Provider |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| HTML/CSS | Tailwind | Appwrite | JS-Obfuscator | Nodemon | Genelify-TechLookup | NPM | Yo | Figma | Canva Icons |  |
| JavaScript | Express |  | purgeCSS | eslint | Open AI API |  | Git | Canva | FlatIcon |  |
| TypeScript | Puppeteer |  | dot-env | TypeScript |  |  | ESLint | Excali Draw | Logo Creator Figma Plugin |  |
| Node.js |  |  | cheerio | test-electron |  |  | Mocha | Adobe Color Picker |  |  |
|  |  |  |  | glob |  |  |  | Postman |  |  |
|  |  |  |  | vs-code library |  |  |  | GitHub |  |  |
|  |  |  |  | mocha |  |  |  | VS Code |  |  |
|  |  |  |  |  |  |  |  | Discord, G-Meet & Whatsapp (for collaboration) |  |  |

# Usage Of App Write:-

1. **APP WRITE STORAGE:-** To store code snippet images, and profile pics from the social card & for hosting all the assets of the extension.
    
2. **APP WRITE AUTHENTICATION:-** To email/password authenticate the user to use the whiteboard.
    
3. **APP WRITE DATABASE:-** To fetch all the games.
    

# Challenges We Faced

1. **Fewer Resources On Building VS Code Extensions**
    
2. **Connecting Appwrite** to our vs code extension as there was no extension SDK i was getting cors error we tried web SDK by entering vs-code-extension-ID but it did not work later we tried `*` as hostname and it worked. For this we got help from @Meldiron#1111 from app-write discord channel
    
3. **To Save The Commands (form initial commands) & VS Code Workspace Colourization** As We cared for privacy we did not use the app-write database. Though if we used app-write database we could not identify the VS Code workspace. So finally inspired by git which creates `.git` hidden folder. We created `.vscode` hidden folder for user preferences.
    
4. **Building The SideBar WebView** as VS Code's Documentation was outdated we need to depend on other extensions Github Repo's
    
5. **Code to Image Converter** as all current API charge money we tried bypassing it by automation libraries like Playwright but bypassing the captcha also took the money. Later we created our own API using express, puppeteer etc..
    

# Upcoming Features

1. **Social Apps:-** To view WhatsApp, LinkedIn, Gmail, sms, etc.. from VS Code
    
2. **Hackathons:-** A list of hackathons web scraped from various platforms such as DevPost, HashNode, etc...
    
3. **Project Hunt:-** Get a list of projects with a step-by-step textual, video-guide to complete it with various tech stacks, get community rating, and much more...
    
4. **Course & Libraries:-** Get a list of free youtube playlists to be recommended and various time-saving libraries like `emoji-picker-react,` `react-email-templates`, `swiper.js`, `crisp`, `twak.js` etc...
    
5. **Import From Figma Link:-** Gets all assets, font family, colour, gradients, SVG, etc. and displays them in the vs code extension.
    
6. **Test Your API:-** Integrates a postman like environment for API testing
    
7. **RegEx:-** Create Regular Expressions inside VS Code itself
    
8. **Analyze, Monitor & Deploy:-** It gives a lighthouse report with SEO audit of your website, integrates GitHub to your extension and even gives deployment options with netlify, vercel and other free options
    

# Folder Structure:-

1. .vscode ---&gt; Settings for extension
    
2. Backend ---&gt; Contains Backend Code for getTechStack & getMultiMedia + font family
    
3. code2img ---&gt; Backend to convert code to image
    
4. icons ---&gt; Logo's for the extension
    
5. node\_modules ---&gt; packages
    
6. out ---&gt; TS to JS compiled files
    
7. snippets ---&gt; custom HTML tailwind DevUI snippets
    
8. src ---&gt; Source Code for displaying frontend
    
9. static ---&gt; All the html, css, js views
    

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1685717185523/35e900b0-6cc0-4d30-afa6-0aee6fc022d6.png align="center")

# Public Code Repo:-

GitHub Link:- [https://github.com/Srinivasan-Akash/Dev-Dash-Extension](https://github.com/Srinivasan-Akash/Dev-Dash-Extension)

# Project Demo Video

Youtube Link:- [https://youtu.be/DkH9HoVnMnA](https://youtu.be/DkH9HoVnMnA) **<mark>(Watch In 1.5X)</mark>**

# How To Run It In Your VS Code:-

### **STEP 1:- Clone The Repo,**

`git clone` [`https://github.com/Srinivasan-Akash/Dev-Dash-Extension.git`](https://github.com/Srinivasan-Akash/Dev-Dash-Extension.git)

### **STEP 2:- Download All Dependencies,**

`npm install` , `cd code2img` , `npm install`, `cd Backend` , `npm install`

### **STEP 2:- Add Your API Key,**

1. Go to Backend Folder ---&gt; routes ---&gt; getTechStack.js ---&gt; Ln no. 10 replace the value with your API key. Dummy Key is inserted.
    
2. Go to static Folder ---&gt; js Folder ---&gt; data-mocking.js ---&gt; Ln No. 5 ---&gt; Enter Your GPT API Key ***(NOTE:- You Need to enter credit card details at GPT website to get api key activated)***
    
3. Go to static Folder ---&gt; js Folder ---&gt; documentAPI.js ---&gt; Ln No. 12 ---&gt; Enter Your GPT API Key ***(NOTE:- You Need to enter credit card details at GPT website to get api key activated)***
    

### **STEP 3:- Run Backend Servers,**

Create a new terminal and run the following commands

`cd Backend`, `npm run start`

Create another new terminal and run the following commands

`cd code2img`, `npm run dev`

### **STEP 3:- Run Extension,**

1. Press the following Key Binding in VS Code:- `Ctrl + Shift + P`
    
2. Search for the following & click it:- `select and start debugging`
    
3. Click on the following:- `Launch Extension`
    
4. This Will Open A New VS CODE window where you can test it
    

***NOTE THAT THE STEPS CHANGE ACCORDING VS CODE VERSIONS AND OS***

People, We Got Help From app-write discord channel:-

1. @[Matej Bačo](@Meldiron) **:-** Helped Us in resolving `cors` error with app-write + vs code extension by linking our extension to app-write.
