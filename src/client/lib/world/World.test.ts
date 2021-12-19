import GrassBlock from "../../meshes/grass/GrassBlock";
import World from "./World";
import * as THREE from "three";
import { expect } from "chai";

describe('World', () => {
    it('when an entity is added it should be in the getEntities list', () => {
        const world = new World();
        const entity = new GrassBlock({
            position: new THREE.Vector3(0, 0, 0),
        });
        world.addEntity(entity.mesh);
        expect(world.getEntities().length).to.equal(1);
        expect(world.getEntities()[0]).to.equal(entity.mesh);
    })
    it('expect entity to be removed from the world object', () => {
        const world = new World();
        const entity = new GrassBlock({
            position: new THREE.Vector3(0, 0, 0),
        });
        world.addEntity(entity.mesh);
        expect(world.getEntities().length).to.equal(1);
        world.removeEntity(entity.mesh);
        expect(world.getEntities().length).to.equal(0);
    })
})