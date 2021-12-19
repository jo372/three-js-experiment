import * as THREE from 'three';
import Block, { BlockParams } from '../block/Block';

class ObsidianBlock extends Block {
    constructor(params: Omit<BlockParams, 'color'>) {
        super(params);
        
        this._mesh.material = new THREE.MeshBasicMaterial({
            map: this._loader.load('./textures/obsidian/obsidian.jpg'),
        });
    }
}

export default ObsidianBlock;