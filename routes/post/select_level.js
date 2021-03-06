var qs = require('querystring');

module.exports = {
  getPage: (req, res) => {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });

    req.on('end', function() {
      var post = qs.parse(body);
      res.setHeader('Set-Cookie', 'level=' + encodeURI(post.level));
      res.writeHead(302, {
        'Location': '/play'
      });
      res.end();
    });
  }
};
