var net = require('net');

var server = net.createServer(function(socket) {
    socket.write("Welcome " + socket.remoteAddress + ":" + socket.remotePort  + "\n");
    socket.on('data', function (data) {
        console.log(data);
    });
    socket.on('end', () => {
        console.log('end connection');
    });

});

server.listen(process.env.PORT, '0.0.0.0');