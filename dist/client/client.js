import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls';
// scene & axes Helper
const scene = new THREE.Scene();
var axesHelper = new THREE.AxesHelper(6);
scene.add(axesHelper);
// camera 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);
// sun 
const sunGeometry = new THREE.SphereGeometry();
//console.dir(sphereGeometry)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const sun = new THREE.Mesh(sunGeometry, material);
sun.position.y = 4;
scene.add(sun);
camera.position.z = 2;
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}
var animate = function () {
    requestAnimationFrame(animate);
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    sun.rotation.y += 0.01;
    render();
    document.getElementById("debug1").innerText = "Matrix\n" + sun.matrix.elements.toString().replace(/,/g, "\n");
};
function render() {
    //stats.begin()
    renderer.render(scene, camera);
    //stats.end()
}
//render() 
animate();
