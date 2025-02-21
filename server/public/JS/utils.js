
// Paths
const home = "/HTML/Pages/home.html";
const about = "/HTML/Pages/about.html";
const skills = "/HTML/Pages/skills.html";
const portfolio = "/HTML/Pages/portfolio.html";


document.addEventListener("DOMContentLoaded", async () => {
    await waitForElm(".footer");
    transitionImages();

    if (window.location.pathname.includes(".html")) {
      window.location.pathname = "/";
    }
});

// Transition Images
function transitionImages() {
  const images = document.querySelectorAll(".pre-render");
  images.forEach((image) => {
    if (image.complete) {
      image.parentElement.classList.add("loaded");
    } else {
      image.addEventListener("load", () => {
        image.parentElement.classList.add("loaded");
      });
    }
  });
}

// Mutation Observer

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    if (!document.body) {
      console.error("document.body is not available!");
      return;
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

// Replace content
function replace(page, placeholder) {
  fetch(page)
    .then((response) => response.text())
    .then((data) => {
      placeholder.innerHTML = data;
      // Find script tags
      let scripts = placeholder.getElementsByTagName("script");

      // Iterate through each script tag and execute the JavaScript
      for (let i = 0; i < scripts.length; i++) {
        let script = scripts[i];
        let src = script.getAttribute("src");

        if (src) {
          // If script has a src attribute, load the external JavaScript file
          fetch(src)
            .then((response) => response.text())
            .then((scriptContent) => {
              // Create a new function from the script content
              const scriptFunction = new Function(scriptContent);
              // Execute the script content
              scriptFunction();
            })
            .catch((error) => {
              console.error("Error loading script:", error);
            });
        } else {
          // If script doesn't have a src attribute, execute its content directly
          // Create a new function from the script content
          const scriptFunction = new Function(script.textContent);
          // Execute the script content
          scriptFunction();
        }
      }
    })
    .catch((error) => {
      location.reload();
      console.error("Error loading content:", error);
    });
}

// Set Border Animation Delays

function setBorderAnimationDelays() {
  const borders = document.querySelectorAll(".anim");

  borders.forEach((border) => {
    let delay = Math.random() * 1.5;
    border.style.animationDelay = `${delay}s`;

    // setTimeout(() => {
    //     var hoverMediaQuery = window.matchMedia('(hover: none)');
    //     if (hoverMediaQuery.matches) {
    //         border.style.opacity = 1;
    //     }
    // }, delay * 1000);
  });
}

// Load Content Button Function

function loadContent(page) {
  contentReplace(getLink(page));

  if ("/" + page == "/home") {
    history.pushState({}, "", page);
    location.reload();
  } else {
    history.pushState({}, "", page);
  }
}

function getLink(page) {
  switch (page) {
    case "home":
      return home;
    case "about":
      return about;
    case "skills":
      return skills;
    case "portfolio":
      return portfolio;
    default:
      return home;
  }
}

// Alert Function

// Syntax:
// sendAlert("Alert Header", "Button Text", "Action", "Permanent", "Delay");

// Example:
// sendAlert("Theme Changed", "Close", "theme", false, 0);

async function sendAlert(head, btn, action, perm, delay) {
  var alertPop = await waitForElm(".alert");
  var alertHead = await waitForElm(".alert .cont .h8");
  var alertBtn = await waitForElm(".alert .cont button");
  // var alertBtn = await waitForElm(".alert button");

  alertHead.innerText = `${head}`;
  alertBtn.innerText = `${btn}`;

  // Set the delay
  if (!isNaN(parseInt(delay))) {
    alertPop.style.animationDelay = `${delay}s`;
  }

  // Set the alert type
  if (perm == true) {
    alertPop.classList.add("perm");
  } else {
    alertPop.classList.add("active");
  }

  alertBtn.addEventListener("click", function () {
    switch (action) {
      // Actions go here
      case "theme":
        for (let j = 0; j < themeChildren.length; j++) {
          themeChildren[j].classList.remove("active");
        }
        darkTheme();
        navShowHide();
        alertPop.classList.remove("active");
        localStorage.setItem("theme", "themeNeonDark");
        break;
      case "property":
        // Redirect to MDN
        // Used in footer.js
        window.open(
          "https://developer.mozilla.org/en-US/docs/Web/CSS/@property#browser_compatibility" +
            head,
          "_blank"
        );
        localStorage.setItem("propertyClicked", true);
        break;
      case "close":
        break;
      default:
        break;
    }
    alertPop.classList.remove("active");
    alertPop.classList.remove("perm");
  });
}
