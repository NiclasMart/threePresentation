import * as THREE from 'three';
import Camera from './Camera';
import RenderUnit from './RenderUnit';
import Sizes from './Sizes';
import Models from './sceneContent/Model';

export default class Viewer {

  scene: THREE.Scene
  camera: Camera
  renderUnit: RenderUnit
  sizes: Sizes
  model: Models

  isFullscreen: boolean = false;

  constructor() {

    this.scene = new THREE.Scene();

    this.sizes = new Sizes(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', () => {
        this.sizes.updateSizes(window.innerWidth, window.innerHeight);
    });

    this.renderUnit = new RenderUnit(this.sizes);
    this.camera = new Camera(this.scene, this.renderUnit, this.sizes);

    this.model = new Models(this.scene);

    this.startRenderLoop();
  }

  startRenderLoop() {
    const renderLoop = () => {
      //updated controls
      this.camera.controls.update();
      this.camera.controls.enableDamping = true;

      //render
      this.renderUnit.renderer.render(this.scene, this.camera.getActiveCamera());

      // Call tick again on the next frame
      window.requestAnimationFrame(renderLoop);
    }
    renderLoop();
  }
}