// Format
const portfolioFormat = {
  id: "",
  title: "",
  image: "",
  status: "",
  statusCode: "",
  stack: [""],
  sections: [
    // Example: { type: "header"|"bolded"|"paragraph"|"list"|"button"|"spacer"|"image"|"img-group"|"video", text: "", link: "", src: "", alt: "", class: "", style: "" }
  ],
  viewLink: "",
};

// Project Status Codes
// ---------------------------
// | c0 - Green            |
// | C1 - LightBlue        |
// | C2 - Blue             |
// | C3 - Red              |
// ---------------------------

const portfolioData = [
  // Writing Pilot
  {
    id: "writing-pilot",
    title: "Writing Pilot",
    image: "/Assets/Images/writing-pilot.png",
    status: "Under Active Development",
    statusCode: "c1",
    stack: [
      "JavaScript.svg",
      "NextJS.svg",
      "Shadcn.png",
      "TailwindCSS.svg",
      "MongoDB.svg",
      "Stripe.svg",
      "OpenAI-API.png",
    ],
    sections: [
      { type: "header", text: "Overview" },
      {
        type: "paragraph",
        text: "Writing Pilot is your writing co-pilot — a browser extension that brings AI-powered text completions directly into the flow of writing online. Whether you're writing an email, blog post, or a comment on Reddit, it helps you stay focused, fluid, and fast.",
      },
      { type: "header", text: "The Big Idea" },
      {
        type: "paragraph",
        text: "There’s something magical about writing when you’re in the zone. I wanted to build a tool that helps you *stay* in that zone — no tab-switching, no waiting, just helpful suggestions where you’re already typing.",
      },
      { type: "header", text: "Key Features" },
      {
        type: "list",
        text: [
          "🚨 Inline AI Suggestions: Suggestions appear greyed-out — hit Tab and go.",
          "🧩 Custom Output Length: Adjust how much the AI writes, site by site or globally.",
          "🌐 Site-Specific Rules: Want long paragraphs on Google Docs and short phrases on Twitter? Done.",
          "🔐 Global Toggle: Turn it off everywhere in one click if you need a break.",
          "✨ Premium Context Awareness: Extracts meaningful context from the page to make suggestions smarter.",
          "📦 Chrome Storage: All preferences saved locally for a lightweight, privacy-focused experience.",
        ],
      },
      { type: "header", text: "Technical Breakdown" },
      {
        type: "paragraph",
        text: "Writing Pilot is built as a Chrome extension powered by a custom backend in NextJS. I use content scripts to inject suggestions into active editable fields, with user settings stored via the Chrome Storage API. The writing magic itself comes from the OpenAI API.",
      },
      {
        type: "paragraph",
        text: "For premium features, I added context-aware completions. The extension grabs relevant page content, sends it to the backend, and gets back smarter suggestions. Think: 'write like you’ve been paying attention this whole time.'",
      },
      { type: "header", text: "The Website Experience" },
      {
        type: "paragraph",
        text: "The companion site lets users manage their plans, preferences, and usage. It’s built with NextJS, Tailwind, and Shadcn, with motion animations sprinkled in to keep things feeling smooth. I integrated Google Sign-In and Stripe for authentication and payments, and built a full admin dashboard to manage users, credits, and metrics.",
      },
      { type: "header", text: "What's Next" },
      {
        type: "list",
        text: [
          "📚 Built-in rewrite tools and tone shifting.",
          "📈 Usage analytics so users can see their AI habits.",
          "🧠 Smarter in-line controls for changing tone, length, or formality.",
          "💬 Integration with more platforms like Google Docs.",
        ],
      },
      { type: "header", text: "Conclusion" },
      {
        type: "paragraph",
        text: "Writing Pilot is still growing, but it already feels like one of those tools I wish I’d had years ago. It’s private, fast, and genuinely useful — and building it has been a blast. Can’t wait to see how far I can take it.",
      },
      { type: "spacer", text: "" },
      {
        type: "button",
        text: "Visit Website",
        link: "https://writingpilot.ai",
      },
      { type: "spacer", text: "" },
      { type: "spacer", text: "" },

    ],
    viewLink: "https://writingpilot.ai",
  },

  // Gloria Dei
  {
    id: "gloria-dei",
    title: "Gloria Dei Website",
    image: "/Assets/Images/GloriaDei.png", // Placeholder, update with actual path if needed
    status: "Completed",
    statusCode: "c0",
    stack: [
      "RockRMS.png",
      "HTML.svg",
      "CSS.svg",
      "JavaScript.svg",
      "Bootstrap.svg",
    ],
    sections: [
      { type: "header", text: "Overview" },
      {
        type: "paragraph",
        text: "While working at Triumph Tech, I was one of two main developers on the Gloria Dei Church website. Built on RockRMS, the project emphasized visual polish, consistent design, and backend integration with the RockRMS platform.",
      },
      { type: "header", text: "Objectives" },
      {
        type: "list",
        text: [
          "Build a modern, responsive church website using RockRMS.",
          "Follow a strict internal style guide covering layout, spacing, components, and typography.",
          "Reflect the church’s welcoming tone through smooth animations and thoughtful color usage.",
          "Connect front-end pages with editable content powered by RockRMS.",
        ],
      },
      { type: "header", text: "Challenges" },
      {
        type: "list",
        text: [
          "Implementing unique page layouts within the constraints of RockRMS.",
          "Maintaining pixel-perfect design across many custom-built components.",
          "Balancing animations with accessibility and performance.",
          "Working with RockRMS shortcodes and control gallery for advanced content.",
        ],
      },
      { type: "header", text: "Process and Highlights" },
      {
        type: "paragraph",
        text: "I worked closely with another developer to design and develop each page with an eye for detail. We used the GloriaDeiV1 theme style guide created by Triumph Tech, which included resources for typography, buttons, navs, components, and layout structures.",
      },
      {
        type: "paragraph",
        text: "We implemented Triumph Swiper for rich visual interaction, created reusable shortcodes, and adhered to modular component standards for future scalability. The design paid close attention to spacing, transitions, and consistency across devices.",
      },
      { type: "header", text: "Results" },
      {
        type: "paragraph",
        text: "The result was a highly polished, responsive website fully integrated with RockRMS. The church staff can manage content easily, and the site has been well received by both the team and the congregation.",
      },
      { type: "header", text: "Conclusion" },
      {
        type: "paragraph",
        text: "This project was a great example of combining backend integration with front-end finesse. It deepened my experience with CMS-based projects, strict design systems, and cross-developer collaboration.",
      },
      { type: "spacer", text: "" },
      { type: "button", text: "View Site", link: "https://gdlc.org" },
      { type: "spacer", text: "" },
      { type: "spacer", text: "" },
    ],
    viewLink: "https://gdlc.org",
  },
  // NextJS Blog
  {
    id: "nextjs-blog",
    title: "NextJS Blog",
    image: "/Assets/Images/blog.png",
    status: "Completed",
    statusCode: "c0",
    stack: [
      "NextJS.svg",
      "React.svg",
      "TailwindCSS.svg",
      "MaterialUI.svg",
      "MongoDB.svg",
      "Docker.svg",
      "Digital-Ocean.svg",
      "Node-Package-Manager.svg",
      "Github.svg",
    ],
    sections: [
      { type: "header", text: "Project Case Study" },
      {
        type: "paragraph",
        text: "The NextJS Blog is a personal project I developed alongside my wife, where we share updates about our lives. The blog utilizes NextJS, Tailwind, MUI, and MongoDB to create a dynamic platform for sharing content. Key features include an admin portal with Google OAuth integration for sign-in, an email notification system when a new post is published, and a dashboard for managing the blog posts stored in Markdown files.",
      },
      { type: "header", text: "Objectives" },
      {
        type: "paragraph",
        text: `<ul class='list'><li>Create an engaging, visually appealing blog platform for personal updates.</li><li>Integrate Google OAuth for secure sign-ins and user management.</li><li>Enable CRUD operations for blog posts stored as Markdown files.</li><li>Implement email notifications to inform users of new posts.</li><li>Ensure smooth hosting and deployment of the app.</li></ul>`,
      },
      { type: "header", text: "Challenges" },
      {
        type: "paragraph",
        text: `<ul class='list'><li>Integrating MUI with Tailwind CSS, which led to compatibility issues.</li><li>Initial hosting attempt on Azure using Docker Compose, which caused space and performance issues.</li><li>Managing the database in a way that ensured the app's functionality while optimizing the workflow.</li><li>Setting up a reliable, automated deployment process with GitHub Actions.</li></ul><br><hr><br>`,
      },
      { type: "header", text: "UI and Admin Portal" },
      {
        type: "paragraph",
        text: "The blog features a clean, user-friendly UI powered by Tailwind and MUI. The admin portal allows easy content management and includes user authentication via Google OAuth. The UI, though functional, will continue to be refined for better design and usability.",
      },
      { type: "header", text: "Database Management" },
      {
        type: "paragraph",
        text: "The blog posts are stored in Markdown files, and MongoDB was initially used as the database. However, looking back, a simpler SQLite solution might have been more suitable for the scale of this app.",
      },
      { type: "header", text: "Hosting and Deployment" },
      {
        type: "paragraph",
        text: "The original plan was to use Docker Compose on Azure, but I encountered several issues with space limitations and configuration errors. Switching to DigitalOcean solved these problems, where I opted for PM2 and systemctl to ensure the app and database stay running smoothly. I also streamlined the deployment process using GitHub Actions to pull changes directly into the VM.",
      },
      { type: "header", text: "Results" },
      {
        type: "paragraph",
        text: "The blog is live and fully functional, with an intuitive admin panel and email notifications working flawlessly. Despite some early challenges, the project has been successful in achieving the primary goal of sharing personal updates in an engaging way.",
      },
      { type: "header", text: "Future Plans" },
      {
        type: "paragraph",
        text: `<ul class='list'><li><strong>UI Enhancements:</strong> I plan to keep improving the UI for better responsiveness and aesthetics, addressing compatibility issues with MUI and Tailwind.</li><li><strong>Email Limit:</strong> Currently, only 150 emails can be sent a day. In the future, I plan to remove this limitation by integrating a more robust email service like SendGrid or Mailgun.</li><li><strong>Feature Expansion:</strong> Further features, such as a tracking system to see who clicks on the emails sent out, share buttons, etc.</li></ul>`,
      },
      { type: "header", text: "Conclusion" },
      {
        type: "paragraph",
        text: "The NextJS Blog project was a rewarding experience, overcoming several technical challenges to create a solid, functional platform. The project not only met our objectives but also provided valuable lessons in deployment, database management, and UI development. With plans for continued improvements, this blog will serve as a great personal and professional showcase.",
      },
    ],
    viewLink: "https://blog.andrewjf.com",
  },
  // Minesweeper
  {
    id: "minesweeper",
    title: "Minesweeper",
    image: "/Assets/Images/Minesweeper.png",
    status: "Completed",
    statusCode: "c0",
    stack: ["CSharp.svg", "Dot-Net-Core.svg", "Azure.svg"],
    sections: [
      { type: "header", text: "Minesweeper Site" },
      {
        type: "paragraph",
        text: "Used C# and ASP.NET to create a Minesweeper game. Used game logic from the win forms minesweeper.",
      },
      {
        type: "button",
        text: "Github (ASP.NET)",
        link: "https://github.com/Andrew-Forster/Minesweeper-Site",
      },
      { type: "spacer" },
      { type: "header", text: "Minesweeper Win-Forms" },
      {
        type: "paragraph",
        text: "Used C# and Win-Forms to create a Minesweeper game. View project overview below.",
      },
      {
        type: "button",
        text: "Github (WinForms)",
        link: "https://github.com/Andrew-Forster/Minesweeper-Game",
      },
    ],
    viewLink: "https://minesweeper-site.azurewebsites.net/",
  },
  // Server Rift
  {
    id: "alchemy-analytics",
    title: "Alchemy Analytics",
    image: "/Assets/Images/Project 1.png",
    status: "Completed",
    statusCode: "c0",
    stack: [
      "HTML.svg",
      "CSS.svg",
      "JavaScript.svg",
      "Node-Package-Manager.svg",
      "JQuery.svg",
      "Github.svg",
    ],
    sections: [
      { type: "header", text: "Project Overview" },
      {
        type: "paragraph",
        text: "Alchemy Analytics is a startup company that specializes in providing stock market indicators to traders and investors. I took on the challenge of creating a sleek and competitive website to showcase their products and facilitate online sales. The project involved designing and developing a modern website with a focus on user experience and seamless integration with the backend system, which was developed by my partner using Django/Python.",
      },
      { type: "header", text: "Objectives" },
      {
        type: "paragraph",
        text: `Create a visually appealing website that reflects the Alchemy Analytics brand. Implement a user-friendly interface to showcase and sell stock market indicators. Develop essential pages including the homepage, shop page, account page, and checkout page. Ensure seamless integration between the frontend and backend systems to provide a smooth user experience.`,
      },
      { type: "header", text: "Challenges" },
      {
        type: "paragraph",
        text: `Designing a sleek website design that stands out in a competitive market. Integrating the frontend with a Django/Python backend developed by a third-party. Implementing e-commerce functionality to enable online sales of stock market indicators. Ensuring compatibility and responsiveness across various devices and screen sizes.`,
      },
      { type: "header", text: "Website Design" },
      {
        type: "paragraph",
        text: "I created a visually stunning website with a clean and modern interface. I incorporated sleek design elements, high-quality imagery, and intuitive navigation to enhance the user experience.",
      },
      { type: "bolded", text: "E-commerce Functionality:" },
      {
        type: "paragraph",
        text: "I developed a dedicated shop page where users can browse and purchase stock market indicators. The shop page features detailed product listings, pricing information, and a streamlined checkout process.",
      },
      { type: "bolded", text: "Integration with Django Backend:" },
      {
        type: "paragraph",
        text: "I collaborated closely with my friend who developed the backend system using Django/Python. We implemented APIs and data exchange protocols to ensure seamless communication between the frontend and backend systems.",
      },
      { type: "bolded", text: "Responsive Design:" },
      {
        type: "paragraph",
        text: "To ensure a consistent user experience across devices, I employed responsive design techniques. The website is optimized for desktop, tablet, and mobile devices, providing users with a seamless browsing and shopping experience regardless of the device they use.",
      },

      { type: "header", text: "Results" },
      { type: "bolded", text: "Sleek and Competitive Website:" },
      {
        type: "paragraph",
        text: "The Alchemy Analytics website stands out in the market with its sleek design and intuitive interface.",
      },
      { type: "bolded", text: "Successful Integration:" },
      {
        type: "paragraph",
        text: "The seamless integration between the frontend and backend systems has ensured smooth operation and reliable performance of the website, contributing to its overall success.",
      },

      { type: "header", text: "Conclusion" },
      {
        type: "paragraph",
        text: "The Alchemy Analytics project has been a resounding success, delivering a sleek and competitive website that meets the client's objectives and exceeds user expectations. By leveraging modern design principles, advanced technology, and seamless integration with the backend system, I have positioned Alchemy Analytics for continued growth and success in the competitive market of stock market indicators.",
      },
    ],
    viewLink: "https://github.com/friesentyler/AlchemyAnalytics",
  },
  {
    id: "server-rift",
    title: "Server Rift",
    image: "/Assets/Images/Project 3.png",
    status: "Dropped",
    statusCode: "c3",
    stack: [
      "HTML.svg",
      "CSS.svg",
      "JavaScript.svg",
      "NodeJS.svg",
      "Node-Package-Manager.svg",
      "JQuery.svg",
      "Github.svg",
    ],
    sections: [
      { type: "header", text: "Project Overview" },
      {
        type: "paragraph",
        text: "Server Rift is an ambitious project aimed at revolutionizing the way users connect with Discord servers based on their preferences. The platform facilitates users in joining servers that align with their specific interests and requirements on a weekly basis. While the project is paused, significant strides have been made in developing the front-end interface, along with initial backend setup including a Discord bot, Express server, and MongoDB database integration.",
      },
      { type: "header", text: "Objectives" },
      {
        type: "paragraph",
        text: `<ul class='list'><li>Create a modern and visually appealing website that offers a seamless user experience.</li><li>Develop backend functionality to support user authentication, server discovery, and weekly server joining.</li><li>Implement a Discord bot to enhance user interaction and automate server joining processes.</li><li>Integrate MongoDB database to securely store user preferences and server data.</li></ul>`,
      },
      { type: "header", text: "Key Features" },
      { type: "bolded", text: "Customizable Server Preferences:" },
      {
        type: "paragraph",
        text: "Users can specify their preferences and interests to discover servers tailored to their liking. That will connect with our Discord bot.",
      },
      {
        type: "video",
        src: "/Assets/Videos/ServerRift_Login_DBUpdate.mp4",
        alt: "Login and DB Update Demo",
      },
      { type: "spacer" },
      { type: "bolded", text: "Giveaway System:" },
      {
        type: "paragraph",
        text: "Users are able to participate in giveaways and view the giveaway happening in real-time at a URL.",
      },
      {
        type: "video",
        src: "/Assets/Videos/ServerRift_Giveaways.mp4",
        alt: "Giveaway System Demo",
      },
      { type: "spacer" },
      { type: "bolded", text: "Server Joining:" },
      {
        type: "paragraph",
        text: "The platform facilitates users in joining servers that align with their specific interests.",
      },
      {
        type: "video",
        src: "/Assets/Videos/ServerRift_Adding_User.mp4",
        alt: "Server Joining Demo",
      },
      { type: "spacer" },
      { type: "bolded", text: "Discord Bot:" },
      {
        type: "paragraph",
        text: "The Discord bot is equipped with a help menu that pulls data from our Mongo database to display to users.",
      },
      {
        type: "video",
        src: "/Assets/Videos/ServerRift_Help_Menu.mp4",
        alt: "Bot Help Menu Demo",
      },
      { type: "spacer" },
      { type: "bolded", text: "User Friend Sign-up:" },
      {
        type: "paragraph",
        text: "Users are presented with a clean UI to quickly sign up and start using the platform.",
      },
      {
        type: "video",
        src: "/Assets/Videos/ServerRift_SignUp.mp4",
        alt: "Sign Up Demo",
      },
      { type: "spacer" },
      { type: "bolded", text: "Channel Logs:" },
      {
        type: "paragraph",
        text: "The bot itself will keep logs of all commands, errors and users being added to servers.",
      },
      {
        type: "img-group",
        images: [
          {
            src: "/Assets/Images/ServerRift_Join_Logs.png",
            alt: "Image of Join Logs",
          },
          {
            src: "/Assets/Images/ServerRift_Error_Logging.png",
            alt: "Image of Error Logging",
          },
        ],
      },
      { type: "spacer" },
      { type: "header", text: "Conclusion" },
      {
        type: "paragraph",
        text: "Server Rift represents an innovative approach to server discovery and joining, offering users a platform to connect with servers that match their preferences and interests seamlessly. With a focus on modern design aesthetics and user-centric functionality, the project aims to redefine the server browsing experience. As development progresses and additional features are implemented, Server Rift is poised to become a leading destination for users seeking personalized and dynamic server experiences.",
      },
    ],
    viewLink: "https://andrew-forster.github.io/",
  },
  {
    id: "scroll-animator",
    title: "Scroll Animator",
    image: "/Assets/Images/Project 4.jpg",
    status: "Paused",
    statusCode: "c3",
    stack: ["CSS.svg", "JavaScript.svg"],
    sections: [
      { type: "header", text: "Project Overview" },
      {
        type: "paragraph",
        text: "A JavaScript + CSS utility that animates elements on scroll.",
      },
      { type: "header", text: "Features" },
      {
        type: "paragraph",
        text: `<ul class='list'><li>Elements fade in at scroll breakpoints.</li><li>Animate multiple elements in sync.</li><li>Fine-tuned animation controls and freeze-on-scroll.</li><li>Support for dev-defined effects.</li></ul>`,
      },
      { type: "header", text: "Future Plans" },
      {
        type: "paragraph",
        text: `<ul class='list'><li><strong>Feature Expansion:</strong> New animation options and use cases.</li><li><strong>Optimization:</strong> Fix bugs and improve performance.</li><li><strong>Community Involvement:</strong> Open-source engagement and iteration.</li></ul>`,
      },
      { type: "header", text: "Conclusion" },
      {
        type: "paragraph",
        text: "Beginner project that helped build animation and code structuring skills.",
      },
    ],
    viewLink: "https://github.com/Scroll-Animator/sa/",
  },
  {
    id: "aboutme-v1",
    title: "About Me Website V1",
    image: "/Assets/Images/Project 2.png",
    status: "Completed",
    statusCode: "c0",
    stack: [
      "HTML.svg",
      "CSS.svg",
      "JavaScript.svg",
      "JQuery.svg",
      "Bootstrap.svg",
    ],
    sections: [
      { type: "header", text: "Project Overview" },
      {
        type: "paragraph",
        text: "A 6-page portfolio website made during a Web Design course.",
      },
      { type: "header", text: "Six-Page Structure" },
      {
        type: "paragraph",
        text: "Included homepage, about, contact, projects, etc.",
      },
      { type: "header", text: "Bootstrap Integration" },
      { type: "paragraph", text: "Used for a responsive page." },
      { type: "header", text: "Learning Experience" },
      {
        type: "paragraph",
        text: "Introduced web design principles and user interaction.",
      },
      { type: "header", text: "Conclusion" },
      {
        type: "paragraph",
        text: "Class project that helped kick off my interest in front-end development.",
      },
    ],
    viewLink: "https://v1.andrewjf.com/",
  },
  {
    id: "gtn-bot",
    title: "Discord GTN Bot",
    image: "/Assets/Images/gtn.png",
    status: "Completed",
    statusCode: "c0",
    stack: ["Discord-Bot-Designer.png"],
    sections: [
      { type: "header", text: "Project Overview" },
      {
        type: "paragraph",
        text: "Guess-the-number Discord bot made using a visual scripting language.",
      },
      { type: "header", text: "Initial Success" },
      {
        type: "paragraph",
        text: "Early positive feedback from Discord servers.",
      },
      { type: "header", text: "Discord Verification" },
      {
        type: "paragraph",
        text: "Reached 100+ servers and earned verification.",
      },
      { type: "header", text: "User Engagement" },
      { type: "paragraph", text: "Interactive game kept users engaged." },
      { type: "header", text: "Gateway to Coding" },
      {
        type: "paragraph",
        text: "First project that led me into programming.",
      },
      { type: "header", text: "Conclusion" },
      {
        type: "paragraph",
        text: "Beginner bot project that helped shape my early dev journey.",
      },
    ],
    viewLink: "https://sites.google.com/view/gtnbot",
  },
  {
    id: "minecraft-realms",
    title: "Minecraft Realms",
    image: "/Assets/Images/realms.jpg",
    status: "Dropped",
    statusCode: "c3",
    stack: [],
    sections: [
      { type: "header", text: "Project Overview" },
      {
        type: "paragraph",
        text: "Early exploration of coding via Minecraft command blocks and mcfunction files.",
      },
      { type: "header", text: "Experience" },
      {
        type: "paragraph",
        text: "Created Minecraft realm projects using in-game commands and function files to automate and create gameplay experiences.",
      },
      { type: "header", text: "Conclusion" },
      {
        type: "paragraph",
        text: "This was my original entry point into coding, from Minecraft creativity to real-world dev curiosity.",
      },
    ],
    viewLink: "https://github.com/Andrew-Forster/realm",
  },
];

// Attach to window for global access
window.portfolioData = portfolioData;
