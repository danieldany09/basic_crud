var module = require('./db_module');
var url = require('url');
var querystring = require('querystring');
var http = require('http');

http.createServer(function(request, response) {
var data1 = '';

request.on('data', function(chunk) {
            data1 += chunk;
        });

request.on('end', function() {
var name = querystring.parse(data1)["name"];
var email = querystring.parse(data1)["email"];
var phone = querystring.parse(data1)["phone"];
var city = querystring.parse(data1)["city"];
var gender = querystring.parse(data1)["gender"];
console.log(name,email,phone,city,gender);

 if (request.url === '/show') {
 module.showData(city, response);
            } 
 else if (request.url === '/save') {
 module.saveData(name, email,phone,city,gender, response);
            } 
else if(request.url === '/update'){
      module.updateData(name,email,phone,city,gender,response);
}
else if(request.url === '/delete'){
      module.deleteData(phone,response);
}
      });
    
}).listen(3000,(() =>{
            console.log("server is running")
}));