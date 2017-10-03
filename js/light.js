
'use strict';

class DirectionalLight {

  constructor() {
    
  }

  create_light(x, y, z) {
	
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );

	directionalLight.castShadow = true;

	directionalLight.shadow.mapSize.width = 1024;
	directionalLight.shadow.mapSize.height = 1024;

	directionalLight.shadow.camera.near = 5000;
	directionalLight.shadow.camera.far = 4000;
	directionalLight.shadow.camera.fov = 1000;

	return directionalLight;

  }
  
}

