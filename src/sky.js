import { Sky } from 'three/addons/objects/Sky.js';

const sky = new Sky();
sky.scale.setScalar( 10000 );

const skyUniforms = sky.material.uniforms;

skyUniforms[ 'turbidity' ].value = 10;
skyUniforms[ 'rayleigh' ].value = 2;
skyUniforms[ 'mieCoefficient' ].value = 0.005;
skyUniforms[ 'mieDirectionalG' ].value = 0.8;

export { sky, skyUniforms };