'use strict';

class DirectionalLight {

  constructor() {
  }

  create_light(x, y, z) {
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 1, 100);

	directionalLight.castShadow = true;

	directionalLight.position.set(x, y, z);
	
	return directionalLight;
  } 
}
