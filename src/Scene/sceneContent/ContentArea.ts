import * as THREE from 'three';
import { randFloat, randInt } from 'three/src/math/MathUtils';

export default class ContentArea {
    origin: THREE.Vector3;

    size: number = 50;

    constructor(content: string, position: THREE.Vector3, scene: THREE.Scene){
        this.origin = position;

        const geometry = new THREE.SphereGeometry(1);
        const mat = new THREE.MeshBasicMaterial();
        const sphere = new THREE.Mesh(geometry, mat);
        sphere.position.copy(this.origin);
        scene.add(sphere);
    };

    getCameraPosition(): THREE.Vector3 {
        return new THREE.Vector3(0, 0, 10).add(this.origin);
    }

    addMagentaCubes(scene: THREE.Scene)
    {
        const color = new THREE.Color('#F20074');
        const amount = 100;
        const minSize = 0.2;
        const maxSize = 6;

        const cubeMat = new THREE.MeshPhongMaterial();
        cubeMat.color = color

        for (let count = 0; count < amount; count++) {
          const scale = randFloat(minSize, maxSize);

          const cubeGeo = new THREE.BoxGeometry(scale, scale, scale);
          const cube = new THREE.Mesh(cubeGeo, cubeMat);

          cube.position.set(randInt(-50, 50), -1, randInt(-100, 50));
          cube.rotateX(randFloat(0, Math.PI * 2));
          cube.rotateY(randFloat(0, Math.PI * 2));
          scene.add(cube);
      
        }
    }
}