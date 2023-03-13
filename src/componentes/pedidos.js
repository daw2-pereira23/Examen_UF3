import { cervezas } from "../bd/bd"
import { tablaPedidos } from "./tablaPedidos"



export const pedidos = {
    template:`

      <div class="col-12 d-flex mt-2 shadow">
         <div class="col-6">
            <h2>Selecciona tu cerveaza y haz tu pedido</h2>
            <form class="mt-5" id="formulario">
               <div class="mt-2">
                  <label class="form-label">Nombre del grupo</label>
                  <input type="text" class="form-control" id="nombre-grupo"  required pattern="{4,10}">
               </div>
               <div class="mt-2">
                  <label class="form-label">Mesa</label>
                  <input type="number" class="form-control" required pattern="{1,15}>
               </div>
               <div class="mt-2">
                  <label class="form-label">Elige tu birra</label>
                  <select id="eligeCerbeza" class="form-select" >
                      
                  </select>
               </div>
               <div class="mt-2">
                  <label class="form-label">Cuantas te traigo</label>
                  <input type="number" class="form-control" id="cantidad" required min="1">
               </div>
            </form>
            <button class="btn btn-success col-12 mt-3" id="enviar">Enviar Pedido</button>
         </div>
         <div class="col-6 mt-5" id="targeta">
            
      </div>

    `,
    script:()=>{
        var seleccionHtml=`
        
        `
        for(let index=0; index<cervezas.length;index++){
            seleccionHtml +=`
           <option value="${cervezas[index].id}" class="seleccion"  data-id=${cervezas[index].id}>${cervezas[index].nombre}</option> 
            `
        }
        document.querySelector('#eligeCerbeza').innerHTML = seleccionHtml

        return(seleccionHtml)
    },

    inyectarCerveza:()=>{
      document.querySelector('select').addEventListener("click", (event)=>{
        event.preventDefault()
        var seleccion = document.querySelector('#eligeCerbeza')
        var opcion = seleccion.options[seleccion.selectedIndex].value

        opcion = opcion-1
       

        var card= `
        <div class="card mt-5 col-12 col-6">
               <div class="row g-0 mt-5">
                 <div class="col-md-4">
                   <img src="${cervezas[opcion].imagen}" class="img-fluid rounded-start" alt="...">
                 </div>
                 <div class="col-md-8">
                   <div class="card-body">
                     <h5 class="card-title">${cervezas[opcion].nombre}</h5>
                     <p class="card-text">${cervezas[opcion].descripcion}</p>
                    
                   </div>
                 </div>
               </div>
             </div>
         </div>
        `
        document.querySelector('#targeta').innerHTML = card
      })
      
    },
    validacion : ()=>{
      document.querySelector('#enviar').addEventListener("click", ()=>{
        document.querySelector('#formulario').classList.add("was-validated")
      const nick = document.getElementById("nombre-grupo");
                if(!nick.checkValidity()) {
             
                    tablaPedidos.script()
                }else{
                
                    console.log("Ta bien");
                    tablaPedidos.script()
                }
      })
      
    }
}