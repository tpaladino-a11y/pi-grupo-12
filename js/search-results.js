///Header mismo en todas las paginas
let formularioheader = document.querySelector(".search");
let inputheader = document.querySelector(".inputheader");

formularioheader.addEventListener("submit", function(e) {
    let texto = inputheader.value.trim(); /// el trim lo que hace es que no cuenta los espacios a la hora de contar caracteres
    let cantdecaracteres = texto.length;

    if (cantdecaracteres === 0 || cantdecaracteres < 3) {
        e.preventDefault(); 
        alert("Debe ingresar al menos 3 caracteres para realizar la búsqueda.");
    }
});


let linkapi = "https://dummyjson.com/products"; 
let tituloBusqueda = document.querySelector('.search-title'); 
let contenedorResultados = document.querySelector('.search-results-container'); 
let mensajeNoResultados = document.querySelector('.no-results-message'); 

let queryString = location.search; 
let terminoBuscado = null; 

if (queryString) {
    let subString = queryString.replace('?', ''); 
    
    let parametros = subString.split('&');
    
    let parBuscado = parametros.find(par => par.startsWith('querystring='));

    if (parBuscado) {
        let parClaveValor = parBuscado.split('='); 
        terminoBuscado = parClaveValor[1];
        
        if (terminoBuscado) {
            terminoBuscado = decodeURIComponent(terminoBuscado).trim();
        }
    }
}


if (terminoBuscado && terminoBuscado.length >= 3) {
    
    fetch(linkapi)
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) { 
            
            let htmlProductos = ""; 
            let contadorProductos = 0; 
            const terminoMinusculas = terminoBuscado.toLowerCase(); 

            for (let i = 0; i < datos.products.length; i++) {
                let unProducto = datos.products[i];
                
                let tituloProducto = unProducto.title.toLowerCase();
                let descripcionProducto = unProducto.description.toLowerCase();
                
                if (tituloProducto.includes(terminoMinusculas) || descripcionProducto.includes(terminoMinusculas)) {
                    
                    contadorProductos++;
                    
                    htmlProductos += `
                        <article class="result-item">
                            <img src="${unProducto.images[0]}" alt="${unProducto.title}">
                            <h3>${unProducto.title}</h3>
                            <p>$${unProducto.price.toLocaleString('es-AR')}</p> 
                            <a href="product.html?productoId=${unProducto.id}">Ver detalle</a>
                        </article>
                    `;
                }
            }

            if (contadorProductos > 0) {
                tituloBusqueda.textContent = `Resultados de búsqueda para: ${terminoBuscado}`;
                contenedorResultados.innerHTML = htmlProductos;
                mensajeNoResultados.style.display = 'none';
            } else {
                tituloBusqueda.textContent = `¡Lo sentimos!`;
                mensajeNoResultados.textContent = `No hay resultados para el término: ${terminoBuscado}`;
                mensajeNoResultados.style.display = 'block';
                contenedorResultados.innerHTML = ""; 
            }
        })
        .catch(function(error) {
            console.error("Falló la conexión o el procesamiento de datos: " + error);
            tituloBusqueda.textContent = `Error de conexión`;
            mensajeNoResultados.textContent = `⚠️ No pudimos conectar con la API.`;
            mensajeNoResultados.style.display = 'block';
        });

} else {
    tituloBusqueda.textContent = `¡Ups! Algo faltó.`;
    mensajeNoResultados.textContent = `Necesitamos al menos 3 caracteres para buscar.`;
    mensajeNoResultados.style.display = 'block';
}