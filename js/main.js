'use strict'

//Made by script wizards

var cameraPresp, cameraOrt, cameraCar, scene, renderer, elem;
var window_ratio;
var scene_size = 510;
var scene_elements = [];
var carMouse;   //so the eventListener know wich car to update the flags
var frame = false;
var cameraInUse;
var carSize = 5;



function onResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);


	if (window.innerHeight > 0 && window.innerWidth > 0) { // dividing by zero error preventer
		window_ratio = renderer.getSize().width / renderer.getSize().height; //updating window ratio
		if (window_ratio > 1) {
			cameraOrt.left = - scene_size * window_ratio; //left
			cameraOrt.right = scene_size * window_ratio; //right
			cameraOrt.top = scene_size; //top
			cameraOrt.bottom = - scene_size; //bottom
		}
		else {

			// ratio must be greater than 1 so that a rectangular window maintains the scene's ratio
			// this window ratio is the inverse of the window ratio above
			// new_ratio = 1 / old_ratio
			window_ratio = renderer.getSize().height / renderer.getSize().width; 
			cameraOrt.left = - scene_size; //left
			cameraOrt.right = scene_size; //right
			cameraOrt.top = scene_size * window_ratio; //top
			cameraOrt.bottom = - scene_size * window_ratio; //bottom
		}
		cameraOrt.updateProjectionMatrix(); //update camera
	}

	if (window.innerHeight > 0 && window.innerWidth > 0) {
		cameraPresp.aspect = renderer.getSize().width / renderer.getSize().height;
		cameraPresp.updateProjectionMatrix();
	}

	if (window.innerHeight > 0 && window.innerWidth > 0) {
		cameraCar.aspect = renderer.getSize().width / renderer.getSize().height;
		cameraCar.updateProjectionMatrix();
	}
}



function createScene() {
	scene = new THREE.Scene();
	carMouse = new CarMouse(carSize, 0, 0, -75);

	var table = new Table(1000);
	//var light = new DirectionalLight();
	var track = new Track();
	var orange1 = new Orange(10, 50, 0, 300);
	var orange2 = new Orange(15, 100, 0, -200);
	var orange3 = new Orange(20, -150, 0, 100);

	var butter1 = new Butter(30, -450, 0, 450);
	var butter2 = new Butter(30, -150, 0, 350);
	var butter3 = new Butter(30, 50, 0, 350);
	var butter4 = new Butter(30, -200, 0, -150);
	var butter5 = new Butter(30, 0, 0, 0);
	
	scene_elements.push(carMouse);
	scene_elements.push(butter1);
	scene_elements.push(butter2);
	scene_elements.push(butter3);
	scene_elements.push(butter4);
	scene_elements.push(butter5);
	
	scene_elements.push(orange1);
	scene_elements.push(orange2);
	scene_elements.push(orange3);

	scene.add(table.create_table());
	track.create_track();

	var cheerioList = track.getAllCheerios();
	for(var i = 0; i < cheerioList.length; i++) {
		scene.add(cheerioList[i].getMesh());
		scene_elements.push(cheerioList[i]);
	}
	
	//scene.add(light.create_light(500, 1000, 0));

	scene.add(carMouse.getMesh());

	scene.add(orange1.getMesh());
	scene.add(orange2.getMesh());
	scene.add(orange3.getMesh());

	scene.add(butter1.getMesh());
	scene.add(butter2.getMesh());
	scene.add(butter3.getMesh());
	scene.add(butter4.getMesh());
	scene.add(butter5.getMesh());

	scene.add(track.getStart());
}


function createCameraOrt() {
	cameraOrt = new THREE.OrthographicCamera(-scene_size, //left
										   scene_size, //right
										   scene_size, //top
										  -scene_size, //bottom
										   0.01, 2000);
	cameraOrt.position.set(0, 500, 0);
	cameraOrt.lookAt(scene.position);
}


function createCameraPresp() {
	'use strict';
	cameraPresp = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 1500)

	onResize();
	cameraPresp.position.x = -600;
	cameraPresp.position.y = 200;
	cameraPresp.position.z = 600;
	cameraPresp.lookAt(scene.position);
}

function createCameraCar() {
	'use strict';
	cameraCar = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 1000)

	cameraCar.position.set(- carSize * 10, carSize * 4, 0); 
	cameraCar.rotation.set(0, -Math.PI/2, 0);
}

function onKeyDown(e) {
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
	switch (e.keyCode) {
	case 65: //A
	case 97: //a
		frame = !frame;
		scene.traverse(function (node) {
			if (node instanceof THREE.Mesh) {
				node.material.wireframe = frame;
			}
		});
		break;

	case 49:
		cameraInUse = cameraOrt;
		render();
		break;

	case 50:
		cameraInUse = cameraPresp;
		render();
		break;

	case 51:
		cameraInUse = cameraCar
		render();
		break;

	}

}

function init() {
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCameraOrt();
	createCameraCar();
	createCameraPresp();

	cameraInUse = cameraOrt;
	var carro = carMouse.getMesh();
	carro.add(cameraCar);
	render();


	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
	window.addEventListener("keypress", onKeyPress);
	
}

function render() {
	renderer.render(scene, cameraInUse);
}

function update() {
	for(var i = 0; i < scene_elements.length; i++) {
		elem = scene_elements[i];
		elem.update(scene_elements);
	}
}

function animate() {
	update();
	render();
	requestAnimationFrame(animate);
}
