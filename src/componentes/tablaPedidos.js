import { cervezas } from "../bd/bd"
import { pedidos } from "./pedidos"


export const tablaPedidos = {
    template: `
        <h1>Esto es lo que has tomado ya:</h1>
        <table class="table mt-5">
            <thead>
                <tr>
                    <th>Cerveza</th>
                    <th>Cantidad</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody id="tablaPedidos">
              
            </tbody>
        </table>
    `,
    script:()=>{
  
        document.querySelector('#enviar').addEventListener("click", ()=>{
            var cantidad = document.querySelector('#cantidad').value
            var seleccion = document.querySelector('#eligeCerbeza')
            var opcion = seleccion.options[seleccion.selectedIndex].value
            var cantidad = document.querySelector('#cantidad').value
            
            opcion = opcion-1
            var nombre = cervezas[opcion].nombre

            const tr = document.createElement("tr")
            
            tr.setAttribute("id", cervezas[opcion].id)

            const th = `
                <th>${nombre}</th>
                <th>${cantidad}<th>
                <th><button class="btn btn-danger borrar" data-id="${cervezas[opcion].id}">Eliminar</button></th>
                <th><button class="btn btn-warning editar" data-id="${cervezas[opcion].id}" data-nombre="${nombre}" data-cantidad="${cantidad} ">Editar</button></th>
            ` 
            tr.innerHTML = th

            document.querySelector('tbody').append(tr)
           
        })
        
        
    },

   detectarEventos:()=>{
    document.querySelector('tbody').addEventListener("click", (event)=>{
        /*
           let id = event.target.dataset.id
        let email = event.target.dataset.email
        let password = event.target.dataset.password
        let nick = event.target.dataset.nick

        */ 
        if(event.target.classList.contains("editar")){
            let id = event.target.dataset.id
            let nombre = event.target.dataset.nombre
            let cantidad = event.target.dataset.cantidad

            const nuevoForm = `
            <div class="col-12 d-flex mt-2 shadow">
         <div class="col-6">
            <h2>Selecciona tu cerveaza y haz tu pedido</h2>
            <form class="mt-5" id="formulario" novalidate>
               <div class="mt-2">
                  <label class="form-label">Nombre del grupo</label>
                  <input type="text" class="form-control" id="nombre-grupo" required pattern="{4,10}">
               </div>
               <div class="mt-2">
                  <label class="form-label">Mesa</label>
                  <input type="number" class="form-control" required pattern = {1,15}>
               </div>
               <div class="mt-2">
                  <label class="form-label">Elige tu birra</label>
                  <select id="eligeCerbeza" class="form-select" value=${pedidos.nombre}>
                     ${pedidos.script()}
                  </select>
               </div>
               <div class="mt-2">
                  <label class="form-label">Cuantas te traigo</label>
                  <input type="number" class="form-control" id="cantidad" required pattern="{1, 1000000} "value=${cantidad}>
               </div>
            </form>
            <button class="btn btn-warning col-12 mt-3" id="actualizar">Actualizar</button>
         </div>
         <div class="col-6 mt-5" id="targeta">
            
      </div>
            `
            document.querySelector('#pedidos').innerHTML = nuevoForm
            pedidos.inyectarCerveza()
            document.querySelector('#actualizar').addEventListener("click", ()=>{
                const columna = document.getElementById(id)
                columna.classList.add("fila-oculta")
                var cantidad = document.querySelector('#cantidad').value
                var seleccion = document.querySelector('#eligeCerbeza')
                var opcion = seleccion.options[seleccion.selectedIndex].value
                var cantidad = document.querySelector('#cantidad').value
                
                opcion = opcion-1
                var nombre = cervezas[opcion].nombre

                const tr = document.createElement("tr")
                
                tr.setAttribute("data-id", cervezas[opcion].id)

                const th = `
                    <th>${nombre}</th>
                    <th>${cantidad}<th>
                    <th><button class="btn btn-danger borrar" data-id="${cervezas[opcion].id}">Eliminar</button></th>
                    <th><button class="btn btn-warning editar" data-id="${cervezas[opcion].id}" data-nombre="${nombre}" data-cantidad="${cantidad} ">Editar</button></th>
                ` 
                tr.innerHTML = th

                document.querySelector('tbody').append(tr)

                document.querySelector('#pedidos').innerHTML = pedidos.template
                pedidos.script()
                pedidos.inyectarCerveza()
                tablaPedidos.script()
                tablaPedidos.detectarEventos()

            })

        }
        if(event.target.classList.contains("borrar")){
            event.preventDefault()
            let id= event.target.dataset.id
            const columna = document.getElementById(id)
            

            Swal.fire({
                title: 'Seguro que quieres borrar el pedido?',
                text: "Tendras que pedir otra vez",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borralo!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Borrada',
                    'Tu comanda a sido borrada.',
                    'success'

                  )
                  columna.classList.add('fila-oculta')
                }
              })
        }
    })
   }

}