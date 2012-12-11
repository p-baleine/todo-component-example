;(function() {

  // export globas
  should = chai.should();
  _ = require('component-underscore');
  Backbone = require('solutionio-backbone/index.js');
  jQuery = $ = require('component-jquery');

  // assign `$` to Backbone
  Backbone.$ = $;

  helper = {

    /**
     * sinon.fakeServer#responseWith()向け、有効な応答を返却する
     * @param {Object} data
     * @return {Array} 応答
     */

    validResponse: function(data) {
      return [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(data)
      ];
    }
  };

}());