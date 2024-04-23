const sections = document.querySelectorAll(".source-content");
const directoryLinks = document.querySelectorAll(".directory a");
const sourceMain = document.querySelector(".source-main");

function scrollToSection(index) {
    sections[index].scrollIntoView({
        behavior: "smooth"
    });
    setTimeout(() => {
        activateSection(index);
    }, 300);
}

function activateSection(index) {
    directoryLinks.forEach(link => link.classList.remove("active"));
    directoryLinks[index].classList.add("active");
}
 
// Listen for scroll events
window.addEventListener("scroll", checkScrollPosition);

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2
    );
}

function checkScrollPosition() {
    sections.forEach((section, index) => {
        if (isElementInViewport(section)) {
            activateSection(index);
        }
    });
}

// Example: Scroll to a section when a corresponding anchor is clicked
function handleDirectoryClick(index) {
    scrollToSection(index);
}

let source = 0;
const code = document.querySelectorAll("code");
let showCode = document.getElementById("showcode");
let clickHandler;

function viewCode(index) {
    if (source == 0) {
        let changeCode = code[index - 1].outerHTML;


        showCode.classList.add("active")
        showCode.innerHTML = changeCode
        showCode.querySelector("code").classList.add("active")

        document.getElementById("coverscreen").classList.add("blur")
        document.getElementById("directory").classList.add("blur")
        document.getElementById("mainnavbar").classList.add("blur")
        document.getElementById("scc").classList.add("blur")
        document.getElementById("scce").classList.add("blur")
        document.getElementById("sccbuttons").classList.add("active")
        source = 1;
        setTimeout(() => {
            window.addEventListener("click", clickHandler);
            window.addEventListener("scroll", codeOff);
            document.addEventListener("keydown", handleEscKey);
        }, 500);
        clickHandler = function (event) {
            // Check if the clicked element or any of its ancestors is the showcode element
            if (!event.target.closest("#showcode") && !event.target.closest("#scc")) {
                // Clicked outside both showcode and scc, trigger codeOff
                codeOff();
            }
        };

    }
}

function handleEscKey(event) {
    if (event.key == "Escape") {
        codeOff();
    }
}

function codeOff() {
    if (source == 1) {
        document.getElementById("coverscreen").classList.remove("blur")
        document.getElementById("directory").classList.remove("blur")
        document.getElementById("mainnavbar").classList.remove("blur")
        document.getElementById("scc").classList.remove("blur")
        document.getElementById("scce").classList.remove("blur")
        document.getElementById("sccbuttons").classList.remove("active")

        showCode.classList.remove("active")
        showCode.querySelector("code").classList.remove("active")
        showCode.innerHTML = ""

        showCode.classList.remove("active")
        source = 0;
        window.removeEventListener("click", clickHandler);
        window.removeEventListener("scroll", codeOff);
        document.removeEventListener("keydown", handleEscKey);

    }
};

// Copy function https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
let copyPopUp = 0;
function scc() {

    document.getElementById("sccpopup").classList.add("clicked")
    setTimeout(() => {
        document.getElementById("sccpopup").classList.remove("clicked")
    }, 2500);

    // Get the text field
    var copyText = document.getElementById("showcode").innerText;
    console.log(copyText)

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText)
        .catch(err => {
            // Handle errors if any
            console.error('Unable to copy text', err);
        });
}