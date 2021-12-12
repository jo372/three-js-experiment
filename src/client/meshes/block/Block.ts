import * as THREE from 'three';

export interface BlockParams {
    position?: THREE.Vector3,
    material?: THREE.Material | THREE.Material[],
    width?: number,
    height?: number,
    depth?: number,
}

abstract class Block {
    protected readonly _mesh : THREE.Mesh;
    protected readonly _loader = new THREE.TextureLoader();
    constructor(params: BlockParams) {
        const position = params.position || new THREE.Vector3(0, 0, 0);
        const material = params.material || new THREE.MeshBasicMaterial({color: 0x00ff00});
        const width = params.width || 1;
        const height = params.height || 1;
        const depth = params.depth || 1;

        const geometry = new THREE.BoxGeometry(width, height, depth);
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(position);
        this._mesh = mesh;
    }
    public get mesh() {
        return this._mesh;
    }
}

export default Block;