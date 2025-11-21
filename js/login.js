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


/// Valido que se haya escrito algo en los campos, similar al funcionamiento del header

///Le doy nombre de variable a los inputs para despues comparar valores
let formularioLogin =  document.querySelector(".formLogin");
let inputLoginEmail = document.querySelector(".inputLoginEmail");
let inputLoginContra = document.querySelector(".inputLoginContra");

formularioLogin.addEventListener("submit", function(e){ ///Cuando aprieto submit
    ///Le doy nombre de variable al value de los inputs y guardo la cantidad de ccaracteres de los values
    let textoEmailLogin = inputLoginEmail.value.trim();
    let caracteresEmailLogin = textoEmailLogin.length;

    let textoContraLogin = inputLoginContra.value.trim();
    let caracteresContraLogin = textoContraLogin.length;

    ///Si no se cumplen, se calcela el comportamiento y sale una alerta con un mensaje dependiendo de lo que no se cumplio 
    if (caracteresEmailLogin === 0 || caracteresContraLogin === 0){    e.preventDefault(); 
        e.preventDefault(); 
        alert("Debe de completar los campos")
    } else if (caracteresEmailLogin === 0){
        e.preventDefault(); 
        alert("Debe ingresar un Email.");
    }else if (caracteresContraLogin === 0){
        e.preventDefault(); 
        alert("Debe ingresar una contraseña");
    }else if (caracteresContraLogin > 0 && caracteresContraLogin < 6){
        alert("Debe ingresar una contraseña de al menos 6 caracteres");
        e.preventDefault(); 

    }else{

        // Si se cumplen todos, guardo en el localStorage el email para luego trabajar con el
        localStorage.setItem("usuarioEmail", textoEmailLogin);
    }
})