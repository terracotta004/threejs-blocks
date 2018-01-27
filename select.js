  let selectedPiece = brick1;

  const selectPiece = function (piece) {
      $(".brick").removeClass("selected");
      $(piece).addClass("selected");
      selectedPiece = $(piece).attr("id");
      console.log(selectedPiece);
  };
