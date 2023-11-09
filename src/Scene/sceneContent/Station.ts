import * as THREE from 'three';

export default class Station {
    position: THREE.Vector3;

    constructor(position: THREE.Vector3, scene: THREE.Scene){
        this.position = position;

        const geometry = new THREE.SphereGeometry();
        const mat = new THREE.MeshBasicMaterial();
        const sphere = new THREE.Mesh(geometry, mat);
        sphere.position.set(this.position);
        scene.add(sphere);

        console.log('test')
    };

}