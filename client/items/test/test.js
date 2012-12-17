describe('items', function() {
  var Collection = require('items');

  beforeEach(function() {
    this.collection = new Collection([{ title: 'hoge' }]);
  });

  it('should be an instance of Backbone.Collection', function() {
    this.collection.should.be.an.instanceof(Backbone.Collection);
  });

  it('should have `/items` as its url', function() {
    this.collection.url.should.be.eql('/items');
  });

  it('should instantiate model with default value `done` with false', function() {
    this.collection.should.have.length(1);
    this.collection.first().get('done').should.be.equal(false);
  });

  describe('validation', function() {
    it('should not save item who dose not have title attribute', function() {
      this.collection = new Collection([{}]);
      this.collection.should.have.length(0);
    });
  });
});