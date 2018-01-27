window.onload = function () {
  "use strict";
  const main = function () {
let renderer,
  scene,
  camera,
  myCanvas = document.getElementById('myCanvas');

// RENDERER
renderer = new THREE.WebGLRenderer({
  canvas: myCanvas,
  antialias: true
});

let width = (((window.innerWidth / 12) * 9) - 10);

renderer.setClearColor(0xFFFFFF);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, window.innerHeight);

// CAMERA
camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 10000);

// SCENE
scene = new THREE.Scene();

// LIGHTS
let light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

let light2 = new THREE.PointLight(0xffffff, 0.5);

scene.add(light2);

let geometry = new THREE.BoxGeometry( 10, 5, 10 );

let material = new THREE.MeshLambertMaterial({
  color: 0xff0000
});

let mesh = new THREE.Mesh(geometry, material);

let brick = new THREE.Group();
brick.add(mesh);

geometry = new THREE.CylinderGeometry( 1, 1, 5, 32 );
material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
let cylinder = new THREE.Mesh( geometry, material );
cylinder.position.y -= -5;
cylinder.position.z -= -3;
cylinder.position.x -= -3;
brick.add( cylinder );

brick.position.z = -100;
brick.rotation.z = 0.25;
brick.rotation.y = 0.25;
brick.rotation.x = 0.25;

// let pivot = new THREE.Group();
scene.add(brick);
// scene.add(pivot);
// camera.position.set(300, 30, 900);

  const animate = function () {

  brick.rotation.z += 0.01;
  // mesh.rotation.y += 0.25;
  // mesh.rotation.x += 0.25;

  renderer.render(scene, camera);

  requestAnimationFrame(animate);

};

// document.body.appendChild(fontLabel);

//RENDER LOOP
animate();

};

main();

}
