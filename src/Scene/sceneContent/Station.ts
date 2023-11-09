import * as THREE from 'three';

export default class Station {
    position: THREE.Vector3;

    constructor(position: THREE.Vector3, scene: THREE.Scene){
        this.position = position;

        const geometry = new THREE.SphereGeometry(1);
        const mat = new THREE.MeshBasicMaterial();
        const sphere = new THREE.Mesh(geometry, mat);
        sphere.position.copy(this.position);
        scene.add(sphere);
    };

    getCameraPosition(): THREE.Vector3 {
        return new THREE.Vector3(0, 0, 10).add(this.position);
    }

}