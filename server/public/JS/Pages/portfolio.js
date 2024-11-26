runProjects();
async function runProjects() {
    await waitForElm('.project'); 

    // Run functions here
    projects();
}

function projects() {
    let projects = document.querySelectorAll('.project');
    let banners = document.querySelectorAll('.banner');

    projects.forEach((project) => {
        project.addEventListener('click', () => {
            if (!project.classList.contains('active')) {
                toggleProject(project);
            }
        });
    });

    banners.forEach((banner) => {
        banner.addEventListener('scroll', () => {
            if (banner.scrollTop > 0) {
                banner.classList.add('scrolled');
            } else {
                banner.classList.remove('scrolled');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-project') || e.target.classList.contains('project-cover')) {
            projectClose(projects);
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            projectClose(projects);
        }
    });

    document.addEventListener('scroll', () => {
        projectClose(projects);
    });

    window.addEventListener('resize', () => {
        projectClose(projects);
    });
}


function toggleProject(project) {
    let closeProject = document.querySelector('.close-project');
    let projectCover = document.querySelector('.project-cover');
    let button = project.querySelector('.main-btn button');

    project.classList.toggle('active');
    closeProject.classList.toggle('active');
    projectCover.classList.toggle('active');

    // Get html data
    let btnText = button.getAttribute('data-changes-to') || 'Link';
    button.innerText = project.classList.contains('active') ? btnText : 'View';
}

function projectClose(projects) {
    projects.forEach((project) => {
        if (project.classList.contains('active')) {
            toggleProject(project);
        }
    });
}
