describe('item-view', function() {
  var ItemView = require('item-view');

  beforeEach(function() {
    this.model = new Backbone.Model({ title: 'hoge', done: false });
    this.model.url = 'hoge';
    this.view = new ItemView({ model: this.model });
  });

  it('should be an instance of Backbone.View', function() {
    this.view.should.be.an.instanceof(Backbone.View);
  });

  it('should have `item` as its class name', function() {
    this.view.render().$el.should.have.class('item');
  });

  it('should have `li` as its tag name', function() {
    this.view.render().el.tagName.should.be.eql('LI');
  });

  it('should render on `change` event of its model', function() {
    var self = this;
    (function() {
      return self.view.$('label').length;
    }).should.change.from(0).to(1)
        .when(function() {
          self.model.trigger('change');
        });
  });

  it('should render title', function() {
    this.view.render().$el.should.contain('hoge');
  });

  describe('`done` status', function() {
    describe('when `done` is false', function() {
      beforeEach(function() {
        this.model = new Backbone.Model({ title: 'hoge', done: false });
        this.view = new ItemView({ model: this.model });
      });

      it('should not check checkbox', function() {
        this.view.render().$('[type=checkbox]').should.not.be.checked;
      });
    });

    describe('when `done` is true', function() {
      beforeEach(function() {
        this.model = new Backbone.Model({ title: 'hoge', done: true });
        this.view = new ItemView({ model: this.model });
      });

      it('should not check checkbox', function() {
        this.view.render().$('[type=checkbox]').should.be.checked;
      });
    });
  });

  describe('when label is double clicked', function() {
    beforeEach(function() {
      this.view.render().$('.view').trigger('dblclick');
    });

    it('should be editable', function() {
      this.view.$el.should.have.class('editing');
    });
  });

  describe('when textfield receive enter keydown', function() {
    beforeEach(function() {
      this.saveSpy = sinon.spy(this.model, 'save');
      this.event = Backbone.$.Event('keydown');
      this.event.keyCode = this.event.which = 13;
      this.view.render().$el.addClass('editing');
      this.view.$('.edit').val('piyo').trigger(this.event);
    });

    afterEach(function() {
      this.model.save.restore();
    });

    it('should save its title', function() {
      this.saveSpy.should.have.been.calledWith({ title: 'piyo' });
    });
  });

  describe('when checkbox is checked', function() {
    beforeEach(function() {
      this.saveSpy = sinon.spy(this.model, 'save');
      this.view.render().$('.done').attr('checked', true);
      this.view.$('.done').change();
    });

    afterEach(function() {
      this.model.save.restore();
    });

    it('should save its `done` state', function() {
      this.saveSpy.should.have.been.calledWith({ done: true });
    });
  });
});