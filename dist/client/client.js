import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls';
import Stats from '/jsm/libs/stats.module';
import { GUI } from '/jsm/libs/dat.gui.module';
//---------------------
// scene & Helpers
//---------------------
const scene = new THREE.Scene();
var axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);
var grid = new THREE.GridHelper(155, 155);
//scene.add(new THREE.GridHelper(155,155))
scene.add(grid);
// --------------------
// Lights
// --------------------
function generateLights() {
    const centerLight = new THREE.PointLight(0xFFDDFF, 1, 5);
    centerLight.position.set(0, 0, 0);
    scene.add(centerLight);
    const spotlight = new THREE.SpotLight(0xEEFFFF, 5, 25, Math.PI / 7);
    spotlight.position.set(25, 0, 0);
    scene.add(spotlight);
    // scene.add( new THREE.SpotLightHelper( spotlight ));
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040); // Ambient light
    scene.add(ambientLight);
}
//---------------
// camera 
//---------------
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(82, 126, 156);
// ----------------
// WebGL rendering
// ----------------
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// ----------------
// stats
// ----------------
const stats = Stats();
document.body.appendChild(stats.dom);
// ----------------
// Controls for user-end purposes
// ----------------  
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);
//controls.autoRotate = true 
//controls.rotateSpeed = 1
//controls.enableDamping = true 
controls.enableKeys = true;
controls.keys = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    BOTTOM: 40
};
// interaction for mobile phones 
controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
};
controls.minAzimuthAngle = 0;
controls.maxAzimuthAngle = Math.PI / 2 + 10;
controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = Math.PI - (Math.PI / 4);
//-------------
// loaders for each planet and moon
//-------------
const loader = new THREE.TextureLoader();
const sunTexture = loader.load("assets/textures/sun.jpg");
const mercuryTexture = loader.load("assets/textures/mercury.jpg");
const venusTexture = loader.load("assets/textures/venus.jpg");
const earthTexture = loader.load("assets/textures/earth.jpg");
const marsTexture = loader.load("assets/textures/mars.jpg");
const jupiterTexture = loader.load("assets/textures/jupiter.jpg");
const saturnTexture = loader.load("assets/textures/saturn.jpg");
const uranusTexture = loader.load("assets/textures/uranus.jpg");
const neptuneTexture = loader.load("assets/textures/neptune.jpg");
const moonTexture = loader.load("assets/textures/moon.jpg");
const phobosTexture = loader.load("assets/textures/phobos.jpg");
const earthCloudsTexture = loader.load("assets/textures/earth_clouds.png");
const starfieldTexture = loader.load("assets/textures/background.jpeg");
// geometries
const sunGeometry = new THREE.SphereGeometry(6, 32, 32);
const mercuryGeometry = new THREE.SphereGeometry(1, 32, 32);
const venusGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
const marsGeometry = new THREE.SphereGeometry(1, 32, 32);
const jupiterGeometry = new THREE.SphereGeometry(1, 32, 32);
const saturnGeometry = new THREE.SphereGeometry(1, 32, 32);
const uranusGeometry = new THREE.SphereGeometry(1, 32, 32);
const neptuneGeometry = new THREE.SphereGeometry(1, 32, 32);
const moonGeometry = new THREE.SphereGeometry(1, 32, 32);
const earthCloudGeometry = new THREE.SphereGeometry(1.1, 32, 32);
const starfieldGeometry = new THREE.SphereGeometry(850, 50, 50);
//console.dir(sunGeometry)
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const mercuryMaterial = new THREE.MeshBasicMaterial({ map: mercuryTexture });
const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const marsMaterial = new THREE.MeshBasicMaterial({ map: marsTexture });
const jupiterMaterial = new THREE.MeshBasicMaterial({ map: jupiterTexture });
const saturnMaterial = new THREE.MeshBasicMaterial({ map: saturnTexture });
const uranusMaterial = new THREE.MeshBasicMaterial({ map: uranusTexture });
const neptuneMaterial = new THREE.MeshBasicMaterial({ map: neptuneTexture });
const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
const earthCloudMaterial = new THREE.MeshBasicMaterial({ map: earthCloudsTexture, transparent: true, opacity: 0.2 });
const starfieldMaterial = new THREE.MeshPhongMaterial({ map: starfieldTexture, side: THREE.DoubleSide, shininess: 0 });
// Groups
const mercuryGroup = new THREE.Group();
const venusGroup = new THREE.Group();
const earthGroup = new THREE.Group();
const marsGroup = new THREE.Group();
const jupiterGroup = new THREE.Group();
const saturnGroup = new THREE.Group();
const uranusGroup = new THREE.Group();
const neptuneGroup = new THREE.Group();
const moonGroup = new THREE.Group();
const earthCloudGroup = new THREE.Group();
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
const earthClouds = new THREE.Mesh(earthCloudGeometry, earthCloudMaterial);
const starfield = new THREE.Mesh(starfieldGeometry, starfieldMaterial);
sun.position.x = 0;
sun.position.y = 0;
sun.position.z = 0;
sun.scale.setScalar(6.2);
/*mercury.position.set(20, 0, 0)
mercury.scale.setScalar(0.8)
venus.position.set(24, 0, 0)
venus.scale.setScalar(0.9)
earth.position.set(28, 0, 0)
earth.scale.setScalar(1)
scene.add(sun)
//scene.add(mercury)
mercuryGroup.add(mercury)
scene.add(mercuryGroup)
scene.add(venus)
scene.add(earth)*/
scene.add(starfield);
scene.add(sun);
generatePlanet(scene, mercury, mercuryGroup, 60, 0.7);
generatePlanet(scene, venus, venusGroup, 66, 0.8);
generatePlanet(scene, earth, earthGroup, 72, 1);
generatePlanet(scene, mars, marsGroup, 82, 0.8);
generatePlanet(scene, jupiter, jupiterGroup, 120, 4);
generatePlanet(scene, saturn, saturnGroup, 150, 3.6);
generatePlanet(scene, uranus, uranusGroup, 178, 2);
generatePlanet(scene, neptune, neptuneGroup, 199, 1.9);
generatePlanet(scene, earthClouds, earthCloudGroup, 72, 1);
moon.position.x = 0;
moon.scale.setScalar(0.1);
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
// GUI settings
// -------------------------
function buildGUI() {
    const gui = new GUI();
    const planetsFolder = gui.addFolder("Planets");
    const mercuryFolder = planetsFolder.addFolder("Mercury");
    const venusFolder = planetsFolder.addFolder("Venus");
    const earthFolder = planetsFolder.addFolder("Earth");
    const marsFolder = planetsFolder.addFolder("Mars");
    const jupiterFolder = planetsFolder.addFolder("Jupiter");
    const saturnFolder = planetsFolder.addFolder("Saturn");
    const uranusFolder = planetsFolder.addFolder("Uranus");
    const neptuneFolder = planetsFolder.addFolder("Neptune");
    const gridFolder = gui.addFolder("Grid Helper");
    gridFolder.add(grid, "visible", true);
    planetsFolder.open();
    gridFolder.open();
}
// -------------------------
// ANIMATION FUNCTION
// -------------------------
var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    sun.rotation.y += 0.0002;
    mercuryGroup.rotation.y += 0.0088;
    mercury.rotation.y += 0.00059;
    venusGroup.rotation.y += 0.00225;
    venus.rotation.y += 0.0000243;
    earthGroup.rotation.y += 0.00365;
    earth.rotation.y += 0.001;
    earthCloudGroup.rotation.y += 0.00365;
    earthClouds.rotation.y -= 0.0005;
    marsGroup.rotation.y += 0.00687;
    mars.rotation.y += 0.00098;
    jupiterGroup.rotation.y += 0.00012;
    jupiter.rotation.y += 0.03;
    saturnGroup.rotation.y += 0.00029;
    saturn.rotation.y += 0.028;
    uranusGroup.rotation.y += 0.00084;
    uranus.rotation.y += 0.022;
    neptuneGroup.rotation.y += 0.000165;
    neptune.rotation.y += 0.021;
    render();
    stats.update();
    // (document.getElementById("displayer") as HTMLDivElement).innerText = "Matrix\n" + sun.matrix.elements.toString().replace(/,/g, "\n",)
    // (document.getElementById("displayer") as HTMLDivElement).innerText = "<strong>Mercury</strong>","\n")
};
// -------------------------
// RENDER FUNCTION
// -------------------------
function render() {
    stats.begin();
    renderer.render(scene, camera);
    stats.end();
}
//render() 
buildGUI();
generateLights();
animate();
