'use strict';

class Track {

  constructor() {
	  this._list = [];
  }

  create_track(scene) {
	var track = new THREE.Object3D();
	var height = 1.5;
	var i;
	var list = this._list;

	this.addHorizontalLine(track, -450, -400, height, 350, 700);
	this.addHorizontalLine(track, -300, -250, height, -150, 200);
	this.addHorizontalLine(track, 350, 400, height, 95, 90);
	this.addVerticalLine(track, -195, height, -100, -50, 500);
	this.addCircle(track, -350, height, -350, -Math.PI / 2, Math.PI / 2, 50, 100);
	this.addCircle(track, -200, height, -150, Math.PI / 2, Math.PI, 50, 100);
	this.addCircle(track, 300, height, 0, -Math.PI / 2, 0, 50, 100);
	this.addCircle(track, 250, height, 100, Math.PI, 3 * Math.PI / 2, 100, 150);
	this.addCircle(track, 250, height, 350, 0, Math.PI / 2, 100, 150);
	this.addCircle(track, 50, height, 350, Math.PI / 2, 3 * Math.PI / 2, 50, 100);
	this.addCircle(track, -150, height, 350, -Math.PI / 2, Math.PI / 2, 100, 150);
	this.addCircle(track, -350, height, 350, Math.PI / 2, 3 * Math.PI / 2, 50, 100);

	for(i = 0; i < list.length; i++) {
		scene.add(list[i]);
	}
	  
	return track;
  }

  addHorizontalLine(obj, x1, x2, y, z, size) { // adiciona 2 linhas horizontais de cheerios à pista
	var cheerio;
	var mesh;
	var i;

	for(i = 0; i < size; i += 10) {
		cheerio = new Cheerio(y);
		mesh = cheerio.getMesh();
		mesh.position.set(x1, y, z - i);
		obj.add(mesh);
	}

	for(i = 0; i < size; i += 10) {
		cheerio = new Cheerio(y);
		mesh = cheerio.getMesh();
		mesh.position.set(x2, y, z - i);
		obj.add(mesh);
	}
  }

    addVerticalLine(obj, x, y, z1, z2, size) { // adiciona 2 linhas verticais de cheerios à pista
		var cheerio;
		var mesh;
		var i;

		for(i = 0; i < size; i += 10) {
			cheerio = new Cheerio(y);
			mesh = cheerio.getMesh();
			mesh.position.set(x + i, y, z1);
			obj.add(mesh);
		}

		for(i = 0; i < size; i += 10) {
			cheerio = new Cheerio(y);
			mesh = cheerio.getMesh();
			mesh.position.set(x + i, y, z2);
			obj.add(mesh);
		}
	}

  addCircle(obj, x, y, z, phase_i, phase_f, r1, r2) { // adiciona 2 circunferencias de cheerios à pista
	var cheerio;
	var mesh;
	var i;

	for(i = phase_i; i < phase_f; i += (4 * Math.PI) / r1) {
		cheerio = new Cheerio(y);
		mesh = cheerio.getMesh();
		mesh.position.set(x - r1 * Math.sin(i), y, z - r1 * Math.cos(i));
		obj.add(mesh);
	}

	for(i = phase_i; i < phase_f; i += (4 * Math.PI) / r2) {
		cheerio = new Cheerio(y);
		mesh = cheerio.getMesh();
		mesh.position.set(x - r2 * Math.sin(i), y, z - r2 * Math.cos(i));
		obj.add(mesh);
	}
  }
}
