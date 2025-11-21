/// HEADER (mismo en todas las páginas)
let formularioheader = document.querySelector(".search");
let inputheader = document.querySelector(".inputheader");

formularioheader.addEventListener("submit", function(e) {
  let texto = inputheader.value.trim();
  let cantdecaracteres = texto.length;

  if (cantdecaracteres < 3) {
    e.preventDefault();
    alert("Debe ingresar al menos 3 caracteres para realizar la búsqueda.");
  }else {
        /// Esto me sirve para guardar lo que busco el usuario.
        localStorage.setItem("busqueda", texto)
    }
});


/// Tomo la info de la QS. La QS ya la prepare desde el index. Le puse de key, prodcutId. Guardo el valor en la variable idProductoSeleccionado
let queryString = location.search;
let qsObject = new URLSearchParams(queryString);
let idProductoSeleccionado = qsObject.get("productoId");
console.log("Producto seleccionado:", idProductoSeleccionado);



/// PRODUCTOS
let linkapi = `https://dummyjson.com/products/${idProductoSeleccionado}`; ///Para entrar a la info de el producto que se puso ver detalle, modifico el link de la API dependiendo del ID para entrar directo a la info
let mainProduct = document.querySelector(".mainproductos2"); ///Le doy nombre de variable al main que dentoe tiene articles, uno con foto, descrpcion y reviews

fetch(linkapi)
  .then(function(response) {
    return response.json();
  })
  .then(function(producto) {
    console.log(producto);

    ///Voy a hacer variable y luego al final concatenar todo
    ///Variable con la foto del producto
    let contenidoImg = `
      <article class="fotos">
        <img src="${producto.images[0]}" alt="">
      </article>
    `;

    ///Variable descripcion
    let contenidoDescripcion = `
      <article class="descripcion">
          <h3><strong>${producto.title}</strong></h3>
          <p>${producto.brand}</p>
          <div class="fotos_responsive">
            <img src="${producto.images[0]}" alt="">
          </div>
          <br>
          <p>${producto.description}</p>
          <br>
          <p><strong>Categoría:</strong> ${producto.category}</p>
          <br>
          <p><strong>Precio:</strong> $${producto.price}</p> 
          <br>
          <p><strong>Stock:</strong> ${producto.stock}</p>
          <br>
          <p><strong>Tags:</strong> ${producto.tags}</p>
      </article>
    `;

    ///Variable Seccion  reviews
    let contenidoReviews = ""; ///La arranco en vacio porque voy a recorrer todos los reviews porque hay mas de uno entonces hay que ir sumandolos

    if (producto.reviews && producto.reviews.length > 0) { ///Si hay reviews entro en el bucle. Atento que abro un section que adentro tiene tods las posibles reviews. Este section lo cierro mas adelante
      contenidoReviews += `
        <section class="reviews">
          <h3>Comentarios de usuarios</h3>
      `;

        ///Recorro todo el array que tiene los ratings, asi se hace dinamico por si algun producto tiene distinta cantidad de opiniones
      for (let i = 0; i < producto.reviews.length; i++) {
        let review = producto.reviews[i]; ///Le doy nombre review y despues con review.loquequieroentrar saco la info que quiero

        contenidoReviews += `
              <div class="review">
                <p><strong>⭐ ${review.rating}/5</strong></p>
                <p>"${review.comment}"</p>
                <p>${review.reviewerName} — ${review.date}</p>
              </div>
            <hr>    
        `;
      }

      contenidoReviews += `</section>`; ///Cierro el section que abri y donde dentro tengo todas las reviews

      ///Si no hay reviews se avisa que no hay reviews
    } else {
      contenidoReviews = `
        <section class="reviews">
          <h3>Comentarios de usuarios</h3>
          <p>No hay reseñas disponibles para este producto.</p>
        </section>
      `;
    }
        /// Agrego todo al mainPorduct, incluyo el section para mantener el CSS
    mainProduct.innerHTML = `
      <section class="detalleproducto">
        ${contenidoImg}
        ${contenidoDescripcion}
      </section>
      ${contenidoReviews}
    `;
  })
  .catch(function(error) {
    console.log("El error es: " + error);
  });
