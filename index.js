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
server.listen(3000,'0.0.0.0',function(){
    console.log("Server html is working in port 3000!!");
});


// подключение модуля из файла /modules/shubkin.js 
// защита 2 лабы практика
const getSumDateAndAge = require('./modules/shubkin');
const age = 18;
const result = getSumDateAndAge(age);
console.log(result);