const http = require('http');
const fs = require('fs');
const https = require('https');
const url = require('url');

function fetchFromDummyJson(path, callback) {
    const options = {
        hostname: 'dummyjson.com',  
        path,                           //  какой путь запрашивать(добавляется к hostname)
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const req = https.request(options, res => {         //  res - ответ от dummyjson.com
        
        let data = '';              //  data - все данные вместе 
        res.on('data', chunk => {   //  chunk - часть данных                
            data += chunk;
        });

        res.on('end', () => {       //  end - все данные получены
            callback(null, data);   //  вызываем callback c всеми данными
        });
    });
    req.on('error', (e) => {        //  обработчик ошибок
        callback(e);
    });
    req.end();                      // завершаем запрос
}

function onrequest(request, response) {
    const parsedUrl = url.parse(request.url, true); // true — чтобы получить query-объект
    const pathname = parsedUrl.pathname;

    // Главная страница
    if (request.url  === '/' || request.url  === '/3lb.html') {
        fs.readFile('3lb.html', function(err, data) {
            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            response.end(data);
        });
    }

    else if (pathname === '/product.html') {
        fs.readFile('product.html', function(err, data) {
            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            response.end(data);
        });
    }

    // css
    else if (request.url  === '/styles/style.css') {
        fs.readFile('styles/style.css', function(err, data) {
            response.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
            response.end(data);
        });
    }

    // js
    else if (request.url  === '/js/things.js') {
        fs.readFile('js/things.js', function(err, data) {
            response.writeHead(200, { 'Content-Type': 'text/javascript; charset=utf-8' });
            response.end(data);
        });
    }

    //  Ретрансляция запросов к dummyjson 
    else if (pathname === '/products') {
        fetchFromDummyJson('/products', (err, data) => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(data);
        });
    }

    else if (pathname.startsWith('/products/search')) {
        const query = parsedUrl.query.q;
        fetchFromDummyJson(`/products/search?q=${encodeURIComponent(query)}`, (err, data) => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(data);
        });
    }

    else if (/^\/products\/\d+$/.test(pathname)) {      // подходит ли url под шаблон вида /products/1
        const id = pathname.split('/')[2];
        fetchFromDummyJson(`/products/${id}`, (err, data) => {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(data);
        });
    }
    else {
        fs.readFile('../pages/404.html', function(err, data) {
            response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            response.end(data || '404 Not Found');
        });
    } 
}

var server = http.createServer(onrequest);
server.listen(3000,'0.0.0.0',function(){
    console.log("Server html is working in port 3000!?!");
});