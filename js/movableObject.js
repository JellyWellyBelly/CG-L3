'use strict'

class MovableObject {

	constructor(maxSpeed, minSpeed, acc, friction, currentSpeed, turningAngle, size, mesh, bb_rad, phongMat, lambertMat) {

		this._maxSpeed = maxSpeed;
		this._minSpeed = minSpeed;
		this._acceleration = acc;
		this._friction = friction;
		this._currentSpeed = currentSpeed;
		this._turningAngle = turningAngle;

		this._size = size;
		this._clock = new THREE.Clock();
		this._BB_Radius = bb_rad;

		this._mesh = mesh;
		this._basicMat = new THREE.MeshBasicMaterial();
		this._phongMat = phongMat;
		this._lambertMat = lambertMat;
	}

	getObj() {
		return this._mesh;
	}

	resetDelta() {
		var dt = this._clock.getDelta();
	}

	update() {
	}

	checkCollision(obj, scene_elements) {
		
		var obj_center = obj.getObj().position;

		var elem_center;
		var elem_BB_radius;
		var result = null; /* "" 			   if there is no collision
							  "<ObjectName>" if collides with an object */

		/* Goes through every elem in the scene and checks collisions. */
		scene_elements.forEach(function(elem){

			elem_center = elem.getObj().position;
			elem_BB_radius = elem._BB_Radius;

			/*  
				These ifs compose the different types of collisions. 
				The collisions are detected through spherical bounding boxes.
				Sum of the bounding boxes radius must be smaller than the distance between the centeres of the objects.
				It is used the distance squared for improved perfomance. 
			*/
			if(obj.getObj().uuid != elem.getObj().uuid) {
				if(obj_center.distanceToSquared(elem_center) < (elem._BB_Radius + obj._BB_Radius)**2) {
						result = elem;
				}
			}
		});

		return result;
	}


	swapTo(materialType, isWireframe) {
		var mesh;
		var color;
		var material;
		var texture;
		var obj = this.getObj();

		switch (materialType) {
			case "BASIC":
				material = this._basicMat.clone();
				break;

			case "PHONG":
				material = this._phongMat.clone();
				break;

			case "LAMBERT":
				material = this._lambertMat.clone();
				break;
		}

		material.wireframe = isWireframe;

		for (var j = obj.children.length - 1; j >= 0; j--) {
			if(obj.children[j].isMesh == true) {
				mesh = obj.children[j];
				color = mesh.material.color.clone();
				texture = mesh.material.map;

				material.map = texture;
				material.color = color;
				mesh.material = material.clone();
			}
		}
	}
}
