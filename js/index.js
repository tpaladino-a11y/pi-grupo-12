/// Header mismo en todas las paginas
let formularioheader = document.querySelector(".search");
let inputheader = document.querySelector(".inputheader");
let textoBusqueda = document.querySelector(".textobusqueda");

formularioheader.addEventListener("submit", function(e) {
    let texto = inputheader.value.trim(); 
    let cantdecaracteres = texto.length;

    if (cantdecaracteres === 0 || cantdecaracteres < 3) {
        e.preventDefault();
        alert("Debe ingresar al menos 3 caracteres para realizar la búsqueda.");
    } else {
        /// Esto me sirve para guardar lo que busco el usuario.
        localStorage.setItem("busqueda", texto)
    }
});


/// CATEGORIAS
let linkapi = "https://dummyjson.com/products?limit=109";
let linkapiCat = "https://dummyjson.com/products/categories";
let listacategorias = document.querySelector(".listacategorias");

fetch(linkapiCat)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);

    let categorias = [];

    /// RECORRO TODAS LAS CATEGORIAS Y LAS GUARDO EN UN ARRAY

    for (let i = 0; i < data.length; i++) {
      let categoria = data[i].name;
      categorias.push(categoria);
      
    }

    console.log("Categorías únicas:", categorias);

    /// PONGO EN MI NAV LOS ELEMENTOS DEL ARRAY. toUpperCase() CONVIERTE EN MAYUSCULA 

    listacategorias.innerHTML = "";
    for (let i = 0; i < categorias.length; i++) {
      let nombrecategoria = categorias[i];

      /// Agrego el ?categoria=${nombrecategoria} para poder luego sacar el QS y trabajar con el.
      listacategorias.innerHTML += `
        <nav><li><a href="category.html?categoria=${nombrecategoria}">${nombrecategoria.toUpperCase()}</a></li></nav>
      `;
    }
  })
  .catch(function(error) {
    console.log("El error es: " + error);
  }); 

  






/// HOME
let fragancias = document.querySelector(".aleatorio.container");
let groceries = document.querySelector(".masVendidos.container");

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
      let producto = data.products[i];

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
        `;
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

