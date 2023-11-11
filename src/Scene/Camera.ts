import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { inverseLerp, lerp } from 'three/src/math/MathUtils';
import RenderUnit from './RenderUnit';
import Sizes from './Sizes';
import ContentArea from './sceneContent/ContentArea';

export default class Camera {
  instance: THREE.PerspectiveCamera;
  controls!: OrbitControls;

  private fov: number = 50

  inTransition: boolean = false;
  transitionParameter: number = 0;
  oldCameraPosition: THREE.Vector3;
  newCameraPosition: THREE.Vector3;
  cameraTarget: ContentArea;

  constructor(scene: THREE.Scene, renderUnit: RenderUnit, sizes: Sizes) {

    //settings perspective camera
    this.instance = new THREE.PerspectiveCamera(this.fov, sizes.width / sizes.height, 0.1, 100);
    this.instance.position.set(0, 0, 5);
    this.setControls(this.instance, renderUnit);
    scene.add(this.instance);

    sizes.onChange.push(this.resize);
  }

  getActiveCamera(): THREE.Camera {
    return this.instance;
  }

  getDistanceToOrigin(): number {
    return this.controls.getDistance();
  }

  moveAutomatically()
  {

  }

  setCameraTarget(target: ContentArea) {
    this.controls.enabled = false;
    this.oldCameraPosition = this.instance.position.clone();
    this.newCameraPosition = target.getCameraPosition();
    this.cameraTarget = target;

    this.inTransition = true;
  }

  updateCameraPosition(){
    this.transitionParameter += 0.02;

    if (this.transitionParameter >= 1){
      this.transitionParameter = 0;
      this.inTransition = false;
      this.controls.enabled = true;
      this.controls.update();
      return;
    }

    this.instance.position.lerpVectors(this.oldCameraPosition, this.newCameraPosition, this.transitionParameter);
    this.controls.target.lerpVectors(new THREE.Vector3(), this.cameraTarget.origin, this.transitionParameter);

  }

  resize = (sizes: Sizes) => {
    //update perspective camera
    this.instance.aspect = sizes.aspectRatio;
    this.instance.updateProjectionMatrix();
  }

  private setControls(camera: THREE.Camera, renderUnit: RenderUnit) {
    this.controls = new OrbitControls(camera, renderUnit.renderer.domElement);
    this.controls.enableDamping = true
    this.controls.enablePan = false
    this.controls.enableZoom = false;
    this.controls.maxPolarAngle = Math.PI / 1.8
    this.controls.update()
  }
}