sideStart();
async function sideStart() {
  await waitForElm(".nav-bg"); // Targets last element in the sidebar

  // Run functions here
  btnFunctions();
  navStart();
}

function btnFunctions() {
  let btns = document.querySelectorAll("aside button");
  let main = document.querySelector("main");
  let cooldown = false;

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.documentElement.style.overflow = "auto";
      
      if (main.classList.contains("continueAnim")) {
        // toggleNav();
        return;
      }

      if (cooldown === true) {
        return;
      }

      let page = btn.getAttribute("data-page");
      if (page == "connect") {
        return;
      }
      if (page == "home") {
        try {
            clearInterval(intervalId);
        } catch {}
      }

      if (btn.parentElement.parentElement.parentElement.id === "nav") {
        toggleNav();
      }
      
      contentReplace(getLink(page));

      history.pushState({}, "", page);
      // toggleNav();
      cooldown = true;
      setTimeout(() => {
        cooldown = false;
      }, 2500)

    });
  });
}

let navIcon = document.getElementById("nav-icon");
let nav = document.getElementById("nav");

function toggleNav() {
  navIcon.classList.toggle("open");
  nav.classList.toggle("open");
  nav.attributes["aria-expanded"].value = nav.classList.contains("open");
}

function navStart() {
  // Set aria-expanded attribute based on window width
  if (window.innerWidth >= 1170) {
    nav.attributes["aria-expanded"].value = true;
  } else {
    nav.attributes["aria-expanded"].value = false;
  }

  navIcon.addEventListener("click", () => {
    toggleNav();
  });

  window.addEventListener("scroll", () => {
    if (nav.classList.contains("open")) {
      toggleNav();
    }
  });

  window.addEventListener("resize", () => {
    if (nav.classList.contains("open")) {
      toggleNav();
    }
    if (window.innerWidth >= 1170) {
      nav.attributes["aria-expanded"].value = true;
    } else {
      nav.attributes["aria-expanded"].value = false;
    }
  });

  window.addEventListener("keydown", (event) => {
    if (nav.classList.contains("open") && event.key === "Escape") {
      toggleNav();
    }
  });
}
