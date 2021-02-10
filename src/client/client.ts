import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
import Stats from '/jsm/libs/stats.module'

//---------------------
// scene & Helpers
//---------------------
const scene: THREE.Scene = new THREE.Scene()
var axesHelper = new THREE.AxesHelper(12)
scene.add(axesHelper)
scene.add(new THREE.GridHelper(155,155))

// --------------------
// Lights
// --------------------

const centerLight: THREE.PointLight = new THREE.PointLight(0xFFDDFF,1,5);
centerLight.position.set(0,0,0)
scene.add(centerLight)

const spotlight = new THREE.SpotLight(0xEEFFFF, 5, 25, Math.PI/7);
spotlight.position.set(25, 0, 0);
scene.add(spotlight);
// scene.add( new THREE.SpotLightHelper( spotlight ));

// Lighting
const ambientLight = new THREE.AmbientLight( 0x404040);  // Ambient light
scene.add(ambientLight)

//---------------
// camera 
//---------------
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(82,126,156)

// ----------------
// WebGL rendering
// ----------------
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// ----------------
// stats
// ----------------
const stats = Stats()
document.body.appendChild(stats.dom)

// ----------------
// Controls for user-end purposes
// ----------------
const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', render)

//-------------
// loaders for each planet and moon
//-------------
const loader: THREE.TextureLoader = new THREE.TextureLoader()
const sunTexture = loader.load("assets/textures/sun.jpg")
const mercuryTexture = loader.load("assets/textures/mercury.jpg")
const venusTexture = loader.load("assets/textures/venus.jpg")
const earthTexture = loader.load("assets/textures/earth.jpg")
const marsTexture = loader.load("assets/textures/mars.jpg")
const jupiterTexture = loader.load("assets/textures/jupiter.jpg")
const saturnTexture = loader.load("assets/textures/saturn.jpg")
const uranusTexture = loader.load("assets/textures/uranus.jpg")
const neptuneTexture = loader.load("assets/textures/neptune.jpg")
const moonTexture = loader.load("assets/textures/moon.jpg")
const phobosTexture = loader.load("assets/textures/phobos.jpg")


// geometries
const sunGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(6, 32, 32)
const mercuryGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const venusGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const earthGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const marsGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const jupiterGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const saturnGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const uranusGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const neptuneGeometry: THREE.SphereGeometry = new THREE.SphereGeometry(1, 32, 32)
//console.dir(sunGeometry)

const sunMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ map: sunTexture })
const mercuryMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ map: mercuryTexture })
const venusMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ map: venusTexture })
const earthMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ map: earthTexture })
const marsMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ map: marsTexture})
const jupiterMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({map: jupiterTexture})
const saturnMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({map: saturnTexture})
const uranusMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({map: uranusTexture})
const neptuneMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({map: neptuneTexture})

// Groups
const mercuryGroup: THREE.Group = new THREE.Group()
const venusGroup: THREE.Group = new THREE.Group()
const earthGroup: THREE.Group = new THREE.Group()
const marsGroup: THREE.Group = new THREE.Group()
const jupiterGroup: THREE.Group = new THREE.Group()
const saturnGroup: THREE.Group = new THREE.Group()
const uranusGroup: THREE.Group = new THREE.Group()
const neptuneGroup: THREE.Group = new THREE.Group()

const sun: THREE.Mesh = new THREE.Mesh(sunGeometry, sunMaterial)
const mercury: THREE.Mesh = new THREE.Mesh(mercuryGeometry, mercuryMaterial)
const venus: THREE.Mesh = new THREE.Mesh(venusGeometry, venusMaterial)
const earth: THREE.Mesh = new THREE.Mesh(earthGeometry, earthMaterial)
const mars: THREE.Mesh = new THREE.Mesh(marsGeometry, marsMaterial)
const jupiter: THREE.Mesh = new THREE.Mesh(jupiterGeometry, jupiterMaterial)
const saturn: THREE.Mesh = new THREE.Mesh(saturnGeometry, saturnMaterial)
const uranus: THREE.Mesh = new THREE.Mesh(uranusGeometry, uranusMaterial)
const neptune: THREE.Mesh = new THREE.Mesh(neptuneGeometry, neptuneMaterial)

sun.position.x = 0
sun.position.y = 0
sun.position.z = 0
sun.scale.setScalar(6.2)
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
scene.add(sun)
generatePlanet(scene, mercury,mercuryGroup, 60, 0.7)
generatePlanet(scene, venus, venusGroup, 66, 0.8)
generatePlanet(scene, earth, earthGroup, 72, 1)
generatePlanet(scene, mars, marsGroup, 82, 0.8)
generatePlanet(scene, jupiter, jupiterGroup, 120, 4)
generatePlanet(scene, saturn, saturnGroup, 150, 3.6)
generatePlanet(scene, uranus, uranusGroup, 178, 2)
generatePlanet(scene, neptune, neptuneGroup, 199, 1.9)


// camera.position.z = 10

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

//-------------------------
// Planet generation
//-------------------------
function generatePlanet(scene: THREE.Scene, mesh: THREE.Mesh, group: THREE.Group, x: number, scale: number){
    mesh.position.set(x, 0, 0)
    mesh.scale.setScalar(scale)
    group.add(mesh)
    scene.add(group)
}


// -------------------------
// ANIMATION FUNCTION
// -------------------------
var animate = function () {
    requestAnimationFrame(animate)

    sun.rotation.y += 0.0002

    mercuryGroup.rotation.y += 0.0088
    mercury.rotation.y += 0.00059

    venusGroup.rotation.y +=  0.00225
    venus.rotation.y +=  0.0000243

    earthGroup.rotation.y += 0.00365
    earth.rotation.y += 0.001

    marsGroup.rotation.y += 0.00687
    mars.rotation.y +=  0.00098

    jupiterGroup.rotation.y += 0.00012
    jupiter.rotation.y += 0.03

    saturnGroup.rotation.y += 0.00029
    saturn.rotation.y += 0.028

    uranusGroup.rotation.y += 0.00084
    uranus.rotation.y += 0.022

    neptuneGroup.rotation.y += 0.000165
    neptune.rotation.y += 0.021

    controls.update()
    render();
    stats.update()
    // (document.getElementById("displayer") as HTMLDivElement).innerText = "Matrix\n" + sun.matrix.elements.toString().replace(/,/g, "\n",)

};


// -------------------------
// RENDER FUNCTION
// -------------------------

function render(){
    
    stats.begin()
    renderer.render(scene, camera)
    stats.end()
}

//render() 

animate();