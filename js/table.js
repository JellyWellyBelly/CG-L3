var table;

var material, geometry, mesh;

var board_size = 1000;

function create_table(x, y, z, size) {
	'use strict';

	board_size = size;

	table = new THREE.Object3D();

	geometry = new THREE.BoxGeometry(board_size, board_size / 100, board_size);
	material = new THREE.MeshBasicMaterial( {color: 0x996600, wireframe: true});
	mesh = new THREE.Mesh(geometry, material);
	table.add(mesh);
	table.position.set(x, y, z);

	return table;
}