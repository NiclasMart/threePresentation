import * as THREE from "three"

export default class Environment {
  private environmentalMaps: THREE.CubeTexture[] = []

  constructor(scene: THREE.Scene) {
    //this.setupEnvironmentMap(scene)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    scene.add(directionalLight)
    directionalLight.position.set(1, 1, 1)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const floorMat = new THREE.MeshBasicMaterial();
    const floor = new THREE.Mesh(floorGeometry, floorMat);
    floor.rotateX(-Math.PI / 2)
    floor.position.y = -1
    scene.add(floor);

  }

  setupEnvironmentMap(scene: THREE.Scene) {
    // const cubeTextureLoader = new THREE.CubeTextureLoader()
    // this.environmentalMaps.push(cubeTextureLoader.load([
    //   'assets/envMap/01/px.png',
    //   'assets/envMap/01/nx.png',
    //   'assets/envMap/01/py.png',
    //   'assets/envMap/01/ny.png',
    //   'assets/envMap/01/pz.png',
    //   'assets/envMap/01/nz.png']
    // ))
    // this.environmentalMaps.push(cubeTextureLoader.load([
    //   'assets/envMap/02/px.png',
    //   'assets/envMap/02/nx.png',
    //   'assets/envMap/02/py.png',
    //   'assets/envMap/02/ny.png',
    //   'assets/envMap/02/pz.png',
    //   'assets/envMap/02/nz.png']
    // ))

    scene.background = this.environmentalMaps[0]
    scene.environment = this.environmentalMaps[0]
  }

  switchEnvironmentMap(scene: THREE.Scene, useAIMap: boolean) {
    const mapIndex = (useAIMap ? 1 : 0)
    scene.background = this.environmentalMaps[mapIndex]
    scene.environment = this.environmentalMaps[mapIndex]
  }
}