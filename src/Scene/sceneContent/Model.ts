import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { inverseLerp } from "three/src/math/MathUtils";

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

export default class Models {

  textMesh: THREE.Mesh;

  constructor(scene: THREE.Scene) {
    const fontLoader = new FontLoader();
    fontLoader.load(
      'fonts/helvetiker_regular.typeface.json',
      (font) =>
      {
        const textGeometry = new TextGeometry(
          'three.js',
          {
              font: font,
              size: 0.5,
              height: 0.2,
              curveSegments: 5,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelOffset: 0,
              bevelSegments: 3
          }
      )
      textGeometry.center()
      const textMaterial = new THREE.MeshBasicMaterial()
      this.textMesh = new THREE.Mesh(textGeometry, textMaterial)
      scene.add(this.textMesh)
      }
    )
  }

  loadModel(scene: THREE.Scene, modelPath: string) {
    // const gltfLoader = new GLTFLoader();
    // gltfLoader.load(
    //   modelPath,
    //   (gltf) => {
    //     this.machine = gltf.scene.children[0];
    //     this.prepareModel();
    //     scene.add(this.machine);
    //     console.log(gltf);
    //   },
    //   (progress) => {
    //     console.log('onProgress');
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  disposeModel(scene: THREE.Scene) {
    // if (!this.machine) return;

    // this.machine.traverse(elem => {
    //   if (elem instanceof THREE.Mesh) {
    //     elem.geometry?.dispose();
    //     elem.material?.dispose();
    //   }
    // });
    // scene.remove(this.machine);
  }
}