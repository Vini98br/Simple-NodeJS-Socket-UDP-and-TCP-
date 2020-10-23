import { Socket } from 'net';
import { serverADDRESS, serverPORT } from './serverTCP';
import question from './utils/question';

const client = new Socket();

// Initiate a connection on a given socket.
client.connect(serverPORT, serverADDRESS, async () => {
  console.log('Client: Connection established!');
  const anwser = await question('Client: Type a message (`\\q + enter` to quit chat):');
  if(anwser === '\\q'){
    client.destroy();
  }
  else {
    client.write(anwser, (error) => {
      if(error) {
        console.log('Client: Error sending message');
      }
    });
  }
});

// Event emitted when data is received.
client.on('data', async (data) => {
  console.log('Client got from server:', data.toString());
  const anwser = await question('Client: Type a message (`\\q + enter` to quit chat):');
  if(anwser === '\\q'){
    client.destroy();
  }
  else {
    client.write(anwser, (error) => {
      if(error) {
        console.log('Client: Error sending message');
      }
    });
  }
});

// Event emitted once the socket is fully closed.
client.on('close', () => {
  console.log('Client: Client is closed!');
  process.exit();
});

// Event emitted when an error occurs.
client.on('error', (e) => {
  console.log('Client: Client ended up with an error', e);
  process.exit(1);
});
