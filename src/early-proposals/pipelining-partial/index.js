const fetch = require("node-fetch");

const currying = () => {
  // también se puede aplicar para currying, aunque es un toque más feo

  const normalAdd = (x, y) => x + y;
  const curriedAdd = x => y => x+y;

  console.log(`normalAdd(4, 5): ${normalAdd(4, 5)}`);
  console.log(`curriedAdd(7, 8): ${curriedAdd(7)(8)}`);

  // si aplicamos un solo parametro, obtenemos una funcion aplicada parcialmente
  // a la cual podemos llamar más adelante con el parámetro faltante 
}

const partialApplication = () => {
  // // supongamos que tengo una función suma
  // const add = (x, y) => x + y;

  // // haciendo esto, mantengo intacto el contexto de add y fijo x = 10
  // const add10 = add.bind(null, 10);

  // // y con esto hago que y = 5
  // console.log(add10(5));

  // // es lo mismo que hacer esto
  // const add = (x, y = 10) => x + y;
  // const add10 = (x) => add(x);

  // console.log(add10(5));

  // y con el feature de partial application
  const add = (x, y) => x + y;
  const add10 = add(10, ?);

  console.log(add10(8));
}

const singleArgumentExample = () => {
  // por ejemplo, quiero super formatear un string
  const name = "guille";

  const capitalize = name => `${name[0].toUpperCase()}${name.substring(1)}`;
  const addGreeting = name => `Hola ${name}!`;
  const addDate = str => `${str} La hora es ${new Date().toString()}`;

  // horrible, pero funciona
  // const formattedString = addDate(addGreeting(capitalize(name)));

  // en cambio, con pipeline operator...
  const formattedString = name |> capitalize |> addGreeting |> addDate;

  console.log(formattedString);
};

const multipleArgumentExample = () => {
  // ya vimos que con un argumento nomás anda joya. pero con más?
  // el pipe operator forwardea un único valor, así que tengo que completar con otros valores
  const yearOfBirth = 1995;

  const restarAl2020 = (year) => 2020 - year;
  const sumarleX = (years, x) => years + x

  // componiendo funciones como siempre
  // const miEdadEn37Anios = sumarleX(restarAl2020(yearOfBirth), 37);

  // con pipeline operator
  // const miEdadEn37Anios = yearOfBirth 
  //   |> restarAl2020 
  //   |> (_ => sumarleX(_, 37))

  // además sumando partial application
  // puedo hacer esto porque el pipe forwardea un argumento que se pasa donde está "?"
  const miEdadEn37Anios = yearOfBirth
    |> restarAl2020
    |> sumarleX(?, 37); 

    console.log(miEdadEn37Anios);
}

const funkyValidation = async () => {
  const checkName = (data) => typeof data.name === 'string' ? data : throw Error('Name must be a string');
  const isEnabled = (data) => data.enabled ? data : throw Error('User is not enabled')
  const likesDowntonAbbey = (data) => data.favorites.series?.includes('Downton Abbey') ? data : throw Error('You must like Downton Abbey');
  const addBand = (data, band) => {
    data.favorites.music?.international?.push(band) ?? throw Error('User does not like international music');
    return data;
  } 
  // partially applied function
  const addTheBeatles = addBand(?, 'The Beatles');
  const shouldLikePulpFiction = (data) => [data, 'movies', 'Pulp Fiction'];
  const addCategory = (data, category, item) => {
    const currentCategory = data.favorites[category] ?? [];
    const updatedCategory = [...currentCategory, item];
    data.favorites[category] = updatedCategory;
    return data;
  };
  const logUser = (data) => console.log(data);

  try {
    const response = await fetch('http://localhost:8081/mock-response-200.json');
    const json = await response.json();
  
    const data = json.data ?? throw Error('There was a problem fetching user');

    // importante! cada etapa del pipe tiene que retornar el parámetro de la siguiente función
    // (si la siguiente función lo precisa)
    data 
      |> checkName 
      |> isEnabled 
      |> likesDowntonAbbey 
      // |> addBand(?, 'The Beatles') 
      |> addTheBeatles
      |> shouldLikePulpFiction
      // a fin de cuentas, esto es un arrow function así que puedo devolver tuplas y pasar todos los argumentos
      |> (_ => addCategory(..._))
      |> logUser;

  } catch (error) {
    console.log(error);
  }
}

const main = () => {
  funkyValidation();
};

module.exports = main;
