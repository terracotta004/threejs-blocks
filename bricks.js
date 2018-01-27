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

    let width = $("#sidebar").width();
    width = (width * -1) / 2;

    $("#container").offset({
      left: width
    });

    renderer.setClearColor(0xFFFFFF);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // CAMERA
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 10000);

    // SCENE
    scene = new THREE.Scene();

    // LIGHTS
    let light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    let light2 = new THREE.PointLight(0xffffff, 0.5);
    // light2.position.set(0, 0, 0);
    scene.add(light2);

    let geometry = new THREE.BoxGeometry( 10, 5, 10 );

    let material = new THREE.MeshLambertMaterial({
      color: 0x00FF00
    });

    // let material = new THREE.MeshToonMaterial();

    let mesh = new THREE.Mesh(geometry, material);

    let brick = new THREE.Group();
    brick.add(mesh);

    geometry = new THREE.CylinderGeometry( 1.25, 1.25, 2, 32);
    material = new THREE.MeshLambertMaterial( {color: 0x00ff00});

    let cylinder = new THREE.Mesh(geometry, material);

    let nubs = [];

    for (let i = 0; i < 6; i++) {
      nubs[i] = new THREE.Mesh(geometry, material);
    }

    nubs[0].position.y += 2.5;
    nubs[0].position.z += 3;
    nubs[0].position.x += 3;
    brick.add(nubs[0]);

    nubs[1].position.y += 2.5;
    nubs[1].position.z += 3;
    nubs[1].position.x += 0;
    brick.add(nubs[1]);

    nubs[2].position.y += 2.5;
    nubs[2].position.z += 3;
    nubs[2].position.x += -3;
    brick.add(nubs[2]);

    brick.position.z = -100;
    brick.rotation.z = 0.25;
    brick.rotation.y = 0.25;
    brick.rotation.x = 0.25;

    // let pivot = new THREE.Group();
    scene.add(brick);
    // scene.add(pivot);
    // camera.position.set(300, 30, 900);

    let rotationLabel = document.createElement('h1');
    rotationLabel.innerHTML = brick.rotation.z;
    rotationLabel.id = "rotationLabel";
    document.body.appendChild(rotationLabel)

    const animate = function () {
      // console.log(brick.rotation.z);
      rotationLabel.innerHTML = "Z Rotation: " + brick.rotation.z;
      // brick.rotation.z += 0.01;
      // mesh.rotation.y += 0.25;
      // mesh.rotation.x += 0.25;

      renderer.render(scene, camera);

      requestAnimationFrame(animate);

    };

    animate();

  };

  main();

}
