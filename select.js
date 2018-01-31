  let selectedPiece = "green2x2";
  let zoomFactor = 0.3;
  let oldZoomFactor = 0.3;
  let panHorizontal = 0.1;
  let oldPanHorizontal = 0.1;
  let panVertical = 0.1;
  let oldPanVertical = 0.1;
  let rotateY = 0;
  let oldRotateY = 0;
  let panDepth = 0;
  let oldPanDepth = 0;
  let rotateX = 0;
  let oldRotateX = 0;
  let rotateZ = 0;
  let oldRotateZ = 0;
  let addFlag = false;
  let turntable = false;
  let guide;

  const selectPiece = function (piece) {
      $(".brick").removeClass("selected");
      $(piece).addClass("selected");
      selectedPiece = $(piece).attr("id");
      guide = "brick";
      minifig.visible = false;
      // console.log(selectedPiece);
  };
  
  const addToScene = function() {
     addFlag = true;
  }
  
  $('#turntableMode').change(
    function(){
      
        console.log("changed");
        if ($(this).is(':checked')) {
          turntable = true;
          // console.log("turntableMode: " + turntableMode);
        } else {
          turntable = false;
          // console.log("turntableMode: " + turntableMode);
        }
    });

  $("#zoom").on("input", function() {
    oldZoomFactor = zoomFactor;
    zoomFactor = $("#zoom").val() * -1 + 75;
    // console.log(zoomFactor);
  });
  
  $("#panHorizontal").on("input", function() {
    oldPanHorizontal = panHorizontal;
    panHorizontal = $("#panHorizontal").val() * -1;
  });
  
  $("#panVertical").on("input", function() {
    oldPanVertical = panVertical;
    panVertical = $("#panVertical").val();
  });
  
  $("#panDepth").on("input", function() {
    oldPanDepth = panDepth;
    panDepth = $("#panDepth").val() //* -1;
  });
  
  $("#rotateY").on("input", function() {
    oldRotateY = rotateY;
    rotateY = $("#rotateY").val();
  });
  
  $("#rotateX").on("input", function() {
    oldRotateX = rotateX;
    rotateX = $("#rotateX").val();
  });
  
  $("#rotateZ").on("input", function() {
    oldRotateZ = rotateZ;
    rotateZ = $("#rotateZ").val();
  });
  
  let width = $("#sidebar").width();
  width = (width * -1) / 2;
  
  $("#panPeter").on("input", function() {
      if ($("#panPeter").val() === "50") {
        $('#container').children().hide();
        $("#container").append("<img id='peter' src='http://static.tvtropes.org/pmwiki/pub/images/peter_pan_2.jpg'>");
        $("#container").offset({ left: 325 });
        
      } else {
        
        $("#container").offset({ left: width });
        $("#container").children().show();
        $("#peter").hide()
      }
  });