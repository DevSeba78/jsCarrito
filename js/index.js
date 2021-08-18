
//let divimg = document.getElementById("main")
//let botonBuscar = document.getElementById("buscarB")
//let filtrados = document.getElementById("filtrados")
//let fotosTraidas = JSON.parse(localStorage.getItem("imgsNuevos"))
let head = document.getElementById("head")
head.setAttribute("style","background-color: #212529")
let items = document.getElementById("items");
let foot = document.getElementById("footer");
let carrito= {}
const DbJson = "../js/DB.json"




$(document).ready(function() {
    $.getJSON(DbJson, function(result,status) {
    if(status === "success"){
       let misDatos = result
       
       cargarImgs(misDatos)
               
    }
});
});




function cargarImgs(misDatos){
        
    for (const producto of misDatos) {
        $("#main").append(`
                    <div class="card" id="${producto.id}" style="width: 18rem;">
                    <img src="${producto.img}"class="card-img-top"/>
                    <div class="card-body">
                    <p><strong>${producto.nombre}</strong></p>
                    <b>Precio: ${producto.precio}</b>
                    <br>
                    <button type="button" class="btn btn-outline-success" id="btn${producto.id}">Comprar</button>
                    </div> 
                    </div>   
                    `)
                    
        $(`#btn${producto.id}`).click( function(){
            let card=$(`#${producto.id}`)
            card.css("transform","scale(1.05)")  
          
            console.log(`Compraste ${producto.nombre}`);
            
            let productoSeleccionado = misDatos.find(item=>item.id == producto.id)
           
            productoSeleccionado.cantidad = 1 //agrego atributo cantidad al objeto
            producto.stock --
            
            if (carrito.hasOwnProperty(producto.id)) { //verifico si ya existe ese id, en caso de existir sumo un producto a mi array de objetos
                
                productoSeleccionado.cantidad = carrito[producto.id].cantidad +1
                
                if (producto.stock <= 0 || producto.stock =="Null") {
                    alert(`${producto.nombre} sin stock`)
                }
            }
            carrito[producto.id]={...producto}
            //console.log(`carrito`,carrito );
            carritoCargado();
    })
}
}



function carritoCargado() {
    
    items.innerHTML = ''

    Object.values(carrito).forEach(element=>{ //transformo el objeto en un array
        //console.log(Object.values(carrito));
        //console.log(element);
       let tr = document.createElement("tr")
            let th = document.createElement("th")
                th.setAttribute("class", "col-1")
                th.textContent =`${element.id}`
                tr.appendChild(th)
            let th1 = document.createElement("th")
                th1.setAttribute("class", "col-2")
                th1.textContent =`${element.nombre} `
                let img = document.createElement("img")
                img.setAttribute("width","50")
                img.setAttribute("heigth","0")
                img.setAttribute("align","rigth")
                    img.src = ` ${element.img}`
                th1.appendChild(img)
                tr.appendChild(th1)
            let th2 = document.createElement("th")
                th2.setAttribute("class", "col-2")
                th2.textContent =`${element.cantidad}`
                tr.appendChild(th2)
            let th3 = document.createElement("th")
                th3.setAttribute("class", "col-2")
                th3.textContent =`$ ${element.precio}`
                tr.appendChild(th3)
            let th4 = document.createElement("th")

                th4.setAttribute("class", "col-2")
                let btnMas = document.createElement("button")
                    btnMas.setAttribute("class","btn btn-info btn-sm")
                    btnMas.textContent= `+`
                    btnMas.dataset.id = element.id
                    th4.appendChild(btnMas)
                let btnMenos = document.createElement("button")
                    btnMenos.setAttribute("class","btn btn-danger btn-sm")
                    btnMenos.textContent= `-`
                    btnMenos.dataset.id = element.id
                    console.log(btnMenos);
                    th4.appendChild(btnMenos)
                tr.appendChild(th4)
            let th5 = document.createElement("th")
                th5.setAttribute("class", "col-2")
                th5.textContent =`$${element.precio*element.cantidad}`
                tr.appendChild(th5)
        
                
               
                items.append(tr)


      
    })
    localStorage.setItem("carrito",JSON.stringify(carrito))
    footerCarrito();
    accionBotones();
}



function footerCarrito() {
    foot.innerHTML = ``
    if (Object.values(carrito).length===0) {
        let th = document.createElement("th")
        th.setAttribute("scope","row")
        th.setAttribute("colspan", "6")
        th.textContent = `Carrito Vacio`
        foot.appendChild(th)
        
        return
    }
    //con la funcion reduce calculo la cantidad de producto y total a pagar
    let nCantidad= Object.values(carrito).reduce((acc,{cantidad})=> acc + cantidad,0)
    let nTotal= Object.values(carrito).reduce((acc,{cantidad,precio})=> acc+ cantidad*precio,0)
    //imprimo los totales
    let tr = document.createElement("tr")
        let th= document.createElement("th")
        th.setAttribute("colspan", "2")
        th.textContent = `Total Productos:`
        tr.appendChild(th) 
        let th1= document.createElement("th")
        th1.textContent = `${nCantidad}`
        tr.appendChild(th1)
        let th2= document.createElement("th")
        th2.setAttribute("colspan", "2")
            let btnVaciar = document.createElement("button")
                btnVaciar.setAttribute("class","btn btn-danger")
                btnVaciar.setAttribute("id","vaciarCarrito")
                btnVaciar.textContent = `Vaciar Carrito`
            th2.appendChild(btnVaciar)
        tr.appendChild(th2)

        let th3= document.createElement("th")
        th3.textContent = `$ ${nTotal}`
        tr.appendChild(th3) 
        foot.append(tr)

        //boton de limpiado de carrito
        let botonVaciar = document.getElementById("vaciarCarrito")
        botonVaciar.addEventListener(`click`, () =>{
            carrito={} //limpio el array de objeto
            carritoCargado()
            

        })
   
}

function accionBotones(){
    let botonesAgregar = document.querySelectorAll("#items .btn-info");
    let botonesEliminar = document.querySelectorAll("#items .btn-danger");

    botonesAgregar.forEach(btn=>{
        btn.addEventListener(`click`, function(){
            console.log(btn.dataset.id);
            let producto = carrito[btn.dataset.id]//obtengo todas las propiedades de carrito en producto para luego acceder a la propiedad cantidad
            
            producto.cantidad ++
            producto.stock --

            if (producto.stock <= 0 || producto.stock =="Null") {
                alert(`${producto.nombre} sin stock`)
                producto.stock=0
                
            }
            carrito[btn.dataset.id] ={...producto} //hago copia del producto
            carritoCargado()
        })
    })

    botonesEliminar.forEach(btn=>{
        btn.addEventListener(`click`, function(){
            console.log(btn.dataset.id);
            let producto = carrito[btn.dataset.id]//detecto el producto
            producto.cantidad --
            producto.stock ++
            if (producto.cantidad === 0) {//si el producto es igual a 0 limpio ese producto
                delete carrito[btn.dataset.id]
            }else{
                carrito[btn.dataset.id] ={...producto} //hago copia del producto
                
            }
            carritoCargado()
        })
    })
}
 










function filtrarPorCategoria(e,){
    
    e.preventDefault()
    
    let filtro = document.getElementById("buscar").value.toLowerCase()
    console.log(filtro);
    productosFiltrados = fotosTraidas.filter(loquesea => loquesea.categoria == filtro)
    
    console.log(productosFiltrados);
    
    
    filtrados.textContent = `Producto filtrada por categoria ${filtro}`

    productosFiltrados.forEach(element => {
        let div1 = document.createElement("div")
            div1.setAttribute("class"," trans")
        let div2 = document.createElement("div")
            div2.setAttribute("class","card")
            div2.setAttribute("style", "width:18 rems;")
            div1.appendChild(div2)
            let img = document.createElement("img")
                img.setAttribute("src",`${element.img}`)
                img.setAttribute("class", "card-img-top")
                img.setAttribute("alt","categoria imagen")
                div2.appendChild(img)
                let div3 = document.createElement("div")
                    div3.setAttribute("class","card-body")
                    div2.appendChild(div3)
                    let h5 = document.createElement("h5")
                        h5.setAttribute("class","card-title")
                        h5.textContent = `${element.nombre}`
                        div3.appendChild(h5)
                    let p = document.createElement("p")
                        p.setAttribute("class","card-text")
                        p.textContent = `Categoria:  ${element.categoria}`
                    let p1 = document.createElement("p")
                        p1.setAttribute("class","card-text")
                        p1.textContent = `Precio: ${element.precio}`
                       
                        div3.appendChild(p)
                        div3.appendChild(p1)
                      
                    let a = document.createElement("input")
                        a.setAttribute("type","button")
                        a.setAttribute("id", `btn${element.id}`)
                        a.setAttribute("class","btn btn-outline-success sumar")
                        a.setAttribute("value", "Comprar")
                        div3.appendChild(a)

        filtrados.append(div1)
        
    });
    

    
}



botonBuscar.addEventListener("click", filtrarPorCategoria)







   
 





