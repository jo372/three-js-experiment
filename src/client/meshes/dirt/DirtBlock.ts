import * as THREE from 'three';
import Block, { BlockParams } from '../block/Block';

class DirtBlock extends Block {
    constructor(params: Omit<BlockParams, 'material'>) {
        super(params);

        this._mesh.material = new THREE.MeshBasicMaterial({
            map: this._loader.load('./textures/grass/grass-bottom.jpg'),
        });
    }
}

export default DirtBlock;