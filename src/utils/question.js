import readline from 'readline';

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default (question) => new Promise(resolve => input.question(question, (answer) => resolve(answer)));
