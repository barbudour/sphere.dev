import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import * as dat from 'dat.gui';

let canvas = document.getElementById('renderFigure');

let scene;
let camera;
let light;
let light2;

let meshes;
let childMesh;
let smallShape;
let bigShape;
let fakeShape;
let triggerSphere;

let fakePosition;
let enterPagePositionX;
let enterPagePositionY;

let keysEnterPosition;
let keysEnterPositionY;

let smallShapeRotate;
let bigShapeRotate;

let engine = new BABYLON.Engine(canvas, true, {
	preserveDrawingBuffer: true,
	stencil: true,
});

let startPointX = -(window.innerWidth * 0.075);
let startPointY = -(window.innerHeight * 0.05);

function createScene() {
	// This creates a basic Babylon Scene object (non-mesh)
	scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

	// This creates and positions a free camera (non-mesh)
	camera = new BABYLON.UniversalCamera('camera1', new BABYLON.Vector3(0, 0, -4000), scene);
	camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

	// console.log(camera);

	// This targets the camera to scene origin
	camera.setTarget(BABYLON.Vector3.Zero());

	// This attaches the camera to the canvas
	// camera.attachControl(canvas, true);

	// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
	light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(300, 0, -200), scene);
	light2 = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(-300, 0, -200), scene);

	// Default intensity is 1. Let's dim the light a small amount
	light.intensity = 0.4;
	light2.intensity = 0.7;

	// Our built-in 'sphere' shape.

	// let triggerSphere = BABYLON.MeshBuilder.CreateSphere('triggerSphere', {diameter: 550}, scene);
	// triggerSphere.visibility = 0;

	// triggerSphere.position.x = startPointX;
	// triggerSphere.position.y = startPointY;

	BABYLON.SceneLoader.ImportMesh('', 'images/', 'octs_small.glb', smallShape, (container) => {
		container[0].scaling.scaleInPlace(7.5);

		// console.log(container[0]);
		container[0].position.x = startPointX;
		container[0].position.y = startPointY;
		container[0].rotation = BABYLON.Vector3.FromArray([1, 1, 0]);
		container[0].getChildMeshes()[0].dispose;

		container[0].getChildMeshes().forEach((childMesh) => {
			// console.log(childMesh);
			childMesh.material = new BABYLON.StandardMaterial('mat02', scene);
			childMesh.material.diffuseColor = new BABYLON.Color3.FromHexString('#40564E');
			childMesh.material.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
			childMesh.material.bumpTexture = new BABYLON.Texture('../images/noise.jpg', scene);
			childMesh.material.bumpTexture.uScale = 3.0;
			childMesh.material.bumpTexture.vScale = 3.0;
		});

		let animationBox = new BABYLON.Animation('tutoAnimation', 'rotation.x', 3, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
			BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
		let keys = [];
		// At the animation key 0, the value of scaling is '1'
		keys.push({
			frame: 0,
			value: 0,
		});

		// At the animation key 20, the value of scaling is '0.2'
		keys.push({
			frame: 480,
			value: -90,
		});

		// At the animation key 20, the value of scaling is '0.2'
		keys.push({
			frame: 960,
			value: -180,
		});

		animationBox.setKeys(keys);
		container[0].animations.push(animationBox);
		smallShapeRotate = scene.beginAnimation(container[0], 0, 2400, true, 0.5);
		// container[0].position.x = window.innerWidth/4;
		smallShape = container[0];
		// smallShape.animations[0].framePerSecond = 10;
		// console.log(container[0]);
	});

	BABYLON.SceneLoader.ImportMesh('', 'images/', 'octs_small.glb', fakeShape, (container) => {
		container[0].scaling.scaleInPlace(7.5);

		// console.log(container[0]);
		container[0].position.x = 0;
		container[0].position.y = -(window.innerHeight * 0.15);
		container[0].rotation = BABYLON.Vector3.FromArray([1, 1, 0]);
		// eslint-disable-next-line no-unused-expressions
		container[0].getChildMeshes()[0].dispose;

		container[0].getChildMeshes().forEach((childMesh) => {
			// console.log(childMesh);
			childMesh.material = new BABYLON.StandardMaterial('mat02', scene);
			childMesh.material.diffuseColor = new BABYLON.Color3.FromHexString('#40564E');
			childMesh.material.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
			childMesh.material.bumpTexture = new BABYLON.Texture('../images/noise.jpg', scene);
			childMesh.material.bumpTexture.uScale = 3.0;
			childMesh.material.bumpTexture.vScale = 3.0;
			childMesh.material.alpha = 0;
		});

		let animationBox = new BABYLON.Animation('tutoAnimation', 'rotation.x', 3, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
			BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
		let keys = [];
		// At the animation key 0, the value of scaling is '1'
		keys.push({
			frame: 0,
			value: 0,
		});

		// At the animation key 20, the value of scaling is '0.2'
		keys.push({
			frame: 480,
			value: -90,
		});

		// At the animation key 20, the value of scaling is '0.2'
		keys.push({
			frame: 960,
			value: -180,
		});

		animationBox.setKeys(keys);
		container[0].animations.push(animationBox);
		scene.beginAnimation(container[0], 0, 2400, true, 0.5);
		fakeShape = container[0];
	});

	function getVertices(mesh) {
		if (!mesh) {
			return;
		}
		let piv = mesh.getPivotPoint();
		let positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
		if (!positions) {
			return;
		}
		let numberOfPoints = positions.length / 3;

		let level = false;
		let map = [];
		let poLoc = [];
		let poGlob = [];
		for (let i = 0; i < numberOfPoints; i++) {
			let p = new BABYLON.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
			let found = false;
			for (let index = 0; index < map.length && !found; index++) {
				let array = map[index];
				let p0 = array[0];
				if (p0.equals(p) || p0.subtract(p).lengthSquared() < 0.01) {
					found = true;
				}
			}
			if (!found) {
				let array = [];
				poLoc.push(p.subtract(piv));
				poGlob.push(BABYLON.Vector3.TransformCoordinates(p, mesh.getWorldMatrix()));
				array.push(p);
				map.push(array);
			}
		}

		// eslint-disable-next-line consistent-return
		return {local: poLoc,
			global: poGlob,
			pivot: piv};
	}

	function showVertices(meshTrack) {
		let result = scene.pick(scene.pointerX, scene.pointerY, null, null, camera);
		// console.log(result);
		let vertInfo = getVertices(meshTrack);
		// console.log(vertInfo);
		let vertCount = 0;
		for (let i = 0; i < vertInfo.global.length; i++) {
			vertCount++;
			if (sphere[vertCount]) {
				sphere[vertCount].position = vertInfo.global[i];
			}
		}
	}

	let sphere = [];

	let createFacePoints = function () {
		sphere['1'] = BABYLON.Mesh.CreateSphere('sphere1', 10, 1, scene);
		sphere['1'].isPickable = false;
		sphere['2'] = sphere['1'].clone('sphere2');
		sphere['3'] = sphere['1'].clone('sphere3');
	};

	createFacePoints();

	let whiteMaterial = new BABYLON.StandardMaterial('whiteMaterial', scene);
	whiteMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
	whiteMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
	whiteMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
	whiteMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);

	function createSpheres(name) {
		let polyPos = getVertices(name);

		// console.log(polyPos);
		polyPos.local.forEach((element) => {
			let sphere = BABYLON.MeshBuilder.CreateSphere('mySphere', {diameter: 2}, scene);
			sphere.parent = name;
			sphere.material = whiteMaterial;

			sphere.position.x = element.x;
			sphere.position.y = element.y;
			sphere.position.z = element.z;
		});
	}

	BABYLON.SceneLoader.ImportMesh('', 'images/', 'octs_big.glb', bigShape, (container) => {
		container[0].scaling.scaleInPlace(4);
		container[0].rotation = BABYLON.Vector3.FromArray([0, 700, 100]);
		container[0].position.x = startPointX;
		container[0].position.y = startPointY;

		container[0].getChildMeshes().forEach((childMesh) => {
			// console.log();

			createSpheres(childMesh);
			childMesh.material.alpha = 0;
			childMesh.material.transparencyMode = 2;
			childMesh.material.wireframe = true;
			childMesh.enableEdgesRendering(1 - 0.000000000000001);
			childMesh.edgesWidth = 3;
			childMesh.edgesColor = new BABYLON.Color4(1, 1, 1, 1);
		});

		let animationBox = new BABYLON.Animation('tutoAnimation', 'rotation.z', 3, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
			BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
		let keys = [];
		// At the animation key 0, the value of scaling is '1'
		keys.push({
			frame: 0,
			value: 0,
		});

		// At the animation key 20, the value of scaling is '0.2'
		keys.push({
			frame: 480,
			value: -90,
		});

		// At the animation key 20, the value of scaling is '0.2'
		keys.push({
			frame: 960,
			value: -180,
		});

		animationBox.setKeys(keys);
		container[0].animations.push(animationBox);
		bigShapeRotate = scene.beginAnimation(container[0], 0, 2400, true, 0.5);
		bigShape = container[0];
		bigShape.actionManager = new BABYLON.ActionManager(scene);
		// console.log(container[0]);
	});

	// Animations
	let rotateSphereY = new BABYLON.Animation('rotateSphereY', 'rotation.z', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
	let rotateSphereX = new BABYLON.Animation('rotateSphereX', 'rotation.z', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

	let keysRotate = [];

	keysRotate.push({
		frame: 0,
		value: -1,
	});

	keysRotate.push({
		frame: 10000,
		value: -90,
	});

	let keysRotateReverse = [];

	keysRotateReverse.push({
		frame: 0,
		value: 0,
	});

	keysRotateReverse.push({
		frame: 10000,
		value: 90,
	});

	rotateSphereY.setKeys(keysRotate);
	rotateSphereX.setKeys(keysRotateReverse);

	let sphereAnimations = function () {
		this.normal = function () {
			console.log('normal');

			fakeShape.getChildMeshes().forEach((childMesh) => {
				childMesh.material.alpha = 0;
			});

			let enterPagePositionX = new BABYLON.Animation('enterPagePositionX', 'position.x', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

			let keysEnterPosition = [];
			keysEnterPosition.push({
				frame: 0,
				value: smallShape.position.x,
			});
			keysEnterPosition.push({
				frame: 20,
				value: startPointX,
			});

			let enterPagePositionY = new BABYLON.Animation('enterPagePositionY', 'position.y', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

			let keysEnterPositionY = [];
			keysEnterPositionY.push({
				frame: 0,
				value: smallShape.position.y,
			});
			keysEnterPositionY.push({
				frame: 20,
				value: startPointY,
			});

			let selectedPolygons = [];

			bigShape.getChildMeshes().forEach((childMesh, index) => {
				if (childMesh.id !== 'mySphere') {
					selectedPolygons.push(childMesh);
				}
			});

			for (var i = 0; i < selectedPolygons.length / 1.5; i += 1) {

				let random = 0;
				let random2 = 0;
				let random3 = 6.562567591572588e-7;
				console.log(selectedPolygons[i]);
				let translate = new BABYLON.Animation('translate', 'position', 20, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

				let translatePosition = [];
				translatePosition.push({
					frame: 0,
					value: selectedPolygons[i].position,
				});
				translatePosition.push({
					frame: 20,
					value: new BABYLON.Vector3(random, random2, random3),
				});

				let easingFunction = new BABYLON.SineEase();
				easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
				translate.setEasingFunction(easingFunction);

				translate.setKeys(translatePosition);
				selectedPolygons[i].animations.push(translate);
				scene.beginDirectAnimation(selectedPolygons[i], [translate], 0, 20, false);
			}

			let easingFunction = new BABYLON.CubicEase();
			easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
			enterPagePositionX.setEasingFunction(easingFunction);
			enterPagePositionY.setEasingFunction(easingFunction);

			enterPagePositionX.setKeys(keysEnterPosition);
			enterPagePositionY.setKeys(keysEnterPositionY);
			scene.beginDirectAnimation(smallShape, [enterPagePositionX, enterPagePositionY], 0, 20, false);
			scene.beginDirectAnimation(bigShape, [enterPagePositionX, enterPagePositionY], 0, 20, false);
			// scene.beginDirectAnimation(triggerSphere, [enterPagePositionX, enterPagePositionY], 0, 20, false);
		};
		this.enterPage = function () {
			console.log('enter');
			let enterPagePositionX = new BABYLON.Animation('enterPagePositionX', 'position.x', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

			let keysEnterPosition = [];
			keysEnterPosition.push({
				frame: 0,
				value: smallShape.position.x,
			});
			keysEnterPosition.push({
				frame: 20,
				value: window.innerWidth * 0.45,
			});

			let enterPagePositionY = new BABYLON.Animation('enterPagePositionY', 'position.y', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

			let keysEnterPositionY = [];
			keysEnterPositionY.push({
				frame: 0,
				value: smallShape.position.y,
			});
			keysEnterPositionY.push({
				frame: 20,
				value: startPointY,
			});

			let fakePosition = new BABYLON.Animation('fakePosition', 'position.x', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

			let fakeP = [];
			fakeP.push({
				frame: 0,
				value: fakeShape.position.x,
			});
			fakeP.push({
				frame: 20,
				value: 0,
			});

			let selectedPolygons = [];

			bigShape.getChildMeshes().forEach((childMesh, index) => {
				if (childMesh.id !== 'mySphere') {
					selectedPolygons.push(childMesh);
				}
			});

			for (var i = 0; i < selectedPolygons.length / 1.5; i += 1) {

				let random = 0;
				let random2 = 0;
				let random3 = 6.562567591572588e-7;
				console.log(selectedPolygons[i]);
				let translate = new BABYLON.Animation('translate', 'position', 20, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

				let translatePosition = [];
				translatePosition.push({
					frame: 0,
					value: selectedPolygons[i].position,
				});
				translatePosition.push({
					frame: 20,
					value: new BABYLON.Vector3(random, random2, random3),
				});

				let easingFunction = new BABYLON.SineEase();
				easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
				translate.setEasingFunction(easingFunction);

				translate.setKeys(translatePosition);
				selectedPolygons[i].animations.push(translate);
				scene.beginDirectAnimation(selectedPolygons[i], [translate], 0, 20, false);
			}

			let easingFunction = new BABYLON.CubicEase();
			easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
			enterPagePositionX.setEasingFunction(easingFunction);
			enterPagePositionY.setEasingFunction(easingFunction);
			fakePosition.setEasingFunction(easingFunction);

			enterPagePositionX.setKeys(keysEnterPosition);
			enterPagePositionY.setKeys(keysEnterPositionY);
			fakePosition.setKeys(fakeP);
			scene.beginDirectAnimation(smallShape, [enterPagePositionX, enterPagePositionY], 0, 20, false);
			scene.beginDirectAnimation(bigShape, [enterPagePositionX, enterPagePositionY], 0, 20, false);
			// scene.beginDirectAnimation(triggerSphere, [enterPagePositionX, enterPagePositionY], 0, 20, false);
			scene.beginDirectAnimation(fakeShape, [fakePosition], 0, 20, false);

			function hideFakeShape(params) {
				fakeShape.getChildMeshes().forEach((childMesh) => {
					childMesh.material.alpha = 0;
				});
			}
			setTimeout(hideFakeShape, 500);
		};
		this.scrollStart = function () {

			console.log('scroll');
			let enterPagePositionX = new BABYLON.Animation('enterPagePositionX', 'position.x', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

			let keysEnterPosition = [];
			keysEnterPosition.push({
				frame: 0,
				value: smallShape.position.x,
			});
			keysEnterPosition.push({
				frame: 20,
				value: smallShape.position.x,
			});

			let enterPagePositionY = new BABYLON.Animation('enterPagePositionY', 'position.y', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

			let keysEnterPositionY = [];
			keysEnterPositionY.push({
				frame: 0,
				value: smallShape.position.y,
			});
			keysEnterPositionY.push({
				frame: 20,
				value: window.innerHeight,
			});

			let fakePosition = new BABYLON.Animation('fakePosition', 'position.x', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

			let fakeP = [];
			fakeP.push({
				frame: 0,
				value: fakeShape.position.x,
			});
			fakeP.push({
				frame: 20,
				value: 0,
			});

			let selectedPolygons = [];

			bigShape.getChildMeshes().forEach((childMesh, index) => {
				if (childMesh.id !== 'mySphere') {
					selectedPolygons.push(childMesh);
				}
			});

			for (var i = 0; i < selectedPolygons.length / 1.5; i += 1) {
				function getRandomArbitary(min, max) {
					let pos = Math.random() * (max - min) + min;
					const sphereD = 30;

					if (pos < sphereD && pos > -sphereD) {
						return pos = sphereD * 1.5;
					}

					return pos;

				}

				let random = getRandomArbitary(-300, 300);
				let random2 = getRandomArbitary(-300, 300);
				let random3 = getRandomArbitary(-300, 300);
				console.log(selectedPolygons[i]);
				let translate = new BABYLON.Animation('translate', 'position', 20, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

				let translatePosition = [];
				translatePosition.push({
					frame: 0,
					value: selectedPolygons[i].position,
				});
				translatePosition.push({
					frame: 20,
					value: new BABYLON.Vector3(random, random2, random3),
				});

				let easingFunction = new BABYLON.SineEase();
				easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
				translate.setEasingFunction(easingFunction);

				translate.setKeys(translatePosition);
				selectedPolygons[i].animations.push(translate);
				scene.beginDirectAnimation(selectedPolygons[i], [translate], 0, 20, false);
			}

			let mainSpherePositionX = new BABYLON.Animation('enterPagePositionX', 'position.x', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

			let mainSpherePositionXKeys = [];
			mainSpherePositionXKeys.push({
				frame: 0,
				value: smallShape.position.x,
			});
			mainSpherePositionXKeys.push({
				frame: 20,
				value: window.innerWidth * 0.45,
			});

			// console.log(fakeShape);
			let easingFunction = new BABYLON.SineEase();
			easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
			enterPagePositionX.setEasingFunction(easingFunction);
			enterPagePositionY.setEasingFunction(easingFunction);
			fakePosition.setEasingFunction(easingFunction);
			mainSpherePositionX.setEasingFunction(easingFunction);

			enterPagePositionX.setKeys(keysEnterPosition);
			enterPagePositionY.setKeys(keysEnterPositionY);
			mainSpherePositionX.setKeys(mainSpherePositionXKeys);
			fakePosition.setKeys(fakeP);
			// scene.beginDirectAnimation(triggerSphere, [enterPagePositionX, enterPagePositionY], 0, 20, false);
			scene.beginDirectAnimation(smallShape, [mainSpherePositionX], 0, 20, false);
			scene.beginDirectAnimation(fakeShape, [fakePosition], 0, 20, false);
			function hideFake() {
				fakeShape.getChildMeshes().forEach((childMesh) => {
					childMesh.material.alpha = 0;
				});
			}
			setTimeout(hideFake, 800);
		};
		this.scrollEnd = function () {

			console.log('scroll');
			let enterPagePositionX = new BABYLON.Animation('enterPagePositionX', 'position.x', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

			let keysEnterPosition = [];
			keysEnterPosition.push({
				frame: 0,
				value: smallShape.position.x,
			});
			keysEnterPosition.push({
				frame: 20,
				value: window.innerWidth,
			});

			let fakePosition = new BABYLON.Animation('fakePosition', 'position.x', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

			let fakeP = [];
			fakeP.push({
				frame: 0,
				value: fakeShape.position.x,
			});
			fakeP.push({
				frame: 20,
				value: -(window.innerWidth * 0.2),
			});

			// console.log(fakeShape);
			let easingFunction = new BABYLON.SineEase();
			easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
			enterPagePositionX.setEasingFunction(easingFunction);
			fakePosition.setEasingFunction(easingFunction);

			enterPagePositionX.setKeys(keysEnterPosition);
			fakePosition.setKeys(fakeP);
			scene.beginDirectAnimation(smallShape, [enterPagePositionX], 0, 20, false);
			// scene.beginDirectAnimation(triggerSphere, [enterPagePositionX], 0, 20, false);
			scene.beginDirectAnimation(fakeShape, [fakePosition], 0, 20, false);

			fakeShape.getChildMeshes().forEach((childMesh) => {
				childMesh.material.alpha = 1;
			});
		};
	};

	// Наведение на сферы

	// triggerSphere.actionManager = new BABYLON.ActionManager(scene);

	// triggerSphere.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function(ev){
	// 	smallShapeRotate.speedRatio = 1.2;
	// 	bigShapeRotate.speedRatio = 1.2;

	// 	function standartSpeed() {
	// 		smallShapeRotate.speedRatio = 0.5;
	// 		bigShapeRotate.speedRatio = 0.5;
	// 	}

	// 	setTimeout(standartSpeed, 1600);
	// }));

	// triggerSphere.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function(ev){
	// 	smallShapeRotate.speedRatio = -1.2;
	// 	bigShapeRotate.speedRatio = -1.2;

	// 	function standartSpeed() {
	// 		smallShapeRotate.speedRatio = 0.5;
	// 		bigShapeRotate.speedRatio = 0.5;
	// 	}

	// 	setTimeout(standartSpeed, 1600);
	// }));

	// const gui = new dat.GUI();
	// let text = new sphereAnimations();
	// gui.add(text, 'normal');
	// gui.add(text, 'enterPage');
	// gui.add(text, 'scrollStart');
	// gui.add(text, 'scrollEnd');

	return scene;

}

let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);

if (!isMobile) {
	let scene = createScene();
}

engine.runRenderLoop(() => {
	if (scene) {
		scene.render();
	}
});

// Resize
window.addEventListener('resize', () => {
	engine.resize();
});

function stateNormal() {
	console.log('normal');

	fakeShape.getChildMeshes().forEach((childMesh) => {
		childMesh.material.alpha = 0;
	});

	let enterPagePositionX = new BABYLON.Animation('enterPagePositionX', 'position.x', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

	let keysEnterPosition = [];
	keysEnterPosition.push({
		frame: 0,
		value: smallShape.position.x,
	});
	keysEnterPosition.push({
		frame: 20,
		value: startPointX,
	});

	let enterPagePositionY = new BABYLON.Animation('enterPagePositionY', 'position.y', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

	let keysEnterPositionY = [];
	keysEnterPositionY.push({
		frame: 0,
		value: smallShape.position.y,
	});
	keysEnterPositionY.push({
		frame: 20,
		value: startPointY,
	});

	let selectedPolygons = [];

	bigShape.getChildMeshes().forEach((childMesh, index) => {
		if (childMesh.id !== 'mySphere') {
			selectedPolygons.push(childMesh);
		}
	});

	for (var i = 0; i < selectedPolygons.length / 1.5; i += 1) {

		let random = 0;
		let random2 = 0;
		let random3 = 6.562567591572588e-7;
		// console.log(selectedPolygons[i]);
		let translate = new BABYLON.Animation('translate', 'position', 20, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

		let translatePosition = [];
		translatePosition.push({
			frame: 0,
			value: selectedPolygons[i].position,
		});
		translatePosition.push({
			frame: 20,
			value: new BABYLON.Vector3(random, random2, random3),
		});

		let easingFunction = new BABYLON.SineEase();
		easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
		translate.setEasingFunction(easingFunction);

		translate.setKeys(translatePosition);
		selectedPolygons[i].animations.push(translate);
		scene.beginDirectAnimation(selectedPolygons[i], [translate], 0, 20, false);
		selectedPolygons[i].position = new BABYLON.Vector3(random, random2, random3);
	};

	let easingFunction = new BABYLON.CubicEase();
	easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
	enterPagePositionX.setEasingFunction(easingFunction);
	enterPagePositionY.setEasingFunction(easingFunction);

	enterPagePositionX.setKeys(keysEnterPosition);
	enterPagePositionY.setKeys(keysEnterPositionY);
	scene.beginDirectAnimation(smallShape, [enterPagePositionX, enterPagePositionY], 0, 20, false);
	scene.beginDirectAnimation(bigShape, [enterPagePositionX, enterPagePositionY], 0, 20, false);
	// scene.beginDirectAnimation(triggerSphere, [enterPagePositionX, enterPagePositionY], 0, 20, false);
}
function statePageLoaded() {
	console.log('enter');
	let enterPagePositionX = new BABYLON.Animation('enterPagePositionX', 'position.x', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

	let keysEnterPosition = [];
	keysEnterPosition.push({
		frame: 0,
		value: smallShape.position.x,
	});
	keysEnterPosition.push({
		frame: 20,
		value: window.innerWidth * 0.45,
	});

	let enterPagePositionY = new BABYLON.Animation('enterPagePositionY', 'position.y', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

	let keysEnterPositionY = [];
	keysEnterPositionY.push({
		frame: 0,
		value: smallShape.position.y,
	});
	keysEnterPositionY.push({
		frame: 20,
		value: startPointY,
	});

	let fakePosition = new BABYLON.Animation('fakePosition', 'position.x', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

	let fakeP = [];
	fakeP.push({
		frame: 0,
		value: fakeShape.position.x,
	});
	fakeP.push({
		frame: 20,
		value: 0,
	});

	let selectedPolygons = [];

	let bigChilds = bigShape.getChildMeshes();
	bigChilds.forEach((childMesh, index) => {
		if (childMesh.id !== 'mySphere') {
			selectedPolygons.push(childMesh);
		}
	});

	for (var i = 0; i < selectedPolygons.length / 1.5; i += 1) {

		let random = 0;
		let random2 = 0;
		let random3 = 6.562567591572588e-7;
		// console.log(selectedPolygons[i]);
		let translate = new BABYLON.Animation('translate', 'position', 20, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

		let translatePosition = [];
		translatePosition.push({
			frame: 0,
			value: selectedPolygons[i].position,
		});
		translatePosition.push({
			frame: 20,
			value: new BABYLON.Vector3(random, random2, random3),
		});

		let easingFunction = new BABYLON.SineEase();
		easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
		translate.setEasingFunction(easingFunction);

		translate.setKeys(translatePosition);
		selectedPolygons[i].animations.push(translate);
		scene.beginDirectAnimation(selectedPolygons[i], [translate], 0, 20, false);
	}

	let easingFunction = new BABYLON.CubicEase();
	easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
	enterPagePositionX.setEasingFunction(easingFunction);
	enterPagePositionY.setEasingFunction(easingFunction);
	fakePosition.setEasingFunction(easingFunction);

	enterPagePositionX.setKeys(keysEnterPosition);
	enterPagePositionY.setKeys(keysEnterPositionY);
	fakePosition.setKeys(fakeP);
	scene.beginDirectAnimation(smallShape, [enterPagePositionX, enterPagePositionY], 0, 20, false);
	scene.beginDirectAnimation(bigShape, [enterPagePositionX, enterPagePositionY], 0, 20, false);
	// scene.beginDirectAnimation(triggerSphere, [enterPagePositionX, enterPagePositionY], 0, 20, false);
	scene.beginDirectAnimation(fakeShape, [fakePosition], 0, 20, false);

	function hideFakeShape(params) {
		fakeShape.getChildMeshes().forEach((childMesh) => {
			childMesh.material.alpha = 0;
		});
	}
	setTimeout(hideFakeShape, 500);
}
function stateStartScroll() {

	// console.log('scroll');            
	var enterPagePositionX = new BABYLON.Animation("enterPagePositionX", "position.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

	let keysEnterPosition = [];
	keysEnterPosition.push({
		frame: 0,
		value: smallShape.position.x,
	});
	keysEnterPosition.push({
		frame: 20,
		value: smallShape.position.x,
	});

	let enterPagePositionY = new BABYLON.Animation('enterPagePositionY', 'position.y', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

	let keysEnterPositionY = [];
	keysEnterPositionY.push({
		frame: 0,
		value: smallShape.position.y,
	});
	keysEnterPositionY.push({
		frame: 20,
		value: window.innerHeight,
	});

	let fakePosition = new BABYLON.Animation('fakePosition', 'position.x', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

	let fakeP = [];
	fakeP.push({
		frame: 0,
		value: fakeShape.position.x,
	});
	fakeP.push({
		frame: 20,
		value: 0,
	});

	let selectedPolygons = [];

	bigShape.getChildMeshes().forEach((childMesh, index) => {
		if (childMesh.id !== 'mySphere') {
			selectedPolygons.push(childMesh);
		}
	});

	for (var i = 0; i < selectedPolygons.length / 1.5; i += 1) {
		function getRandomArbitary(min, max) {
			let pos = Math.random() * (max - min) + min;
			const sphereD = 30;

			if (pos < sphereD && pos > -sphereD) {
				return pos = sphereD * 1.5;
			}

		var random = getRandomArbitary(-300,300);
		var random2 = getRandomArbitary(-300,300);
		var random3 = getRandomArbitary(-300,300);
		// console.log(selectedPolygons[i]);
		var translate = new BABYLON.Animation("translate", "position", 20, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

		let translatePosition = [];
		translatePosition.push({
			frame: 0,
			value: selectedPolygons[i].position,
		});
		translatePosition.push({
			frame: 20,
			value: new BABYLON.Vector3(random, random2, random3),
		});

		let easingFunction = new BABYLON.SineEase();
		easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
		translate.setEasingFunction(easingFunction);

		translate.setKeys(translatePosition);
		selectedPolygons[i].animations.push(translate);
		scene.beginDirectAnimation(selectedPolygons[i], [translate], 0, 20, false);
	}

	let mainSpherePositionX = new BABYLON.Animation('enterPagePositionX', 'position.x', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

	let mainSpherePositionXKeys = [];
	mainSpherePositionXKeys.push({
		frame: 0,
		value: smallShape.position.x,
	});
	mainSpherePositionXKeys.push({
		frame: 20,
		value: window.innerWidth * 0.45,
	});

	// console.log(fakeShape);
	let easingFunction = new BABYLON.SineEase();
	easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
	enterPagePositionX.setEasingFunction(easingFunction);
	enterPagePositionY.setEasingFunction(easingFunction);
	fakePosition.setEasingFunction(easingFunction);
	mainSpherePositionX.setEasingFunction(easingFunction);

	enterPagePositionX.setKeys(keysEnterPosition);
	enterPagePositionY.setKeys(keysEnterPositionY);
	mainSpherePositionX.setKeys(mainSpherePositionXKeys);
	fakePosition.setKeys(fakeP);
	// scene.beginDirectAnimation(triggerSphere, [enterPagePositionX, enterPagePositionY], 0, 20, false);
	scene.beginDirectAnimation(smallShape, [mainSpherePositionX], 0, 20, false);
	scene.beginDirectAnimation(fakeShape, [fakePosition], 0, 20, false);
	function hideFake() {
		fakeShape.getChildMeshes().forEach((childMesh) => {
			childMesh.material.alpha = 0;
		});
	}
	setTimeout(hideFake, 800);
}
function stateScroll() {

	// console.log('scroll');            
	var enterPagePositionX = new BABYLON.Animation("enterPagePositionX", "position.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

	let keysEnterPosition = [];
	keysEnterPosition.push({
		frame: 0,
		value: smallShape.position.x,
	});
	keysEnterPosition.push({
		frame: 20,
		value: window.innerWidth,
	});

	let fakePosition = new BABYLON.Animation('fakePosition', 'position.x', 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

	let fakeP = [];
	fakeP.push({
		frame: 0,
		value: fakeShape.position.x,
	});
	fakeP.push({
		frame: 20,
		value: -(window.innerWidth * 0.2),
	});

	// console.log(fakeShape);
	let easingFunction = new BABYLON.SineEase();
	easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
	enterPagePositionX.setEasingFunction(easingFunction);
	fakePosition.setEasingFunction(easingFunction);

	enterPagePositionX.setKeys(keysEnterPosition);
	fakePosition.setKeys(fakeP);
	scene.beginDirectAnimation(smallShape, [enterPagePositionX], 0, 20, false);
	// scene.beginDirectAnimation(triggerSphere, [enterPagePositionX], 0, 20, false);
	scene.beginDirectAnimation(fakeShape, [fakePosition], 0, 20, false);

	fakeShape.getChildMeshes().forEach((childMesh) => {
		childMesh.material.alpha = 1;
	});
	// console.log(enterPagePositionX);
}

function stateInnerPage() {
	var innerPosition = window.innerWidth * 0.45;

	bigShape.position.x = innerPosition;
	smallShape.position.x = innerPosition;
}

function expansion () {

}

function testNext() {
	// console.log('work next');
}

function hoverOn() {
	smallShapeRotate.speedRatio = 1.2;
	bigShapeRotate.speedRatio = 1.2;

	function standartSpeed() {
		smallShapeRotate.speedRatio = 0.5;
		bigShapeRotate.speedRatio = 0.5;
	}

	setTimeout(standartSpeed, 1600);
}

function hoverOff() {
	smallShapeRotate.speedRatio = -1.2;
	bigShapeRotate.speedRatio = -1.2;

	function standartSpeed() {
		smallShapeRotate.speedRatio = 0.5;
		bigShapeRotate.speedRatio = 0.5;
	}

	setTimeout(standartSpeed, 1600);
}

export default {
	testNext,
	stateNormal,
	statePageLoaded,
	stateStartScroll,
	stateScroll,
	stateInnerPage,
	hoverOn,
	hoverOff,
};
