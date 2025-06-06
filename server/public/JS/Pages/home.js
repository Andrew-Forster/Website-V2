if (window.hasOwnProperty("intervalId")) {
  clearInterval(window.intervalId);
  delete window.intervalId;
} else {
  start();
  console.log("Starting carousel");
  window.intervalId; // Interval for the carousel
  window.endFunctions = false;
}

async function start() {
  await waitForElm(".bottom-group");
  carousel();
  endFunctions = false;
  setYearsOfExperience();
}

function deleteInterval() {
    clearInterval(intervalId);
    delete intervalId;
}

// window.addEventListener("popstate", () => {
//   start();
// });

function checkHome() {
  if (
    window.location.pathname === "/home" ||
    window.location.pathname === "/"
  ) {
    return true;
  } else {
    return false;
  }
}

function setYearsOfExperience() {
  let date = new Date();
  let startMonth = 9;
  let startYear = 2023;
  let monthDiff = date.getMonth() + 1 - startMonth;
  let years = date.getFullYear() - startYear;
  if (monthDiff > 6) {
    years++;
  }
  document.getElementById("yearsOfExp").textContent = `${years}+`;
}

// Projects Carousel Slider

function carousel() {
  let cards = document.querySelectorAll(".project-card");
  let nav = document.querySelectorAll(".project-nav button");

  let interval = 5000; // Time to wait before moving to the next card
  let distance = 50; // Distance to move the card
  let updateTime = interval / distance; // Time to move 1px
  let index = 0; // Index of the current card

  function startCarousel() {
    let lastUpdateTime = Date.now(); // Timestamp of the last update
    update();

    // Start carousel
    intervalId = setInterval(() => {
      if (!checkHome() || endFunctions) {
        return;
      }
      let currentTime = Date.now();
      let elapsedTime = currentTime - lastUpdateTime;

      // Check if enough time has elapsed
      if (elapsedTime >= interval) {
        index++;
        if (index >= cards.length) {
          index = 0;
        }
        update();
        lastUpdateTime = currentTime; // Update last update time
      }
      moveTimer();
    }, updateTime);
  }

  // Moves the card Timer
  function moveTimer() {
    let currentTimer = document.querySelector(
      ".project-nav button.active span"
    );
    if (!checkHome() || endFunctions || !currentTimer) {
      return;
    }
    let width = parseInt(currentTimer.style.width) || 0;
    width = Math.max(width, 0);
    currentTimer.style.width = width + 1 + "px";
  }

  nav.forEach((button, i) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("active")) {
        return;
      }
      let act = false;
      cards.forEach((card) => {
        if (card.classList.contains("next")) {
          act = true;
        }
      });
      if (!act) {
        index = i;
        if (!checkHome() || endFunctions) {
          return;
        }
        clearInterval(intervalId);
        startCarousel();
        update();
      }
    });
  });

  function update() {
    let currentTimer = document.querySelector(
      ".project-nav button.active span"
    );
    if (!checkHome() || endFunctions || !currentTimer) {
      return;
    }
    nav.forEach((button) => {
      button.classList.remove("active");
    });
    nav[index].classList.add("active");

    currentTimer.style.width = "0px";

    cardMove(cards[index + 1]);
  }

  function cardMove(card) {
    if (!card) {
      card = cards[0];
    }
    card.classList.add("next");
    card.addEventListener(
      "animationend",
      () => {
        card.classList.add("active");
        card.classList.remove("next");
        cards.forEach((c) => {
          if (c !== card) c.classList.remove("active");
        });
      },
      {
        once: true,
      }
    );
  }

  startCarousel();
}