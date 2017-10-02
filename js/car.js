var car, material, geometry, mesh;

function triangleGeometry(comp, alt, width) {

	var triangle = new THREE.Shape();

	triangle.moveTo( 0, 0 );
	triangle.lineTo(comp, 0);
	triangle.lineTo(comp, alt);
	
	var extrudeSettings = {
		steps: 1,
		amount: width,
		bevelEnabled: false,
		bevelThickness: 1,
		bevelSize: 1,
		bevelSegments: 1
	}

	geometry = new THREE.ExtrudeGeometry( triangle, extrudeSettings );
	geometry.center();
	material = new THREE.MeshStandardMaterial( { color: 0xff0ff0 } );
	mesh = new THREE.Mesh( geometry, material ) ;

	return mesh;
}


function addCarWing(obj, x, y, z) {
	'use strict';

	geometry = new THREE.BoxGeometry(1, 0.25, 5);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);


	obj.add(mesh);
}


function addCarWingSup(obj, x, y, z) {
	'use strict';

	geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 30);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	mesh.rotateZ(-Math.PI/6);
	obj.add(mesh);
}


function addTriangleGeometry(obj, comp, alt, width, x, y, z, rotx, roty, rotz) {

	mesh = triangleGeometry(comp, alt, width);

	mesh.rotateX(rotx);
	mesh.rotateY(roty);
	mesh.rotateZ(rotz);

	mesh.position.set(x+(comp/2), y+(alt/2), z);	
	

	obj.add(mesh);

}


function addCarEixoFront(obj, x, y, z) {
	'use strict';

	geometry = new THREE.CylinderGeometry(0.25, 0.25, 1, 10);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	mesh.rotateX(Math.PI/2);
	obj.add(mesh);
}

function addCarEixoBack(obj, x, y, z) {
	'use strict';

	geometry = new THREE.CylinderGeometry(0.25, 0.25, 0.5, 10);
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	mesh.rotateX(Math.PI/2);
	obj.add(mesh);
}

function addCarBack(obj, x, y, z) {
	'use strict';

	geometry = new THREE.BoxGeometry(1.5, 0.5, 3);

	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);


	obj.add(mesh);
}

function addCarChassi(obj, x, y, z) {
	'use strict';

	geometry = new THREE.BoxGeometry(6, 0.5, 2);
	material = new THREE.MeshStandardMaterial( { color: 0xff0ff0 } );
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);


	obj.add(mesh);
}


function addCarWheel(obj, x, y, z) {
	'use strict';

	geometry = new THREE.TorusGeometry(0.5, 0.2, 10, 75);
	material = new THREE.MeshStandardMaterial( { color: 0x000000 } );
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

	obj.add(mesh);
}


function createCar(x, y, z, size) {
	'use strict';

	car = new THREE.Object3D();


	addCarWheel(car, 2, 0, 2);
	addCarWheel(car, 2, 0, -2);
	addCarWheel(car, 7.75, 0, 2);
	addCarWheel(car, 7.75, 0, -2);
	addCarChassi(car, 4, 0, 0);
	addCarBack(car, 7.75, 0, 0);
	addCarEixoFront(car, 2, 0, 1.5);
	addCarEixoFront(car, 2, 0, -1.5);
	addCarEixoBack(car, 7.75, 0, 1.75);
	addCarEixoBack(car, 7.75, 0, -1.75);

	//triangulo parachoques
	addTriangleGeometry(car, 1, 0.5, 4, 0, -0.25, 0, 0, 0, 0); // addTriangleGeometry(obj, comprimento, altura, profundidade, posx, posy, posz, rotx, roty, rotz)
	
	//triangulo condutor 
	addTriangleGeometry(car, 4.75, 0.75, 2, 2.25, 0.25, 0, 0, 0, 0);

	//triangulo trazeiro
	addTriangleGeometry(car, 1.5, 0.75, 3, 7, 0.25, 0, 0, Math.PI, 0);

	//triangulos laterais
	addTriangleGeometry(car, 4.75, 0.5, 0.5, 2.25, -0.25, -1.25, -Math.PI/2,0,0);
	addTriangleGeometry(car, 4.75, 0.5, 0.5, 2.25, -0.25, 1.25, Math.PI/2,0,0);

	addCarWingSup(car, 8, 0.75, 1);
	addCarWingSup(car, 8, 0.75, -1);
	addCarWing(car, 8, 1, 0);

	car.castShadow = true;
	car.add(mesh);
	car.position.set(x, y, z);
	car.scale.set(size, size, size);
	
	return car;
}
