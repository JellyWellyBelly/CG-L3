class Cheerios extends THREE.Mesh{

  constructor(height) {
  	super();
    this._height = height;
  }

  getCheerio() {

  	var geometry = new THREE.TorusGeometry(2, this._height, 15, 15, Math.PI * 2);
  	var material = new THREE.MeshStandardMaterial({color: 0xf2c763});
  	var cheerio = new THREE.Mesh(geometry, material);
  	
  	cheerio.rotation.x = Math.PI / 2;
    cheerio.castShadow = true;

  	return cheerio;
  }

  isCheerio() {
  	return true;
  }
}