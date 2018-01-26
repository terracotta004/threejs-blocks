function makeIterator(array) {
    var nextIndex = 0;

    return {
       next: function() {
           if (nextIndex < array.length) {
             return {value: array[nextIndex++]};
           } else {
             nextIndex = 0;
             return {value: array[nextIndex++]};
           }
       }
    }
};
