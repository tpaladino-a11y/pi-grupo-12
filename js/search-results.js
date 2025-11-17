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


/// Rescato del storage lo que busco el usuario y lo muestro por pantalla.
busquedaUsuario = localStorage.getItem("busqueda");

document.querySelector(".textobusqueda").innerHTML = "Resultados de búsqueda para: " + busquedaUsuario

///Recorro la API y si coincide 
let linkapi = "https://dummyjson.com/products";
let listaResultados = document.querySelector(".results-container");

fetch(linkapi)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {

    let resultados = 0;

    for (let i = 0; i < data.products.length; i++) {
      let producto = data.products[i];

      /// Paso a minuscula todo 
      let titulo = producto.title.toLowerCase();
      let busqueda = busquedaUsuario.toLowerCase();

      if (titulo.includes(busqueda)) {

        resultados += 1; /// Hago el contador para despues si es igual a cero, muestro que no se encontraron resultados.

        listaResultados.innerHTML += `
          <article class="result-item">
            <img src="${producto.images[0]}" alt="">
            <div class="info">
              <h3>${producto.title}</h3>
              <p>${producto.description}</p>
              <p>$${producto.price}</p>
              <a href="product.html?productoId=${producto.id}">Ver detalle</a>
            </div>
          </article>
        `;
      }
    }

    // Si no encontro nada
    if (resultados === 0) {
      listaResultados.innerHTML = "No se encontraron resultados para la búsqueda.";
    }
  })
  .catch(function(error) {
    console.log("El error es: " + error);
  });