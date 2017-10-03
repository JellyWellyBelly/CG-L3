'use strict';

class Table {

  constructor(size) {
    this._size = size;
  }

  create_table(x, y, z) {

  	var geometry = new THREE.BoxGeometry(this._size, this._size / 100, this._size);
  	var material = new THREE.MeshBasicMaterial( {color: 0x672c77});
  	var table = new THREE.Mesh(geometry, material);
  	
  	table.position.set(0, -9.5, 0);

  	return table;
  }
}

