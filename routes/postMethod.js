/*
  module ในการเก็บ route ใน เมธอด POST
*/

var postRoutes = {};

postRoutes['/createPlayer'] = require('./post/create_player.js').getPage;
postRoutes['/selectLevel'] = require('./post/select_level.js').getPage;

postRoutes['Error 404'] = (req, res) => {
  res.end('Error 404 : Page not found!!');
};

module.exports = {
  routes: postRoutes
};
