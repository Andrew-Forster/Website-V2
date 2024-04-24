const reg = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/;

start();
async function start() {
    await waitForElm('.copyright'); // Targets last element in the footer
    formFunction();
    pullNextPage();

    // If browser supports @property / background: paint(houdini)
    if ('paintWorklet' in CSS) {} else {
        console.error('Houdini Paint API (@property) is not supported. Read more here: https://developer.mozilla.org/en-US/docs/Web/CSS/@property#browser_compatibility');
        // if (!localStorage.getItem("propertyClicked")) {
        //     sendAlert("This browser does not support @property", "Read more here", "property", false, 1);
        // }
    }
}


function formFunction() {
    let elem = document.querySelectorAll("input, textarea");
    let validUser = false;

    elem.forEach((ele) => {
        ele.setAttribute("value", ele.value);
        ele.addEventListener("keyup", () => {
            ele.setAttribute("value", ele.value);
            validUser = true;
        });
        ele.addEventListener("focus", () => {
            ele.setAttribute("value", ele.value);
            validUser = true;
        });
        ele.addEventListener("focusout", () => {
            ele.setAttribute("value", ele.value);
            validUser = true;
        });
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
        } else if (!validUser) {
            formRes.style.opacity = 1;
            formRes.innerText = "Bot? Try refreshing the page.";
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
                        // Parse the error message from the response body
                        res.json().then((data) => {
                            formRes.style.opacity = 1;
                            formRes.innerText = data.error || "An error occurred. Please reach out via the email provided in the footer.";
                            formRes.style.color = "var(--error)";
                
                            console.log("Error: " + data.error);
                        }).catch((err) => {
                            console.error("Error parsing JSON response:", err);
                            formRes.style.opacity = 1;
                            formRes.innerText = "An error occurred. Please reach out via the email provided in the footer.";
                            formRes.style.color = "var(--error)";
                        });
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



// Pull to page

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
let gotoStrength = 25 // How hard you have to pull to go to the next page [Mobile]

function pullNextPage() {
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
            pullEle.style.bottom = "-4rem";
            pullPaths.forEach((path) => {
                path.style.strokeDashoffset = path.getAttribute("val");
            });
        }

        if ((main.getBoundingClientRect().bottom - window.innerHeight) <= 2 && window.location.pathname !== "/portfolio") {
            pullText.classList.add("show");
        } else {
            pullText.classList.remove("show");
        }
    }, 100);


    // Handle mobile Pull To Page

    document.addEventListener("touchstart", touchStart);
    document.addEventListener("touchmove", touchMove);
    document.addEventListener("touchend", touchEnd);

    let touchstartY = 0;

    function touchStart(e) {
        touchstartY = e.touches[0].clientY;
        pullingVal = 40;
    }

    function touchMove(e) {
        if ((main.getBoundingClientRect().bottom - window.innerHeight) <= 2 
        && window.location.pathname !== "/portfolio"
        && main.classList.contains("active")) {
            mobilePulling(e);
        }
    }

    function touchEnd(e) {
        pullingVal = 0;
        gotoVal = 0;
        pullEle.style.bottom = "-4rem";
        pullText.classList.remove("show");
        pullPaths.forEach((path) => {
            path.style.strokeDashoffset = path.getAttribute("val");
        });
    }

    function mobilePulling(e) {
        let touchY = e.touches[0].clientY;
        let touchDiff = touchY - touchstartY;
        // Pull up

        if (touchDiff < 0 && pullingVal < 100) {
            pullingVal += 30;
            pullEle.style.bottom = "2.5rem";
            pullPaths.forEach((path) => {
                path.style.strokeDashoffset = path.getAttribute("val") - (path.getAttribute("val") * (pullingVal / 100));
            });
        } else if (touchDiff < 0 && gotoVal < gotoStrength && (main.getBoundingClientRect().bottom - window.innerHeight) <= 2) {
            gotoVal += 1;

            if (gotoVal == gotoStrength) {
                pullEle.classList.add("bounce");
                pullText.style.opacity = 0;
                
                setTimeout(() => {
                    if (!pullEle) {
                        return;
                    }
                    gotoVal = 0;
                    pullingVal = 0;
                    document.removeEventListener("touchstart", touchStart);
                    document.removeEventListener("touchmove", touchMove);
                    document.removeEventListener("touchend", touchEnd);

                    nextPage(window.location.pathname);
                }, 400);
            }
        }
    }


    // Handle PC pulling

    function pull(e) {
        if (time + 30 > Date.now()) {
            return;
        }

        curPulling = true;
        time = Date.now();

        if ((main.getBoundingClientRect().bottom - window.innerHeight) <= 2 
        && window.location.pathname !== "/portfolio"
        && main.classList.contains("active")) {
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
            pullEle.style.bottom = "2.5rem";
        } else if (e.deltaY > 0 && gotoVal < gtStrength) {
            gotoVal += 1;

            if (gotoVal == gtStrength) {
                pullEle.classList.add("bounce");
                pullText.style.opacity = 0;
                
                setTimeout(() => {
                    if (!pullEle) {
                        return;
                    }
                    pullingVal = 0;
                    gotoVal = 0;
                    document.removeEventListener("wheel", pull);

                    console.log("Next Page");
                    nextPage(window.location.pathname);
                    
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
            // history.pushState({}, '', "/home");
            // location.reload();
            break;
        default:
            history.pushState({}, '', page);
            location.reload();
            break;
    }
}