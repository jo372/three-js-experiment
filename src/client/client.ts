import * as THREE from 'three'
import { Object3D } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { workerData } from 'worker_threads'
import OptionsMenu from './lib/menu/OptionsMenu'
import Settings from './lib/settings/Settings'
import World from './lib/world/World'
import Block from './meshes/block/Block'
import DirtBlock from './meshes/dirt/DirtBlock'
import GrassBlock from './meshes/grass/GrassBlock'
import ObsidianBlock from './meshes/obsidian/ObsidianBlock'
import StoneBlock from './meshes/stone/StoneBlock'

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = -1
camera.position.y = 15
camera.position.x = -10

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const world = new World();


const optionsMenu = new OptionsMenu();
document.body.prepend(optionsMenu.element);

const MAX_LEVELS = 10;
for(let bid=0; bid <= MAX_LEVELS; bid++) {
    for(let x=0; x < 10; x++) {
        for(let z=0; z < 10; z++) {
            const position = new THREE.Vector3(x * Settings.MULTIPLIER, bid * Settings.MULTIPLIER, z * Settings.MULTIPLIER);
            const block = bid === MAX_LEVELS ? new GrassBlock({position}) : bid === 0 ? new ObsidianBlock({position}) : Math.random() > 0.5 ? new StoneBlock({ position }) :  new DirtBlock({position});
            world.addEntity(block);
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

    world.scene.traverse((object: Object3D) => {
        if(object.userData['type'] === 'block') {
            const originalPosition = object.userData['originalPosition'];
            object.position.x =  originalPosition.x * Settings.MULTIPLIER;
            object.position.y = originalPosition.y * Settings.MULTIPLIER;
            object.position.z = originalPosition.z * Settings.MULTIPLIER;
        }
    })
    
    controls.update()
    render()
}

function render() {
    renderer.render(world.scene, camera)
}
animate()
