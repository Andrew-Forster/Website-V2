// Elements

var content = document.querySelector('main');

window.onload = function () {
    switch (window.location.pathname) {
        case "/home":
            instantContentReplace(home);
            break;
        case "/about":
            instantContentReplace(about);
            break;
        case "/skills":
            instantContentReplace(skills);
            break;
        case "/portfolio":
            instantContentReplace(portfolio);
            break;
        default:
            instantContentReplace(home);
            break;
    }
}

window.addEventListener('popstate', () => {
    switch (window.location.pathname) {
        case "/home":
            contentReplace(home);
            break;
        case "/about":
            contentReplace(about);
            break;
        case "/skills":
            contentReplace(skills);
            break;
        case "/portfolio":
            contentReplace(portfolio);
            break;
        default:
            contentReplace(home);
            break;
    }
});


function instantContentReplace(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;
            setBorderAnimationDelays(); // Set the border animation delays in utils.js

            // Find script tags
            let scripts = content.getElementsByTagName('script');

            // Iterate through each script tag and execute the JavaScript
            for (let i = 0; i < scripts.length; i++) {
                let script = scripts[i];
                let src = script.getAttribute('src');

                if (src) {
                    // If script has a src attribute, load the external JavaScript file
                    fetch(src)
                        .then(response => response.text())
                        .then(scriptContent => {
                            // Create a new function from the script content
                            const scriptFunction = new Function(scriptContent);
                            // Execute the script content
                            scriptFunction();
                        })
                        .catch(error => {
                            console.error('Error loading script:', error);
                        });
                } else {
                    // If script doesn't have a src attribute, execute its content directly
                    // Create a new function from the script content
                    const scriptFunction = new Function(script.textContent);
                    // Execute the script content
                    scriptFunction();
                }
            }
        })
        .catch(error => {
            // location.reload();
            console.error('Error loading content:', error);
        });

    content.classList.add("active");
}
let loadedScripts = []; // Array to store the loaded scripts

async function contentReplace(page) {
    content.classList.remove("active");
    content.classList.add("continueAnim");

    function handleAnimationEnd() {
        // Remove the event listener to prevent it from being triggered again
        content.removeEventListener('animationend', handleAnimationEnd);

        // Fetch the HTML content
        fetch(page)
            .then(response => response.text())
            .then(async data => {
                content.innerHTML = data;
                // Find script tags
                let scripts = content.getElementsByTagName('script');

                // Iterate through each script tag and execute the JavaScript
                for (let i = 0; i < scripts.length; i++) {
                    let script = scripts[i];
                    let src = script.getAttribute('src');

                    if (src && !loadedScripts.includes(src)) {
                        // If script has a src attribute, load the external JavaScript file
                        await fetch(src)
                            .then(response => response.text())
                            .then(scriptContent => {
                                // Create a new function from the script content
                                const scriptFunction = new Function(scriptContent);
                                // Execute the script content
                                scriptFunction();

                                loadedScripts.push(src);
                            })
                            .catch(error => {
                                console.error('Error loading script:', error);
                            });
                    } else {
                        // If script doesn't have a src attribute, execute its content directly
                        // Create a new function from the script content
                        const scriptFunction = new Function(script.textContent);
                        // Execute the script content
                        scriptFunction();
                    }
                }
                awaitContentReplace();
            })
            .catch(error => {
                location.reload();
                console.error('Error loading content:', error);
            });
    }

    // Add the event listener to trigger the function only once
    content.addEventListener('animationend', handleAnimationEnd);



}


async function awaitContentReplace() {
    content.classList.remove("continueAnim");
    scrollTo(0, 0);
    setTimeout(function () {
        content.classList.add("continue");
    }, 10);

    setTimeout(function () {
        pullReload();
        start(); // Run footer.js start function
        content.classList.remove("continue");
        content.classList.add("active");
        setBorderAnimationDelays(); // Set the border animation delays in utils.js

    }, 1000);
}