'use strict';

class Track {

  constructor() {
	  this._list = [];
  }

  create_track() {
	var height = 1.5;
	var i;
	var ratio = 1.5;

	this.addHorizontalLine(-450, -400, height, 325, 680, ratio);
	this.addHorizontalLine(-300, -250, height, -170, 180, ratio);
	this.addHorizontalLine(350, 400, height, 80, 80, ratio);
	this.addHorizontalLine(-300, -250, height, 340, 100, ratio);
	this.addHorizontalLine(-50, 0, height, 330, 80, ratio);
	this.addVerticalLine(-185, height, -100, -50, 480, ratio);
	this.addCircle(-350, height, -350, -Math.PI / 2, Math.PI / 2, 50, 100, ratio);
	this.addCircle(-200, height, -150, Math.PI / 2, Math.PI, 50, 100, ratio);
	this.addCircle(300, height, 0, -Math.PI / 2, 0, 50, 100, ratio);
	this.addCircle(250, height, 100, 19 * Math.PI / 18, 3 * Math.PI / 2, 100, 150, ratio);
	this.addCircle(250, height, 350, 0, Math.PI / 2, 100, 150, ratio);
	this.addCircle(50, height, 350, Math.PI / 2, 3 * Math.PI / 2, 50, 100, ratio);
	this.addCircle(-150, height, 250, -Math.PI / 2, Math.PI / 2, 100, 150, ratio);
	this.addCircle(-350, height, 350, Math.PI / 2, 3 * Math.PI / 2, 50, 100, ratio);

	var geometry = new THREE.TorusGeometry(50, 1, 8, 6, Math.PI);
	var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
	var torus1 = new THREE.Mesh(geometry, material);

	torus1.position.set(10, 0, -75);
	torus1.rotation.set(0, Math.PI / 2, 0);

	this._start = torus1;
  }

  addHorizontalLine(x1, x2, y, z, size, ratio) { // adiciona 2 linhas horizontais de cheerios à pista
	var cheerio1, cheerio2;
	var i;
	var list = this._list;

	for(i = 0; i < size; i += 20) {
		cheerio1 = new Cheerio(ratio * y, x1, y, z - i);
		list.push(cheerio1);
		cheerio2 = new Cheerio(ratio * y, x2, y, z - i);
		list.push(cheerio2);
	}
  }

    addVerticalLine(x, y, z1, z2, size, ratio) { // adiciona 2 linhas verticais de cheerios à pista
		var cheerio1, cheerio2;
		var i;
		var list = this._list;

		for(i = 0; i < size; i += 20) {
			cheerio1 = new Cheerio(ratio * y, x + i, y, z1);
			list.push(cheerio1);
			cheerio2 = new Cheerio(ratio * y, x + i, y, z2);
			list.push(cheerio2);
		}
	}

  addCircle(x, y, z, phase_i, phase_f, r1, r2, ratio) { // adiciona 2 circunferencias de cheerios à pista
	var cheerio;
	var i;
	var list = this._list;

	for(i = phase_i; i < phase_f; i += (8 * Math.PI) / r1) {
		cheerio = new Cheerio(ratio * y, x - r1 * Math.sin(i), y, z - r1 * Math.cos(i));
		list.push(cheerio);
	}

	for(i = phase_i; i < phase_f; i += (8 * Math.PI) / r2) {
		cheerio = new Cheerio(ratio * y, x - r2 * Math.sin(i), y, z - r2 * Math.cos(i));
		list.push(cheerio);
	}
  }

  getAllCheerios() {
	return this._list;
  }

  getStart() {
  	return this._start;
  }
}
