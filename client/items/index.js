
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
  }
});

/**
 * Collection
 */

var Collection = exports = module.exports = Backbone.Collection.extend({
  url: '/items',
  model: Model
});
