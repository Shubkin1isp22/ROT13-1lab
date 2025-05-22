var http = require('http');
var fs = require('fs');

function onrequest(request, response){
    if (request.url === '/' || request.url === '/index.html') {
        fs.readFile('index.html', function(err, data) {
            response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
            response.write(data);
            response.end();
        });
    }
    else if (request.url === '/styles/styles.css') {
        fs.readFile('styles/styles.css', function(err, data){
            response.writeHead(200, {'Content-Type': 'text/css; charset=utf-8'});
            response.write(data);
            response.end();
        })
    }
    else if (request.url === '/js/script.js') {
        fs.readFile('js/script.js', function(err, data){
            response.writeHead(200, {'Content-Type': 'text/javascript; charset=utf-8'});
            response.write(data);
            response.end();
        })
    }
    else {
        fs.readFile('pages/404.html', function(err, data) {
            response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
            response.write(data);
            response.end();
        });
    }
}

var server = http.createServer(onrequest);
server.listen(3000,"127.0.0.1",function(){
    console.log("Server html is working in port 3000!!");
});