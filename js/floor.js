'use strict';

class Floor extends MovableObject {

  constructor(height, x, y, z) {

    var floor = new THREE.Object3D();

    super(8000, -8000, 0, 80, 0, 0, 2 * height, cheerio, 2*height + height);

    

    var geometry = new THREE.TorusGeometry(2 * height, height, 10, 10, Math.PI * 2);
    var material = new THREE.MeshPhongMaterial({color: 0xf2c763, shininess: 10});
    var mesh = new THREE.Mesh(geometry, material);
    
    floor.add(mesh);

    cheerio.rotation.x = Math.PI / 2;
    cheerio.position.set(x, y, z);
    cheerio.castShadow = true;
  }
}