class MyClass {
  // sólo puedo acceder dentro de la clase (cuando la instancio)
  #privateField = 0;
  // puedo acceder desde afuera de la clase (cuando la instancio)
  publicField = 10;

  #somePrivateMethod(){
    console.log('somePrivateMethod');
  }

  somePublicMethod(){
    // ts sugiere que es un error, pero funciona
    // como estos no son estáticos, los puedo llamar cuando instancio la clase nomás
    this.#somePrivateMethod();
    console.log('somePublicMethod');
  }

  // no puedo acceder a este método cuando instancio la clase
  static somePublicStaticMethod(){
    MyClass.#somePrivateStaticMethod();
    console.log('SomePublicStaticMethod');
  }

  // sólo puedo acceder a este método sin instanciar la clase y dentro de la clase nomás
  static #somePrivateStaticMethod(){
    console.log('SomePrivateStaticMethod');
  }
}

module.exports = MyClass;