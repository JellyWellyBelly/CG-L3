'use strict';

class Table extends MovableObject{

    constructor(size) {
        var height = size / 10;
        var table = new THREE.Object3D();
        
        super(0, 0, 0, 0, 0, 0, size, table, 0);

        this.addTableTop(table, size);
        this.addLeg(table, size / 4, size / 4);
        this.addLeg(table, size / 4, -size / 4);
        this.addLeg(table, -size / 4, size / 4);
        this.addLeg(table, -size / 4, -size / 4);
        this.addFloor(table, size);
    }

    addTableTop(table, size) {
        var height = this._size / 10;

        var geometry = new THREE.BoxGeometry(size, height, size, size/50, height/50, size/50);
        var material = new THREE.MeshPhongMaterial({color: 0x8B4513, shininess: 10});
        var tableTop = new THREE.Mesh(geometry, material);
        
        tableTop.position.set(0, -height / 2, 0);
        
        table.add(tableTop);
    }

    addLeg(table, x, z) {
        var height = this._size / 10;
        
        var geometry = new THREE.BoxGeometry(height, 2 * height, height, height/50, height/25, height/50);
        var material = new THREE.MeshPhongMaterial({color: 0x8B4513});
        var leg = new THREE.Mesh(geometry, material);

        leg.position.set(x, -(3 * height) / 2, z);

        table.add(leg);
    }

    addFloor(table, size) {
        var height = this._size / 10;
        
        var geometry = new THREE.PlaneGeometry(size*10, size*10);
        var material = new THREE.MeshPhongMaterial({color: 0xaf7a1d});
        var floor = new THREE.Mesh(geometry, material);

        
        floor.rotation.x = -Math.PI / 2;
        floor.position.set(0, -(3 * height), 0);

        table.add(floor);
    }
}
