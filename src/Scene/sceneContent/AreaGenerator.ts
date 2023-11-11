import * as THREE from 'three';
import ContentArea from "./ContentArea";
import Camera from '../Camera';

export default class AreaGenerator {
    areas: ContentArea[] = [];
    scene: THREE.Scene;

    activeAreaIndex: number = 0;

    constructor(scene: THREE.Scene) {
        this.scene = scene;
    }

    public addNewContentArea(content: string)
    {
        const newArea = new ContentArea(content, this.calculateNewAreaPosition(), this.scene);
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