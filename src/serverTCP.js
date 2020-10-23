import tcp from 'net';
import question from './utils/question';

export const serverPORT = 3030;
export const serverADDRESS = 'localhost';

const server = tcp.createServer();

server.on('connection', (socket) => {
  // Emitted once the socket is fully closed.
  socket.on('close', () => {
    console.log('Server: Socket is closed!');
  });

  socket.on('end', () => {
    console.log('Server: Socket was ended!');
  });

  // Event emitted when data is received.
  socket.on('data', async (data) => {
    console.log('Server got from client:', data.toString());
    const anwser = await question('Server: Type a message (`\\q + enter` to quit chat):');
    if(anwser !== '\\q')  
      socket.write(anwser);
    else
      socket.end();
  });

  server.getConnections((e, count) => {
    console.log('Number of concurrent connections to the server :', count);
  });
});

// Event emitted once the server is fully closed.
server.on('close', () => {
  console.log('Server: Server is closed!');
});

// Emitted when the server has been bound after calling server.listen().
server.on('listening', () => {
  console.log('Server is listening at port', server.address().port);
});

server.listen(serverPORT, serverADDRESS);