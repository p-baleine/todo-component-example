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
 * PUT :id
 */

exports.update = function(req, res) {
  var item = items[req.body.id] = req.body;
  res.send(item);
};

/**
 * DELTE :id
 */

exports.destroy = function(req, res) {
  var id = Number(req.params.item)
    , removed = items.splice(id, 1)
    , i, l;
  // TODO do not change ids.
  for (i = id, l = items.length; i < l; i++) { items[i].id--; }
  res.send(removed);
};
