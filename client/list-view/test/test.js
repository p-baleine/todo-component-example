describe('list-view', function() {
  var should = chai.should()
    , ListView;

  before(function() {
    var self = this;
    this.collection = new (Backbone.Collection.extend({ url: 'hoge' }));
    helper.componentMock.registerMock('items/index.js', function() { return self.collection; });
    ListView = require('list-view');
  });

  after(function() {
    helper.componentMock.deregisterMock('items/index.js');
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