import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls';
//---------------------
// scene & axes Helper
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
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);
//-------------
// loaders
//-------------
const mercuryLoader = new THREE.TextureLoader();
const mercuryTexture = mercuryLoader.load("assets/textures/sun.jpg");
// sun 
const sunGeometry = new THREE.SphereGeometry(6, 24, 24);
//console.dir(sunGeometry)
const sunMaterial = new THREE.MeshBasicMaterial({ map: mercuryTexture });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.x = 0;
sun.position.y = 0;
sun.position.z = 0;
sun.scale.setScalar(1.2);
scene.add(sun);
// camera.position.z = 10
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}
// -------------------------
// ANIMATION FUNCTION
// -------------------------
var animate = function () {
    requestAnimationFrame(animate);
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    sun.rotation.y += 0.002;
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
