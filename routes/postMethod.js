var postRoutes = {};

postRoutes['/createPlayer'] = require('./post/create_player.js').getPage;

postRoutes['Error 404'] = (req, res) => {
  res.end('Error 404 : Page not found!!');
};

module.exports = {
  routes: postRoutes
};
