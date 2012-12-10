
/**
 * fixture
 */

var items = [
  {
    id: 0,
    title: 'read DailyJS',
    done: false
  },
  {
    id: 1,
    title: 'write my blog',
    done: true
  }
];

/**
 * GET
 */

exports.index = function(req, res) {
  res.send(items);
};

/**
 * POST
 */

exports.create = function(req, res) {
  var item = req.body
    , id = items.push(item) - 1;
  item.id = id;
  res.send(item);
};

/**
 * POST :id
 */

exports.update= function(req, res) {
  var item = items[req.body.id] = req.body;
  res.send(item);
};