var net = require('net');
var clients = [];

const broadcast = (msg, sender) => {
    clients.forEach((client) => {
        if (client === sender) return;
        client.write(msg);
    });
};

var server = net.createServer(function(socket) {
    socket.write("Welcome " + socket.remoteAddress + ":" + socket.remotePort  + "\n");
    clients.push(socket);
    socket.on('data', function (data) {
        broadcast(socket.remoteAddress + "> " + data, socket);
    });
    socket.on('end', () => {
        let index = clients.indexOf(socket);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });
});

server.listen(process.env.PORT, '0.0.0.0');