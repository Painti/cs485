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
      var dup = false;
      for (var x in arr) {
        if (arr[x] == result) {
          dup = true;
        }
      }
      if (!dup) {
        arr.push(result);
        arr.sort(function(a, b) {
          var x = a.split(" ");
          var y = b.split(" ");
          return x[1] - y[1];
        });
        if (arr.length > 5)
          arr.pop();
        fs.writeFileSync(file_data, '');
        for (var x in arr) {
          fs.appendFileSync(file_data, arr[x] + '\n');
        }
      }
      var str = '';
      for (var x in arr) {
        var y = arr[x].split(' ');
        str += '<center>' + y[0] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + y[1] + ' sec</center>'
      }
      var data = fs.readFileSync('./view/result.html');
      data = data.toString().replace(/{{\$result}}/g, post.result);
      data = data.toString().replace(/{{\$time}}/g, 'your time : ' + post.time + ' sec');
      data = data.toString().replace(/{{\$content}}/g, str);
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': data.length
      });
      res.end(data);
    });
  }
};
