/*
  module ในการเก็บ route ใน เมธอด GET
*/

var fs = require('fs');
var path = require('path');

var getRoutes = {};

getRoutes['/'] = require('./get/index.js').getPage;
getRoutes['/level'] = require('./get/level.js').getPage;
getRoutes['/play'] = require('./get/play.js').getPage;

getRoutes['Error 404'] = (req, res) => { // ใช้สำหรับ url ที่หา route ไม่เจอ
  console.log('  - ERROR 404 : ' + req.url + ' not found!!');
  var data = '<h1>Error 404 : ' + req.url + ' not found!!</h1>';
  res.writeHead(404, {
    'Content-Type': 'text/html',
    'Content-Length': data.length
  });
  res.end(data);
};

// ฟังก์ชันสำหรับอ่านไฟล์ และเขียนข้อมูลที่อ่านได้ แล้วส่งไปให้เบราว์เซอร์
var readAndWrite = function(res, file, type) {
  var data = fs.readFileSync(file);
  res.writeHead(200, {
    'Content-Type': type,
    'Content-Length': data.length
  });
  res.end(data);
};

// เพิ่ม routes ของไฟล์ css ทั้งหมด
var files = fs.readdirSync('./view/css'); // หาไฟล์ css ทั้งหมด
files.forEach(file => {
  getRoutes['/css/' + file] = (req, res) => { //เพิ่ม route ให้กับไฟล์ css
    readAndWrite(res, './view/css/' + file, 'text/css') // อ่านและเขียนไฟล์ css
  };
});

// เพิ่ม routes ของไฟล์ js ทั้งหมด
files = fs.readdirSync('./view/js'); // หาไฟล์ js ทั้งหมด
files.forEach(file => {
  getRoutes['/js/' + file] = (req, res) => { //เพิ่ม route ให้กับไฟล์ js
    readAndWrite(res, './view/js/' + file, 'application/javascript') // อ่านและเขียนไฟล์ js
  };
});

// เพิ่ม routes ของไฟล์ภาพทั้งหมด
files = fs.readdirSync('./view/img'); // หาไฟล์ภาพทั้งหมด
files.forEach(file => {
  getRoutes['/img/' + file] = (req, res) => { //เพิ่ม route ให้กับไฟล์ภาพ
    var ext = path.extname(file).toLowerCase(); // หานามสกุลของภาพ
    ext = ext.substr(1, ext.length - 1); // ตัด "." (จุด) ออก
    readAndWrite(res, './view/img/' + file, 'image/' + ext); // อ่านและเขียนไฟล์ภาพ
  };
});

// เพิ่ม routes ของฟ้อนต์
files = fs.readdirSync('./view/font'); // หาaฟ้อนต์ทั้งหมด
files.forEach(file => {
  getRoutes['/font/' + file] = (req, res) => { //เพิ่ม route ให้กับaฟ้อนต์
    readAndWrite(res, './view/font/' + file, 'font/opentype'); // อ่านและเขียนไฟล์ฟ้อน
  };
});

module.exports = {
  routes: getRoutes
};
