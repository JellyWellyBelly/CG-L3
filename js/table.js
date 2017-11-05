'use strict';

class Table {

  constructor(size) {
    this._size = size;
  }

  create_table() {
    var size = this._size;
    var height = size / 10;

  	var geometry = new THREE.BoxGeometry(size, height, size, size/50, height/50, size/50);
  	var material = new THREE.MeshPhongMaterial({color: 0x8B4513, shininess: 10});
  	var table = new THREE.Mesh(geometry, material);
  	
  	table.position.set(0, -height / 2, 0);

    this.addLeg(table, size / 4, size / 4);
    this.addLeg(table, size / 4, -size / 4);
    this.addLeg(table, -size / 4, size / 4);
    this.addLeg(table, -size / 4, -size / 4);
    this.addFloor(table);

    table.receiveShadow = true;

  	return table;
  }

  addLeg(table, x, z) {
    var height = this._size / 10;
    
    var geometry = new THREE.BoxGeometry(height, 2 * height, height, height/50, height/25, height/50);
    var material = new THREE.MeshPhongMaterial({color: 0x8B4513});
    var leg = new THREE.Mesh(geometry, material);

    leg.position.set(x, -(3 * height) / 2, z);

    table.add(leg);
  }

  addFloor(table) {
    var height = this._size / 10;
    
    var geometry = new THREE.PlaneGeometry(3000, 3000);
    var material = new THREE.MeshPhongMaterial({color: 0xaf7a1d});
    var floor = new THREE.Mesh(geometry, material);

    
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -(3 * height), 0);

    table.add(floor);
  }
}
