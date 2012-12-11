describe('list-view', function() {
  var ListView;

  before(function() {
    var self = this;
    this.originalCollection = require.modules['items/index.js'];
    this.collection = new (Backbone.Collection.extend({ url: 'hoge' }));
    require.register('items/index.js', function(module, exports, require) {
      module.exports = function() { return self.collection; };
    });
    ListView = require('list-view');
  });

  after(function() {
    require.register('items/index.js', this.originalCollection);
  });

  describe('initialization', function() {
    beforeEach(function() {
      this.fetchSpy = sinon.spy(this.collection, 'fetch');
      this.view = new ListView();
    });

    afterEach(function() {
      this.collection.fetch.restore();
    });

    it('should be an instance of Backbone.View', function() {
      this.view.should.be.an.instanceof(Backbone.View);
    });

    it('should fetch on instantiation', function() {
      this.fetchSpy.should.have.been.called;
    });
  });

  describe('on collection\'s `reset` event', function() {
    beforeEach(function() {
      this.view = new ListView();
      this.collection.reset([{ title: 'hoge', done: true }, { title: 'piyo', done: false }]);
    });

    it('should render items', function() {
      this.view.$('.item').length.should.be.equal(2);
    });
  });

  describe('on collection\'s `add` event', function() {
    beforeEach(function() {
      this.view = new ListView();
      this.collection.add([{ title: 'hoge', done: true }]);
    });

    it('should render items', function() {
      this.view.$('.item').length.should.be.equal(1);
    });
  });
});