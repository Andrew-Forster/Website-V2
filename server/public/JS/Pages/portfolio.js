runProjects();
async function runProjects() {
  await waitForElm(".project");

  // Run functions here
  projects();
  tooltip();
}

function projects() {
  let projects = document.querySelectorAll(".project");
  let banners = document.querySelectorAll(".banner");

  projects.forEach((project) => {
    project.addEventListener("click", () => {
      if (!project.classList.contains("active")) {
        toggleProject(project);
      }
    });
  });

  banners.forEach((banner) => {
    banner.addEventListener("scroll", () => {
      if (banner.scrollTop > 0) {
        banner.classList.add("scrolled");
      } else {
        banner.classList.remove("scrolled");
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("close-project") ||
      e.target.classList.contains("project-cover")
    ) {
      projectClose(projects);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      projectClose(projects);
    }
  });

  // document.addEventListener("scroll", () => {
  //   if (window.innerWidth < 800) {
  //     projectClose(projects);
  //   }
  // });

  // window.addEventListener("resize", () => {
  //   projectClose(projects);
  // });
}

function toggleProject(project) {
  let closeProject = document.querySelector(".close-project");
  let projectCover = document.querySelector(".project-cover");
  let button = project.querySelector(".main-btn button");

  project.classList.toggle("active");
  closeProject.classList.toggle("active");
  projectCover.classList.toggle("active");

  // Get html data
  let btnText = button.getAttribute("data-changes-to") || "Link";
  button.innerText = project.classList.contains("active") ? btnText : "View";
}

function projectClose(projects) {
  projects.forEach((project) => {
    if (project.classList.contains("active")) {
      toggleProject(project);
    }
  });
}

function tooltip() {
  const images = document.querySelectorAll(".stack .i");
  const tooltip = document.createElement("div");
  document.body.appendChild(tooltip);
  tooltip.classList.add("tooltip");

  images.forEach((img) => {
    function showTooltip() {
        tooltip.textContent = img.alt;
        tooltip.style.opacity = 1;
  
        const rect = img.getBoundingClientRect();
        tooltip.style.top = `${rect.top + window.scrollY - 30}px`;
        tooltip.style.left = `${rect.left + window.scrollX}px`;
      }

    img.addEventListener("mouseenter", () => {
      showTooltip();
    });

    img.addEventListener("touchstart", () => {
      showTooltip();
    });

    img.addEventListener("touchmove", () => {
      tooltip.style.opacity = 1;
    });

    img.addEventListener("touchend", () => {
      tooltip.style.opacity = 0;
    });

    img.addEventListener("mouseleave", () => {
      tooltip.style.opacity = 0;
    });
  });
}
