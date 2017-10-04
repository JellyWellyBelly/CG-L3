'use strict';

class CarF1 {
  // size é um multiplicador do tamanho original (+/- 10)	
  constructor(size) {
    this._size = size;
  }

  getMesh(x, y, z) {

		var size = this._size;
		var car = new THREE.Object3D();


		this.addCarWheel(car, 2, 0, 2);
		this.addCarWheel(car, 2, 0, -2);
		this.addCarWheel(car, 7.75, 0, 2);
		this.addCarWheel(car, 7.75, 0, -2);
		this.addCarChassi(car, 4, 0, 0);
		this.addCarBack(car, 7.75, 0, 0);
		this.addCarEixoFront(car, 2, 0, 1.5);
		this.addCarEixoFront(car, 2, 0, -1.5);
		this.addCarEixoBack(car, 7.75, 0, 1.75);
		this.addCarEixoBack(car, 7.75, 0, -1.75);

		//triangulo parachoques
		this.addTriangleGeometry(car, 1, 0.5, 4, 0, -0.25, 0, 0, 0, 0); // addTriangleGeometry(obj, comprimento, altura, profundidade, posx, posy, posz, rotx, roty, rotz)
		
		//triangulo condutor 
		this.addTriangleGeometry(car, 4.75, 0.75, 2, 2.25, 0.25, 0, 0, 0, 0);

		//triangulo trazeiro
		this.addTriangleGeometry(car, 1.5, 0.75, 3, 7, 0.25, 0, 0, Math.PI, 0);

		//triangulos laterais
		this.addTriangleGeometry(car, 4.75, 0.5, 0.5, 2.25, -0.25, -1.25, -Math.PI/2,0,0);
		this.addTriangleGeometry(car, 4.75, 0.5, 0.5, 2.25, -0.25, 1.25, Math.PI/2,0,0);

		this.addCarWingSup(car, 8, 0.75, 1);
		this.addCarWingSup(car, 8, 0.75, -1);
		this.addCarWing(car, 8, 1, 0);

		car.castShadow = true;
		car.position.set(x, y, z);
		car.scale.set(size, size, size);
		
		return car;
	}

	triangleGeometry(comp, alt, width) {

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

		var geometry = new THREE.ExtrudeGeometry( triangle, extrudeSettings );
		geometry.center();
		var material = new THREE.MeshStandardMaterial( { color: 0xff0ff0 } );
		var mesh = new THREE.Mesh( geometry, material ) ;

		return mesh;
	}

	addTriangleGeometry(obj, comp, alt, width, x, y, z, rotx, roty, rotz) {

		var mesh = this.triangleGeometry(comp, alt, width);

		mesh.rotateX(rotx);
		mesh.rotateY(roty);
		mesh.rotateZ(rotz);

		mesh.position.set(x+(comp/2), y+(alt/2), z);	
		

		obj.add(mesh);

	}

	addCarWing(obj, x, y, z) {

		var geometry = new THREE.BoxGeometry(1, 0.25, 5);
		var material = new THREE.MeshStandardMaterial( { color: 0xff0ff0 } );
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);


		obj.add(mesh);
	}

	addCarWingSup(obj, x, y, z) {

		var geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 30);
		var material = new THREE.MeshStandardMaterial( { color: 0xff0ff0 } );
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);

		mesh.rotateZ(-Math.PI/6);
		obj.add(mesh);
	}

	addCarEixoFront(obj, x, y, z) {

		var geometry = new THREE.CylinderGeometry(0.25, 0.25, 1, 10);
		var material = new THREE.MeshStandardMaterial( { color: 0xff0ff0 } );
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);

		mesh.rotateX(Math.PI/2);
		obj.add(mesh);
	}

	addCarEixoBack(obj, x, y, z) {

		var geometry = new THREE.CylinderGeometry(0.25, 0.25, 0.5, 10);
		var material = new THREE.MeshStandardMaterial( { color: 0xff0ff0 } );
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);

		mesh.rotateX(Math.PI/2);
		obj.add(mesh);
	}

	addCarBack(obj, x, y, z) {

		var geometry = new THREE.BoxGeometry(1.5, 0.5, 3);
		var material = new THREE.MeshStandardMaterial( { color: 0xff0ff0 } );
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);


		obj.add(mesh);
	}

	addCarChassi(obj, x, y, z) {

		var geometry = new THREE.BoxGeometry(6, 0.5, 2);
		var material = new THREE.MeshStandardMaterial( { color: 0xff0ff0 } );
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);


		obj.add(mesh);
	}

	addCarWheel(obj, x, y, z) {

		var geometry = new THREE.TorusGeometry(0.5, 0.2, 10, 75);
		var material = new THREE.MeshStandardMaterial( { color: 0x000000 } );
		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);

		obj.add(mesh);
	}
}



