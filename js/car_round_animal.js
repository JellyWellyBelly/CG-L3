var car;
var material, mesh, geometry;
var size = 10;

function createCar(x, y, z, size_in) {
	'use strict';

	size = size_in;

	car = new THREE.Object3D();

	addCarBody(car, 0, 0, 0);
	addCarBase(car, 0, 0, 0);
	addMouth(car, size*cos(Pi()/7)*0.80, size*sin(Pi()/7)*0.80, 0); //polar coordinates
	
	addEye(car, size*sin(6*Pi()/16)*cos(5*Pi()/16),	//spherical coordinates
				size*sin(6*Pi()/16)*sin(5*Pi()/16),
				size*cos(6*Pi()/16))
	addEye(car, size*sin(10*Pi()/16)*cos(5*Pi()/16), //spherical coordinates
				size*sin(10*Pi()/16)*sin(5*Pi()/16),
				size*cos(10*Pi()/16))

	addEar(car, 0, size*sin(2*Pi()/3), size*cos(2*Pi()/3)); //polar coordinates
	addEar(car, 0, size*sin(Pi()/3), size*cos(Pi()/3));

	addAntennaBody(car, 1.25*size*cos(3*Pi()/4), 1.25*size*sin(3*Pi()/4), 0); //polar coordinates
	addAntennaTip(car, 1.5*size*cos(3*Pi()/4), 1.5*size*sin(3*Pi()/4), 0);

	addRoundWheel(car, size*cos(Pi()/4), 0, size*sin(Pi()/4)); //polar coordinates
	addRoundWheel(car, size*cos(-Pi()/4), 0, size*sin(-Pi()/4));
	addRoundWheel(car, size*cos(Pi()*(3/4)), 0, size*sin(Pi()*(3/4)));
	addRoundWheel(car, size*cos(Pi()*(-3/4)), 0, size*sin(Pi()*(-3/4)));

	car.position.set(x, y, z);

	return car;
}

function addCarBody(obj, x, y, z) {
	'use strict';

	geometry = new THREE.SphereGeometry(size, 30, 30, 0, Pi(), (-Pi()/2));
	material = new THREE.MeshBasicMaterial({color: 0xff4411, wireframe: true});

	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addCarBase(obj, x, y, z) { 
	'use strict';

	geometry = new THREE.CircleGeometry(size, 30);
	material = new THREE.MeshBasicMaterial({color: 0x007700, wireframe: true});

	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);
	mesh.rotateX(Pi()/2);

	obj.add(mesh);
}

function addRoundWheel(obj, x, y, z) {
	'use strict';
	
	geometry = new THREE.SphereGeometry((size/4), 15, 15);
	material = new THREE.MeshBasicMaterial({color: 0x0044aa, wireframe: true});

	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addMouth(obj, x, y, z) {
	'use strict';

	geometry = new THREE.SphereGeometry((size/3), 15, 15, 0, Pi());
	material = new THREE.MeshBasicMaterial({color: 0xff0055, wireframe: true});

	mesh = new THREE.Mesh(geometry, material);
	mesh.rotateZ(Pi()/4);
	mesh.rotateY(Pi()/2);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addEye(obj, x, y, z) {
	'use strict';
	
	geometry = new THREE.SphereGeometry((size/6), 10, 10);
	material = new THREE.MeshBasicMaterial({color: 0x888888, wireframe: true});

	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addEar(obj, x, y, z) {
	'use strict';

	geometry = new THREE.CylinderGeometry(size/3, size/3, size/20, 50, 1);
	material = new THREE.MeshBasicMaterial({color: 0xf488de, wireframe: true});

	mesh = new THREE.Mesh(geometry, material);
	mesh.rotateZ(Pi()/2);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addAntennaBody(obj, x, y, z) {
	'use strict';

	geometry = new THREE.BoxGeometry(size/2, size/20, size/20);
	material = new THREE.MeshBasicMaterial({color: 0xbbbb00, wireframe: true});

	mesh = new THREE.Mesh(geometry, material);
	mesh.rotateZ(3*Pi()/4);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function addAntennaTip(obj, x, y, z) {
	'use strict';

	geometry = new THREE.SphereGeometry(size/12, 8, 8);
	material = new THREE.MeshBasicMaterial({color: 0x55dd00, wireframe: true});

	mesh = new THREE.Mesh(geometry, material);
	mesh.rotateZ(3*Pi()/4);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}

function sin(x) {
	return Math.sin(x);
}

function cos(x) {
	return Math.cos(x);
}

function Pi() {
	return Math.PI;
}