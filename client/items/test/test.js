describe('items', function() {
  var Collection = require('items');

  beforeEach(function() {
    this.collection = new Collection([{ title: 'hoge' }]);
  });

  it('should be an instance of Backbone.Collection', function() {
    expect(this.collection).to.be.a(Backbone.Collection);
  });

  it('should have `/items` as its url', function() {
    expect(this.collection.url).to.be.equal('/items');
  });

  it('should instantiate model with default value `done` with false', function() {
    expect(this.collection).to.have.length(1);
    expect(this.collection.first().get('done')).to.be(false);
  });

  describe('validation', function() {
    it('should not create item who dose not have title attribute', function() {
      this.collection = new Collection();
      this.collection.create({});
      expect(this.collection).to.have.length(0);
    });
  });
});
