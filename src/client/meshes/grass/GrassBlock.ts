import * as THREE from 'three';
import Block, { BlockParams } from '../block/Block';

class GrassBlock extends Block {
    constructor(params: Omit<BlockParams, 'material'>) {
        super(params);

        const textures = {
            side: new THREE.MeshBasicMaterial({map: this._loader.load('./textures/grass/grass-side.jpg')}),
            top: new THREE.MeshBasicMaterial({map: this._loader.load('./textures/grass/grass-top.jpg')}),
            bottom: new THREE.MeshBasicMaterial({map: this._loader.load('./textures/grass/grass-bottom.jpg')}),
        };

        this._mesh.material = [
            textures.side,
            textures.side,
            textures.top,
            textures.bottom,
            textures.side,
            textures.side,
        ];
        
    }
}

export default GrassBlock;