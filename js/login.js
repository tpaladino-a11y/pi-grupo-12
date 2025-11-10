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


/// Valido que se haya escrito algo en los campos, similar al funcionamiento del header
let formularioLogin =  document.querySelector(".formLogin");
let inputLoginEmail = document.querySelector(".inputLoginEmail");
let inputLoginContra = document.querySelector(".inputLoginContra");

formularioLogin.addEventListener("submit", function(e){
    let textoEmailLogin = inputLoginEmail.value.trim();
    let caracteresEmailLogin = textoEmailLogin.length;

    let textoContraLogin = inputLoginContra.value.trim();
    let caracteresContraLogin = textoContraLogin.length;


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
        
        // Guarda el email en localStorage
        localStorage.setItem("usuarioEmail", textoEmailLogin);
    }
})