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
       },
       
       setNextIndex: function(index) {
           nextIndex = index++;
           return null;
       },
       
       setNextIndexOf: function(element) {
           try {
            nextIndex = array.indexOf(element) + 1;
            return true;
           } catch (err) {
             throw err;
           }
       }
    }
};
