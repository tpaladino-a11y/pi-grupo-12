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

let formularioRegistro = document.querySelector(".formRegistro");

let inputEmail = document.querySelector("#emailRegistro");
let inputContraseña = document.querySelector("#contraseñaRegistro");
let inputRepContraseña = document.querySelector("#repContraseñaRegistro");
let checkboxTerminos = document.querySelector("#aceptoTerminos");

formularioRegistro.addEventListener("submit", function(e){
    let email = inputEmail.value.trim();
    let contraseña = inputContraseña.value.trim();
    let repContraseña = inputRepContraseña.value.trim();

    let errorMensaje = "";

    if (email.length === 0) {
        errorMensaje = "EL campo email esta vacio, porfavor completarlo.";
    }

    else if (contraseña.length === 0) {
        errorMensaje = "El campo contraseña esta vacio, porfavor completarlo.";
    }

    else if (contraseña < 6) {
        errorMensaje = "La contraseña debe tener al menos 6 caracteres.";
    }

    else if (contraseña !== repContraseña) {
        errorMensaje = "Las contraseñas no coinciden.";
    }

    
})