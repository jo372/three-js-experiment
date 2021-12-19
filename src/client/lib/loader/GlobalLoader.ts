import * as THREE from 'three';

abstract class GlobalLoader {
    private static _loader : THREE.TextureLoader = new THREE.TextureLoader();
    private static _lookup : Map<string, THREE.Texture> = new Map();
    public static load(url: string) : THREE.Texture {
        if(GlobalLoader._lookup.has(url)) {
            return (GlobalLoader._lookup.get(url) as THREE.Texture);
        }

        const texture = GlobalLoader._loader.load(url);
        GlobalLoader._lookup.set(url, texture);

        return texture;
    }
}

export default GlobalLoader;