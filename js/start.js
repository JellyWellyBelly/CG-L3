'use strict';

class Start extends MovableObject {

  constructor(radius) {

    var start = new THREE.Object3D();

    super(0, 0, 0, 0, 0, 0, radius, start, -5);

    var geometry = new THREE.TorusGeometry(radius, 1, 8, 6, Math.PI);
    var material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
    var torus1 = new THREE.Mesh(geometry, material);

    start.add(torus1);

    start.position.set(10, 0, -75);
    start.rotation.set(0, Math.PI / 2, 0);
  }
}