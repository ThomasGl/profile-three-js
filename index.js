import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { water } from './src/water.js';
import { sky } from './src/sky.js';

let container, stats;
let camera, scene, renderer;
let controls, sun, mesh;

init();

function init() {

    container = document.getElementById( 'container' );

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animate );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    container.appendChild( renderer.domElement );

    //

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
    camera.position.set( 30, 30, 100 );

    let renderTarget;

    const phi = THREE.MathUtils.degToRad(90);
    const theta = THREE.MathUtils.degToRad(0);

    sun = new THREE.Vector3();
    sun.setFromSphericalCoords( 1, phi, theta );

    sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
    water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

    if ( renderTarget !== undefined ) renderTarget.dispose();

    const sceneEnv = new THREE.Scene();
    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    sceneEnv.add( sky );
    renderTarget = pmremGenerator.fromScene( sceneEnv );

    scene.add( water );
    scene.add( sky );

    scene.environment = renderTarget.texture;

    //

    const geometry = new THREE.BoxGeometry( 30, 30, 30 );
    const material = new THREE.MeshStandardMaterial( { roughness: 0 } );

    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( 0, 20, 0 );
    scene.add( mesh );

    //

    controls = new OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set( 0, 10, 0 );
    controls.minDistance = 40.0;
    controls.maxDistance = 200.0;
    controls.update();

    //

    stats = new Stats();
    container.appendChild( stats.dom );

    //

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
    
    renderer.render( scene, camera );

    stats.update();

}
