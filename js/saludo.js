
document.addEventListener("DOMContentLoaded", function () {

let bienvenida = document.querySelector(".bienvenida");
let menu = document.querySelector(".menu");
let email = localStorage.getItem("usuarioEmail")

if (email.length > 0){
    menu.innerHTML = ""
    let contenidoBienvenida = `
        <p>Bienvenido: ${email}<p>
        `;
    bienvenida.innerHTML = contenidoBienvenida
    menu.innerHTML = `<a href="">Logout<a/>`
}
})
