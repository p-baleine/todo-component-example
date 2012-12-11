
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
    'keydown .edit': 'save'
  },

  initialize: function() {
    this.model.on('change', this.render, this);
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
    dump('rejected?');
    if ((!e.keyCode || e.keyCode != 13) || (!e.which && e.which != 13)) { return; }
    dump('called');
    this.model.save({ title: this.$('.edit').val() });
  },

  toggleEdit: function() {
    this.$el.addClass('editing');
  },

  template: _.template(require('./template'))
});