import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import ContentArea from "./ContentArea";
import Camera from '../Camera';

export default class AreaGenerator {
    areas: ContentArea[] = [];
    scene: THREE.Scene;
    fontLoader: FontLoader;
    activeAreaIndex: number = 0;

    constructor(scene: THREE.Scene, camera: Camera) {
        this.scene = scene;
        this.fontLoader = new FontLoader();

        //add switch event on arrow keys
        window.addEventListener('keydown', (event) => {
        //TODO: add trigger time
            if (event.key === 'ArrowLeft')
            {
                this.switchToLastArea(camera);
            }
            else if (event.key === 'ArrowRight')
            {
                this.switchToNextArea(camera);
            }
        })
    }

    public addNewContentArea(content: string)
    {
        const areaPosition = this.calculateNewAreaPosition();
        const newArea = new ContentArea(content, areaPosition, this.fontLoader, this.scene);
        this.areas.push(newArea);
    }

    public switchToNextArea(camera: Camera) 
    {
        if (this.activeAreaIndex < this.areas.length-1)
        {
            const newArea = this.areas[++this.activeAreaIndex];
            camera.setCameraTarget(newArea);
        }
    }

    public switchToLastArea(camera: Camera) 
    {
        if (this.activeAreaIndex > 0)
        {
            const newArea = this.areas[--this.activeAreaIndex];
            camera.setCameraTarget(newArea);
        }
    }

    private calculateNewAreaPosition(): THREE.Vector3
    {
        if (this.areas.length === 0){
            return new THREE.Vector3(0, 0, 0);
        }

        const lastArea = this.areas[this.areas.length - 1];
        let lastAreaPos = lastArea.origin.clone();
        return lastAreaPos.add(new THREE.Vector3(0, 0, -lastArea.size));
    }
}