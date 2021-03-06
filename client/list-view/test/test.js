describe('list-view', function() {
  var ListView;

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
      expect(this.view).to.be.a(Backbone.View);
    });

    it('should fetch on instantiation', function() {
      expect(this.fetchSpy.called).to.be.ok();
    });
  });

  describe('on collection\'s `reset` event', function() {
    beforeEach(function() {
      this.view = new ListView();
      this.collection.reset([{ title: 'hoge', done: true }, { title: 'piyo', done: false }]);
    });

    it('should render items', function() {
      expect(this.view.$('.item')).to.have.length(2);
    });
  });

  describe('on collection\'s `add` event', function() {
    beforeEach(function() {
      this.view = new ListView();
      this.collection.add([{ title: 'hoge', done: true }]);
    });

    it('should render items', function() {
      expect(this.view.$('.item')).to.have.length(1);
    });
  });
});