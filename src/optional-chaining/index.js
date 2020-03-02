const fetch = require('node-fetch');

// Optional chaining and nullish coalescing operator

const main = async () => {
  const response = await fetch('http://localhost:8081/mock-response-404.json')
  const json = await response.json();
  const user = json.data?.name ?? 'Stranger';
  console.log(`Hello ${user}!`);
}

module.exports = main;
