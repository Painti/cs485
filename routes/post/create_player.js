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
      var name = (post.name).replace(/ /g,'');
      if(name != ''){
        res.setHeader('Set-Cookie', 'name=' + encodeURI(post.name));
        res.writeHead(302, {
          'Location': '/level'
        });
        res.end();
      }
      else{
        var data = fs.readFileSync('./view/index.html');
        data += '<script>window.alert("Please input your name");</script>';
        res.writeHead(200, {
          'Content-Type': 'text/html',
          'Content-Length': data.length
        });
        res.end(data);
      }
    });
  }
};
