'use strict';

class Track {

  constructor() {
  }

  create_track() {
	

	var track = new THREE.Object3D();

	this.addLine(-450, 0.5, 350, 700, 'v', track);
	this.addLine(-400, 0.5, 350, 700, 'v', track);
	this.addLine(-300, 0.5, -150, 200, 'v', track);
	this.addLine(-250, 0.5, -150, 200, 'v', track);
	this.addLine(-200, 0.5, -100, 500, 'h', track);
	this.addLine(-200, 0.5, -50, 500, 'h', track);
	this.addLine(350, 0.5, 100, 100, 'v', track);
	this.addLine(400, 0.5, 100, 100, 'v', track);
	this.addCircle(-350, 0.5, -350, -Math.PI / 2, Math.PI / 2, 50, track);
	this.addCircle(-350, 0.5, -350, -Math.PI / 2, Math.PI / 2, 100, track);
	this.addCircle(-200, 0.5, -150, Math.PI / 2, Math.PI, 50, track);
	this.addCircle(-200, 0.5, -150, Math.PI / 2, Math.PI, 100, track);
	this.addCircle(300, 0.5, 0, -Math.PI / 2, 0, 50, track);
	this.addCircle(300, 0.5, 0, -Math.PI / 2, 0, 100, track);
	this.addCircle(250, 0.5, 100, Math.PI, 3 * Math.PI / 2, 100, track);
	this.addCircle(250, 0.5, 100, Math.PI, 3 * Math.PI / 2, 150, track);
	this.addCircle(250, 0.5, 350, 0, Math.PI / 2, 100, track);
	this.addCircle(250, 0.5, 350, 0, Math.PI / 2, 150, track);
	this.addCircle(50, 0.5, 350, Math.PI / 2, 3 * Math.PI / 2, 50, track);
	this.addCircle(50, 0.5, 350, Math.PI / 2, 3 * Math.PI / 2, 100, track);
	this.addCircle(-150, 0.5, 350, -Math.PI / 2, Math.PI / 2, 100, track);
	this.addCircle(-150, 0.5, 350, -Math.PI / 2, Math.PI / 2, 150, track);
	this.addCircle(-350, 0.5, 350, Math.PI / 2, 3 * Math.PI / 2, 50, track);
	this.addCircle(-350, 0.5, 350, Math.PI / 2, 3 * Math.PI / 2, 100, track);

	return track;
  }

  addLine(x, y, z, size, orientation, track) {


	var cheerio = new Cheerios();
	var mesh;
	var i;

	//console.log(cheerio);

	if(orientation == 'v') {
		for(i = 0; i < size; i += 10) {
			mesh = cheerio.getCheerio();
			mesh.position.set(x, y, z - i);
			track.add(mesh);
		}
	}
	else if(orientation == 'h') {
		for(i = 0; i < size; i += 10) {
			mesh = cheerio.getCheerio();
			mesh.position.set(x + i, y, z);
			track.add(mesh);
		}
	}
  }

  addCircle(x, y, z, phase_i, phase_f, radious, track) {
	

	var cheerio = new Cheerios();
	var mesh;
	var i;

	for(i = phase_i; i < phase_f; i += (4 * Math.PI) / radious) {
		mesh = cheerio.getCheerio();
		mesh.position.set(x - radious * Math.sin(i), y, z - radious * Math.cos(i));
		track.add(mesh);
	}
  }

}
