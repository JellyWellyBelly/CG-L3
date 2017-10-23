'use strict'

class MovableObject {
	
	constructor(maxSpeed, minSpeed, acc, friction, currentSpeed, turningAngle, size, mesh) {

		this._maxSpeed = maxSpeed;
		this._minSpeed = minSpeed;
		this._acceleration = acc;
		this._friction = friction;
		this._currentSpeed = currentSpeed;
		this._turningAngle = turningAngle;

		this._size = size;
		this._clock = new THREE.Clock();
		this._mesh = mesh;
	}

	getMesh() {
		return this._mesh;
	}
}