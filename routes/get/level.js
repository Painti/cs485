var fs = require('fs');

module.exports = {
    getPage: (req, res) => {
        var data = fs.readFileSync('./view/level.html');
        // data += '<ul>';
        // for (var i = 0; i < 10; i++) {
        //   data += '<li>level ' + i + '</li>';
        // }
        // data += '</ul></body></html>';
        res.writeHead(200, {
          'Content-Type': 'text/html',
          'Content-Length': data.length
        });
        res.write(data);
        res.end();
    }
};
