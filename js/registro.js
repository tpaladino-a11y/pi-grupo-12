let formRegistro = document.querySelector(".formRegistro"); 
let inputEmailReg = document.querySelector(".inputRegistroEmail"); 
let inputContrasenia = document.querySelector(".inputRegistroContra"); 
let inputRepContrasenia = document.querySelector(".inputRepiteContra"); 
let checkboxAcepto = document.querySelector(".checkboxAcepto"); 

formRegistro.addEventListener("submit", function(e) {
    e.preventDefault(); 
    
    let email = inputEmailReg.value.trim(); /// el trim lo que hace es que no cuenta los espacios a la hora de contar caracteres
    let contrasenia = inputContrasenia.value;
    let repContrasenia = inputRepContrasenia.value;

    if (email.length == 0 || contrasenia.length == 0 || repContrasenia.length == 0) {
        alert("Debes completar todos los campos obligatorios.");
        return; 
    }
    
    if (contrasenia.length > 0 && contrasenia.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres"); 
        return;
    } 
    
    if (contrasenia !== repContrasenia) {
        alert("Las contraseñas no coinciden"); 
        return;
    }
    
    if (checkboxAcepto.checked == false) { 
        alert("Es obligatorio aceptar los términos y condiciones.");
        return;
    }

    localStorage.setItem("usuarioEmail", email); 
    
    alert("Redirigiendo a Login.");
    
    window.location.href = "login.html"; 
    
});