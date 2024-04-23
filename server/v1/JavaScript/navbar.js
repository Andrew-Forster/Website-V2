

var currentPage = window.location.pathname;

// Update the active link based on the current page
function setActiveLink() {
    // // Remove the 'active' class from all links initially
    // $('.sidenavbar a').removeClass('active');

    // // Add the 'active' class to the link corresponding to the current page
    // $('.sidenavbar a').filter(function() {
    //     return $(this).attr('href') === currentPage;
    // }).addClass('active');

    document.getElementById("pagename").innerText = document.title;
}

// Call the function to set the active link when the page loads
$(document).ready(function() {
    setActiveLink();
});

 





// Animation pop away

if (document.getElementById("pagename").innerText !== "Home" && document.getElementById("pagename").innerText !== "Source Code") {

window.addEventListener("scroll", popAway);

}
function popAway() {
    if (window.scrollY > 0) {
        document.getElementById("pagename").style.translate = "0 -100px";
        document.getElementById("pagename").style.opacity = "0";
        document.getElementById("logo").style.translate = "0 -100px";
        document.getElementById("logo").style.opacity = "0";
    } else if (window.scrollY == 0){
        document.getElementById("pagename").style.translate = "0 0px";
        document.getElementById("pagename").style.opacity = "1";
        document.getElementById("logo").style.translate = "0 0px";
        document.getElementById("logo").style.opacity = "1";
    }
    
}