import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { randFloat, randInt } from 'three/src/math/MathUtils';

export default class ContentArea {
    content: THREE.Mesh;
    origin: THREE.Vector3;

    size: number = 50;

    constructor(content: string, position: THREE.Vector3, fontLoader: FontLoader, scene: THREE.Scene){
        this.origin = position;

        this.generateTextContent(content, fontLoader, scene)
    };

    generateTextContent(text: string, fontLoader: FontLoader, scene: THREE.Scene)
    {
        fontLoader.load(
            'fonts/helvetiker_regular.typeface.json',
            (font) => {
                const textGeometry = new TextGeometry(
                    text,
                    {
                        font: font,
                        size: 0.5,
                        height: 0.2,
                        curveSegments: 8,
                        bevelEnabled: true,
                        bevelThickness: 0.03,
                        bevelSize: 0.02,
                        bevelOffset: 0,
                        bevelSegments: 2
                    }
                );
                textGeometry.center()
                const textMaterial = new THREE.MeshPhongMaterial();
                textMaterial.specular = new THREE.Color(0xffffff); 
                this.content = new THREE.Mesh(textGeometry, textMaterial);
                this.content.position.copy(this.origin);
                scene.add(this.content);
            }
        )
    }

    getViewPosition(): THREE.Vector3 {
        return new THREE.Vector3(0, 0, 5).add(this.origin);
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