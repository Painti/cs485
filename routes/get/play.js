var fs = require('fs');

module.exports = {
  getPage: (req, res) => {
    var data = fs.readFileSync('./view/play.html');
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': data.length
    });
    res.end(data);
  }
};
