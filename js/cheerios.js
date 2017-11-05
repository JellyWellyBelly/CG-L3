'use strict';

class Cheerio extends MovableObject {

  constructor(height, x, y, z) {

    var cheerio = new THREE.Object3D();

    super(8000, -8000, 0, 80, 0, 0, 2 * height, cheerio, 2*height + height);

    this._height = height;
    
    this._vec = new THREE.Vector3(); // Vetor de direcao do cheerio

    var geometry = new THREE.TorusGeometry(2 * height, height, 10, 10, Math.PI * 2);
    var material = new THREE.MeshPhongMaterial({color: 0xf2c763});
    var mesh = new THREE.Mesh(geometry, material);
    
    cheerio.add(mesh);

    cheerio.rotation.x = Math.PI / 2;
    cheerio.position.set(x, y, z);
    //cheerio.castShadow = true;
  }

  update(scene_elements) {

    var collision;
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

    if (collision instanceof Cheerio || collision instanceof CarMouse) {
      this._mesh.rotation.set(rotX, rotY, rotZ);  /* Brings the rotation back to the current frame */
      this._mesh.position.set(posX, posY, posZ);  /* Brings the position back to the current frame */
      this.movementWithCollision(collision, dt);
    }
  }

  movementWithCollision(collision, dt) {
    
    if (collision instanceof Cheerio) {
      var vecAux = new THREE.Vector3();
      
      var cheerio0_pos = this._mesh.position;
      var cheerio1_pos = collision._mesh.position;

      this._currentSpeed = this._currentSpeed * 0.8;

      vecAux.subVectors(cheerio1_pos, cheerio0_pos);

      collision.startMoving(this._currentSpeed, vecAux, dt); // Ambos os Cheerios ficam com 0.8 da velocidade do original
    }
  }

  movementWithNoCollision(dt) {
  
    if (this._currentSpeed >= 0.5) {
        this._currentSpeed = this._currentSpeed - this._friction*dt;
        this._mesh.translateOnAxis(this._vec, this._currentSpeed * dt);
      }

      else {
        this._currentSpeed = 0;
      }

    this._mesh.translateOnAxis(this._vec, this._currentSpeed * dt);

  }

  startMoving(velocity, vec, dt) {
      vec.y = vec.z;  // Como os cheerios estao rodados 90 graus em XX temos de mudar o vetor
      vec.z = 0;
      vec.normalize();
      this._vec = vec;

      this._currentSpeed = velocity;   
  }
}
