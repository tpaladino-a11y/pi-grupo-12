document.addEventListener("DOMContentLoaded", function () {
    let logout = document.querySelector("#logout");

    logout.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("usuarioEmail");
        document.querySelector(".bienvenida").innerHTML = "";
        document.querySelector(".menu").innerHTML = `
            <a href="registro.html">REGISTRO</a>
            <a href="login.html">LOGIN</a>
        `;
    });

});
