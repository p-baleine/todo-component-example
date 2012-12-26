describe('item-view', function() {
  var ItemView = require('item-view');

  beforeEach(function() {
    this.model = new Backbone.Model({ title: 'hoge', done: false });
    this.model.url = 'hoge';
    this.view = new ItemView({ model: this.model });
  });

  it('should be an instance of Backbone.View', function() {
    expect(this.view).to.be.a(Backbone.View);
  });

  it('should have `item` as its class name', function() {
    expect(this.view.render().$el.attr('class')).to.be.equal('item');
  });

  it('should have `li` as its tag name', function() {
    expect(this.view.render().el.tagName).to.be.equal('LI');
  });

  it('should render on `change` event of its model', function() {
    var self = this;
    expect(this.view.$('label')).to.have.length(0);
    this.model.trigger('change');
    expect(this.view.$('label')).to.have.length(1);
  });

  it('should render title', function() {
    expect(this.view.render().$el.html()).to.match(/hoge/);
  });

  describe('`done` status', function() {
    describe('when `done` is false', function() {
      beforeEach(function() {
        this.model = new Backbone.Model({ title: 'hoge', done: false });
        this.view = new ItemView({ model: this.model });
      });

      it('should not check checkbox', function() {
        expect(this.view.render().$('[type=checkbox]').is(':checked')).to.not.be.ok();
      });
    });

    describe('when `done` is true', function() {
      beforeEach(function() {
        this.model = new Backbone.Model({ title: 'hoge', done: true });
        this.view = new ItemView({ model: this.model });
      });

      it('should not check checkbox', function() {
        expect(this.view.render().$('[type=checkbox]').is(':checked')).to.be.ok();
      });
    });
  });

  describe('when label is double clicked', function() {
    beforeEach(function() {
      this.view.render().$('.view').trigger('dblclick');
    });

    it('should be editable', function() {
      expect(this.view.$el.attr('class')).to.contain('editing');
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
      expect(this.saveSpy.lastCall.args[0]).to.have.property('title', 'piyo');
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
      expect(this.saveSpy.lastCall.args[0]).to.have.property('done', true);
    });
  });

  describe('when `remove` button is clicked', function() {
    beforeEach(function() {
      this.destroySpy = sinon.spy(this.model, 'destroy');
      this.removeSpy = sinon.spy(this.view.$el, 'remove');
      this.view.render().$('.destroy').trigger('click');
    });

    afterEach(function() {
      this.model.destroy.restore();
      this.view.$el.remove.restore();
    });

    it('should destroy the item', function() {
      expect(this.destroySpy.called).to.be.ok();
    });

    it('should be detached from body', function() {
      expect(this.removeSpy.called).to.be.ok();
    });
  });
});