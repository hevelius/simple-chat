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

