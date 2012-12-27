/**
 * Module dependencies.
 */

var _ = require('underscore')
  , Backbone = require('backbone.js')
  , ItemView = require('item-view')
  , Collection = require('items');

/**
 * List view
 */

var ListView = exports = module.exports = Backbone.View.extend({

  events: {
    'keydown [name=new-item]': 'create'
  },

  initialize: function() {
    _.bindAll(this, "alertError");
    this.collection = new Collection();
    this.collection.on('reset', this.renderList, this);
    this.collection.on('add', this.renderItem, this);
    this.collection.fetch();
    this.render();
  },

  create: function(e) {
    var title = this.$('[name=new-item]').val();
    if ((!e.keyCode || e.keyCode != 13) || (!e.which && e.which != 13)) { return; }
    if (title === '') { return; }
    this.collection.create({ title: title }, { error: this.alertError });
    this.$('[name=new-item]').val('');
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  renderList: function() {
    this.collection.each(this.renderItem, this);
    return this;
  },

  renderItem: function(model) {
    this.$('ul').append((new ItemView({ model: model })).render().el);
    return this;
  },

  alertError: function() {
    alert(arguments);
  },

  template: _.template(require('./template'))
});
