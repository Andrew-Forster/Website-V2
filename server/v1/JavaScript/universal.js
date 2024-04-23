// CST-120
// 10/22/23
// Milestone 5
// Resources:
// - https://alvarotrigo.com/blog/css-animations-scroll/


function reveal(classNames, elementVisible) {
    var elements = document.querySelectorAll(classNames.join(','));

    for (var i = 0; i < elements.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = elements[i].getBoundingClientRect().top;

        if (elementTop < windowHeight - elementVisible) {
            elements[i].classList.add("active");
        } else {
            elements[i].classList.remove("active");
        }
    }
}
// Add event listener to trigger reveal function on scroll
window.addEventListener("scroll", function () {
    reveal([".sa", ".sa-zoom", ".sa-flip", ".sa-right"], 250);
});


function hideUI() {
    $("#hideUI").hide
}
//-----------------
// FULL PAGE SCROLL
//-----------------


$(document).ready(function () {
    let sections, directoryObjects, currentSectionIndex;
    // Sections are the sections of the page
    // Directory Objects are the buttons on the side
    // Current Section Index is the current section of the page

    function init() {
        sections = document.querySelectorAll("section"); // Gets all sections
        directoryObjects = document.querySelectorAll(".gradientb"); // Gets main directory objects
        currentSectionIndex = 0; //Control Section Index - Changing this will change the section the page thinks its on, not meant ot be changed.

        activateSection(currentSectionIndex);

        directoryObjects.forEach((object, index) => { // Creates an event listener for each directory object
            object.addEventListener('click', () => handleDirectoryClick(index));
        });

        document.addEventListener("wheel", handleScroll, {
            passive: false
        });
        document.addEventListener("keydown", handleArrowKeys);

        checkScrollPosition();
    }

    // Scrolls to the section when called uses index to determine which section to scroll to
    function scrollToSection(index) {
        sections[index].scrollIntoView({
            behavior: "smooth"
        });
        setTimeout(() => {
            activateSection(index); //Delays the activation of the section to make sure directory buttons are in sync and doesn't flicker.
        }, 300);
    }

    function activateSection(index) {
        directoryObjects.forEach(object => object.classList.remove('active'));
        directoryObjects[index].classList.add('active');
    }

    function handleDirectoryClick(index) {
        scrollToSection(index);
        currentSectionIndex = index;
    }

    let isScrolling = false;

    function handleScroll(event) {
        event.preventDefault();

        if (!isScrolling) {
            isScrolling = true;

            const delta = event.deltaY;

            if (delta > 0 && currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
            } else if (delta < 0 && currentSectionIndex > 0) {
                currentSectionIndex--;
            }

            scrollToSection(currentSectionIndex);

            setTimeout(() => {
                isScrolling = false;
            }, 1000); // Adjust the delay time (in milliseconds) as needed
        }
    }

    function handleArrowKeys(event) {
        if (event.key === "ArrowUp" && currentSectionIndex > 0) {
            currentSectionIndex--;
            event.preventDefault();

        } else if (event.key === "ArrowDown" && currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            event.preventDefault();

        }

        scrollToSection(currentSectionIndex);
    }

    function checkScrollPosition() {
        const scrollPosition = window.scrollY;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSectionIndex = index;
            }
        });

        activateSection(currentSectionIndex);
    }

    init();


    document.addEventListener("touchstart", handleTouchStart, {
        passive: false
    });

    function handleTouchStart(event) {
        touchStartY = event.touches[0].clientY;
        isSwiping = true;

        const targetElement = event.target;
        const isClickable = isElementClickable(targetElement);

        if (!isClickable) {
            event.preventDefault();
        }
    }

    function isElementClickable(element) {
        while (element) {
            if (element.id === 'button') {
                console.log("Element with ID 'button' found");
                return true;
            }

            if (element.tagName === 'A' || element.onclick !== null) {
                return true;
            }
            element = element.parentElement;
        }
        return false;
    }

    document.addEventListener("touchmove", handleTouchMove, {
        passive: false
    });

    function handleTouchMove(event) {
        if (!isSwiping) return;

        const touchEndY = event.touches[0].clientY;
        const deltaY = touchEndY - touchStartY;

        const swipeThreshold = 50;

        if (deltaY > swipeThreshold && currentSectionIndex > 0) {
            currentSectionIndex--;
            isSwiping = false;
        } else if (deltaY < -swipeThreshold && currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            isSwiping = false;
        }

        scrollToSection(currentSectionIndex);
        setTimeout(() => {
            activateSection(currentSectionIndex);
        }, 300);

        event.preventDefault();
    }

    document.addEventListener("touchend", handleTouchEnd);

    function handleTouchEnd() {
        isSwiping = false;
    }
});

//------------------------
// END OF FULL PAGE SCROLL
//------------------------


// TYPEWRITER EFFECT

// TODO 1: Add a tooltip on scroll telling the user they can use arrow keys to scroll
// TODO 2: Fix glitch when scrolling with track-pad
// TODO 3: Fix glitch when leaving page and coming back messing up code.

$(document).ready(function () {
    typeWriter();
});


// *VARIABLES
let i = 0;
let timesExecuted = 0;
let tw1 = " Software Developer";
let tw2 = " Web Designer";
let tw3 = " Learn more below";
let speed = 50; // Speed in ms
let rspeed = 25; // Speed in ms
let turn = tw1;


function typeWriter() {
    if (timesExecuted === 0) {
        turn = tw1;
    } else if (timesExecuted === 1) {
        turn = tw2;
    } else if (timesExecuted === 2) {
        turn = tw3;
    } else if (timesExecuted >= 3) {
        turn = tw1;
        timesExecuted = 0;
    }
    twAddFunc();
}
// Makes it so the turn variable is changed based on the timesExecuted variable

function twAddFunc() {
    twAdd();

    function twAdd() {
        if (i < turn.length) {
            document.getElementById("twtext").innerHTML += turn.charAt(i);
            i++; //Gets length of the string and if I is less than the turn it will add a the next character of I.
            setTimeout(twAdd, speed); // Sets delay between each character
        }
    }

    setTimeout(twRemoveFunc, 3000);
}

function twRemoveFunc() {
    twRemove();

    function twRemove() {
        if (i > 0) {
            // Use substr to remove the last character
            document.getElementById("twtext").innerHTML = turn.substr(0, i - 1);
            i--;
            setTimeout(twRemove, rspeed);
        } else {
            timesExecuted++;
            setTimeout(typeWriter, 1000);
        }
    }
}

// Initial call to start the typewriter effect