/*Andrew Forster
CST-120
10/22/23
Milestone 5
Resources:
- Jquery cross-file HTML, https://stackoverflow.com/questions/31954089/how-can-i-reuse-a-navigation-bar-on-multiple-pages
- For Transition Hamburger ICON, https://codepen.io/designcouch/pen/ExvwPY */

// For about page

let edu1 = 0 

function Education1() {
    if (edu1 === 0) {
        edu1 = 1
        $('.eblock1').removeClass('closed');
        $('.eblock1').addClass('open');
        $('.eblock1 .fa-caret-down').addClass('fa-rotate-180');

    } else {
        edu1 = 0
        $('.eblock1').addClass('closed');
        $('.eblock1').removeClass('open');
        $('.eblock1 .fa-caret-down').removeClass('fa-rotate-180');
    }
}

let edu2 = 0

function Education2() {
    if (edu2 === 0) {
        edu2 = 1
        $('.eblock2').removeClass('closed');
        $('.eblock2').addClass('open');
        $('.eblock2 .fa-caret-down').addClass('fa-rotate-180');

    } else {
        edu2 = 0
        $('.eblock2').removeClass('open');
        $('.eblock2').addClass('closed');
        $('.eblock2 .fa-caret-down').removeClass('fa-rotate-180');

    }
}
function switchElements() {
    // Check if the viewport height is below 400 pixels
    if (window.matchMedia("(max-width: 549px)").matches) {
        // Get references to the elements
        var skillsSection = document.querySelector('.skills');
        var aboutSection = document.querySelector('.about');

        // Check if the elements are found
        if (skillsSection && aboutSection) {
            // Get the common parent element
            var parentElement = skillsSection.closest('.aboutsec');

            // Check if the common parent is found
            if (parentElement) {
                // Move skillsSection just under aboutSection
                aboutSection.insertAdjacentElement('afterend', skillsSection);
            }
        }
    }
}


