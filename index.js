//Autor: Andy Alonzo
//Web: http://soyalonzo.com
//E-mail: andres@alonzoyalonzo.com
//Twitter: @alonzoandy
var app = require('http').createServer(handler)
, io = require('socket.io').listen(app)
, fs = require('fs')
, os = require('os')
, five = require("johnny-five"),
board,servo,led,sensor;
var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
  for (var k2 in interfaces[k]) {
    var address = interfaces[k][k2];
    if (address.family === 'IPv4' && !address.internal) {
      addresses.push(address.address);
    }}}
    var port = 3000;
    app.listen(port);
    if(addresses==[])
    {
      console.log("Servidor en: http://localhost:"+port);
    }
    else
    {
      console.log("Servidor en: http://"+addresses+":"+port);
    }
    board = new five.Board();
    var led = [];
    board.on("ready", function() {
        led = new five.Led(12);
    });

    function handler (req, res) {
      fs.readFile(__dirname + '/index.html',
      function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error al cargar index.html');
        }
        res.writeHead(200);
        res.end(data);
      });
    }
    
    io.sockets.on('connection', function (socket) {
      socket.emit('news', { hello: 'world' });
      socket.on('Von', function (data) {
        console.log("Encender" + data.led);
        if(board.isReady){ led.on(); }
      });
      socket.on('Voff', function (data) {
        console.log("Apagar" );
        if(board.isReady){ led.off(); }
      });

    });
