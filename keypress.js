  $(function() {
    $(document).keydown(function(event) {
     if (event.keyCode == 9) {
         event.preventDefault();
         mode = modeIterator.next();
       }
    });
    let initial = true;
    $(document).keypress(function(event) {

      if (textString.includes("MEMES") && initial) {
        textString = "";
        initial = false;
      }

      if (event.which === 8) {
        event.preventDefault();
        textString = textString.substring(0, textString.length - 1);
      } else {
        character = String.fromCharCode(event.which);
        if (!character.includes("�")) {
          textString += character;
        }
      }
    });
  });
