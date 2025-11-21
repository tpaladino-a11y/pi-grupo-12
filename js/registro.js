/// HEADER (mismo en todas las paginas)
let formularioheader = document.querySelector(".search");
let inputheader = document.querySelector(".inputheader");

formularioheader.addEventListener("submit", function(e) {
    let texto = inputheader.value.trim();  /// el trim lo que hace es que no cuenta los espacios a la hora de contar caracteres
    let cantdecaracteres = texto.length;

    if (cantdecaracteres === 0 || cantdecaracteres < 3) {
        e.preventDefault(); 
        alert("Debe ingresar al menos 3 caracteres para realizar la búsqueda.");
    }else {
        /// Esto me sirve para guardar lo que busco el usuario.
        localStorage.setItem("busqueda", texto)
    }
});

let formularioRegistro = document.querySelector(".formRegistro");

///Le doy nombre de variables a cada input del formulario

let inputEmail = document.querySelector("#emailRegistro");
let inputContraseña = document.querySelector("#contraseñaRegistro");
let inputRepContraseña = document.querySelector("#repContraseñaRegistro");
let checkboxTerminos = document.querySelector("#aceptoTerminos");

formularioRegistro.addEventListener("submit", function(e){ ///Cuando se aprieta el boton de submit, se hacen las sigueintes validaciones
    ///Antes tengo que guardar en otras variaables el valor de lo que se escribe en los inputs
    let email = inputEmail.value.trim();
    let contraseña = inputContraseña.value.trim();
    let repContraseña = inputRepContraseña.value.trim();

    let errorMensaje = ""; ///Esto lo pongo como una especie de contador, si no se cumplen las condiciones de actualiza este mensaje dependiendo de lo que no se cunplio
    ///Si se cumplen ciertas condiciones, se actualiza el errorMensake
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

    if (errorMensaje !== "") { ///Si errorMensaje NO esta vacio, significa que algo no se cumplplio, por ende se cancela el comportamiento default y se muestra una alerta con el error que se actualizo en el mensaje de arriba
        e.preventDefault();
        alert(errorMensaje);
    } else {
        localStorage.setItem("usuarioEmail", email); ///Si no hay problemas, guardo el email en el localStorage para usarlo despues
    }
})