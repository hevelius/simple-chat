var net = require('net');
var should = require('should');

describe("TCP Chat Server",function(){
    describe("test server connection", function() {
        it('Should server send Welcome message', function (done) {
            var client = net.connect({ port: process.env.PORT },
                function() {
                }
            );
            client.on('data', function(data) {
                data.toString().should.equal("Welcome "+client.localAddress + ":" + client.localPort + "\n");
                client.end();
                done();
            });
    
        });
    });
    
    describe("Test server broadcasting", function() {
        var clients = [];
        var message = "Hello clients!";

        before(function() {
            var client1 = net.connect({ port: process.env.PORT },
                function() {

                }
            );

            clients[0] = client1;
            var client2 = net.connect({ port: process.env.PORT },
                function() {
                
                }
            );
            clients[1] = client2;

        });

        after(function() {
            clients.forEach(client => {
                client.destroy();
            });
        });

        it('Should server broadcast message to all clients', function (done) {
            var client1 = clients[0];
            var client2 = clients[1];

            client1.on('data', function(data) {
                if (data.toString() == "Welcome "+client1.localAddress + ":" + client1.localPort + "\n") {
                    // skip welcome message
                } else {
                    data.toString().should.equal(client2.localAddress + "> " + message);
                    done();
                }
            });

            client2.write(message);
        });
    
    });

});



