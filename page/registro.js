//VARIABLES

let usuariosNuevos = []
//let btnG = document.getElementById("btnG")

//OBJETO
class usuario{
    constructor(nombre,email,telefono,pass, pass2){
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.pass = pass;
        this.pass2 = pass2
    }
}

function crearUsuario() {
      //js vanilla  
    /*let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let pass = document.getElementById("pass").value;
    let pass2 = document.getElementById("pass2").value*/

    // jquery definicion de variables
     let nombre = $("#nombre").val();  
     let email = $("#email").val();  
     let telefono = $("#telefono").val();  
     let pass = $("#pass").val();  
     let pass2 = $("#pass2").val();  

    let paso1 = JSON.parse(localStorage.getItem("usuariosNuevos"))

   
    if (localStorage.getItem("usuariosNuevos")!= null) {
        let id = paso1.length + 1
        let usuarioNew = new usuario (nombre,email,telefono,pass, id);   //        OBJETO
        paso1.push(usuarioNew)                                           //         ARRAY

        localStorage.setItem("usuariosNuevos", JSON.stringify(paso1))      //          GUARDAMOS DATOS EN EL NAVEGADOR
    }else{
        localStorage.clear()
        let id = 1
        let usuarioNew = new usuario (nombre,email,telefono,pass,id);   //        OBJETO
        usuariosNuevos.push(usuarioNew)
        localStorage.setItem("usuariosNuevos", JSON.stringify(usuariosNuevos))      //          GUARDAMOS DATOS EN EL NAVEGADOR
    }
    alert(`Cargaste ${nombre}, ${email}, ${telefono}`)
    
}
function validarPass2() {
    /*let inputpass1 = document.getElementById("pass").value
    let inputpass2 = document.getElementById("pass2").value*/
    let inputpass1 = $("#pass").val()
    let inputpass2 = $("#pass2").val()
    if (inputpass1=="") {
        alert("Debe ingresar una contraseña")
    }else if (inputpass2=="") {
        alert("Debe ingresar una contraseña igual")
    } else if(inputpass1 !== inputpass2){
        alert("La contraseña debe ser igual")
    }else{
        crearUsuario()
    }
    
}
//evento con jquery
$("#btnG").click(validarPass2)

//evento con js nativo vanilla
//btnG.addEventListener("click", validarPass2)


