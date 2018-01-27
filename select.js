let selectedPiece = brick1;

$(function () {
  $(".brick").click(function() {
    $(".brick").removeClass("selected");
    $(this).addClass("selected");
    selectedPiece = $(this).attr("id");
    console.log(selectedPiece);
  });
});
