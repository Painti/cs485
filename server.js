var server = require('./config/server');
var getRoutes = require('./routes/getMethod');
var postRoutes = require('./routes/postMethod');
var http = require('http');
var fs = require('fs');
var url = require('url');

function MathBattle() {

  var timenow = () => {
    var date = new Date();
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' +
      date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  };

  this.init = () => {
    this.getRoutes = getRoutes.routes;
    this.postRoutes = postRoutes.routes;
  };

  this.start = () => {
    http.createServer((req, res) => {
      this.url = url.parse(req.url, true);

      if (req.method == 'GET') {
        this.page = 'Error 404';
        for (var route in this.getRoutes) {
          if (this.url.pathname == route) {
            this.page = route;
            break;
          } else {
            this.page = 'Error 404';
          }
        }
        console.log(timenow() + ' : ' + req.method + ' ' + this.url.pathname);
        this.getRoutes[this.page](req, res);
      } else if (req.method == 'POST') {
        this.page = 'Error 404';
        for (var route in this.postRoutes) {
          if (this.url.pathname == route) {
            this.page = route;
            break;
          } else {
            this.page = 'Error 404';
          }
        }
        console.log(timenow() + ' : ' + req.method + ' ' + this.url.pathname);
        this.postRoutes[this.page](req, res);
      } else {
        var data = '<h1>Error 405 : Method Not Allowed!!</h1>';
        res.writeHead(405, {
          'Content-Type': 'text/html',
          'Content-Length': data.length
        });
        res.end(data);
      }
    }).listen(server.port, server.hostname, () => {
      console.log(timenow() + ' : Node server started on ' + server.hostname + ':' + server.port);
    });
  };
};

var app = new MathBattle();   // New application
app.init();                   // initialize
app.start();                  // เริ่ม
