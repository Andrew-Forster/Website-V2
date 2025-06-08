// Dynamically renders portfolio cards from portfolio.json into #portfolio-cards

function renderPortfolio() {
  const container = document.getElementById("portfolio-cards");
  if (!container) return;

  if (!Array.isArray(window.portfolioData)) {
    container.innerHTML = '<p style="color:red">No project data found.</p>';
    return;
  }

  container.innerHTML = window.portfolioData
    .map((project) => renderProjectCard(project))
    .join("\n");
}

function renderProjectCard(project) {
  // Stack icons
  const stackIcons = (project.stack || [])
    .map(
      (stack) =>
        `<img class="i i-2" src="/Assets/Stack/${stack}" alt="${getIconVisibleName(stack)}">`
    )
    .join("");

  // Render flexible sections array (header, paragraph, button, spacer, image, video)
  function renderSection(section) {
    switch (section.type) {
      case "header":
        return `<div class="h7${section.class ? " " + section.class : ""}"${
          section.style ? ` style=\"${section.style}\"` : ""
        }>${section.text}</div><br>`;
      case "bolded":
        return `<div class="h9${section.class ? " " + section.class : ""}"${
          section.style ? ` style=\"${section.style}\"` : ""
        }>${section.text}</div>`;
      case "paragraph":
        return `<div${section.class ? ` class=\"${section.class}\"` : ""}${
          section.style ? ` style=\"${section.style}\"` : ""
        }>${section.text}</div><br>`;
      case "list":
        return `<ul${section.class ? ` class=\"list ${section.class}\"` : " class='list'"}${
          section.style ? ` style=\"${section.style}\"` : ""
        }>
        ${section.text.map((item) => `<li>${item}</li>`).join("")}
        </ul><br>`;
      case "button":
        return `<a class="btn${
          section.class ? " " + section.class : ""
        }" href="${section.link}" target="_blank"${
          section.style ? ` style=\"${section.style}\"` : ""
        }><button>${section.text}</button></a><br>`;
      case "spacer":
        return `<br>`;
      case "image":
        return `<img src="${section.src}" alt="${section.alt || ""}"${
          section.class ? ` class=\"${section.class}\"` : ""
        }${section.style ? ` style=\"${section.style}\"` : ""}/><br>`;
      case "img-group":
        return `<div class="flex-img">
                ${section.images
                  .map(
                    (img) =>
                      `<img src="${img.src}" alt="${img.alt || ""}"${
                        img.class ? ` class=\"${img.class}\"` : ""
                      }${img.style ? ` style=\"${img.style}\"` : ""}/>`
                  )
                  .join("")}
                </div>`;
      case "video":
        return `<video controls${
          section.class ? ` class=\"${section.class}\"` : ""
        }${section.style ? ` style=\"${section.style}\"` : ""}><source src="${
          section.src
        }" type="${
          section.videoType || "video/mp4"
        }">Your browser does not support the video tag.</video><br>`;
      default:
        return "";
    }
  }
  const summaryHtml = (project.sections || []).map(renderSection).join("");
  // Buttons (extra links)
  const buttons =
    Array.isArray(project.buttons) && project.buttons.length
      ? `<div class="extra-btns">${project.buttons
          .map(
            (btn) =>
              `<a class="btn${btn.class ? " " + btn.class : ""}" href="${
                btn.link
              }" target="_blank"><button>${btn.text}</button></a>`
          )
          .join("")}</div>`
      : "";

  return `
    <div class="keep-pos">
        <div class="card-g project">
            <div class="anim btn"></div>
            <img src="${project.image}" alt="${project.title}" draggable="false" height="220">
            <div class="banner">
                <h6>${project.title}</h6>
                <div class="${project.statusCode} project-tag">${project.status}</div>
                <div class="stack">${stackIcons}</div>
                <div class="summary"><br>
                    ${summaryHtml}
                    ${buttons}
                </div>
                <a class="main-btn" href="${project.viewLink}" target="_blank"><button>View</button></a>
            </div>
        </div>
    </div>`;
}


function getIconVisibleName(icon) {
    const iconVisibleName = icon.replace(/-/g, " ").replace(".svg", "").replace(".png", "").toLowerCase();
    console.log(iconVisibleName);
    switch (iconVisibleName) {
        case "html":
            return "HTML";
        case "css":
            return "CSS";
        case "javascript":
            return "JavaScript";
        case "react":
            return "React";
        case "nextjs":
            return "NextJS";
        case "tailwind":
            return "Tailwind";
        case "nodejs":
            return "NodeJS";
        case "spring-boot":
            return "Spring Boot";
        case "stripe":
            return "Stripe";
        case "mongodb":
            return "MongoDB";
        case "github":
            return "Github";
        case "bootstrap":
            return "Bootstrap";
        case "shadcn":
            return "Shadcn";
        case "rockrms":
            return "RockRMS";
        case "openai":
            return "OpenAI API";
        case "npm":
            return "Node Package Manager";
        case "dot net core":
            return "ASP.NET Core";
        case "csharp":
            return "C#";
        case "discord bot designer":
            return "Discord Bot Designer";
        default:
            return iconVisibleName.charAt(0).toUpperCase() + iconVisibleName.slice(1);
    }
}
