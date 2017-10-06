'use strict';

class Cheerio extends THREE.Mesh {

  constructor(height) {
  	super();
    this._height = height;

    var geometry = new THREE.TorusGeometry(2, this._height, 10, 10, Math.PI * 2);
    var material = new THREE.MeshBasicMaterial({color: 0xf2c763});
    var cheerio = new THREE.Mesh(geometry, material);
    
    cheerio.rotation.x = Math.PI / 2;
    //cheerio.castShadow = true;

    this._mesh = cheerio;
  }

  getMesh() {
  	return this._mesh;
  }
}