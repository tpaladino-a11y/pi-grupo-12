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

