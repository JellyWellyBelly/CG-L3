var cheerio;

var material, geometry;

function create_cheerio() {
	'use strict';
	geometry = new THREE.TorusGeometry(2, 1, 15, 15, Math.PI * 2);

	material = new THREE.MeshStandardMaterial( {color: 0xffcc00});

	cheerio = new THREE.Mesh(geometry, material);

	cheerio.rotation.x = Math.PI / 2;

	cheerio.castShadow = true;

	return cheerio;
}
