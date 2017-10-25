'use strict'

class MovableObject {

	constructor(maxSpeed, minSpeed, acc, friction, currentSpeed, turningAngle, size, mesh, bb_rad) {

		this._maxSpeed = maxSpeed;
		this._minSpeed = minSpeed;
		this._acceleration = acc;
		this._friction = friction;
		this._currentSpeed = currentSpeed;
		this._turningAngle = turningAngle;

		this._size = size;
		this._clock = new THREE.Clock();
		this._mesh = mesh;

		this._BB_Radius = bb_rad;
	}

	getMesh() {
		return this._mesh;
	}

	update(){}

	checkCollision(obj, scene_elements) {
		
		var obj_center = obj.getMesh().position;

		var elem_center;
		var elem_BB_radius;
		var result = null; /* "" 			   if there is no collision
							  "<ObjectName>" if collides with an object */

		/* Goes through every elem in the scene and checks collisions. */
		scene_elements.forEach(function(elem){

			elem_center = elem.getMesh().position;
			elem_BB_radius = elem._BB_Radius;

			/*  
				These ifs compose the different types of collisions. 
				The collisions are detected through spherical bounding boxes.
				Sum of the bounding boxes radius must be smaller than the distance between the centeres of the objects.
				It is used the distance squared for improved perfomance. 
			*/
			if(obj.getMesh().uuid != elem.getMesh().uuid) {
				if(obj_center.distanceToSquared(elem_center) < (elem._BB_Radius + obj._BB_Radius)**2) {
						result = elem;
				}
			}
		});

		return result;
	}
}
