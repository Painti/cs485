var fs = require('fs');
var path = require('path');

var getRoutes = {};

getRoutes['/'] = require('./get/index.js').getPage;
getRoutes['/level'] = require('./get/level.js').getPage;
getRoutes['/play'] = require('./get/play.js').getPage;
getRoutes['/result'] = require('./get/result.js').getPage;

getRoutes['Error 404'] = (req, res) => {
  console.log('  - ERROR 404 : ' + req.url + ' not found!!');
  var data = '<h1>Error 404 : ' + req.url + ' not found!!</h1>';
  res.writeHead(404, {
    'Content-Type': 'text/html',
    'Content-Length': data.length
  });
  res.end(data);
};

var readAndWrite = function(res, file, type) {
  var data = fs.readFileSync(file);
  res.writeHead(200, {
    'Content-Type': type,
    'Content-Length': data.length
  });
  res.end(data);
};

var files = fs.readdirSync('./view/css');
files.forEach(file => {
  getRoutes['/css/' + file] = (req, res) => {
    readAndWrite(res, './view/css/' + file, 'text/css')
  };
});

files = fs.readdirSync('./view/js');
files.forEach(file => {
  getRoutes['/js/' + file] = (req, res) => {
    readAndWrite(res, './view/js/' + file, 'application/javascript')
  };
});

files = fs.readdirSync('./view/img');
files.forEach(file => {
  getRoutes['/img/' + file] = (req, res) => {
    var ext = path.extname(file).toLowerCase();
    ext = ext.substr(1, ext.length-1);
    readAndWrite(res, './view/img/' + file, 'image/' + ext)
  };
});

module.exports = {
  routes: getRoutes
};
