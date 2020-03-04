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

const main = () => {
  partialApplication();
};

module.exports = main;
