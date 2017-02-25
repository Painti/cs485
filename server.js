var server = require('./config/server');
var getRoutes = require('./routes/getMethod');
var postRoutes = require('./routes/postMethod');
var http = require('http');
var fs = require('fs');
var url = require('url');

function MathBattle() { // สร้าง Object ชื่อ MathBattle

  // บอกเวลาปัจจุบัน
  var timenow = () => {
    var date = new Date();
    var pad = function(num) {
      if (num < 10) {
        num = '0' + num;
      }
      return num;
    }
    return pad(date.getDate()) + '/' + pad(date.getMonth()) + '/' + date.getFullYear() + ' ' +
      pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
  };

  // สร้างฟังก์ชันที่ให้ค่าเริ่มต้นกับแอพ
  this.init = () => {
    this.getRoutes = getRoutes.routes; // สร้างตัวแปรที่เก็บ route ของเมธอด GET
    this.postRoutes = postRoutes.routes; // สร้างตัวแปรที่เก็บ route ของเมธอด POST
  };

  // สร้างฟังก์ชันที่ให้แอพเริ่มทำงาน
  this.start = () => {
    http.createServer((req, res) => { // สร้างเซิร์ฟเวอร์
      this.url = url.parse(req.url, true); // เปลี่ยน url string เป็น URL Objects

      // สร้างฟังก์ชันที่ใช้หา route และใช้งานฟังก์ชันของ route นั้นๆ
      var findRoute = (req, res, routes) => {
        var route = 'Error 404';
        for (var route in routes) {
          if (this.url.pathname == route) { // เช็คว่า url ร้องขอมา มีอยู่ใน route หรือไม่
            route = route;
            break;
          } else {
            route = 'Error 404'; // ถ้าไม่เจอ route ให้ไป route ของ ERROR 404
          }
        }
        console.log(timenow() + ' : ' + req.method + ' ' + this.url.pathname);
        routes[route](req, res); // เรียกใช้งานฟังก์ชันของ route ที่่ได้
      };

      if (req.method == 'GET') { // เช็คว่า เมธอดที่รับมาเป็น GET
        findRoute(req, res, this.getRoutes);
      } else if (req.method == 'POST') { // เช็คว่า เมธอดที่รับมาเป็น POST
        findRoute(req, res, this.postRoutes);
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

var app = new MathBattle(); // สร้างแอพ
app.init(); // ให้ค่าเริ่มต้นกับแอพ
app.start(); // เริ่มแอพ
