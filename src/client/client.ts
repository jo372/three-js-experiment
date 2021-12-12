import * as THREE from 'three'
import { Object3D } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GrassBlock from './meshes/grass/GrassBlock'
import StoneBlock from './meshes/stone/StoneBlock'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

for(let bid=0; bid < 2; bid++) {
    for(let x=0; x < 10; x++) {
        for(let y=0; y < 10; y++) {
            const position = new THREE.Vector3(x, bid, y);
            const block = bid === 0 ? new StoneBlock({position}) : new GrassBlock({position});
            scene.add(block.mesh);
        }
    }
}

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    render()
}

function render() {
    renderer.render(scene, camera)
}
animate()
