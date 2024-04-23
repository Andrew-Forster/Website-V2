sideStart();
async function sideStart() {
    await waitForElm('.nav-bg'); // Targets last element in the sidebar

    // Run functions here
    btnFunctions();
    navStart();
}

function btnFunctions() {
    let btns = document.querySelectorAll("nav button");
    let main = document.querySelector("main");

    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (main.classList.contains("continueAnim")) {
                toggleNav();
                return;
            }

            let page = btn.getAttribute("data-page");
            if (page == "contact") {
                return;
            }
            contentReplace(getLink(page));

            if ("/" + page == "/home") {
                history.pushState({}, '', page);
                location.reload();
            } else {
                history.pushState({}, '', page);
                toggleNav();
            }
        })
    });
}


let navIcon = document.getElementById('nav-icon');
let nav = document.getElementById('nav');

function toggleNav() {
    navIcon.classList.toggle('open');
    nav.classList.toggle('open');
    nav.attributes['aria-expanded'].value = nav.classList.contains('open');
}

function navStart() {


    // Set aria-expanded attribute based on window width
    if (window.innerWidth >= 1170) {
        nav.attributes['aria-expanded'].value = true;
    } else {
        nav.attributes['aria-expanded'].value = false;
    }

    navIcon.addEventListener('click', () => {
        toggleNav();
    });


    window.addEventListener("scroll", () => {
        if (nav.classList.contains('open')) {
            toggleNav();
        }
    });

    window.addEventListener('resize', () => {
        if (nav.classList.contains('open')) {
            toggleNav();
        }
        if (window.innerWidth >= 1170) {
            nav.attributes['aria-expanded'].value = true;
        } else {
            nav.attributes['aria-expanded'].value = false;
        }
    });

    window.addEventListener('keydown', (event) => {
        if (nav.classList.contains('open') && event.key === 'Escape') {
            toggleNav();
        }
    });


};