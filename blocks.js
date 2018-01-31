// bricks.js

/* global THREE */
/* global $ */
/* global build2x2 */
/* global build2x3 */
/* global buildBaseplate */
/* global selectedPiece */

window.onload = function () {
  "use strict";
  
  const main = function () {
    let guides = ["brick", "minifig"];
    let guidesIter = makeIterator(guides);
    let guide = guidesIter.next().value;
    

    let renderer,
      scene,
      camera,
      myCanvas = document.getElementById('myCanvas');
      
    let clock = new THREE.Clock();

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

    // CAMERA
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);

    // SCENE
    scene = new THREE.Scene();

    // LIGHTS
    let light = new THREE.AmbientLight(0xffffff, 0.5, 0, 2);
    scene.add(light);

    // let light2 = new THREE.PointLight(0xffffff, 0.5, 0, 2);
    // light2.position.set(20, 50, 20);
    // scene.add(light2);
    
    var lights = [];
			lights[ 0 ] = new THREE.DirectionalLight( 0xffffff, 1.75 );
			lights[ 1 ] = new THREE.PointLight( 0xffffff, 0.5, 0, 2 );
			lights[ 2 ] = new THREE.PointLight( 0xffffff, 0.5, 0, 2 );

			lights[ 0 ].position.set( 0, 200, 0 );
			lights[ 1 ].position.set( 100, 200, 100 );
			lights[ 2 ].position.set( - 100, - 200, - 100 );

			scene.add( lights[ 0 ] );
		// 	scene.add( lights[ 1 ] );
			scene.add( lights[ 2 ] );
    
    // // PIVOT
    var cameraPivot = new THREE.Object3D();
    
    // BASEPLATE
    
    let baseplate = buildBaseplate();
    
    scene.add(baseplate);
    baseplate.add(cameraPivot);
    cameraPivot.add(camera);
    camera.position.y = -10;
    camera.position.z = 100;
    
    baseplate.position.z = -120;
    
    baseplate.position.y -= 4;
    baseplate.position.z -= 7;
    baseplate.position.x -= 7;
    
    // DEFAULT CAMERA POSITION/ANGLE
    
    camera.fov = 42.54;
    camera.position.y += 80;
    // console.log(camera.position.y);
    camera.rotation.x += -0.52;
    camera.position.z += 32.45;
    
    // instantiate a loader
    let loader = new THREE.OBJLoader();
    let minifig;
    
    // load a resource
    loader.load(
    	// resource URL
    	'model/lego.obj',
    	// called when resource is loaded
    	function ( object ) {
    	  object.position.z = -95;
    	  object.scale.set(2, 2, 2);
        minifig = object;
        minifig.visible = false;
          let material = new THREE.MeshPhongMaterial({
            color: "gray",
            specular: 0x050505,
            shininess: 100,
            reflectivity: 30,
            transparent: true,
            opacity: 0.6
          });
          
        minifig.traverse( function ( child ) {

          if ( child instanceof THREE.Mesh ) {
              child.material = material;
          }

        });
        scene.add(minifig);
    
    	},
    	// called when loading is in progresses
    	function ( xhr ) {
    
    		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
    	},
    	// called when loading has errors
    	function ( error ) {
    
    		console.log( 'An error happened' );
    
    	}
    );
  
    // DEFAULT BRICK
    
    let brick = build2x2("green");
    
    scene.add(brick);

    brick.position.z = -97;
    brick.position.x = 23;
    brick.position.y = .6;

    let types = ['1x1', '2x2', '2x3'];
    let colors = ["green", "blue", "red", "yellow"];
    let typesIter = makeIterator(types);
    let colorsIter = makeIterator(colors);
    let selectedBrickType;
    let selectedBrickColor;

    $(document).keydown(function(e) {

      
      switch(e.which) {
          case 9: // cycle brick types - tab
            e.preventDefault();
            if (guide.includes("brick")) {
              selectedPiece = $(".selected").attr("id");
              // console.log("init piece: " + selectedPiece);
              
              selectedBrickType = selectedPiece.substr(-3);
              // console.log("init substring: " + selectedBrickType);
              
              typesIter.setNextIndexOf(selectedBrickType)
              
              selectedBrickType = typesIter.next().value;
              
              // console.log("new substring: " + selectedBrickType);
              
              selectedPiece = selectedPiece.slice(0, -3) + selectedBrickType;
              
              // console.log("new piece: " + selectedPiece);
              
              $(".brick").removeClass("selected");
              // $(".collapse").removeClass("in");
              
              $("#" + selectedPiece).addClass("selected");
              
              $("#" + selectedBrickType + "link").click();
            }
            
            break;
            
          case 192: // cycle colors - `
            
            selectedPiece = $(".selected").attr("id");
            selectedBrickColor = selectedPiece.slice(0,-3);
            colorsIter.setNextIndexOf(selectedBrickColor);
            selectedBrickColor = colorsIter.next().value;
            selectedPiece = selectedBrickColor + selectedPiece.substr(-3);
            $(".brick").removeClass("selected");
            $("#" + selectedPiece).addClass("selected");
            
            break;
            
          // case 74: // jj - rotate scene left
          
          //   scene.rotation.y = 1.57;
          //   scene.position.x = 120;
          //   scene.position.z = -134;
          
          //   break;
            
          // case 73: // ii- rotate scene back
          
          //   scene.rotation.y = 3.14;
          //   scene.position.x = -14;
          //   scene.position.z = -254;
          
          //   break;
            
          // case 76: // ll - rotate scene right
          
          //   scene.rotation.y = 4.711;
          //   scene.position.x = -134;
          //   scene.position.z = -120;
          
          //   break;
            
          // case 75: // kk - rotate scene front
            
          //   scene.rotation.y = 0;
          //   scene.position.x = 0;
          //   scene.position.z = 0;
            
          //   break;
          
          case 77: // switch to/from minifig guide - m
          
            if (minifig.visible && brick.visible) {
              if (guide.includes("minifig")) brick.visible = false;
              if (guide.includes("brick")) minifig.visible = false;
            } else if (!minifig.visible && !brick.visible) {
              if (guide.includes("brick")) {
                minifig.visible = true;
                brick.visible = false;
              } 
              if (guide.includes("minifig")) {
                minifig.visible = false;
                brick.visible = true;
              }
            } else {
              minifig.visible = !minifig.visible;
              brick.visible = !brick.visible;
            }
            
            guide = guidesIter.next().value;
            
            console.log(guide);
          
            break;
            
          case 49: // green - 1
            
            selectedPiece = $(".selected").attr("id");
            selectedPiece = "green" + selectedPiece.substr(-3);
            $(".brick").removeClass("selected");
            $("#" + selectedPiece).addClass("selected");
            
            break;
            
          case 50: // blue - 2
            
            selectedPiece = $(".selected").attr("id");
            selectedPiece = "blue" + selectedPiece.substr(-3);
            $(".brick").removeClass("selected");
            $("#" + selectedPiece).addClass("selected");
            
            break;
            
          case 51: // red - 3
          
            selectedPiece = $(".selected").attr("id");
            selectedPiece = "red" + selectedPiece.substr(-3);
            $(".brick").removeClass("selected");
            $("#" + selectedPiece).addClass("selected");
          
            break;
            
          case 52: // yellow - 4
            
            selectedPiece = $(".selected").attr("id");
            selectedPiece = "yellow" + selectedPiece.substr(-3);
            $(".brick").removeClass("selected");
            $("#" + selectedPiece).addClass("selected");
            
            break;
            
          case 32: // add/remove brick - spacebar
            if (!minifig.visible) addFlag = true;
            else {
              let placedMinifig = minifig.clone();
              
              let material = new THREE.MeshPhongMaterial({
                color: "gray",
                specular: 0x050505,
                shininess: 100,
                reflectivity: 30,
                transparent: false,
                opacity: 0.6
              });
          
              placedMinifig.traverse( function ( child ) {
      
                if ( child instanceof THREE.Mesh ) {
                    child.material = material;
                }
      
              });
              
              placedMinifig.position.z = minifig.position.z;
              placedMinifig.position.x = minifig.position.x;
              placedMinifig.position.y = minifig.position.y;
              scene.add(placedMinifig);
            }
            break;
        
          case 84: // turn the baseplate continuously - t
            turntable = !turntable;
            $('#turntableMode').prop("checked", turntable);
            break;
            
          case 65: // left - a
            if (brick.position.x > -37) {
              brick.position.x += -3;
            }
            
            if (minifig.position.x > -37) {
              minifig.position.x += -3;
            }
            break;
  
          case 68: // right - d
            if (brick.position.x < 22) {
              brick.position.x += 3;
            }
            if (minifig.position.x < 22) {
              minifig.position.x += 3;
            }
            break;
            
          case 72: // hide/show guide block - h
            if (guide.includes("minifig")) minifig.visible = !minifig.visible;
            
            if (guide.includes("brick")) brick.visible = !brick.visible;
            
            break;
            
          case 87: // up - w
            if (brick.position.z > -156) {
              brick.position.z += -3;
            } 
            if (minifig.position.z > -156) {
              minifig.position.z += -3;
            }
            break;  
  
          case 83: // down - s
           if (brick.position.z < -97) {
            brick.position.z += 3;
           }
           if (minifig.position.z < -97) {
            minifig.position.z += 3;
           }
            break;
          
          case 81: // back - q
            if (brick.position.y > 0.7) {
               brick.position.y += -5;
            }
            if (minifig.position.y > 0.7) {
              minifig.position.y += -5;
            }
            break;
          
          case 69: // forward - e
            if (brick.position.y < 54) {
              brick.position.y += 5;
            }
            if (minifig.position.y < 54) {
              minifig.position.y += 5;
            }
            break;
  
          default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
      // console.log("X: " + brick.position.x + " Y: " + brick.position.y + " Z: " + brick.position.z);
    });
    
    // let label = document.getElementById("label");
    $("#label").hide();
    
    let oldPiece = "green2x2";
    
    let sceneBricks = [];
    let brickCounter = 0;

    const animate = function () {
      if( turntable === true ) cameraPivot.rotation.y += 0.001;
      // if (guide.includes("brick")) minifig.visible = false;
      
      if (oldZoomFactor !== zoomFactor) {
        camera.fov = zoomFactor;
        // label.innerHTML = "Camera Zoom Factor: " + Math.floor(zoomFactor * -1 + 75);
        camera.updateProjectionMatrix();
        oldZoomFactor = zoomFactor;
      }
      
      if (oldPanHorizontal !== panHorizontal) {
        camera.position.x = panHorizontal;
        oldPanHorizontal = panHorizontal;
        // label.innerHTML = "Camera X Position: " + camera.position.x;
        
      }
      
      if (oldPanVertical !== panVertical) {
        camera.position.y = panVertical;
        oldPanVertical = panVertical;
        // label.innerHTML = "Camera Y Position: " + camera.position.y;
        
      }
      
      if (oldRotateY !== rotateY) {
        camera.rotation.y = rotateY;
        oldRotateY = rotateY;
      }
      
      if (oldPanDepth !== panDepth) {
        camera.position.z = panDepth;
        oldPanDepth = panDepth;
      }
      
      if (oldRotateX !== rotateX) {
        camera.rotation.x = rotateX;
        oldRotateX = rotateX;
      }
      
      if (oldRotateZ !== rotateZ) {
        camera.rotation.z = rotateZ;
        oldRotateZ = rotateZ;
      }

      // brick.rotation.y += 0.01;
      // mesh.rotation.y += 0.25;
      // mesh.rotation.x += 0.25;
      
      if (addFlag === true) {
        let thereIsAlreadyABrickInThisPosition = false;
        try {
        for (let b = sceneBricks.length - 1; b >= 0; b--) {
          if (brick.position.x == sceneBricks[b].position.x) {
            if (brick.position.y == sceneBricks[b].position.y) {
              if (brick.position.z == sceneBricks[b].position.z) {
                // we definitely get here when the guide brick overlaps a sceneBrick, I checked
                thereIsAlreadyABrickInThisPosition = true;
                scene.remove(sceneBricks[b]);
                sceneBricks.splice(b, 1);
                addFlag = false;
                
              }
            }
          }
        }
      } catch (err) {
        console.error("hey dummy fix your loop");
      }
        if (!thereIsAlreadyABrickInThisPosition) {
          switch (selectedPiece.substr(-3)) {
            case "1x1":
              sceneBricks[brickCounter] = build1x1(selectedPiece.slice(0, -3), false);
              break;
            case "2x2":
              sceneBricks[brickCounter] = build2x2(selectedPiece.slice(0, -3), false);
              break;
            case "2x3":
              sceneBricks[brickCounter] = build2x3(selectedPiece.slice(0, -3), false);
              break;
          }
          
          sceneBricks[brickCounter].position.x = brick.position.x;
          sceneBricks[brickCounter].position.y = brick.position.y;
          sceneBricks[brickCounter].position.z = brick.position.z;
          sceneBricks[brickCounter].name = "brick" + brickCounter;
          
          scene.add(sceneBricks[brickCounter]);
          
          // scene.add(sceneBricks[brickCounter]);
          brickCounter++;
          addFlag = false;
        }
        // console.log(sceneBricks);
      }
      
      if (!(selectedPiece === oldPiece)) {
        let oldBrick = brick;
        scene.remove(brick);
        let selectedBrickType = selectedPiece.substr(-3);
        let selectedBrickColor = selectedPiece.slice(0, -3);
        let oldBrickType = oldPiece.substr(-3); 
        
        
        switch (selectedBrickType) {
          case "1x1":
            brick = build1x1(selectedBrickColor);
            console.log(oldBrickType + "-> 1x1");
            // switch (oldBrickType) {
            //   case "2x2":
            //     brick.position.z = oldBrick.position.z + 1.5;
            //     brick.position.x = oldBrick.position.x + 1.5;
            //     brick.position.y = oldBrick.position.y;
            //   case "2x3":
            //     brick.position.z = oldBrick.position.z + 1.5;
            //     brick.position.x = oldBrick.position.x + 3;
            //     brick.position.y = oldBrick.position.y;
            //   case "1x1":
            //     brick.position.z = oldBrick.position.z;
            //     brick.position.x = oldBrick.position.x;
            //     brick.position.y = oldBrick.position.y;
            // }
            
            brick.position.z = -95.5;
            brick.position.x = 24.5;
            brick.position.y = .6;
            break;
          case "2x2":
            brick = build2x2(selectedBrickColor);
              console.log(oldBrickType + "-> 2x2");
            // switch (oldBrickType) {
            //   case "2x2":
            //     brick.position.z = oldBrick.position.z;
            //     brick.position.x = oldBrick.position.x;
            //     brick.position.y = oldBrick.position.y;
            //   case "2x3":
            //     brick.position.z = oldBrick.position.z;
            //     brick.position.x = oldBrick.position.x + 1.5;
            //     brick.position.y = oldBrick.position.y;
            //   case "1x1":
            //     brick.position.z = oldBrick.position.z - 1.5;
            //     brick.position.x = oldBrick.position.x - 1.5;
            //     brick.position.y = oldBrick.position.y;
            // }
            
            brick.position.z = -97;
            brick.position.x = 23;
            brick.position.y = .6;
            break;
          case "2x3":
            brick = build2x3(selectedBrickColor);
              console.log(oldBrickType + "-> 2x3");
            // switch (oldBrickType) {
            //   case "2x2":
            //     brick.position.z = oldBrick.position.z;
            //     brick.position.x = oldBrick.position.x - 1.5;
            //     brick.position.y = oldBrick.position.y;
            //   case "2x3":
            //     brick.position.z = oldBrick.position.z;
            //     brick.position.x = oldBrick.position.x;
            //     brick.position.y = oldBrick.position.y;
            //   case "1x1":
            //     brick.position.z = oldBrick.position.z - 1.5;
            //     brick.position.x = oldBrick.position.x - 3;
            //     brick.position.y = oldBrick.position.y;
            // }
            
            brick.position.z = -97;
            brick.position.x = 21.5;
            brick.position.y = .6;
            break;
        }
        
        scene.add(brick);

      }
      
      oldPiece = selectedPiece;

    //   let manager = new THREE.LoadingManager();
    // manager.onProgress = function ( item, loaded, total ) {
    //   console.log((loaded / total * 100) + '%');
    // };

      requestAnimationFrame(animate);
      
      render();

    };

    animate();
    
    function render() {
      renderer.render(scene, camera);
    }
    

  };

  main();

};
