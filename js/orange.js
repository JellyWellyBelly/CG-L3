'use strict';

class Orange extends MovableObject {

  constructor(size, x, y, z) {
    var orange = new THREE.Object3D();

    super(10000,0,0,0,0,0, size, orange, size);

    var geometry = new THREE.SphereGeometry(size, 10, 10, 0);
    var material = new THREE.MeshPhongMaterial({color: 0xed862d, wireframe: false, visible: false});
    var mesh1 = new THREE.Mesh(geometry, material);                 // responsavel pelas translações
    material = new THREE.MeshPhongMaterial({color: 0xed862d, wireframe: false});
    var mesh2 = new THREE.Mesh(geometry, material);                 // responsavel pelas rotações
    
    geometry = new THREE.CylinderGeometry(size / 8, size / 8, size / 6);
    material = new THREE.MeshPhongMaterial({color: 0x009933, wireframe: false});
    var mesh = new THREE.Mesh(geometry, material);


    orange.add(mesh1);
    mesh1.add(mesh2);
    mesh2.add(mesh);

    //orange.castShadow = true;
    orange.position.set(x, y + size, z);
    mesh2.position.set(0, 0, 0);
    mesh.position.set(0, size, 0);

    this._rotMesh = mesh2;
    this._spawnX = x;
    this._spawnY = y + size;
    this._spawnZ = z;
    this._visible = true;
  }

    update() {
        var v0 = this._currentSpeed;
        var transMesh = this._mesh;
        var rotMesh = this._rotMesh;
        var size = this._size;
        var dt = this._clock.getElapsedTime();
        var visible = this._visible;

        if(dt <= 15) {                   // orange LV1
            v0 = 20 / size;
        }

        else if(dt > 15 && dt <= 30) {   // orange LV2
            v0 = 40 / size;
        }

        else {                           // orange LV3
            v0 = 60 / size;
        }

        if((Math.abs(transMesh.position.x) > 500 || Math.abs(transMesh.position.z) > 500) && visible) {
            visible = false;
            transMesh.visible = visible;
            this._visible = visible;

            var that = this;
            setTimeout(function(){that.calc_spawn();}, Math.random() * 1000);
        }

        if(visible) {
            transMesh.translateX(v0);
            rotMesh.rotateZ(-v0 / size);
        }

        this._currentSpeed = v0;
        this._mesh = transMesh;
        this._rotMesh = rotMesh;
    }


    calc_spawn() {
        var transMesh = this._mesh; 
        var x = this._spawnX;
        var y = this._spawnY;
        var z = this._spawnZ;
        var angle = this._turningAngle;
        var quadrant = Math.random();

        if(quadrant <= 0.25) {
            x = 500;
            z = (Math.random() * 1000) - 500;
            angle = Math.PI * (Math.random() + 1 / 2);
        }

        else if(quadrant <= 0.5) {
            x = -500;
            z = (Math.random() * 1000) - 500;
            angle = Math.PI * (Math.random() - 1 / 2);
        }

        else if(quadrant <= 0.75) {
            x = (Math.random() * 1000) - 500;
            z = 500;
            angle = Math.PI * Math.random();
        }

        else {
            x = (Math.random() * 1000) - 500;
            z = -500;
            angle = Math.PI * (Math.random() + 1);
        }

        transMesh.position.set(x, y, z);
        transMesh.rotation.set(0, angle, 0);
        transMesh.visible = true

        this._turningAngle = angle;
        this._spawnZ = z;
        this._spawnX = x;
        this._mesh = transMesh;
        this._visible = true;
    }
}

/*   Random direction without starting at the borders
            Historical reasons

    x = (Math.random() * 1000) - 500;
    z = (Math.random() * 1000) - 500;

    transMesh.position.setX(x);
    transMesh.position.setZ(z);

    angle = (Math.random() * 2 * Math.PI);
    transMesh.rotateY(angle);
*/
