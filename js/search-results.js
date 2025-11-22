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
        localStorage.setItem("busqueda", texto);
    }
});


/// Muestro por pantalla lo que busco el usuario
let busquedaUsuario = localStorage.getItem("busqueda");
document.querySelector(".textobusqueda").innerHTML = "Resultados de búsqueda para: " + busquedaUsuario;


///Recorro la API y si coincide 
let linkapi = "https://dummyjson.com/products/search?q=" + busquedaUsuario; ///Entro al endpoint que solo contiene la info del producto que busco
let listaResultados = document.querySelector(".results-container");

fetch(linkapi)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    

    let resultados = 0;/// Hago el contador para despues si es igual a cero, muestro que no se encontraron resultados.

    for (let i = 0; i < data.products.length; i++) { ///Como ya cambie el endpoint antes, no hace falta filtrar los elementos de la lista, ya estan filtrados con el endpoit
      let producto = data.products[i];

  
      resultados += 1;

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

    // Si no encontro nada
    if (resultados === 0) {
      listaResultados.innerHTML = "No se encontraron resultados para la búsqueda.";
    }
  })
  .catch(function(error) {
    console.log("El error es: " + error);
  });
