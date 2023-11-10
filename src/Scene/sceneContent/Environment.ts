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

    this.addMagentaCubes(scene);
  }

  addMagentaCubes(scene: THREE.Scene)
  {
    const color = new THREE.Color('#F20074');
    const amount = 100;
    const minSize = 0.2;
    const maxSize = 1;

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