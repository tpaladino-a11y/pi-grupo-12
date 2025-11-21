/// HEADER (Mismo en todas las paginas)
///Lo primero que hago es darle un nombre de variable a distinos objetos de mi HTML
let formularioheader = document.querySelector(".search"); ///En mi HTML, el formulario que esta dentro del div del header tiene la clase .search
let inputheader = document.querySelector(".inputheader"); ///Aca tambien agarro y le doy nombre de variable pero solo al input, para luego ver el contenido
let textoBusqueda = document.querySelector(".textobusqueda");

///Aca hago un evento que ocurre cuando se aprieta el boton del formulario que tiene de type submit.
formularioheader.addEventListener("submit", function(e) {
    let texto = inputheader.value.trim(); 
    let cantdecaracteres = texto.length; ///Cuento las cantidad de caracteres que tiene el valor que ingreso el usuario en el input

    ///Con un if valido si hay mas de tres caracteres.
    if (cantdecaracteres === 0 || cantdecaracteres < 3) {
        e.preventDefault(); ///Si entro en el if, lo pirmpero que se hace es cancelar el comportamiento default que es que me lleva a la pagina rtados
        alert("Debe ingresar al menos 3 caracteres para realizar la búsqueda."); ///Muestro alert.
    } else {
        /// Guardo en el localStorage lo que puso para buscar el usurio en el input del header. Luego trabajo con este valor. Y se cambia la pagina a la de reusltados
        localStorage.setItem("busqueda", texto)
    }
});


/// CATEGORIAS
let linkapi = "https://dummyjson.com/products";
let listacategorias = document.querySelector(".listacategorias"); /// Guardo en una variable el div que dentro tiene los a href con nombre de cada seccion

fetch(linkapi)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);

    /// RECORRO TODAS LAS CATEGORIAS Y LAS GUARDO EN UN ARRAY
    let categorias = [];

    for (let i = 0; i < data.products.length; i++) {
      let categoria = data.products[i].category; /// Hago una variable que se va a actualizar que tiene como valor el tipo de producto

      if (!categorias.includes(categoria)) { ///Si no esta en la lista categorias que abti antes, se
        categorias.push(categoria);
      }
    }

    console.log("Categorías únicas:", categorias);

    /// PONGO EN MI NAV LOS ELEMENTOS DEL ARRAY. toUpperCase() CONVIERTE EN MAYUSCULA
    listacategorias.innerHTML = ""; ///Lista categorias arranca sin nada dentro, voy a recorrer la lista que hice e ir agregando aca las secciones.

    for (let i = 0; i < categorias.length; i++) {
      let nombrecategoria = categorias[i]; ///Le doy nombre a cada valor de la lista.

      /// Agrego el ?categoria=${nombrecategoria} para poder luego sacar el QS y trabajar con el.
      listacategorias.innerHTML += `
        <nav><li><a href="category.html?categoria=${nombrecategoria}">${nombrecategoria.toUpperCase()}</a></li></nav>
      `; ///Ahora lo que hago es agregar con un nav y a href y algo importante es que le pongo un QS con categoria= nombre de la categoria para despues
         ///bajar esa info y trabajar con ella.
    }
  })
  .catch(function(error) {
    console.log("El error es: " + error);
  }); 





/// HOME
let fragancias = document.querySelector(".aleatorio.container");
let groceries = document.querySelector(".masVendidos.container"); ///Le doy un nombre de variable a los dos section.

fetch(linkapi)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);

    // FRAGANCIAS

    let contenidofragancias = "";
    let contadorFragancias = 0;

    for (let i = 0; i < data.products.length; i++) {
      let producto = data.products[i]; ///Por cada i entro en el i de la data. Ahi dentro obtengo todo lo demas con producto.loquequierobuscar

      if (producto.category == "fragrances") {
        contenidofragancias += `
          <article class="productos">
            <img src="${producto.images[0]}" alt="">
            <div class="info">
              <h3>${producto.title}</h3>
              <p>${producto.description}</p>
              <p>$${producto.price}</p>
              <a href="product.html?productoId=${producto.id}">Ver detalle</a>            </div>
          </article>
        `;
        contadorFragancias += 1;

        if (contadorFragancias == 10) break;
      }
    }

    if (contenidofragancias == "") {
      fragancias.innerHTML = "<p>No hay productos de fragancias disponibles.</p>";
    } else {
      let bannerfragancias = `
        <div class="bannerAleatorio">
          <h2>FRAGANCIAS</h2>
        </div>`;
      fragancias.innerHTML = bannerfragancias + contenidofragancias;
    }

    // GROCERIES

    let contenidoGroceries = "";
    let contadorGroceries = 0;

    for (let i = 0; i < data.products.length; i++) {
      let producto = data.products[i];

      if (producto.category == "groceries") {
        contenidoGroceries += `
          <article class="productos">
            <img src="${producto.images[0]}" alt="${producto.title}">
            <div class="info">
              <h3>${producto.title}</h3>
              <p>${producto.description}</p>
              <p>$${producto.price}</p>
              <a href="product.html?productoId=${producto.id}">Ver detalle</a>
            </div>
          </article>
        `; ///Al ver detalle le agrego una QS que toma como valor el ID del producto.
        contadorGroceries+= 1;

        if (contadorGroceries == 10) break;
      }
    }

    if (contenidoGroceries == "") {
      groceries.innerHTML = "<p>No hay productos de groceries disponibles.</p>";
    } else {
      let bannerGroceries = `
        <div class="bannerVendidos">
          <h2>GROCERIES</h2>
        </div>`;
      groceries.innerHTML = bannerGroceries + contenidoGroceries;
    }
  })
  .catch(function(error) {
    console.log("El error es: " + error);
  });
