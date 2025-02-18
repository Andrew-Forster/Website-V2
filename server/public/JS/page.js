// Elements

var content = document.querySelector("main");
var container = document.createElement("div");

window.onload = function () {
  manageNavigation(window.location.pathname);
};

window.addEventListener("popstate", () => {
  manageNavigation(window.location.pathname);
});

function manageNavigation(page) {
  switch (page) {
    case "/home":
      instantContentReplace(home);
      break;
    case "/about":
      contentReplace(about);
      break;
    // case "/skills":
    //   contentReplace(skills);
    //   break;
    case "/portfolio":
      contentReplace(portfolio);
      break;
    default:
      contentReplace(home);
      break;
  }
};


function instantContentReplace(page) {
  fetch(page)
    .then((response) => response.text())
    .then((data) => {
      content.appendChild(container);
      container.innerHTML = data;
      setBorderAnimationDelays(); // Set the border animation delays in utils.js

      // Find script tags
      let scripts = content.getElementsByTagName("script");

      // Iterate through each script tag and execute the JavaScript
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].classList.contains("executed")) {
          continue;
        }
        let script = scripts[i];
        let src = script.getAttribute("src");
        let placement = content.querySelector("div");

        if (src) {
          // If script has a src attribute, load the external JavaScript file
          fetch(src)
            .then((response) => response.text())
            .then((scriptContent) => {
              // Create a new function from the script content
              let stag = document.createElement("script");
              stag.classList.add("executed");
              stag.textContent = scriptContent;
              placement.appendChild(stag);
            })
            .catch((error) => {
              console.error("Error loading script:", error);
            });
        } else {
          // If script doesn't have a src attribute, execute its content directly
          // Create a new function from the script content
          let stag = document.createElement("script");
          stag.classList.add("executed");
          stag.textContent = script.textContent;
          placement.appendChild(stag);
        }
      }
    })
    .catch((error) => {
      // location.reload();
      console.error("Error loading content:", error);
    });

  content.classList.add("active");
}
let loadedScripts = []; // Array to store the loaded scripts

async function contentReplace(page) {
  content.classList.remove("active");
  content.classList.add("continueAnim");
  if (page == getLink("about")) {
    stopGlobe();
  }

  function handleAnimationEnd() {
    // Remove the event listener to prevent it from being triggered again
    content.removeEventListener("animationend", handleAnimationEnd);

    // Fetch the HTML content
    fetch(page)
      .then((response) => response.text())
      .then(async (data) => {
        const divElement = content.querySelector("div");

        if (divElement) {
          divElement.remove();
        } else {
          console.log("No <div> element found.");
        }
        content.appendChild(container);
        container.innerHTML = data;

        // Find script tags
        let scripts = content.getElementsByTagName("script");

        // Iterate through each script tag and execute the JavaScript
        for (let i = 0; i < scripts.length; i++) {
          if (scripts[i].classList.contains("executed")) {
            continue;
          }
          let script = scripts[i];
          let src = script.getAttribute("src");
          let placement = content.querySelector("div");

          if (src) {
            // If script has a src attribute, load the external JavaScript file
            fetch(src)
              .then((response) => response.text())
              .then((scriptContent) => {
                // Create a new function from the script content
                let stag = document.createElement("script");
                stag.classList.add("executed");
                stag.textContent = scriptContent;
                try {
                    placement.appendChild(stag);
                } catch {}
              })
              .catch((error) => {
                console.error("Error loading script:", error);
              });
          } else {
            // If script doesn't have a src attribute, execute its content directly
            // Create a new function from the script content
            let stag = document.createElement("script");
            stag.classList.add("executed");
            stag.textContent = script.textContent;
            try {
                placement.appendChild(stag);
            } catch {}
          }
        }
        awaitContentReplace(page);
      })
      .catch((error) => {
        location.reload();
        console.error("Error loading content:", error);
      });
  }

  // Add the event listener to trigger the function only once
  content.addEventListener("animationend", handleAnimationEnd);
}

async function awaitContentReplace(page) {
  content.classList.remove("continueAnim");
  scrollTo(0, 0);
  setTimeout(function () {
    content.classList.add("continue");
  }, 10);

  setTimeout(function () {
    pullReload();
    start(); // Run footer.js start function
    content.classList.remove("continue");
    content.classList.add("active");
    setBorderAnimationDelays(); // Set the border animation delays in utils.js
    if (page == getLink("about")) {
      startGlobe();
    }
  }, 1000);
}
