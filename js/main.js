'use strict'

//Made by script wizards

var cameraPresp, cameraOrt, cameraCar, cameraPause_Over, scene, renderer, elem;
var window_ratio;
var scene_size;
var scene_elements;
var carMouse;   //so the eventListener know wich car to update the flags
var frame;
var cameraInUse;
var carSize;
var sun;
var skycolor;
var globalMaterialType;

var isBasic;
var isPaused;
var isGameOver;

var pauseGeometry;
var pauseTexture;
var pauseMaterial;
var pauseMesh;

var gameOverGeometry;
var gameOverTexture;
var gameOverMaterial;
var gameOverMesh;

var cameraScore;
var totalLifes;
var currentLifes;

//var controls;


function onResize() {
	var cameraOrtRatio, cameraScoreRatio;

	renderer.setSize(window.innerWidth, window.innerHeight);


	if (window.innerHeight > 0 && window.innerWidth > 0) { // dividing by zero error preventer
		window_ratio = renderer.getSize().width / renderer.getSize().height; //updating window ratio
		if (window_ratio > 1) {
			window_ratio = renderer.getSize().width / renderer.getSize().height;

			cameraOrt.left = - scene_size * (1.15) * window_ratio; //left
			cameraOrt.right = scene_size * (1.15) * window_ratio; //right
			cameraOrt.top = scene_size; //top
			cameraOrt.bottom = - scene_size; //bottom

			cameraPause_Over.left = - scene_size * (1.15) * window_ratio; //left
			cameraPause_Over.right = scene_size * (1.15) * window_ratio; //right
			cameraPause_Over.top = scene_size; //top
			cameraPause_Over.bottom = - scene_size; //bottom

			cameraScore.left = 0; //left
			cameraScore.right = carSize * (totalLifes + 1) * 2 * window_ratio; //right
			cameraScore.top = carSize; //top
			cameraScore.bottom = - carSize / 2; //bottom
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

			cameraPause_Over.left = - scene_size * (1.15) * window_ratio; //left
			cameraPause_Over.right = scene_size * (1.15) * window_ratio; //right
			cameraPause_Over.top = scene_size; //top
			cameraPause_Over.bottom = - scene_size; //bottom

			cameraScore.left = 0; //left
			cameraScore.right = carSize * (totalLifes + 1) * 2; //right
			cameraScore.top = carSize * window_ratio; //top
			cameraScore.bottom = - (carSize / 2) * window_ratio; //bottom
		}
		cameraOrt.updateProjectionMatrix(); //update camera
		cameraPause_Over.updateProjectionMatrix(); //update camera
		cameraScore.updateProjectionMatrix(); //update camera
	}

	if (window.innerHeight > 0 && window.innerWidth > 0) {
		cameraPresp.aspect = renderer.getSize().width / (renderer.getSize().height * 0.85);
		cameraPresp.updateProjectionMatrix();
	}

	if (window.innerHeight > 0 && window.innerWidth > 0) {
		cameraCar.aspect = renderer.getSize().width / (renderer.getSize().height * 0.85);
		cameraCar.updateProjectionMatrix();
	}
}



function createScene() {
	scene = new THREE.Scene();
	carMouse = new CarMouse(carSize, 0, 1, -75);
	sun = new DirectionalLight().create_light(50, 100, 0);

	var table = new Table(1000);
	var track = new Track();
	var orange1 = new Orange(10, 50, 0, 300);
	var orange2 = new Orange(15, 100, 0, -200);
	var orange3 = new Orange(20, -150, 0, 100);

	var butter1 = new Butter(30, -450, 0, 450);
	var butter2 = new Butter(30, -150, 0, 350);
	var butter3 = new Butter(30, -350, 0, -300);
	var butter4 = new Butter(30, -200, 0, -150);
	var butter5 = new Butter(30, 250, 0, 150);

	var candle1 = new Candle(12, 250, 0, 50);
	var candle2 = new Candle(20, 50, 0, 350);
	var candle3 = new Candle(15, -350, 0, -200);
	var candle4 = new Candle(10, -100, 0, 50);
	var candle5 = new Candle(8, -350, 0, 50);
	var candle6 = new Candle(11, -350, 0, 350);

	track.create_track();

	scene_elements.push(carMouse);
	scene_elements.push(track.getStart());
	scene_elements.push(table);
	
	scene_elements.push(butter1);
	scene_elements.push(butter2);
	scene_elements.push(butter3);
	scene_elements.push(butter4);
	scene_elements.push(butter5);
	

	scene_elements.push(orange1);
	scene_elements.push(orange2);
	scene_elements.push(orange3);

	scene_elements.push(candle1);
	scene_elements.push(candle2);
	scene_elements.push(candle3);
	scene_elements.push(candle4);
	scene_elements.push(candle5);
	scene_elements.push(candle6);	

	var cheerioList = track.getAllCheerios();
	for(var i = 0; i < cheerioList.length; i++) {
		scene.add(cheerioList[i].getObj());
		scene_elements.push(cheerioList[i]);
	}

	scene.add(carMouse.getObj());
	scene.add(table.getObj());

	scene.add(orange1.getObj());
	scene.add(orange2.getObj());
	scene.add(orange3.getObj());

	scene.add(butter1.getObj());
	scene.add(butter2.getObj());
	scene.add(butter3.getObj());
	scene.add(butter4.getObj());
	scene.add(butter5.getObj());

	scene.add(candle1.getObj());
	scene.add(candle2.getObj());
	scene.add(candle3.getObj());
	scene.add(candle4.getObj());
	scene.add(candle5.getObj());
	scene.add(candle6.getObj());

	scene.add(track.getStart().getObj());
	
	scene.add(pauseMesh);
	scene.add(gameOverMesh);

	scene.add(sun);
}

//Cria os carros para as vidas
function createTopMenu() {
	var life, lifeObj, distance;

	for (var i = 0; i < totalLifes; i++) {
		distance = (cameraScore.right / (totalLifes + 1)) * (i + 1);
		life = new CarMouse(0.5 * carSize, distance,  -400, 0); /* CAR SIZE AND IT'S POSITION */
		
		lifeObj = life.getObj();
		lifeObj.rotateX(-Math.PI/2);
		
		currentLifes.push(lifeObj);
		scene.add(lifeObj);
	}

	var geometry = new THREE.PlaneGeometry(cameraScore.right, (cameraScore.top - cameraScore.bottom) * 1.5, 32 );

	var flagTexture  = new THREE.TextureLoader().load('flag.gif');
	flagTexture.wrapS = THREE.RepeatWrapping;
	flagTexture.wrapT = THREE.RepeatWrapping;

	var material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, map: flagTexture});
	var plane = new THREE.Mesh(geometry, material);

	plane.position.set(cameraScore.right / 2, -400, 0);
	plane.rotation.set(Math.PI / 2, 0 ,0);
	scene.add(plane);
}

function createCameraPause_Over() {
	cameraPause_Over = new THREE.OrthographicCamera(-scene_size, //left
											   scene_size, //right
											   scene_size, //top
											  -scene_size, //bottom
											   0.01, 2000);
	cameraPause_Over.position.set(0, 500, 0);
	cameraPause_Over.lookAt(scene.position);
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

function createCameraTopMenu() {
	cameraScore = new THREE.OrthographicCamera(0, //left
									   (carSize * 1.5) * (totalLifes + 2), //right
									   carSize, //top
									  -carSize, //bottom
									   0.01, 2000);
	cameraScore.position.set(0, -scene_size/2, 0);
	cameraScore.lookAt(new THREE.Vector3(0, -5 * scene_size, 0));
}

function createCameraPresp() {
	cameraPresp = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 1, 3000);

	onResize();
	cameraPresp.position.x = -600;
	cameraPresp.position.y = 200;
	cameraPresp.position.z = 600;
	cameraPresp.lookAt(scene.position);
}

function createCameraCar() {
	cameraCar = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 1, 1000);

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

		case 65: //A
		case 97: //a
			frame = !frame;
			scene.traverse(function (node) {
				if (node instanceof THREE.Mesh) {
					node.material.wireframe = frame;
				}
			});
			break;
		case 49: // 1
			cameraInUse = cameraOrt;
			break;

		case 50: // 2
			cameraInUse = cameraPresp;
			break;

		case 51: // 3
			cameraInUse = cameraCar
			break;

		//toggles sun
		case 78: //N
		case 110: //n
			if (sun.intensity == 0) {
				sun.intensity = 1;
				skycolor = 0x23aaff;
			}
			else {
				sun.intensity = 0;
				skycolor = 0x000000;
			}
			break;

		// toggles between basic material and a non basic material
		case 76: //L
		case 108: //l
			
			if (!(isBasic)) {
				for(var i = 0; i < scene_elements.length; i++) {
					scene_elements[i].swapTo("BASIC", frame);
				}
				
				isBasic = true;
			}
			else {
				for(var i = 0; i < scene_elements.length; i++) {
					scene_elements[i].swapTo(globalMaterialType, frame);
				}
					
				isBasic = false;
			}
			
			break;

		// toggles material between phong and lambert if the material type is not basic 
		case 71: //G
		case 103: //g

			if (!(isBasic)) {
				for(var i = 0; i < scene_elements.length; i++) {
					if (globalMaterialType.localeCompare("PHONG") == 0) {
						scene_elements[i].swapTo("LAMBERT", frame);
						globalMaterialType = "LAMBERT";
					}
					else if (globalMaterialType.localeCompare("LAMBERT") == 0) {
						scene_elements[i].swapTo("PHONG", frame);
						globalMaterialType = "PHONG";
					}
				}
			}
			break;
		
		// toggles candles
		case 67: //C
		case 99: //c
			for(var i = 0; i < scene_elements.length; i++) {
				elem = scene_elements[i];
				if(elem instanceof Candle) {
					elem.flipLight();
				}
			}
			break;

		// toggles car's headlights
		case 72: //H
		case 104: //h
			carMouse.flipLight();
			break;

		// (un)pauses the game
		case 83: //S
		case 115: //s
			if(isPaused) {
				isPaused = !isPaused;
				cameraInUse = cameraOrt;	
			}

			else {
				isPaused = !isPaused;
				cameraInUse = cameraPause_Over;
			}

			break;

		// restarts the game if is game over
		case 82: //R
		case 114: //r
			if(isGameOver == true) {
				isGameOver = false;
				for (var i = scene_elements.length - 1; i >= 0; i--) {
					scene_elements.pop();
				}
				document.body.removeChild(renderer.domElement);
				init();
			}
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


function init() {
	/* inicializacao das variaveis globais */
	carSize = 5;
	frame = false;
	isBasic = false;
	isPaused = false;
	isGameOver = false;
	scene_size = 550;
	skycolor = 0x23aaff; // azul clarinho
	totalLifes = 5;

	currentLifes = [];
	scene_elements = [];
	globalMaterialType = "PHONG";

	pauseGeometry = new THREE.PlaneGeometry(scene_size, scene_size/2);
	pauseTexture  = new THREE.TextureLoader().load('paused.png');
	pauseTexture.wrapS = THREE.RepeatWrapping;
	pauseTexture.wrapT = THREE.RepeatWrapping;
	pauseMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map: pauseTexture});
	pauseMesh     = new THREE.Mesh(pauseGeometry, pauseMaterial);
	pauseMesh.rotateX(-Math.PI/2);
	pauseMesh.position.set(0, scene_size/2, 0);

	gameOverGeometry = new THREE.PlaneGeometry(scene_size, scene_size);
	gameOverTexture  = new THREE.TextureLoader().load('gameover.jpg');
	gameOverTexture.wrapS = THREE.RepeatWrapping;
	gameOverTexture.wrapT = THREE.RepeatWrapping;
	gameOverMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map: gameOverTexture});
	gameOverMesh     = new THREE.Mesh(gameOverGeometry, gameOverMaterial);
	gameOverMesh.rotateX(-Math.PI/2);
	gameOverMesh.position.set(0, scene_size/2, 0);

	/* renderer */
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);


	/* cena, menus e camaras */
	createScene();
	createCameraOrt();
	createCameraCar();
	createCameraTopMenu();
	createCameraPause_Over();
	createCameraPresp();
	createTopMenu();

	cameraInUse = cameraOrt;
	var carro = carMouse.getObj();
	carro.add(cameraCar);

	/* event listeners */
	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);

	
//	controls = new THREE.OrbitControls(cameraInUse);
}

function render() {
	var left, top, width, height;

	/* main game viewport */
	left   = Math.floor( window.innerWidth  * 0    );
	top    = Math.floor( window.innerHeight * 0.15 );
	width  = Math.floor( window.innerWidth  * 1    );
	height = Math.floor( window.innerHeight * 0.85 );
	
	renderer.setViewport(left, top, width, height);
	renderer.setScissor(left, top, width, height);
	renderer.setScissorTest(true);
	renderer.setClearColor(skycolor, 1);

	renderer.render(scene, cameraInUse);


	/* top menu viewport */
	left   = Math.floor( window.innerWidth  * 0    );
	top    = Math.floor( window.innerHeight * 0    );
	width  = Math.floor( window.innerWidth  * 1    );
	height = Math.floor( window.innerHeight * 0.15 );
	
	renderer.setViewport(left, top, width, height);
	renderer.setScissor( left, top, width, height);
	renderer.setScissorTest(true);
	renderer.setClearColor(0x000000, 1);
	
	renderer.render(scene, cameraScore);
}

function update() {
	if(isGameOver) {
		pauseMaterial.visible = false;
		gameOverMaterial.visible = true;
		cameraInUse = cameraPause_Over;
	}
	else if(isPaused) {
		pauseMaterial.visible = true;
		gameOverMaterial.visible = false;
		for(var i = 0; i < scene_elements.length; i++) {
			elem = scene_elements[i];
			elem.resetDelta();
		}
	}
	else {
		pauseMaterial.visible = false;
		gameOverMaterial.visible = false;
		for(var i = 0; i < scene_elements.length; i++) {
			elem = scene_elements[i];
			elem.update(scene_elements);
		}
	}
}

function animate() {
	update();
	render();
	requestAnimationFrame(animate);

//	controls.update();
}

function loseLife() {
	var lifeObj = currentLifes[currentLifes.length - 1];
	currentLifes.pop();
	scene.remove(lifeObj);

	if(currentLifes.length == 0) {
		isGameOver = true;
	}
}