//Este se repite en todos los index menos registro por logica


document.addEventListener("DOMContentLoaded", function () {

let bienvenida = document.querySelectorAll(".bienvenida");
let menu = document.querySelector(".menu");
let email = localStorage.getItem("usuarioEmail")

if (email && email.length > 0){
    menu.innerHTML = ""
    let contenidoBienvenida = `
        <p>Bienvenido: ${email}<p>
        `;
    bienvenida[0].innerHTML = contenidoBienvenida
    bienvenida[1].innerHTML = contenidoBienvenida
    menu.innerHTML = `<a href="" id="logout">Logout</a>`
}
})
