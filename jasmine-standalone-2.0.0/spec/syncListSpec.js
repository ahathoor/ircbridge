describe("syncList", function() {
  var sList;

  beforeEach(function() {
    sList = syncList.create();
    observer = {notify: function(data) {
      this.receivedData = data;
    }};
    sList.addObserver(observer);
  });

  describe("when an element is added", function() {
    beforeEach(function() {
      sList.add('test');
    });

    it("should increase in size", function() {
      expect(sList.size()).toEqual(1);
    });
    it("should have the element in the index", function() {
      expect(sList.get(sList.size() - 1)).toEqual('test');
    });
    it("should notify the test observer of the added data", function () {
      expect(observer.receivedData.index).toEqual(0);
      expect(observer.receivedData.data).toEqual('test');
    });
  });

  describe("after adding multiple elements", function() {
    beforeEach(function() {
      sList.add('test0');
      sList.add('test1');
      sList.add('test2');
      sList.add('test3');
      sList.add('test4');
    });

    it("should increase in size", function() {
      expect(sList.size()).toEqual(5);
    });
    it("should have the elements in the right indices", function() {
      for (var i = 0; i < sList.size; i++) {
        expect(sList.get(i)).toEqual('test' + i);
      }
    });
    it("should notify the test observer of the added data", function () {
      expect(observer.receivedData.index).toEqual(4);
      expect(observer.receivedData.data).toEqual('test4');
    });
    describe("when asking it to return elements since an index", function () {
      it("should return all elements if asked the elements since 0", function () {
        expect(sList.elementsAfter(0)[0].index).toEqual(0);
        expect(sList.elementsAfter(0)[0].data).toEqual('test0');
        expect(sList.elementsAfter(0)[4].index).toEqual(4);
        expect(sList.elementsAfter(0)[4].data).toEqual('test4');
        expect(sList.elementsAfter(2)[0].index).toEqual(2);
        expect(sList.elementsAfter(2)[0].data).toEqual('test2');
      });
      it("should return nothing if asked with an number bigger or equal to it's size", function () {
        expect(sList.elementsAfter(sList.size()-1)).not.toEqual(undefined);
        expect(sList.elementsAfter(sList.size())).toEqual(undefined);
        expect(sList.elementsAfter(sList.size()+1)).toEqual(undefined);
      })
    });
  });
});
