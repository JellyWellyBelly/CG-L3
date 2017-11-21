'use strict';

class Table extends MovableObject{

    constructor(size) {
        var height = size / 10;
        var table = new THREE.Object3D();
        
        var phongMaterial = new THREE.MeshPhongMaterial({shininess : 0});
        var lambertMaterial = new THREE.MeshLambertMaterial();

        super(0, 0, 0, 0, 0, 0, size, table, 0, phongMaterial, lambertMaterial);

        this._meshList = [];

        this.addTableTop(table, size);
        this.addTableCloth(table, size);
        this.addLeg(table, size / 4, size / 4);
        this.addLeg(table, size / 4, -size / 4);
        this.addLeg(table, -size / 4, size / 4);
        this.addLeg(table, -size / 4, -size / 4);
    }

    addTableTop(table, size) {
        var height = this._size / 10;

        var geometry = new THREE.BoxGeometry(size, height, size, size/50, height/50, size/50);
        var texture = new THREE.TextureLoader().load('woodenTable.jpg');
        var material = new THREE.MeshPhongMaterial({color: 0xffffff, /*shininess: 10,*/ map: texture});
        var tableTop = new THREE.Mesh(geometry, material);
        
        tableTop.position.set(0, -height / 2, 0);
        this._meshList.push(tableTop);

        table.add(tableTop);
    }

    addLeg(table, x, z) {
        var height = this._size / 10;
        
        var geometry = new THREE.BoxGeometry(height, 2 * height, height, height/50, height/25, height/50);
        var texture = new THREE.TextureLoader().load('woodenTable.jpg');
        var material = new THREE.MeshPhongMaterial({color: 0xffffff, /*shininess: 10,*/ map: texture});
        var leg = new THREE.Mesh(geometry, material);

        leg.position.set(x, -(3 * height) / 2, z);
        this._meshList.push(leg);

        table.add(leg);
    }

    addTableCloth(table, size) {
        var height = this._size / 10;

        var geometry = new THREE.BoxGeometry(size * 1.005, height * 1.005, size * (3/4), size/50, height/50, size/50);
        var texture = new THREE.TextureLoader().load('tablecloth.jpg');
        var material = new THREE.MeshPhongMaterial({color: 0xffffff, map: texture});
        var cloth = new THREE.Mesh(geometry, material);

        cloth.position.set(0, -height / 2, 0);
        this._meshList.push(cloth);

        table.add(cloth);
    }

    getAllMeshes() {
        return this._meshList;
    }
}
