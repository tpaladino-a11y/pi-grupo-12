//Este se repite en todos los index menos registro por logica

document.addEventListener("DOMContentLoaded", function () { ///Cuando se carga el DOM

    let bienvenida = document.querySelector(".bienvenida"); ///Le doy nombre de variable al div donde dentro voy a poner el "Bienvenido email"
    let menu = document.querySelector(".menu"); //El menu es donde tengo el login y logout dentro como
    let email = localStorage.getItem("usuarioEmail") ///Bajo del localStorage la informacion del email

    if (email && email.length > 0){ ///Si hay un email, borro el login, le cambio el inneHTML a "" osea nada
        menu.innerHTML = ""
        ///Hago una variable con el texto que quiero agregaar en biemvenida
        let contenidoBienvenida = `
            <p>Bienvenido: ${email}<p>
            `;
        bienvenida.innerHTML = contenidoBienvenida
        menu.innerHTML = `<a href="" id="logout">Logout</a>` ///SI PONGO EL BIEMVENIDO TAMBIEN PONGO EL A HREF L LOGOUT
    }

});
