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
      var cookies = qs.parse(req.headers.cookie, '; ');
      var file_data = './data/' + cookies.level + '.txt';
      var stat = fs.readFileSync(file_data);
      var result = cookies.name + ' ' + post.time;
      var arr = stat.toString().split("\n");
      arr.pop();
      console.log(result);
      var dup = false;
      for (var x in arr) {
        if (arr[x] == result) {
          dup = true;
        }
      }
      if (!dup) {
        arr.push(result);
        fs.writeFileSync(file_data, '');
        for (var x in arr) {
          if (x < 5)
            fs.appendFileSync(file_data, arr[x] + '\n');
        }
      }
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
