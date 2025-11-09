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

let idProductoSeleccionado = qsObject.get("productoId")
console.log(idProductoSeleccionado);





/// Productos
let linkapi = "https://dummyjson.com/products";
let mainProduct = document.querySelector(".mainproductos2");


fetch(linkapi)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);

    let contenidoImg = ""; 
    let contenidoDescripcion = "";

    for (let i = 0; i < data.products.length; i++) {
      let producto = data.products[i];

      if (producto.id == idProductoSeleccionado) {
        contenidoImg += `
          <article class="fotos">
            <img src="${producto.images[0]}" alt="">
          </article>
        `;
        contenidoDescripcion += `
          <article class="descripcion">
              <h3><strong>${producto.title}</strong></h3>
              <p>${producto.brand}</p>
              <div class="fotos_responsive">
                <img src="${producto.images[0]}" alt="">
              </div>
              <p>${producto.description}</p>
              <p>Categoria: ${producto.category}</p>
              <p>$${producto.price}</p> 
              <p>Stock: ${producto.stock}</p>
              <p>${producto.tags}</p>
          </article>
        `;
      }
    }

    if (contenidoDescripcion == "" && contenidoImg == "") {
      mainProduct.innerHTML = `<p>No hay productos de " ${categoriaseleccionada} " disponibles.</p>`;
    } else {
    
      mainProduct.innerHTML = `<section class="detalleproducto"> ` + contenidoImg + contenidoDescripcion +`</section>`
    }
  })
  .catch(function(error) {
    console.log("El error es: " + error);
  });