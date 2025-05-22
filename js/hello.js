const http = require("http");
http.createServer(function(request,response){
    response.end("Hello NodeJs!");
}).listen(3000,"127.0.0.1",function(){
    console.log("Server is working in port 3000");
});