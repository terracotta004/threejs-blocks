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
    renderer.setClearColor(0xFFFFFF);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

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
      color: 0x00FF00
    });

    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -100;
    mesh.rotation.z = 0.25;
    mesh.rotation.y = 0.25;
    mesh.rotation.x = 0.25;

    // let pivot = new THREE.Group();
    scene.add(mesh);
    // scene.add(pivot);
    // camera.position.set(300, 30, 900);

    const animate = function (mesh) {

      mesh.rotation.z += 0.01;
      // mesh.rotation.y += 0.25;
      // mesh.rotation.x += 0.25;

      renderer.render(scene, camera);

      requestAnimationFrame(render);

    };

    animate(mesh);

  };

  main();

}
