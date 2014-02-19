'use strict';

(function(exports){

  exports.create = function() {
    var my = {};
    var elements = [];
    var tally = 0;

    my.size = function() {
      return tally;
    };

    my.add = function(add) {
      elements[tally] = add;
      tally++;
      return tally-1;
    };

    my.get = function(index) {
      return elements[index];
    };

    my.addElements = function(indexedElements) {
      for (var i = 0; i < indexedElements.length; i++) {
        var index = indexedElements[i].index;
        var data = indexedElements[i].data;
        elements[index] = data;
        while (elements[tally + 1] !== undefined) {
          tally = tally + 1;
          }
        }
    };

    my.getNew = function(latest) {
      if(latest >= tally || latest < 0)
        return;
      var es = [];
      for (var i = latest; i <= tally; i++) {
        es.push({index: i, data: elements[i]});
      }
      return es;
    };

    my.toJSON = function() {
      return JSON.stringify({elements: elements, tally: tally});
    };

    my.fromJSON = function(json) {
      var data = JSON.parse(json);
      elements = data.elements;
      tally = data.tally;
      return this;
    };

    return my;
  };

})(typeof exports === 'undefined' ? this.syncarray={}: exports);

