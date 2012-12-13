;(function() {

  // export globas
  should = chai.should();
  _ = require('component-underscore');
  Backbone = require('solutionio-backbone/index.js');
  jQuery = $ = require('component-jquery');

  // assign `$` to Backbone
  Backbone.$ = $;

  // helpers

  /**
   * return valid response for sinon.fakeServer#responseWith()
   * @param {Object} data
   * @return {Array} response
   */

  function validResponse(data) {
    return [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify(data)
    ];
  }

  /**
   * mock for component-require
   */

  var componentMock = (function() {
    var originalMockMap = {};

    /**
     * register mock
     * @param {String} moduleName
     * @param {Object} mock
     */

    function registerMock(moduleName, mock) {
      originalMockMap[moduleName] = require.modules[moduleName];
      require.register(moduleName, function(module, exports, require) {
        module.exports = mock;
      });
    }

    /**
     * deregister mock
     * @param {String} moduleName
     */

    function deregisterMock(moduleName) {
      require.register(moduleName, originalMockMap[moduleName]);
    }

    return {
      registerMock: registerMock,
      deregisterMock: deregisterMock
    };
  }());


  helper = {
    validResponse: validResponse,
    componentMock: componentMock
  };

}());