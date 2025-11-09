/// HEADER (mismo en todas las paginas)
let formularioheader = document.querySelector(".search");
let inputheader = document.querySelector(".inputheader");

formularioheader.addEventListener("submit", function(e) {
  let texto = inputheader.value.trim();  /// el trim lo que hace es que no cuenta los espacios a la hora de contar caracteres
  let cantdecaracteres = texto.length;

  if (cantdecaracteres === 0 || cantdecaracteres < 3) {
    e.preventDefault(); 
    alert("Debe ingresar al menos 3 caracteres para realizar la búsqueda.");
  }
});

/// Tomo la info de la QS
let queryString = location.search;
console.log(queryString);

let qsObject = new URLSearchParams(queryString);

let categoriaseleccionada = qsObject.get("categoria")
console.log(categoriaseleccionada);


/// Productos
let linkapi = "https://dummyjson.com/products";
let maincategoria = document.querySelector(".maincategory");


fetch(linkapi)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);

    let contenidocategoria = ""; 

    for (let i = 0; i < data.products.length; i++) {
      let producto = data.products[i];

      if (producto.category == categoriaseleccionada) {
        contenidocategoria += `
          <article class="productoscategoria">
            <img src="${producto.images[0]}" alt="">
            <div class="infobuzos">
              <h3><strong>${producto.title}</strong></h3>
              <p>${producto.description}</p>
              <p>$${producto.price}</p> 
              <a href="product.html?productoId=${producto.id}">Ver detalle</a>            </div>
          </article>
        `;
      }
    }

    if (contenidocategoria == "") {
      maincategoria.innerHTML = `<p>No hay productos de " ${categoriaseleccionada} " disponibles.</p>`;
    } else {
      let bannercategoria = `
        <div class="bannerbuzos">
          <h2>${categoriaseleccionada.toUpperCase()}</h2>
        </div>`;
      maincategoria.innerHTML = bannercategoria + `<section class="categoriabuzos">` + contenidocategoria + `</section>`;
    }
  })
  .catch(function(error) {
    console.log("El error es: " + error);
  });