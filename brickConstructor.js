/* global THREE */
/* global pragmataProJSON */

const selectColor = function(selector) {
  let yellow = 0xfbe01e;
  let red = 0xdd1a1b;
  let green = 0x57901f;
  let blue = 0x208cf4;

  switch (selector) {
    case "green":
      return green;
    case "blue":
      return blue;
    case "yellow":
      return yellow;
    case "red":
      return red;
  }
}

const build2x3 = function(brickColor, transparent=true) {
  brickColor = selectColor(brickColor);
  let geometry = new THREE.BoxGeometry( 9, 5, 6 );

  let material = new THREE.MeshPhongMaterial({
    color: brickColor,
    specular: 0x050505,
    shininess: 100,
    reflectivity: 30,
    transparent: transparent,
    opacity: 0.6
  });

  let mesh = new THREE.Mesh(geometry, material);

  let brick = new THREE.Group();
  brick.add(mesh);

  let cylinderGeometry = new THREE.CylinderGeometry( 1.25, 1.25, 2, 32);

  let cylinder = new THREE.Mesh(cylinderGeometry, material);

  let loader = new THREE.FontLoader();
  let font = loader.parse(pragmataProJSON);
  let textGeometry = new THREE.TextGeometry("LAGO", {
    font: font,
    size: .7,
    height: .15,
    bevelThickness: 1,
    extrudeMaterial: 1
  });

  let nubs = [];
  let text = [];

  for (let i = 0; i < 6; i++) {
    nubs[i] = new THREE.Mesh(cylinderGeometry, material);
    nubs[i].position.z = -1.25;
    nubs[i].position.y += 2.5;


    text[i] = new THREE.Mesh(textGeometry, material);
    text[i].position.y = 3.5;
    text[i].rotation.x = -1.5;
  }

  nubs[0].position.z += 2.8;
  nubs[0].position.x += 3;
  brick.add(nubs[0]);

  nubs[1].position.z += 2.8;
  nubs[1].position.x += 0;
  brick.add(nubs[1]);
  
  nubs[2].position.z += 2.8;
  nubs[2].position.x += -3;
  brick.add(nubs[2]);
  
  nubs[3].position.z += -0.3;
  nubs[3].position.x += 3;
  brick.add(nubs[3]);

  nubs[4].position.z += -0.3;
  nubs[4].position.x += 0;
  brick.add(nubs[4]);
  
  nubs[5].position.z += -0.3;
  nubs[5].position.x += -3;
  brick.add(nubs[5]);

  text[0].position.z = 1.9;
  text[0].position.x = -1.05;
  brick.add(text[0]);

  text[1].position.z = 1.9;
  text[1].position.x += -4;
  brick.add(text[1]);

  text[2].position.z = 1.9;
  text[2].position.x += 2;
  brick.add(text[2]);

  text[3].position.z -= 1.2;
  text[3].position.x += 2;
  brick.add(text[3]);

  text[4].position.z -= 1.2;
  text[4].position.x += -4;
  brick.add(text[4]);

  text[5].position.z -= 1.2;
  text[5].position.x += -1.05;
  brick.add(text[5]);
  
  return brick;
};

const build2x2 = function(brickColor, transparent=true) {
  brickColor = selectColor(brickColor);
  
  let geometry = new THREE.BoxGeometry( 6, 5, 6 );

  let material = new THREE.MeshPhongMaterial({
    color: brickColor,
    specular: 0x050505,
    shininess: 100,
    reflectivity: 30,
    transparent: transparent,
    opacity: 0.6
  });

  let mesh = new THREE.Mesh(geometry, material);

  let brick = new THREE.Group();
  brick.add(mesh);
  
  let cylinderGeometry = new THREE.CylinderGeometry( 1.25, 1.25, 2, 32);

  let cylinder = new THREE.Mesh(cylinderGeometry, material);

  let loader = new THREE.FontLoader();
  let font = loader.parse(pragmataProJSON);
  let textGeometry = new THREE.TextGeometry("LAGO", {
    font: font,
    size: .7,
    height: .15,
    bevelThickness: 1,
    extrudeMaterial: 1
  });
  
  let nubs = [];
  let text = [];

  for (let i = 0; i < 4; i++) {
    nubs[i] = new THREE.Mesh(cylinderGeometry, material);
    nubs[i].position.z = -1.25;
    nubs[i].position.y += 2.5;


    text[i] = new THREE.Mesh(textGeometry, material);
    text[i].position.y = 3.5;
    text[i].rotation.x = -1.5;
  }

  nubs[0].position.z += 2.8;
  nubs[0].position.x += 1.5;
  brick.add(nubs[0]);

  nubs[1].position.z += 2.8;
  nubs[1].position.x += -1.5;
  brick.add(nubs[1]);
  
  nubs[2].position.z += -0.3;
  nubs[2].position.x += 1.5;
  brick.add(nubs[2]);

  nubs[3].position.z += -0.3;
  nubs[3].position.x += -1.5;
  brick.add(nubs[3]);

  text[0].position.z = 1.9;
  text[0].position.x = -2.55;
  brick.add(text[0]);

  text[1].position.z = 1.9;
  text[1].position.x += 0.5;
  brick.add(text[1]);

  text[2].position.z -= 1.2;
  text[2].position.x += 0.5;
  brick.add(text[2]);

  text[3].position.z -= 1.2;
  text[3].position.x += -2.55;
  brick.add(text[3]);

  return brick;
}; 

const build1x1 = function(brickColor, transparent=true) {
  brickColor = selectColor(brickColor);
  
  let geometry = new THREE.BoxGeometry( 3, 5, 3 );

  let material = new THREE.MeshPhongMaterial({
    color: brickColor,
    specular: 0x050505,
    shininess: 100,
    reflectivity: 30,
    transparent: transparent,
    opacity: 0.6
  });

  let mesh = new THREE.Mesh(geometry, material);

  let brick = new THREE.Group();
  brick.add(mesh);
  
  let cylinderGeometry = new THREE.CylinderGeometry( 1.25, 1.25, 2, 32);

  let cylinder = new THREE.Mesh(cylinderGeometry, material);

  let loader = new THREE.FontLoader();
  let font = loader.parse(pragmataProJSON);
  let textGeometry = new THREE.TextGeometry("LAGO", {
    font: font,
    size: .7,
    height: .15,
    bevelThickness: 1,
    extrudeMaterial: 1
  });
  
  let nubs = new THREE.Mesh(cylinderGeometry, material);
  let text = new THREE.Mesh(textGeometry, material);

    nubs.position.z = 0;
    nubs.position.y += 2.5;

    text.position.y = 3.5;
    text.position.x = -1;
    text.rotation.x = -1.5;
    text.position.z = .3;

  // nubs[0].position.z += 3;
  // nubs[0].position.x += 1.5;
  brick.add(nubs);


  // text[0].position.z = 2.1;
  // text[0].position.x = -2.55;
  brick.add(text);

  return brick;
}; 
    
const buildBaseplate = function() {

  let geometry = new THREE.BoxGeometry( 68, 1, 68 );

  let color = 0x282828; // gray

  let material = new THREE.MeshLambertMaterial( {color: color});

  let mesh = new THREE.Mesh(geometry, material);

  let brick = new THREE.Group();
  
  mesh.position.y += 1.// 5;
  
  brick.add(mesh);

  let cylinderGeometry = new THREE.CylinderGeometry( 1.25, 1.25, 1, 32);

  let cylinder = new THREE.Mesh(cylinderGeometry, material);

  let loader = new THREE.FontLoader();
  let font = loader.parse(pragmataProJSON);
  let textGeometry = new THREE.TextGeometry("LAGO", {
    font: font,
    size: .7,
    height: .15,
    bevelThickness: 1,
    extrudeMaterial: 1
  });

  let nubs = [];
  let text = [];

  let k = 0;
  let depth = -31.5;
  
//   let nubRows = [3, -0.5];
//   let nubCols = [3, 0, -3];
  
//   let textRows = [2.1, 0.4];
//   let textCols = [-1.05, -4, 2];
  
//   let nubRowsIter = makeIterator(nubRows);
//   let nubRow = nubRowsIter.next();
  
//   let nubColsIter = makeIterator(nubCols);
//   let nubCol = nubColsIter.next();
  
//   let textRowsIter = makeIterator(textRows);
//   let textRow = textRowsIter.next();
  
//   let textColsIter = makeIterator(textCols);
//   let textCol = textColsIter.next();
  

  for (let i = 0; i < 22; i++) {
    
    for (let j = 0; j < 22; j++) {
    
      nubs[k] = new THREE.Mesh(cylinderGeometry, material);
      nubs[k].position.y += 2.5;
  
      nubs[k].position.z += depth;
      nubs[k].position.x += (-31.5 + (3 * j));

    text[k] = new THREE.Mesh(textGeometry, material);
    text[k].position.y = 3;
    text[k].rotation.x = -1.5;
    
    text[k].position.z += (depth + .5 );
    text[k].position.x += ((-31.5 + (2.99 * j) - .85));
    
    
    brick.add(nubs[k]);
    // brick.add(text[k]);
    k++;
//     nubRow = nubRowsIter.next();
//     nubCol = nubColsIter.next();
//     textRow = textRowsIter.next();
//     textCol = textColsIter.next();
      
    }
    
    depth += 3;
  }

  return brick;
};