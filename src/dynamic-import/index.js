const fetch = require('node-fetch');

// Dynamic import
const getFunction = async (user) => {
  const myFunction = await import(`./function-${user}`);
  return myFunction;
};

const main = async () => {
  const response = await fetch('http://localhost:8081/mock-response-200.json')
  const json = await response.json();
  const user = json.data?.name ?? 'Stranger';
  const myFunction = await getFunction(user);
  console.log(myFunction.default(5, 10));
}

module.exports = main;