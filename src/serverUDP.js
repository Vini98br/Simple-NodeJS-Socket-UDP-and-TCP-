import udp from 'dgram';
const server = udp.createSocket('udp4');

export const serverPORT = 12003;
export const serverADDRESS = 'localhost';

// The 'error' event is emitted whenever any error occurs.
server.on('error', (e) => {
  console.log(`Server: UDP socket returned ${e}`);
  server.close();
});

// The 'message' event is emitted when a new datagram is available on a socket.
server.on('message', (msg, info) => {
  console.log(`Server got: ${msg}`);
  server.send(eval(msg.toString()).toString(), info.port, serverADDRESS, (error) => {
    if(error) {
      console.log('Server: Error on sending message!');
    }
    else {
      console.log('Server: Message sent!');
    }
  })
});

// The 'close' event is emitted after a socket is closed with close(). 
server.on('close', () => {
  console.log('Server: UDP socket is closed.');
});

// For UDP sockets, causes the dgram.Socket to listen for datagram messages on a named port and optional address. 
server.bind({ port: serverPORT, address: serverADDRESS, exclusive: true });