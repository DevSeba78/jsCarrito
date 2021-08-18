//let table= document.getElementById("table")
let table= $("#table")
const body = document.body
body.setAttribute("style","background-color: #D5DBDB")

//let btnG = document.getElementById("btnG")
let btnG = $("#btnG")


class Prenda {
    constructor(tipo, marca, costo, stock, disp){
    
        this.tipo = tipo;
        this.marca = marca;
        this.costo = costo;
        this.stock = stock;
        this.disp = disp;
    }
    

}

let Prendas= []

function cargarStock() {
    
    // defincion y toma de variables con JS vanilla
    /*
    let tipo = document.getElementById("tipo").value;
    let marca = document.getElementById("marca").value;
    let costo = document.getElementById("costo").value;
    let stock = document.getElementById("stock").value;
    let disp = document.getElementById("disp").value; */

    // definicion de variables y toma de valores con Jquery
    let tipo = $("#tipo").val();
    let marca = $("#marca").val();
    let costo = $("#costo").val();
    let stock = $("#stock").val();
    let disp = $("#disp").val();

   

    let paso1 = JSON.parse(localStorage.getItem("Prendas")) //RECUPERAMOS DATOS DEL NAVEGADOR

   
    if (localStorage.getItem("Prendas")!= null) {
        let id = paso1.length + 1
        let producto = new Prenda (id, tipo, marca, costo, stock, disp);   //        OBJETO
        paso1.push(producto)                                           //         ARRAY

        localStorage.setItem("Prendas", JSON.stringify(paso1))      //          GUARDAMOS DATOS EN EL NAVEGADOR
    }else{
        localStorage.clear()
        let id = 1
        let producto = new Prenda (id,tipo, marca, costo, stock, disp);   //        OBJETO
        Prendas.push(producto)
        localStorage.setItem("Prendas", JSON.stringify(Prendas))      //          GUARDAMOS DATOS EN EL NAVEGADOR
    }
    alert(`Cargaste ${tipo}, ${marca}, ${costo}, ${stock}, ${disp}`)
    
}


function mostrar() {
    
    let imprimir = JSON.parse(localStorage.getItem("Prendas"))
    if (imprimir != null) {
        imprimir.forEach(element => {
            let tabla = document.createElement("tr")
                
                let td = document.createElement("td")
                    td.setAttribute("class", "col-1")
                    td.textContent = `${imprimir.indexOf(element)}`
                    tabla.appendChild(td)
                let th1 = document.createElement("th")
                    th1.setAttribute("class", "col-2")
                    th1.textContent = `${element.tipo}`
                    tabla.appendChild(th1)
                let th2 = document.createElement("th")
                    th2.setAttribute("class", "col-2")
                    th2.textContent = `${element.marca}`
                    tabla.appendChild(th2)
                let th3 = document.createElement("th")
                    th3.setAttribute("class", "col-2")
                    th3.textContent = `${element.costo}`
                    tabla.appendChild(th3)
                let th4 = document.createElement("th")
                    th4.setAttribute("class", "col-2")
                    th4.textContent = `${element.stock}`
                    tabla.appendChild(th4)
                let th5 = document.createElement("th")
                    th5.setAttribute("class", "col-2")
                    th5.textContent = `${element.disp}`
                    tabla.appendChild(th5)
               
        
                table.append(tabla)
        });
    }else{
        console.log(`Nada por cargar`);
        alert(`Nada por cargar`);
    }
    

    
}


$(btnG).click(cargarStock)
mostrar()

//btnG.addEventListener("click",cargarStock)
//mostrar()