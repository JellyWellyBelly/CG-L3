'use strict';

class Butter extends MovableObject {

  constructor(size, x, y, z) {

    var butter = new THREE.Object3D();

    super(0, 0, 0, 0, 0, 0, size, butter);

  	this.addBase(butter, size, x, y, z);
    this.addButter(butter, size, x, y, z);

  }

  movementWithCollision() {}
  movementWithNoCollision() {}

  addBase(obj, size, x, y, z) {
    var geometry = new THREE.BoxGeometry(size, size / 4, 2 * size);
    var material = new THREE.MeshBasicMaterial( {color: 0x6d4e04, wireframe: false});
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y + size / 8, z);

    obj.add(mesh);

  }

  addButter(obj, size, x, y, z) {
    var geometry = new THREE.BoxGeometry(0.8 * size, 0.4 * size, 1.25 * size);
    var material = new THREE.MeshBasicMaterial( {color: 0xefea83, wireframe: false});
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y + size / 4 + 0.2 * size , z + 0.3 * size);

    obj.add(mesh);

  }
}
