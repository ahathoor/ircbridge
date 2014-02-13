'use strict';

(function(exports){

  exports.create = function() {
    var my = {};
    var elements = [];
    var tally = 0;

    my.latest = function() {
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

    my.getElements = function(low, high) {
      high = (high >= 0) ? high : tally;
      low = (low >= 0) ? low : 0;
      var es = [];
      for (var i = low; i <= high; i++) {
        es.push(elements[i]);
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

