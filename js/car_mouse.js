'use strict';

class CarMouse {

	constructor(size, x, y, z) {
		this._size = size;
		this._maxSpeed = 15000;
		this._minSpeed = -20000;
		this._acceleration = 0;
		this._friction = 0;
		this._currentSpeed = 0;
		this._turningAngle = 0;
		this._clock = new THREE.Clock();

		var car = new THREE.Object3D();

		this.addCarBody(car, 0, 0, 0);
		this.addCarBase(car, 0, 0, 0);
		this.addMouth(car, size*Math.cos(Math.PI / 7) * 0.80, size * Math.sin(Math.PI / 7) * 0.80, 0); //polar coordinates

		this.addEye(car, size * Math.sin(6 * Math.PI / 16) * Math.cos(5 * Math.PI / 16),	//spherical coordinates
				         size * Math.sin(6 * Math.PI / 16) * Math.sin(5 * Math.PI / 16),
					     size * Math.cos(6 * Math.PI / 16))
		this.addEye(car, size * Math.sin(10 * Math.PI / 16) *Math.cos(5 * Math.PI / 16), //spherical coordinates
				     	 size * Math.sin(10 * Math.PI / 16) *Math.sin(5 * Math.PI / 16),
					     size * Math.cos(10 * Math.PI / 16))

		this.addEar(car, 0, size * Math.sin(2 * Math.PI / 3), size * Math.cos(2 * Math.PI / 3)); //polar coordinates
		this.addEar(car, 0, size * Math.sin(Math.PI / 3), size * Math.cos(Math.PI / 3));

		this.addAntennaBody(car, 1.25 * size * Math.cos(3 * Math.PI / 4), 1.25 * size * Math.sin(3 * Math.PI / 4), 0); //polar coordinates
		this.addAntennaTip(car, 1.5 * size * Math.cos(3 * Math.PI / 4), 1.5 * size * Math.sin(3 * Math.PI / 4), 0);

		this.addRoundWheel(car, size * Math.cos(Math.PI / 4), 0, size * Math.sin(Math.PI / 4)); //polar coordinates
		this.addRoundWheel(car, size * Math.cos(-Math.PI / 4), 0, size * Math.sin(-Math.PI / 4));
		this.addRoundWheel(car, size * Math.cos(Math.PI * (3 / 4)), 0, size * Math.sin(Math.PI * (3 / 4)));
		this.addRoundWheel(car, size * Math.cos(Math.PI * (-3 / 4)), 0, size * Math.sin(Math.PI * (-3 / 4)));

		car.position.set(x, y + size / 8, z);

		this._mesh = car;
	}

	getMesh() {
		return this._mesh;
	}

	update() {
		var mesh = this._mesh;
		var dt = this._clock.getDelta();
		var acc = this._acceleration;
		var v0 = this._currentSpeed;
		var vmax = this._maxSpeed;
		var vmin = this._minSpeed;
		var friction = this._friction;
		var angle = this._turningAngle;

		if(acc > 0) { // wants to drive forward
			v0 = Math.min(v0 + acc*dt, vmax*dt);
		}
		else if(acc < 0) { // wants to drive backwards
			v0 = Math.max(v0 + acc*dt, vmin*dt);
		}
		else { // useless driver
		 	if (v0 >= 0.5) {
		 		friction = -80; //constant, to be tweeked
				v0 = v0 + friction*dt;
			}
			else if (v0 <= -0.5){
				friction = 120; //constant, to be tweeked
				v0 = v0 + friction*dt;
			}
			else {
				v0 = 0;
			}
		}

		if (dt > 0) {
			mesh.rotateY(angle * (v0/(vmax*dt)));
		}

		mesh.translateX(v0*dt); // dx = v0 * dt

		this._currentSpeed = v0;
		this._mesh = mesh;
	}

	setAcc(acc) {
		this._acceleration = acc;
	}

	setTurningAngle(angle) {
		this._turningAngle = angle;
	}


	addCarBody(obj, x, y, z) {
		var size = this._size;
		var geometry = new THREE.SphereGeometry(size, 30, 30, 0, Math.PI);
		var material = new THREE.MeshBasicMaterial({color: 0xff4411});
		var mesh = new THREE.Mesh(geometry, material);

		mesh.rotateX(-Math.PI / 2);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addCarBase(obj, x, y, z) { 
		var size = this._size;
		var geometry = new THREE.CircleGeometry(size, 100);
		var material = new THREE.MeshBasicMaterial({color: 0x007700});
		var mesh = new THREE.Mesh(geometry, material);

		mesh.position.set(x, y, z);
		mesh.rotateX(Math.PI / 2);

		obj.add(mesh);
	}

	addRoundWheel(obj, x, y, z) {
		var size = this._size;
		var geometry = new THREE.SphereGeometry((size / 4), 15, 15);
		var material = new THREE.MeshBasicMaterial({color: 0x0044aa});
		var mesh = new THREE.Mesh(geometry, material);
		
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addMouth(obj, x, y, z) {
		var size = this._size;
		var geometry = new THREE.SphereGeometry((size / 3), 15, 15, 0, Math.PI);
		var material = new THREE.MeshBasicMaterial({color: 0xff0055});
		var mesh = new THREE.Mesh(geometry, material);
		
		mesh.rotateZ(Math.PI / 4);
		mesh.rotateY(Math.PI / 2);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addEye(obj, x, y, z) {
		var size = this._size;
		var geometry = new THREE.SphereGeometry((size / 6), 10, 10);
		var material = new THREE.MeshBasicMaterial({color: 0x888888});
		var mesh = new THREE.Mesh(geometry, material);

		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addEar(obj, x, y, z) {
		var size = this._size;
		var geometry = new THREE.CylinderGeometry(size / 3, size / 3, size / 20, 50, 1);
		var material = new THREE.MeshBasicMaterial({color: 0xf488de});
		var mesh = new THREE.Mesh(geometry, material);

		mesh.rotateZ(Math.PI / 2);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addAntennaBody(obj, x, y, z) {
		var size = this._size;
		var geometry = new THREE.BoxGeometry(size / 2, size / 20, size / 20);
		var material = new THREE.MeshBasicMaterial({color: 0xbbbb00});
		var mesh = new THREE.Mesh(geometry, material);

		mesh.rotateZ(3 * Math.PI / 4);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addAntennaTip(obj, x, y, z) {
		var size = this._size;
		var geometry = new THREE.SphereGeometry(size / 12, 8, 8);
		var material = new THREE.MeshBasicMaterial({color: 0x55dd00});
		var mesh = new THREE.Mesh(geometry, material);
		
		mesh.rotateZ(3 * Math.PI / 4);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}
}
