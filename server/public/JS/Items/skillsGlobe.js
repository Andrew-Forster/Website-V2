import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const imagePaths = [
  {
    path: "/Assets/Stack/bootstrap.svg",
    title: "Bootstrap",
    description: "A front-end framework for building responsive websites.",
  },
  {
    path: "/Assets/Stack/css.svg",
    title: "CSS",
    description:
      "A style sheet language used for describing the presentation of a document written in HTML.",
  },
  {
    path: "/Assets/Stack/js.svg",
    title: "JavaScript",
    description: "A programming language that enables interactive web pages.",
  },
  {
    path: "/Assets/Stack/jquery.svg",
    title: "jQuery",
    description: "A fast, small, and feature-rich JavaScript library.",
  },
  {
    path: "/Assets/Stack/nodejs.svg",
    title: "Node.js",
    description: "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
  },
  {
    path: "/Assets/Stack/csharp.svg",
    title: "C#",
    description:
      "A modern, object-oriented programming language developed by Microsoft.",
  },
  {
    path: "/Assets/Stack/dbd.png",
    title: "Discord Bot Designer",
    description: "A visual programming language for creating bots on Discord.",
  },
  {
    path: "/Assets/Stack/do.svg",
    title: "DigitalOcean",
    description: "A cloud infrastructure provider.",
  },
  {
    path: "/Assets/Stack/next.svg",
    title: "Next.js",
    description: "A React framework for building server-rendered applications.",
  },
  {
    path: "/Assets/Stack/docker.svg",
    title: "Docker",
    description:
      "A platform for developing, shipping, and running applications in containers.",
  },
  {
    path: "/Assets/Stack/gh.svg",
    title: "GitHub",
    description: "A platform for hosting and sharing code.",
  },
  {
    path: "/Assets/Stack/html.svg",
    title: "HTML",
    description: "The standard markup language for creating web pages.",
  },
  {
    path: "/Assets/Stack/mongo.svg",
    title: "MongoDB",
    description: "A NoSQL database that uses a document-oriented data model.",
  },
  {
    path: "/Assets/Stack/npm.svg",
    title: "npm",
    description: "A package manager for JavaScript and Node.js.",
  },
  {
    path: "/Assets/Stack/mui.svg",
    title: "Material UI",
    description:
      "A popular React UI framework that implements Google's Material Design.",
  },
  {
    path: "/Assets/Stack/react.svg",
    title: "React",
    description: "A JavaScript library for building user interfaces.",
  },
  {
    path: "/Assets/Stack/tailwind.svg",
    title: "Tailwind CSS",
    description:
      "A utility-first CSS framework for rapidly building custom designs.",
  },
];

async function startGlobe() {
  await waitForElm("#globe");
  await new Promise((resolve) => setTimeout(resolve, 200));
  setupGlobe();
}

let isHovered = false;
let rotationSpeed = 0.002;

let closestSprite = null;
let closestSpriteDistance = Infinity;
let closestSpriteData = {};

function setupGlobe() {
  const globeContainer = document.getElementById("globe");
  const { width, height } = globeContainer.getBoundingClientRect();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 150;
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(width, height);
  globeContainer.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Smooth dragging
  controls.enableZoom = false;

  const radius = 75;
  const amount = imagePaths.length;
  const sprites = [];

  imagePaths.forEach((path, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / amount);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    const texture = new THREE.TextureLoader().load(path.path);
    texture.encoding = THREE.SRGBEncoding;
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(20, 20, 1);

    sprite.position.set(x, y, z);
    scene.add(sprite);

    // Store each sprite with its corresponding image path and initial position
    sprites.push({
      sprite,
      imageUrl: path,
      initialPosition: sprite.position.clone(),
    });
  });

  // Handle hover events
  globeContainer.addEventListener("mouseenter", () => {
    isHovered = true;
  });

  globeContainer.addEventListener("mouseleave", () => {
    isHovered = false;
  });

  globeContainer.addEventListener("touchstart", () => {
    isHovered = true;
  });

  globeContainer.addEventListener("touchend", () => {
    isHovered = false;
  });

  function animate() {
    requestAnimationFrame(animate);

    // Slow spin when not hovered
    if (!isHovered) {
      if (rotationSpeed < 0.002) {
        rotationSpeed += 0.00002;
      }
      scene.rotation.y += rotationSpeed;
      scene.rotation.x += rotationSpeed;
    } else {
      if (rotationSpeed > 0) {
        rotationSpeed -= 0.00002;
      }
      scene.rotation.y += rotationSpeed;
      scene.rotation.x += rotationSpeed;
    }

    // Find the closest sprite based on the initial (un-rotated) positions
    closestSpriteDistance = Infinity;
    imagePaths.forEach(({ path, title, description }, i) => {
      const sprite = scene.children[i + 1]; // Assuming sprites are added sequentially in the scene
      const worldPosition = new THREE.Vector3();
      sprite.getWorldPosition(worldPosition);

      const distance = camera.position.distanceTo(worldPosition);
      if (distance < closestSpriteDistance) {
        closestSpriteDistance = distance;
        closestSpriteData = { path, title, description };
      }
    });

    updateGlobeInfo(closestSpriteData);

    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}

function updateGlobeInfo(closestSpriteData) {
  const globeInfo = document.getElementById("globe-info");

  if (
    globeInfo.querySelectorAll("h6")[0].textContent == closestSpriteData.title
  ) {
    return;
  }
  globeInfo.style.transition = "opacity 0s ease-in-out";
  globeInfo.style.opacity = 0;

  // Clone the existing info
  const globeInfoCopy = globeInfo.cloneNode(true);
  globeInfoCopy.style.position = "absolute";
  globeInfoCopy.style.top = `${globeInfo.offsetTop}px`;
  globeInfoCopy.style.left = `${globeInfo.offsetLeft}px`;
  globeInfoCopy.style.width = `${globeInfo.offsetWidth}px`;
  globeInfoCopy.style.height = `${globeInfo.offsetHeight}px`;
  globeInfoCopy.style.opacity = "1";
  globeInfoCopy.style.transition = "opacity 0.5s ease-in-out";
  globeInfo.parentElement.appendChild(globeInfoCopy);

  const infoImage = globeInfo.querySelector("img");
  const infoTitle = globeInfo.querySelector("h6");
  const infoDescription = globeInfo.querySelector("p");

  infoImage.src = closestSpriteData.path;
  infoImage.alt = closestSpriteData.title;
  infoTitle.innerText = closestSpriteData.title;
  infoDescription.innerText = closestSpriteData.description;

  setTimeout(() => {
    globeInfoCopy.style.opacity = "0";
    globeInfo.style.transition = "opacity 0.5s ease-in-out";
    globeInfo.style.opacity = 1;
  }, 10);

  setTimeout(() => {
    globeInfoCopy.remove();
  }, 500);
}

document.addEventListener("DOMContentLoaded", () => {
  startGlobe();
});
