
/**
 * Module dependencies.
 */

var _ = require('underscore')
  , Backbone = require('backbone.js');

/**
 * Item view
 */

var ItemView = exports = module.exports = Backbone.View.extend({

  className: 'item',

  tagName: 'li',

  events: {
    'change .done': 'done',
    'dblclick .view': 'toggleEdit',
    'keydown .edit': 'save',
    'click .destroy': 'destroy'
  },

  initialize: function() {
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.removeClass('editing');
    return this;
  },

  done: function() {
    this.model.save({ done: this.$('.done').is(':checked') });
  },

  save: function(e) {
    if ((!e.keyCode || e.keyCode != 13) || (!e.which && e.which != 13)) { return; }
    this.model.save({ title: this.$('.edit').val() });
  },

  destroy: function(e) {
    e.preventDefault();
    this.model.destroy();
  },

  toggleEdit: function() {
    this.$el.addClass('editing');
  },

  template: _.template(require('./template'))
});