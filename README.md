# simple-chat
a simple TCP chat server in node

[![Build Status](https://travis-ci.org/hevelius/simple-chat.svg?branch=main)](https://travis-ci.org/hevelius/simple-chat)

This is a simple TCP chat server in nodejs using core library.

With the net module a server instance is instantiaded. To broadcast a message to all connected client is necessary to collect all client in an array.

Every time a client write a message this one is sended to the others.

```javascript
const broadcast = (msg, sender) => {
    clients.forEach((client) => {
        // if want to exclude the sender to receive its message
        if (client === sender) return;
        client.write(msg);
    });
};
```

### If you want to start a server using docker 

```bash
$ git clone https://github.com/hevelius/simple-chat.git && cd simple-chat
$ docker run --rm -p 10000:10000 -v $PWD:/usr/src/app -w /usr/src/app node npm start
```

### and try to connect with telnet
```bash
$ telnet 127.0.0.1 10000
```