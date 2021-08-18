let verificar = document.getElementById("verificar")
let div = document.getElementById("ABM")

let control = JSON.parse(localStorage.getItem("usuariosNuevos"))


function verificarUsuario() {
    let correoLogin = document.getElementById("email").value;
    let busqueda = control.find(control => control.email == correoLogin)
    console.log(`${busqueda.email}`);
    
    let passLogin = document.getElementById("pass").value;
        
     if (control.pass != passLogin) {
            
            alert(`${busqueda.nombre}`)
            window.open("stock.html")
            
        }else {
            alert("contraseña incorrecta")
                       
        } 
    
    
    
        /*for (let index = 0; index < control.length; index++) {
        const element = control[index];
        let emailLogin = document.getElementById("email").value
        let passLogin = document.getElementById("pass").value
        if (element.email === emailLogin && element.pass === passLogin) {
            
            alert(`usuario ${element.nombre} correcto`);
            window.open("stock.html")    
            return        
        }else{
            alert(`Usuario/Contraseña ingresada es invalida`)
        }
        
    } */
}

function mostrarBotones(e) {
    
    e.preventDefault()
    let buttonA = document.createElement("button")
    buttonA.setAttribute("type", "button")
    buttonA.setAttribute("class","btn btn-outline-secondary")
    buttonA.textContent = "Alta"
    div.appendChild(buttonA)
    let buttonB = document.createElement("button")
    buttonB.setAttribute("type", "button")
    buttonA.setAttribute("class","btn btn-outline-secondary")
    buttonB.textContent = "Baja"
    div.appendChild(buttonB)
    let buttonM = document.createElement("button")
    buttonM.setAttribute("type", "button")
    buttonM.setAttribute("class","btn btn-outline-secondary")
    buttonM.textContent = "Modificacion"
    div.appendChild(buttonM)
    
}






verificar.addEventListener("click", verificarUsuario)

