const promise1 = (caller) => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(`${caller} :: PROMISE1: Terminé!`);
    resolve("Promise 1");
  }, 1000);
});

const promise2 = (caller) => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(`${caller} :: PROMISE2: Terminé!`);
    resolve("Promise 2");
  }, 3000);
});

const promise3 = (caller) => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(`${caller} :: PROMISE3: Terminé!`);
    reject("Promise 3");
  }, 1750);
});

const promiseAll = async () => {
  try {
    const caller = 'Promise.all'
    const responses = await Promise.all([promise1(caller), promise2(caller), promise3(caller)]);
  } catch (error) {
    console.log('Seguro acá aparece Promise 3 porque es la única que hace reject');
    console.log(error);
    console.log('Cuando una de las promises rechaza en Promise.all, todo el conjunto rechaza');
    console.log('Promise.all sirve para cuando es necesario que todas las Promises resuelvan');
  }
};

const promiseRace = async () => {
  try {
    const caller = 'Promise.race'
    const response = await Promise.race([promise1(caller), promise2(caller), promise3(caller)]);
    console.log('Acá seguro aparece Promise 1 porque es la primera en terminar');
    console.log(response);
    console.log('Promise.race sirve para cuando quiero obtener el primer resultado entre varias promises');
    console.log('Ni siquiera espera a que terminen las otras');
  } catch (error) {
    console.log(error);
  }
};

const promiseAllSettled = async () => {
  try {
    const caller = 'Promise.allSettled'
    const responses = await Promise.allSettled([promise1(caller), promise2(caller), promise3(caller)]);
    console.log('Acá van a aparecer todas');
    console.log(responses);
    console.log('Incluso habiendo fallado una, guarda el estado de cada Promise y resuelve');
    console.log('Esto es útil para casos en los que se quiere un error silencioso o para cuano no hace falta que todo resuelva');
  } catch (error) {
    console.log(error);
  }
};

const main = async () => {
  console.log("Comparando tipos de promises...");
  console.log("Primero, Promise.all");
  await promiseAll();
  console.log('Ahora, Promise.race');
  await promiseRace();
  console.log('Por último, Promise.allSettled');
  await promiseAllSettled();
};

module.exports = main;
