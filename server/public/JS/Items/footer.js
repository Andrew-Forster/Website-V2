const reg = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/;

start();
async function start() {
    console.log("Footer started");
    await waitForElm('.copyright'); // Targets last element in the footer
    formFunction();
    pullNextPage();

    // If browser supports @property / background: paint(houdini)
    if ('paintWorklet' in CSS) {} else {
        console.error('Houdini Paint API (@property) is not supported. Read more here: https://developer.mozilla.org/en-US/docs/Web/CSS/@property#browser_compatibility');
        if (!localStorage.getItem("propertyClicked")) {
            sendAlert("This browser does not support @property", "Read more here", "property", false, 1);
        }
    }
}


function formFunction() {
    let elem = document.querySelectorAll("input, textarea");

    elem.forEach((ele) => {
        ele.setAttribute("value", ele.value);
        ele.addEventListener("keyup", () => {
            ele.setAttribute("value", ele.value);
        })
    });

    let submit = document.getElementById("submit");
    let email = document.getElementById("email");
    let message = document.getElementById("msg");

    let formRes = document.getElementById("formRes");

    submit.addEventListener("click", () => {
        if (email.value === "" || message.value === "") {
            formRes.style.opacity = 1;
            formRes.innerText = "Please fill all fields";
            formRes.style.color = "var(--error)";
        } else if (!validEmail(email.value)) {
            formRes.style.opacity = 1;
            formRes.innerText = "Please enter a valid email";
            formRes.style.color = "var(--error)";
        } else {
            let emailData = {
                email: email.value,
                message: message.value
            };

            fetch("/api/email/send", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(emailData)
                })
                .then((res) => {
                    if (res.ok) {
                        formSuccess();
                    } else {
                        formRes.style.opacity = 1;
                        formRes.innerText = "An error occurred. Please reach out via the email provided in the footer.";
                        formRes.style.color = "var(--error)";

                        console.log("Error: " + res);
                    }
                })
                .catch((err) => {
                    formRes.style.opacity = 1;
                    formRes.innerText = "An error occurred. Please reach out via the email provided in the footer.";
                    formRes.style.color = "var(--error)";
                    console.log(err);
                });

        }
    });


    function formSuccess() {
        formRes.style.opacity = 1;
        formRes.innerText = "Message sent! A confirmation will be sent to your inbox.";
        formRes.style.color = "var(--success)";
        email.value = "";
        message.value = "";

        let elem = document.querySelectorAll("input, textarea");

        elem.forEach((ele) => {
            ele.setAttribute("value", ele.value);
        });

        setTimeout(() => {
            formRes.style.opacity = 0;
        }, 5000);
    }
};


function validEmail(email) {
    return reg.test(email);
}



// Pull to next page

let nextInterval;

function pullReload() {
    clearInterval(nextInterval);
    pullingVal = 0;
    gotoVal = 0;
    pullNextPage();
}

let pullingVal = 0;
let gotoVal = 0;
let gtStrength = 6; // How hard you have to pull to go to the next page [PC]
let gotoStrength = 20; // How hard you have to pull to go to the next page [Mobile]

function pullNextPage() {
    let body = document.querySelector("body");
    let pullEle = document.getElementById("pullEle");
    let pullText = document.getElementById("pullText");
    let main = document.querySelector("main");
    let pullPaths = document.querySelectorAll("#pullEle path");
    let time = Date.now();
    let curPulling = false;


    nextInterval = setInterval(() => {
        if (curPulling && time + 600 < Date.now()) {
            curPulling = false;
            pullingVal = 0;
            gotoVal = 0;
            pullEle.style.transform = "translateY(0)";
            // pullText.style.transform = "translateY(0)";
            pullPaths.forEach((path) => {
                path.style.strokeDashoffset = path.getAttribute("val");
            });
        }

        if ((main.getBoundingClientRect().bottom - window.innerHeight) <= 2 && window.location.pathname !== "/portfolio") {
            let mediaQuery = window.matchMedia('(max-width: 800px)');
            if (mediaQuery.matches) {
                pullText.style.transform = "translateY(-" + (80) + "px)";
            } else {
                pullText.style.transform = "translateY(-" + (40) + "px)";
            }
        }
    }, 100);


    // Handle mobile pulling

    document.addEventListener("touchstart", touchStart);
    document.addEventListener("touchmove", touchMove);
    document.addEventListener("touchend", touchEnd);

    let touchstartY = 0;

    function touchStart(e) {
        touchstartY = e.touches[0].clientY;
        pullingVal = 40;
    }

    function touchMove(e) {
        if (window.location.pathname === "/portfolio") {
            return;
        }

        if ((main.getBoundingClientRect().bottom - window.innerHeight) <= 2) {
            mobilePulling(e);
        }

    }

    function touchEnd(e) {
        pullingVal = 0;
        gotoVal = 0;
        pullEle.style.transform = "translateY(0)";
        pullText.style.transform = "translateY(0)";
        pullPaths.forEach((path) => {
            path.style.strokeDashoffset = path.getAttribute("val");
        });
    }

    function mobilePulling(e) {
        console.log("pullingdt");
        let touchY = e.touches[0].clientY;
        let touchDiff = touchY - touchstartY;
        // Pull up

        if (touchDiff < 0 && pullingVal < 100) {
            pullingVal += 1;
            // pullText.style.transform = "translateY(-" + (50 + (pullingVal / 4)) + "px)";
            pullEle.style.transform = "translateY(-" + (60 + (pullingVal / 5)) + "px)";
            pullPaths.forEach((path) => {
                path.style.strokeDashoffset = path.getAttribute("val") - (path.getAttribute("val") * (pullingVal / 100));
            });
        } // Pull down
        else if (touchDiff > 0 && pullingVal > 40) {

            pullingVal -= 10;
            // pullText.style.transform = "translateY(-" + (0 + (pullingVal / 1.25)) + "px)";
            pullEle.style.transform = "translateY(-" + (0 + (pullingVal / 1.25)) + "px)";
            pullPaths.forEach((path) => {
                path.style.strokeDashoffset = path.getAttribute("val") - (path.getAttribute("val") * (pullingVal / 100));
            });
        } else if (touchDiff < 0 && gotoVal < gotoStrength && (main.getBoundingClientRect().bottom - window.innerHeight) <= 2) {
            gotoVal += 1;

            if (gotoVal == gotoStrength) {
                pullEle.classList.add("bounce");

                setTimeout(() => {
                    if (!pullEle) {
                        return;
                    }
                    document.removeEventListener("touchstart", touchStart);
                    document.removeEventListener("touchmove", touchMove);
                    document.removeEventListener("touchend", touchEnd);

                    nextPage(window.location.pathname);
                    pullingVal = 0;
                    gotoVal = 0;
                }, 400);
            }
        }
    }


    // Handle PC pulling

    function pull(e) {

        if (time + 30 > Date.now()) {
            return;
        }

        if (window.location.pathname === "/portfolio") {
            return;
        }
        curPulling = true;
        time = Date.now();
        if ((main.getBoundingClientRect().bottom - window.innerHeight) <= 2) {
            pulling(e);
        } else {
            pullingVal = 0;
        }

        pullPaths.forEach((path) => {
            path.style.strokeDashoffset = path.getAttribute("val") - (path.getAttribute("val") * (pullingVal / 100));
        });
    }

    document.addEventListener("wheel", pull);

    function pulling(e) {
        let pullEle = document.getElementById("pullEle");
        if (e.deltaY > 0 && pullingVal <= 75) { // Pulling down
            pullingVal += 25;
            // pullText.style.transform = "translateY(-" + (0 + (pullingVal / 1.25)) + "px)";
            pullEle.style.transform = "translateY(-" + (0 + (pullingVal / 1.25)) + "px)";
        } else if (e.deltaY > 0 && gotoVal < gtStrength) {
            gotoVal += 1;

            if (gotoVal == gtStrength) {
                pullEle.classList.add("bounce");

                setTimeout(() => {
                    if (!pullEle) {
                        return;
                    }
                    document.removeEventListener("wheel", pull);

                    nextPage(window.location.pathname);
                    pullingVal = 0;
                    gotoVal = 0;
                }, 400);
            }
        }
    }
}






function nextPage(page) {

    switch (page) {
        case "/home":
            history.pushState({}, '', "/about");
            contentReplace(about);
            break;
        case "/":
            history.pushState({}, '', "/about");
            contentReplace(about);
            break;
        case "/about":
            history.pushState({}, '', "/skills");
            contentReplace(skills);
            break;
        case "/skills":
            history.pushState({}, '', "/portfolio");
            contentReplace(portfolio);
            break;
        case "/portfolio":
            history.pushState({}, '', "/home");
            location.reload();
            break;
        default:
            history.pushState({}, '', page);
            location.reload();
            break;
    }
}