import * as THREE from "three"
import { randFloat, randInt } from "three/src/math/MathUtils"

export default class Environment {

  constructor(scene: THREE.Scene) {


    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    scene.add(directionalLight)
    directionalLight.position.set(1, 1, 1)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const floorGeometry = new THREE.PlaneGeometry(1000, 1000);
    const floorMat = new THREE.MeshBasicMaterial({
      'color': '#000000'
    });
    const floor = new THREE.Mesh(floorGeometry, floorMat);
    floor.rotateX(-Math.PI / 2)
    floor.position.y = -1
    scene.add(floor);

    
  }

  
}