import udp from 'dgram';
import buffer from 'buffer';
import { serverADDRESS, serverPORT } from './serverUDP';
import question from './utils/question';

(async () => {
  try {
    const data1 = Buffer.from(await question('Informe o primeiro número: '));
    const data3 = Buffer.from(await question('Informe o segundo número: '));
    const data2 = Buffer.from(await question('Informe o operador(+, -, *, /): '));
    
    const client = udp.createSocket('udp4');
    
    client.send([data1, data2, data3], serverPORT, serverADDRESS, (error) => {
      if(error){
        client.close();
      }
      else {
        console.log('Client: Message sent!');
      }
    });

    client.on('message', (msg, info) => {
      console.log(`Client: Message received from server: ${msg.toString()}`);
      client.close();
    });

    client.on('close', () => {
      console.log('Client: Socket is closed!');
      process.exit();
    });

  } catch (err) {
    console.log(err)
  } 
})();
