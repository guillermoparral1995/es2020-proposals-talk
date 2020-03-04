const fetch = require("node-fetch");

const main = async () => {
  const response = await fetch('http://localhost:8081/mock-response-404.json');
  const json = await response.json();

  try {
    const name = json.data?.name ?? throw Error('No user found!');
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = main;