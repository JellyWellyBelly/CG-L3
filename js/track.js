var track;

var material, geometry, mesh, i;

function create_track() {
	'use strict';

	track = new THREE.Object3D();

	addLine(-450, -10, 350, 700, 'v');
	addLine(-400, -10, 350, 700, 'v');
	addLine(-300, -10, -150, 200, 'v');
	addLine(-250, -10, -150, 200, 'v');
	addLine(-200, -10, -100, 500, 'h');
	addLine(-200, -10, -50, 500, 'h');
	addLine(350, -10, 100, 100, 'v');
	addLine(400, -10, 100, 100, 'v');
	addCircle(-350, -10, -350, -Math.PI / 2, Math.PI / 2, 50);
	addCircle(-350, -10, -350, -Math.PI / 2, Math.PI / 2, 100);
	addCircle(-200, -10, -150, Math.PI / 2, Math.PI, 50);
	addCircle(-200, -10, -150, Math.PI / 2, Math.PI, 100);
	addCircle(300, -10, 0, -Math.PI / 2, 0, 50);
	addCircle(300, -10, 0, -Math.PI / 2, 0, 100);
	addCircle(250, -10, 100, Math.PI, 3 * Math.PI / 2, 100);
	addCircle(250, -10, 100, Math.PI, 3 * Math.PI / 2, 150);
	addCircle(250, -10, 350, 0, Math.PI / 2, 100);
	addCircle(250, -10, 350, 0, Math.PI / 2, 150);
	addCircle(50, -10, 350, Math.PI / 2, 3 * Math.PI / 2, 50);
	addCircle(50, -10, 350, Math.PI / 2, 3 * Math.PI / 2, 100);
	addCircle(-150, -10, 350, -Math.PI / 2, Math.PI / 2, 100);
	addCircle(-150, -10, 350, -Math.PI / 2, Math.PI / 2, 150);
	addCircle(-350, -10, 350, Math.PI / 2, 3 * Math.PI / 2, 50);
	addCircle(-350, -10, 350, Math.PI / 2, 3 * Math.PI / 2, 100);

	return track;
}

function addLine(x, y, z, size, orientation) {
	'use strict'

	if(orientation == 'v') {
		for(i = 0; i < size; i += 10) {
			mesh = create_cheerio();
			mesh.position.set(x, y, z - i);
			track.add(mesh);
		}
	}
	else if(orientation == 'h') {
		for(i = 0; i < size; i += 10) {
			mesh = create_cheerio();
			mesh.position.set(x + i, y, z);
			track.add(mesh);
		}
	}
}

function addCircle(x, y, z, phase_i, phase_f, radious) {
	'use strict'

	for(i = phase_i; i < phase_f; i += (4 * Math.PI) / radious) {
		mesh = create_cheerio();
		mesh.position.set(x - radious * Math.sin(i), y, z - radious * Math.cos(i));
		track.add(mesh);
	}
}