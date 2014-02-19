'use strict';

(function(exports){

  exports.create = function() {
    var my = {};
    var elements = [];
    var size = 0;


    //**
    //* Returns the number of elements in this list.
    my.size = function() {
      return size;
    };

    //**
    //* Adds an element to the list, and increases the size of this list.
    //* returns the index to which the new element was added.
    my.add = function(add) {
      elements[size] = add;
      size++;
      notifyObservers({index: size-1, data:add});
      return size-1;
    };

    //**
    //* Returns the element with the given index number.
    my.get = function(index) {
      return elements[index];
    };

    //**
    //* Adds a list of index-element pairs to this list.
    //* Looks for objects that have fields 'index' and 'data'.
    //* If there are elements, whose indices collide with existing ones,
    //* they are not added.
    my.addElements = function(indexedElements) {
      for (var i = 0; i < indexedElements.length; i++) {
        var index = indexedElements[i].index;
        var data = indexedElements[i].data;
        elements[index] = data;
        notifyObservers({index: index, data: data});
      }
      //fix the size counter
      while (elements[size + 1] !== undefined) {
        size = size + 1;
      }
    };

    //**
    //* Returns all the messages since the given message number. 
    //* If the request number is impossibly high, returns undefined.
    //* The returned value is a list of objects that have two fields -
    //*  - index, which tells the index of the element in the list
    //*  - data, which has the element for that index
    my.elementsAfter = function(latest) {
      if(latest >= size || latest < 0)
        return;
      var es = [];
      for (var i = latest; i < size; i++) {
        es.push({index: i, data: elements[i]});
      }
      return es;
    };

    // //**
    // //* Returns a JSONified object, that describes this synclist
    // //* It has two fields:
    // //*  - elements, which contains the list of elements
    // //*  - size, which contains the size of the list.
    // my.toJSON = function() {
    //   return JSON.stringify({elements: elements, size: size});
    // };

    // //**
    // //* Builds this object from a JSON string. See toJSON().
    // my.fromJSON = function(json) {
    //   var data = JSON.parse(json);
    //   elements = data.elements;
    //   size = data.size;
    //   notifyObservers();
    // };


    var observers = [];

    var notifyObservers = function(data) {
      observers.forEach(function(observer) {
        observer.notify(data);
      });
    };

    my.addObserver = function(newObserver) {
      observers.push(newObserver);
    };

    return my;
  };

})(typeof exports === 'undefined' ? this.syncList={}: exports);

