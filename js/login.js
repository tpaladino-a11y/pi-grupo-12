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
