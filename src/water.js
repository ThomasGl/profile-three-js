import * as THREE from 'three';

import { Water } from 'three/addons/objects/Water.js';

let water;

const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

water = new Water(
    waterGeometry,
    {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load( 'assets/waternormals.jpg', function ( texture ) {
            
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            
        } ),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3,
    }
);

water.rotation.x = - Math.PI / 2;
water.material.uniforms.size = { value: 4 };

export { water };