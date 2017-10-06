//Made by script wizards

var camera, scene, renderer;
var window_ratio;

var scene_size = 600;
var scene_elements = [];

var carMouse;   //so the eventListener know wich car to update the flags

function render() {
	'use strict';
	renderer.render(scene, camera);
}

function update() {
	for (var i = scene_elements.length - 1; i >= 0; i--) {
		elem = scene_elements[i];
		elem.update();
	}
}



function onResize() {
	'use strict';

	renderer.setSize(window.innerWidth, window.innerHeight);

	if (window.innerHeight > 0 && window.innerWidth > 0) { // dividing by zero error preventer

		window_ratio = renderer.getSize().width / renderer.getSize().height; //updating window ratio
		
		if (window_ratio > 1) { 

			camera.left = - scene_size * window_ratio; //left
			camera.right = scene_size * window_ratio; //right
			camera.top = scene_size; //top
			camera.bottom = - scene_size; //bottom
		}

		else {

			// ratio must be greater than 1 so that a rectangular window maintains the scene's ratio
			// this window ratio is the inverse of the window ratio above
			// new_ratio = 1 / old_ratio
			window_ratio = renderer.getSize().height / renderer.getSize().width; 

			camera.left = - scene_size; //left
			camera.right = scene_size; //right
			camera.top = scene_size * window_ratio; //top
			camera.bottom = - scene_size * window_ratio; //bottom
		}

		camera.updateProjectionMatrix(); //update camera
	}
}

function createScene() {
	'use strict';

	scene = new THREE.Scene();
	carMouse = new CarMouse(10, 0, 0, 0);

	var table = new Table(1000);
	var light = new DirectionalLight();
	var track = new Track();
	var carF1 = new CarF1(3);               // size é um multiplicador do tamanho original (+/- 10)
	var orange1 = new Orange(10);
	var orange2 = new Orange(15);
	var orange3 = new Orange(20);
	var butter1 = new Butter(30);
	
	scene_elements.push(carMouse);   // testing
	//scene_elements.push(carF1);   	  // testing

	scene.add(new THREE.AxisHelper(10));	// to be removed
	scene.add(carMouse.getMesh());
	scene.add(table.create_table());
	scene.add(carF1.getMesh(30, 0.5, 30));
	scene.add(track.create_track());
	scene.add(light.create_light(500, 1000, 0));
	scene.add(orange1.create_orange(50, 0, 300));
	scene.add(orange2.create_orange(100, 0, -200));
	scene.add(orange3.create_orange(-200, 0, 100));
	scene.add(butter1.create_butter(200, 0, -300));
}

function createCamera() {
	'use strict';

	camera = new THREE.OrthographicCamera(-scene_size, //left
										   scene_size, //right
										   scene_size, //top
										  -scene_size, //bottom
										   0.01, 2000);
	onResize();

	camera.position.set(0, 500, 0);

	camera.lookAt(scene.position);
}

function onKeyDown(e) {
	'use strict';

	switch (e.keyCode) {
		case 38: // *up arrow key*
			carMouse.setAcc(300);
			break;

		case 40: // *down arrow key*
			carMouse.setAcc(-400);
			break;

		case 39: // *right arrow key*
			carMouse.setTurningAngle(-Math.PI/60);
			break;

		case 37: // *left arrow key*
			carMouse.setTurningAngle(Math.PI/60);
			break;
	}
}

function onKeyUp(e) {
	'use strict';

	switch (e.keyCode) {
		case 38: // *up arrow key*
		case 40: // *down arrow key*
			carMouse.setAcc(0);
			break;

		case 37: // *up arrow key*
		case 39: // *down arrow key*
			carMouse.setTurningAngle(0);
			break;
	}
}


function onKeyPress(e) {
	'use strict';

	switch (e.keyCode) {
	case 65: //A
	case 97: //a
		scene.traverse(function (node) {
			if (node instanceof THREE.Mesh) {
				node.material.wireframe = !node.material.wireframe;
			}
		});
		break;
	}
}


function init() {
	'use strict';

	renderer = new THREE.WebGLRenderer({antialias: true});

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();
	
	render();	

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
	window.addEventListener("keypress", onKeyPress);

	//var controls = new THREE.OrbitControls(camera);
	//controls.addEventListener( 'change', render );
}


function animate() {
	
	update(); //testing
	render();

	requestAnimationFrame(animate);
}
