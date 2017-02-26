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
        var data = fs.readFileSync('./view/result.html');
        data = data.toString().replace(/{{\$result}}/g, post.result);
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        res.end(data);
      });
    }
};
