import * as THREE from "three";
import Camera from './Camera';
import RenderUnit from './RenderUnit';
import Sizes from './Sizes';
import Models from './sceneContent/Model';
import ContentArea from './sceneContent/ContentArea';
import AreaGenerator from './sceneContent/AreaGenerator';

import Environment from "./sceneContent/Environment";

export default class Viewer {

  scene: THREE.Scene
  camera: Camera
  renderUnit: RenderUnit
  sizes: Sizes
  model: Models
  environment: Environment

  isFullscreen: boolean = false;

  constructor() {

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#222222');

    this.sizes = new Sizes(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', () => {
        this.sizes.updateSizes(window.innerWidth, window.innerHeight);
    });

    this.renderUnit = new RenderUnit(this.sizes);
    this.camera = new Camera(this.scene, this.renderUnit, this.sizes);
    this.environment = new Environment(this.scene);
    //this.model = new Models(this.scene);

    const generator = new AreaGenerator(this.scene, this.camera);
    generator.addNewContentArea("three.js");
    generator.addNewContentArea("test");
    console.log(generator);

    

    this.startRenderLoop();
  }

  startRenderLoop() {
    const renderLoop = () => {
      //updated controls
      this.camera.controls.update();
      if (this.camera.inTransition) this.camera.updateCameraPosition();

      //render
      this.renderUnit.renderer.render(this.scene, this.camera.getActiveCamera());

      // Call tick again on the next frame
      window.requestAnimationFrame(renderLoop);
    }
    renderLoop();
  }
}