'use strict';

class Orange {

  constructor(size) {
    this._size = size;
  }

  create_orange(x, y, z) {

    var size = this._size

  	var geometry = new THREE.SphereGeometry(size, 30, 30, 0);
  	var material = new THREE.MeshStandardMaterial( {color: 0xed862d, wireframe: false});
  	var orange = new THREE.Mesh(geometry, material);

    orange.castShadow = true;
  	
  	orange.position.set(x, y, z);

  	return orange;
  }
}