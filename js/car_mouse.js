'use strict';	

class CarMouse extends MovableObject {

	constructor(size, x, y, z) {

		var car = new THREE.Object3D();

	    var phongMaterial = new THREE.MeshPhongMaterial({shininess : 50});
	    var lambertMaterial = new THREE.MeshLambertMaterial();

		super(8000, -12000, 0, 0, 0, 0, size, car, size, phongMaterial, lambertMaterial);

		this._spawnPos = [x, y, z];
		this._headLights = [];
		this._switch = "ON";

		this.addCarBody(car, 0, 0, 0);
		this.addMouth(car, size*Math.cos(Math.PI / 7) * 0.80, size * Math.sin(Math.PI / 7) * 0.80, 0); //polar coordinates

		this.addEye(car, size * Math.sin(6 * Math.PI / 16) * Math.cos(5 * Math.PI / 16),	//spherical coordinates
		 		         size * Math.sin(6 * Math.PI / 16) * Math.sin(5 * Math.PI / 16),
		 			     size * Math.cos(6 * Math.PI / 16));
		this.addEye(car, size * Math.sin(10 * Math.PI / 16) *Math.cos(5 * Math.PI / 16), //spherical coordinates
		 		     	 size * Math.sin(10 * Math.PI / 16) *Math.sin(5 * Math.PI / 16),
		 			     size * Math.cos(10 * Math.PI / 16));

		this.addEar(car, 0, size * Math.sin(2 * Math.PI / 3), size * Math.cos(2 * Math.PI / 3)); //polar coordinates
		this.addEar(car, 0, size * Math.sin(Math.PI / 3), size * Math.cos(Math.PI / 3));

		this.addAntennaBody(car, size * Math.cos(3 * Math.PI / 4), size * Math.sin(3 * Math.PI / 4), 0); //polar coordinates
		this.addAntennaTip(car, 1.5 * size * Math.cos(3 * Math.PI / 4), 1.5 * size * Math.sin(3 * Math.PI / 4), 0);

		this.addRoundWheel(car, size * Math.cos(Math.PI / 4), 0, size * Math.sin(Math.PI / 4)); //polar coordinates
		this.addRoundWheel(car, size * Math.cos(-Math.PI / 4), 0, size * Math.sin(-Math.PI / 4));
		this.addRoundWheel(car, size * Math.cos(Math.PI * (3 / 4)), 0, size * Math.sin(Math.PI * (3 / 4)));
		this.addRoundWheel(car, size * Math.cos(Math.PI * (-3 / 4)), 0, size * Math.sin(Math.PI * (-3 / 4)));

		this.flipLight();

		car.position.set(x, y + size / 8, z);
	}

	update(scene_elements) {
		
		var collision = null;
		var rot = this._mesh.rotation;
		var pos = this._mesh.position;
		var dt = this._clock.getDelta();
		
		/* Current rotation */
		var rotX = rot.x;
		var rotY = rot.y;
		var rotZ = rot.z;

		/* Current position */
		var posX = pos.x;
		var posY = pos.y;
		var posZ = pos.z;

		this.movementWithNoCollision(dt); /* Moves the object to see if there is collision */

		collision = super.checkCollision(this, scene_elements); /* Checks collision */
		
		this._mesh.position.set(posX, posY, posZ);	/* Brings the position back to the current frame */
		this._mesh.rotation.set(rotX, rotY, rotZ);	/* Brings the rotation back to the current frame */

		if (collision == null) {
			this.movementWithNoCollision(dt);
		}

		else {
			this.movementWithCollision(collision, dt);
		}

		if ((Math.abs(posX) > 500) || (Math.abs(posZ) > 500)) {
			this.killMe();
		}
	}

	movementWithCollision(collision, dt) {

		/* Collides with Butter */
		if (collision instanceof Butter) {
			this._currentSpeed = 0;
		}

		/* Collides with Orange */
		else if (collision instanceof Orange) {
			this.killMe();
		}
		
		/* Collides with Cheerio */
		else if (collision instanceof Cheerio) {

			var vec = new THREE.Vector3();
			var v0 = this._currentSpeed;
			
			var car_pos = this._mesh.position;
			var cheerio_pos = collision._mesh.position;

			this._currentSpeed = v0 / 2;

			vec.subVectors(cheerio_pos, car_pos);

			collision.startMoving(Math.abs(v0*1.5), vec, dt);

		}

		/* Undefined goes through object*/
		else {}

	}

	movementWithNoCollision(dt) {

		var vmax = this._maxSpeed;
		var vmin = this._minSpeed;
		var acc = this._acceleration;
		var friction = this._friction;
		var v0 = this._currentSpeed;
		var angle = this._turningAngle;
		var mesh = this._mesh;

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

		if ((dt > 0) && (vmax > 0)) {
			mesh.rotateY(angle * (v0/(vmax*dt)));
		}

		mesh.translateX(v0 * dt); // dx = v0 * dt
		
		this._currentSpeed = v0;
		this._mesh = mesh;

	}

	flipLight() {
		var headLights = this._headLights;
		var size = this._size;

		for(var i = 0; i < headLights.length; i++) {
			if(this._switch.localeCompare("ON") == 0){
				headLights[i].intensity = 0;
			}
			else {
				headLights[i].intensity = 3;
			}
		}
		
		if(this._switch.localeCompare("ON") == 0){
			this._switch = "OFF";
		}
		else {
			this._switch = "ON";
		}
	}

	killMe() {
		var x = this._spawnPos[0];
		var y = this._spawnPos[1] + (this._size / 8);
		var z = this._spawnPos[2];

		this._mesh.position.set(x, y, z);
		this._mesh.rotation.set(0,0,0);

		loseLife();
	}

	setAcc(acc) {
		this._acceleration = acc;
	}

	setTurningAngle(angle) {
		this._turningAngle = angle;
	}


	addCarBody(obj, x, y, z) {
		var size = this._size;
		var geometry = this.create_sphere(size, Math.PI / 2, 25, 25);
		var material = new THREE.MeshPhongMaterial({color: 0xff4411});
		var mesh = new THREE.Mesh(geometry, material);

		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addRoundWheel(obj, x, y, z) {
		var size = this._size;
		var geometry = this.create_sphere(size / 4, Math.PI, 10, 10);
		var material = new THREE.MeshPhongMaterial({color: 0x0044aa});
		var mesh = new THREE.Mesh(geometry, material);
		
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addMouth(obj, x, y, z) {
		var size = this._size;
		var geometry = this.create_sphere(size / 3, Math.PI, 10, 10);
		var material = new THREE.MeshPhongMaterial({color: 0xff0055});
		var mesh = new THREE.Mesh(geometry, material);
		
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addEye(obj, x, y, z) {
		var size = this._size;
		var geometry = this.create_sphere((size / 6), Math.PI, 10, 10);
		var material = new THREE.MeshPhongMaterial({color: 0x888888});
		var mesh = new THREE.Mesh(geometry, material);
		var headLight = new THREE.SpotLight(0xffffff, 3, 50 * size, Math.PI/2, 1, 2);		

		headLight.position.set(x * 1.4, y, z);
		headLight.castShadow = true;
		headLight.target.position.set(x * 1.5, y, z)

		mesh.position.set(x, y, z);

		obj.add(headLight.target);
		obj.add(headLight);
		obj.add(mesh);

		this._headLights.push(headLight);
	}

	addEar(obj, x, y, z) {
		var size = this._size;
		var geometry = this.create_cilinder(size / 3, size / 20, 2*Math.PI, 30);
		var material = new THREE.MeshPhongMaterial({color: 0xf488de});
		var mesh = new THREE.Mesh(geometry, material);

		mesh.rotateZ(Math.PI / 2);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addAntennaBody(obj, x, y, z) {
		var size = this._size;
		var geometry = this.create_cilinder(size / 20, size / 2, 2*Math.PI, 10);
		var material = new THREE.MeshPhongMaterial({color: 0xbbbb00});
		var mesh = new THREE.Mesh(geometry, material);

		mesh.rotateZ(Math.PI / 4);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	addAntennaTip(obj, x, y, z) {
		var size = this._size;
		var geometry = this.create_sphere(size / 12, Math.PI, 10, 10);
		var material = new THREE.MeshPhongMaterial({color: 0x55dd00});
		var mesh = new THREE.Mesh(geometry, material);
		
		mesh.rotateZ(3 * Math.PI / 4);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}

	create_sphere(r, phase_f, n_levels, n_vertices) {
		var geometry = new THREE.Geometry();
		var i, j;
		var vert;
		var first, last;
		
		for(i = 0; i <= phase_f; i += phase_f / (n_levels - 1)) {  // primeira parte -> calcular as coordenadas dos pontos a utilizar
			if(i == 0 || i + (0.1 /(n_levels - 1)) >= Math.PI) {   // se for o ponto mais alto/baixo de uma esfera,
				vert = new THREE.Vector3(0, r * Math.cos(i), 0);   // nao precisa entrar no segundo for
				geometry.vertices.push(vert);
			}	

			else {
				for(j = 0; j < 2 * Math.PI; j += (2 * Math.PI) / n_vertices) {
					vert = new THREE.Vector3(r * Math.sin(i) * Math.cos(j), r * Math.cos(i), r * Math.sin(i) * Math.sin(j));
					geometry.vertices.push(vert);
				}
			}
		}

		if(phase_f == Math.PI / 2) {                                      // caso seja uma semi-esfera, acrescenta o centro da circunferencia da base
			vert = new THREE.Vector3(0, 0, 0);
			geometry.vertices.push(vert);
		}

		last = geometry.vertices.length - 1;

		for(i = 1; i < n_levels; i++) {               // segunda parte -> criar os triangulos
			for(j = 0; j < n_vertices; j++) {

				if(i == 1) {                          // caso esteja no nivel 1, ou seja, esteja na primeira circunferencia (nivel 0 -> ponto mais alto)
					first = ((i - 1) * n_vertices) + (j + 1);
					
					if(j == n_vertices - 1) {         // caso esteja no ultimo vertice do primeiro nivel
						geometry.faces.push(new THREE.Face3(first, 0, first - j));
					}
					else {                            // vertices restantes do primeiro nivel
						geometry.faces.push(new THREE.Face3(first, 0, first + 1));
					}
				}

				else if(i < n_levels - 1 || (i == n_levels - 1 && phase_f == Math.PI / 2)) {  // niveis restantes
					first = ((i - 1) * n_vertices) + (j + 1);

					if(j == n_vertices - 1) {         // caso esteja no ultimo vertice de cada nivel
						geometry.faces.push(new THREE.Face3(first, first - n_vertices, first - j));
						geometry.faces.push(new THREE.Face3(first, first - n_vertices - 1, first - n_vertices));
					}
					else if(j == 0) {                 // caso esteja no primeiro vertice de cada nivel
						geometry.faces.push(new THREE.Face3(first, first - n_vertices, first + 1));
						geometry.faces.push(new THREE.Face3(first, first - 1, first - n_vertices));
					}
					else {                            // vertices restantes de cada nivel
						geometry.faces.push(new THREE.Face3(first, first - n_vertices, first + 1));
						geometry.faces.push(new THREE.Face3(first, first - n_vertices - 1, first - n_vertices));
					}
				}

				if(i == n_levels - 1) {          // trata apenas do ultimo nivel
					if(phase_f == Math.PI) {
						first = ((i - 2) * n_vertices) + (j + 1);
					}
					else {
						first = ((i - 1) * n_vertices) + (j + 1);
					}

					if(j == n_vertices - 1) {
						geometry.faces.push(new THREE.Face3(first, first - j, last));
					}

					else {
						geometry.faces.push(new THREE.Face3(first, first + 1, last));
					}
				}
			}
		}
		geometry.computeFaceNormals();
		return geometry;
	}

	create_cilinder(r, h, arc, n_vertices) {
		var geometry = new THREE.Geometry();
		var i;
		var vert;

		vert = new THREE.Vector3(0, 0, 0);             // cria o centro da circunferencia de baixo
		geometry.vertices.push(vert);

		for(i = 0; i < arc; i += arc / n_vertices) {   // cria as 2 circunferencias
			vert = new THREE.Vector3(r * Math.cos(i), 0, r * Math.sin(i));   
			geometry.vertices.push(vert);

			vert = new THREE.Vector3(r * Math.cos(i), h, r * Math.sin(i));
			geometry.vertices.push(vert);
		}

		vert = new THREE.Vector3(0, h, 0);             // cria o centro da circunferencia de cima
		geometry.vertices.push(vert);

		var size = geometry.vertices.length;

		for(i = 1; i < size - 2; i += 2) {
			if(i == size - 3) {
				geometry.faces.push(new THREE.Face3(i, 1, 0));              // cria triangulo da face inferior da circunferencia
				geometry.faces.push(new THREE.Face3(i + 1, size - 1, 2));   // cria triangulo da face superior da circunferencia

				geometry.faces.push(new THREE.Face3(i, i + 1, 1));          // cria triangulos da superficie lateral do cilindro
				geometry.faces.push(new THREE.Face3(i + 1, 2, 1));
			}

			else {
				geometry.faces.push(new THREE.Face3(i, i + 2, 0));              // cria triangulo da face inferior da circunferencia
				geometry.faces.push(new THREE.Face3(i + 1, size - 1, i + 3));   // cria triangulo da face superior da circunferencia

				geometry.faces.push(new THREE.Face3(i, i + 1, i + 2));          // cria triangulos da superficie lateral do cilindro
				geometry.faces.push(new THREE.Face3(i + 1, i + 3, i + 2));
			}
		}
		geometry.computeFaceNormals();
		return geometry;
	} 
}