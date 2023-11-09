import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { inverseLerp, lerp } from 'three/src/math/MathUtils';
import RenderUnit from './RenderUnit';
import Sizes from './Sizes';

export default class Camera {
  instance: THREE.PerspectiveCamera;
  controls!: OrbitControls

  private fov: number = 50

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

  setCameraPosition(pos: THREE.Vector3) {
    // this.controls.enableDamping = false;
    // this.controls.update();
    // const camDis = this.instance.position.length();
    // const newPosition = pos.multiplyScalar(camDis)
    // this.instance.position.set(newPosition.x, newPosition.y, newPosition.z);
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
    this.controls.enableZoom = true
    this.controls.maxDistance = 15
    this.controls.minDistance = 3
    this.controls.zoomSpeed = 0.1
    this.controls.update()
  }
}