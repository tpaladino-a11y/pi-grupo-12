//Este se repite en todos los index menos registro por logica

document.addEventListener("DOMContentLoaded", function () {
    let logout = document.querySelector("#logout");

    logout.addEventListener("click", function (e) { ///Cuando se toca el logout, se cancela el comportamiento, osea no te lleva a ningun lado
        e.preventDefault();
        localStorage.removeItem("usuarioEmail"); ///Se elimina el email del localstorage
        document.querySelector(".bienvenida").innerHTML = ""; ///Saco el mensaje de bienvenida
        ///Vuelvo a poner el .menu como en un principio con su REGISTRO Y LOGIN
        document.querySelector(".menu").innerHTML = `
            <a href="registro.html">REGISTRO</a>
            <a href="login.html">LOGIN</a>
        `;
    });

});
