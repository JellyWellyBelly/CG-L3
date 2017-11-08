'use strict'

class Candle extends MovableObject {

	constructor (size, x, y, z) {

		var candle = new THREE.Object3D();

    	var phongMaterial = new THREE.MeshPhongMaterial({shininess : 0});
	    var lambertMaterial = new THREE.MeshLambertMaterial();

		super(0, 0, 0, 0, 0, 0, size, candle, size, phongMaterial, lambertMaterial);

		this._pointLightSource = null; /* Creates light source in the addFIRE function*/
		this._switch = "ON";

		this.addCandleBody(candle, size);
		this.addString(candle, size);
		this.addFIRE(candle, size);


		candle.position.set(x, y, z);
	}

	addCandleBody(obj, size) {
		var geometry = new THREE.CylinderGeometry(size, size, size*6, 32, 10);
		var material = new THREE.MeshPhongMaterial( {color: 0xfaa460} );
		var mesh = new THREE.Mesh( geometry, material );
		
		mesh.position.set(0, size*3, 0);

		obj.add(mesh);
	}

	addString(obj, size) {
		var geometry = new THREE.CylinderGeometry(size/4, size/4, size, 10, 3);
		var material = new THREE.MeshPhongMaterial( {color: 0x8B4513} );
		var mesh = new THREE.Mesh( geometry, material );
		
		mesh.position.set(0, size*6.5, 0);

		obj.add(mesh);
	}

	addFIRE(obj, size) {
		var light = new THREE.PointLight(0xff8800, 5, 300, 2);

		var geometry = new THREE.SphereGeometry(size/4);
		var material = new THREE.MeshPhongMaterial( {color: 0xff8800} );
		var mesh = new THREE.Mesh( geometry, material );

		light.position.set(0, size*8, 0);
		mesh.position.set(0,size*7, 0);
		
		light.castShadow = true;
		
		this._lightSource = light;

		obj.add(mesh);
		obj.add(light);
	}

	flipLight() {

		if(this._switch.localeCompare("ON") == 0){
			this._switch = "OFF";
			this._lightSource.distance = 0.001;
		}
		else {
			this._switch = "ON";
			this._lightSource.distance = 300;
		}
	}
}
