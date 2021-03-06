var qs = require('querystring');
var fs = require('fs');
module.exports = {
  getPage: (req, res) => {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {
      var post = qs.parse(body);
      res.setHeader('Set-Cookie', 'name=' + encodeURI(post.name));
      res.writeHead(302, {
        'Location': '/level'
      });
      res.end();
    });
  }
};
