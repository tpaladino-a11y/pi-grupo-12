/// HEADER (mismo en todas las paginas)
let formularioheader = document.querySelector(".search");
let inputheader = document.querySelector(".inputheader");

formularioheader.addEventListener("submit", function(e) {
  let texto = inputheader.value.trim();  /// el trim lo que hace es que no cuenta los espacios a la hora de contar caractere  
  let cantdecaracteres = texto.length;

  if (cantdecaracteres === 0 || cantdecaracteres < 3) {
    e.preventDefault(); 
    alert("Debe ingresar al menos 3 caracteres para realizar la búsqueda.");
  }else {
        /// Esto me sirve para guardar lo que busco el usuario.
        localStorage.setItem("busqueda", texto)
    }
});
  

/// Tomo la info de la QS
let queryString = location.search;
console.log(queryString);

let qsObject = new URLSearchParams(queryString);

let categoriaseleccionada = qsObject.get("categoria")///En la QS voy a obtener la categoria la cual se selecciono, esto lo logro porque prepare la QS previamente en el a href del index
console.log(categoriaseleccionada);


/// Productos
let linkapi = "https://dummyjson.com/products";
let maincategoria = document.querySelector(".maincategory"); ///Le doy nombre de variable al main


fetch(linkapi)
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);

    let contenidocategoria = ""; ///Lo arranco vacio para agregar los productos de las categorias y para comparar, siesta vacio 

    for (let i = 0; i < data.products.length; i++) { ///Recorro los productos y con un IF, si la categoria la cual busco coincide, entro a ese poroducto y lo agrego
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

    if (contenidocategoria == "") { ///Si esta vacio aviso que no se encontraron productos de dicha categoria, no va a pasar porque los nombres de categorias se sacan dimaicamente
      maincategoria.innerHTML = `<p>No hay productos de " ${categoriaseleccionada} " disponibles.</p>`;
    } else { ///Actualizo el h2 del banner y le pongo el nombre de la categoria seleccionada
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