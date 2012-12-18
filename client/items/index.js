
/**
 * Module dependencies.
 */

var _ = require('underscore')
  , Backbone = require('backbone.js');

/**
 * Model
 */

var Model = Backbone.Model.extend({
  defaults: {
    'done': false
  },

  validate: function(attrs) {
    if (!attrs.title) { return 'enter title'; }
  }
});

/**
 * Collection
 */

var Collection = module.exports = Backbone.Collection.extend({
  url: '/items',
  model: Model
});
