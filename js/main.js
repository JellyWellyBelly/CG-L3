var camera, scene, renderer;

function render(){
	'use strict';
	renderer.render(scene, camera);
}




function onResize() {
	'use strict';

	renderer.setSize(window.innerWidth, window.innerHeight);

	if (window.innerHeight > 0 && window.innerWidth > 0) {
		camera.aspect = renderer.getSize().width / renderer.getSize().height;
		camera.updateProjectionMatrix();
	}
}

function createScene() {
	'use strict';

	scene = new THREE.Scene();

	scene.add(new THREE.AxisHelper(10));
	scene.add(createCar(0,0,0, 10))
}

function createCamera() {
	'use strict';
	camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 1000)

	camera.position.set(50, 50, 50);

	camera.lookAt(scene.position);
}

function init() {
	'use strict';

	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();

	window.addEventListener("resize", onResize);

	render();

	var controls = new THREE.OrbitControls(camera);
    controls.addEventListener( 'change', render );
	
}
