var $ = require('jquery')
  , Backbone = require('backbone.js')
  , ListView = require('list-view');

Backbone.$ = $;

$(function() {
  new ListView({ el: '#content' });
});