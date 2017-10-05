'use strict';

class CarMouse {

	constructor(size) {
		this._size = size
	}

	getMesh(x, y, z) {
		'use strict';

		var size = this._size;
		var car = new THREE.Object3D();

		this.addCarBody(car, 0, 0, 0);
		this.addCarBase(car, 0, 0, 0);
		this.addMouth(car, size*Math.cos(Math.PI/7)*0.80, size*Math.sin(Math.PI/7)*0.80, 0); //polar coordinates

		this.addEye(car, size*Math.sin(6*Math.PI/16)*Math.cos(5*Math.PI/16),	//spherical coordinates
				         size*Math.sin(6*Math.PI/16)*Math.sin(5*Math.PI/16),
					     size*Math.cos(6*Math.PI/16))
		this.addEye(car, size*Math.sin(10*Math.PI/16)*Math.cos(5*Math.PI/16), //spherical coordinates
				     	 size*Math.sin(10*Math.PI/16)*Math.sin(5*Math.PI/16),
					     size*Math.cos(10*Math.PI/16))

		this.addEar(car, 0, size*Math.sin(2*Math.PI/3), size*Math.cos(2*Math.PI/3)); //polar coordinates
		this.addEar(car, 0, size*Math.sin(Math.PI/3), size*Math.cos(Math.PI/3));

		this.addAntennaBody(car, 1.25*size*Math.cos(3*Math.PI/4), 1.25*size*Math.sin(3*Math.PI/4), 0); //polar coordinates
		this.addAntennaTip(car, 1.5*size*Math.cos(3*Math.PI/4), 1.5*size*Math.sin(3*Math.PI/4), 0);

		this.addRoundWheel(car, size*Math.cos(Math.PI/4), 0, size*Math.sin(Math.PI/4)); //polar coordinates
		this.addRoundWheel(car, size*Math.cos(-Math.PI/4), 0, size*Math.sin(-Math.PI/4));
		this.addRoundWheel(car, size*Math.cos(Math.PI*(3/4)), 0, size*Math.sin(Math.PI*(3/4)));
		this.addRoundWheel(car, size*Math.cos(Math.PI*(-3/4)), 0, size*Math.sin(Math.PI*(-3/4)));

		car.position.set(x, y + size/4, z);

		return car;
	}

	addCarBody(obj, x, y, z) {
		'use strict';

		var size = this._size;
		var geometry = new THREE.SphereGeometry(size, 30, 30, 0, Math.PI);
		var material = new THREE.MeshBasicMaterial({color: 0xff4411});
		var mesh = new THREE.Mesh(geometry, material);

		mesh.rotateX(-Math.PI/2);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addCarBase(obj, x, y, z) { 
		'use strict';

		var size = this._size;
		var geometry = new THREE.CircleGeometry(size, 100);
		var material = new THREE.MeshBasicMaterial({color: 0x007700});
		var mesh = new THREE.Mesh(geometry, material);

		mesh.position.set(x, y, z);
		mesh.rotateX(Math.PI/2);

		obj.add(mesh);
	}

	addRoundWheel(obj, x, y, z) {
		'use strict';

		var size = this._size;
		var geometry = new THREE.SphereGeometry((size/4), 15, 15);
		var material = new THREE.MeshBasicMaterial({color: 0x0044aa});
		var mesh = new THREE.Mesh(geometry, material);
		
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addMouth(obj, x, y, z) {
		'use strict';

		var size = this._size;
		var geometry = new THREE.SphereGeometry((size/3), 15, 15, 0, Math.PI);
		var material = new THREE.MeshBasicMaterial({color: 0xff0055});
		var mesh = new THREE.Mesh(geometry, material);
		
		mesh.rotateZ(Math.PI/4);
		mesh.rotateY(Math.PI/2);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addEye(obj, x, y, z) {
		'use strict';

		var size = this._size;
		var geometry = new THREE.SphereGeometry((size/6), 10, 10);
		var material = new THREE.MeshBasicMaterial({color: 0x888888});
		var mesh = new THREE.Mesh(geometry, material);

		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addEar(obj, x, y, z) {
		'use strict';

		var size = this._size;
		var geometry = new THREE.CylinderGeometry(size/3, size/3, size/20, 50, 1);
		var material = new THREE.MeshBasicMaterial({color: 0xf488de});
		var mesh = new THREE.Mesh(geometry, material);

		mesh.rotateZ(Math.PI/2);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addAntennaBody(obj, x, y, z) {
		'use strict';

		var size = this._size;
		var geometry = new THREE.BoxGeometry(size/2, size/20, size/20);
		var material = new THREE.MeshBasicMaterial({color: 0xbbbb00});
		var mesh = new THREE.Mesh(geometry, material);

		mesh.rotateZ(3*Math.PI/4);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addAntennaTip(obj, x, y, z) {
		'use strict';

		var size = this._size;
		var geometry = new THREE.SphereGeometry(size/12, 8, 8);
		var material = new THREE.MeshBasicMaterial({color: 0x55dd00});
		var mesh = new THREE.Mesh(geometry, material);
		
		mesh.rotateZ(3*Math.PI/4);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}
}
