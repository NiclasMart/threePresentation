import * as THREE from 'three';
import Sizes from './Sizes';



export default class RenderUnit {
  renderer: THREE.WebGLRenderer
  canvas: Element | null;

  constructor(sizes: Sizes) {

    this.canvas = document.querySelector('canvas.webgl')

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: window.devicePixelRatio < 2
    })

    this.resizeRenderer(sizes);
    sizes.onChange.push(this.resizeRenderer);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.5
  }

  resizeRenderer = (sizes: Sizes) => {
    this.renderer.setSize(sizes.width, sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}