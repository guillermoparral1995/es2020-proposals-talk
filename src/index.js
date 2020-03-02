const getModule = async () => {
  const myModule = await import(`./${process.env.FEATURE}`);
  return myModule;
}

console.log('Starting app...');

// Como top-level await aún está en Stage 3, no puedo hacer
// const myModule = await getModule()
// myModule.default();

getModule().then(myModule => myModule.default());
