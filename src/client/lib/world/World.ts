import { Object3D } from "three";
import * as THREE from "three";
import Block from "../../meshes/block/Block";
import Screen from "../screen/Screen";

class World {
    private _instance : World | null = null;
    private _scene : THREE.Scene = new THREE.Scene();
    constructor() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = this;
    } 
    addEntity<E extends Object3D<THREE.Event> | Block>(entity: E) {
        this._scene.add(entity instanceof Block ? entity.mesh : entity);
    }
    removeEntity<E extends Object3D>(entity: E) {
        this._scene.remove(entity);
    }
    getEntityById(id: number) {
        return this._scene.getObjectById(id);
    }
    getEntities() : Object3D[] {
        return this._scene.children;
    }
    get scene() : THREE.Scene {
        return this._scene;
    }
}

export default World;