import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls';
//---------------------
// scene & Helpers
//---------------------
const scene = new THREE.Scene();
var axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);
scene.add(new THREE.GridHelper(55, 55));
const centerLight = new THREE.PointLight(0xFFDDFF, 1, 5);
centerLight.position.set(0, 0, 0);
scene.add(centerLight);
//---------------
// camera 
//---------------
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(22, 46, 76);
// ----------------
// WebGL rendering
// ----------------
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// ----------------
// Controls for user-end purposes
// ----------------
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);
//-------------
// loaders for each planet and moon
//-------------
const sunLoader = new THREE.TextureLoader();
const sunTexture = sunLoader.load("assets/textures/sun.jpg");
const mercuryLoader = new THREE.TextureLoader();
const mercuryTexture = mercuryLoader.load("assets/textures/mercury.jpg");
const venusLoader = new THREE.TextureLoader();
const venusTexture = venusLoader.load("assets/textures/venus.jpg");
const earthLoader = new THREE.TextureLoader();
const earthTexture = earthLoader.load("assets/textures/earth.jpg");
const marsLoader = new THREE.TextureLoader();
const marsTexture = marsLoader.load("assets/textures/mars.jpg");
const jupiterLoader = new THREE.TextureLoader();
const jupiterTexture = jupiterLoader.load("assets/textures/jupiter.jpg");
const saturnLoader = new THREE.TextureLoader();
const saturnTexture = saturnLoader.load("assets/textures/saturn.jpg");
const uranusLoader = new THREE.TextureLoader();
const uranusTexture = uranusLoader.load("assets/textures/uranus.jpg");
const neptuneLoader = new THREE.TextureLoader();
const neptuneTexture = neptuneLoader.load("assets/textures/neptune.jpg");
const moonLoader = new THREE.TextureLoader();
const moonTexture = moonLoader.load("assets/textures/moon.jpg");
const phobosLoader = new THREE.TextureLoader();
const phobosTexture = phobosLoader.load("assets/textures/phobos.jpg");
// sun 
const sunGeometry = new THREE.SphereGeometry(6, 24, 24);
const mercuryGeometry = new THREE.SphereGeometry(1, 24, 24);
const venusGeometry = new THREE.SphereGeometry(1, 24, 24);
const earthGeometry = new THREE.SphereGeometry(1, 24, 24);
//console.dir(sunGeometry)
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const mercuryMaterial = new THREE.MeshBasicMaterial({ map: mercuryTexture });
const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
sun.position.x = 0;
sun.position.y = 0;
sun.position.z = 0;
sun.scale.setScalar(1.2);
mercury.position.set(20, 0, 0);
mercury.scale.setScalar(0.8);
venus.position.set(24, 0, 0);
venus.scale.setScalar(0.9);
earth.position.set(28, 0, 0);
earth.scale.setScalar(1);
scene.add(sun);
scene.add(mercury);
scene.add(venus);
scene.add(earth);
// camera.position.z = 10
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}
//-------------------------
// Planet generation
//-------------------------
function generatePlanet(scene, mesh, group, x, scale) {
    mesh.position.set(x, 0, 0);
    mesh.scale.setScalar(scale);
    group.add(mesh);
    scene.add(group);
}
// -------------------------
// ANIMATION FUNCTION
// -------------------------
var animate = function () {
    requestAnimationFrame(animate);
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    earth.rotation.y += 0.0001;
    venus.rotation.y += 0.0000243;
    mercury.rotation.y += 0.000059;
    sun.rotation.y += 0.0002;
    render();
    // (document.getElementById("debug1") as HTMLDivElement).innerText = "Matrix\n" + sun.matrix.elements.toString().replace(/,/g, "\n",)
};
// -------------------------
// RENDER FUNCTION
// -------------------------
function render() {
    renderer.render(scene, camera);
}
//render() 
animate();
