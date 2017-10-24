'use strict';

class Cheerio extends MovableObject {

  constructor(height) {

    var cheerio = new THREE.Object3D();

    super(0, 0, 0, 0, 0, 0, null, cheerio, 2 + height);

    this._height = height;

    var geometry = new THREE.TorusGeometry(2, this._height, 10, 10, Math.PI * 2);
    var material = new THREE.MeshBasicMaterial({color: 0xf2c763});
    var cheerio = new THREE.Mesh(geometry, material);
    
    cheerio.rotation.x = Math.PI / 2;
    //cheerio.castShadow = true;

    this._mesh = cheerio;
  }

  movementWithCollision() {}
  movementWithNoCollision() {}

}