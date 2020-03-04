const MyClass = require('./early-proposals/classes');

// otro ejemplo de dynamic import 😁
const getModule = async () => {
  const myModule = await import(`./${process.env.FEATURE}`);
  return myModule;
}

console.log('Starting app...');

// Como top-level await aún está en Stage 3, sólo está funcionando para módulos ES.
// Por lo tanto, NO puedo usarlo acá así:
// const myModule = await import(`./${process.env.FEATURE}`)
// myModule.default();

// TODO: uncomment for ES2020 features
getModule().then(myModule => myModule.default());

// TODO: uncomment for classes

// MyClass.somePublicStaticMethod();

// const instance = new MyClass();

// instance.somePublicMethod();