
// Import our custom CSS
import './scss/styles.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import { home } from "./vistas/home";
import { header } from './componentes/header';
import { footer } from './componentes/footer';
import { pedidos } from './componentes/pedidos';
import { tablaPedidos } from './componentes/tablaPedidos';


document.querySelector('main').innerHTML = home.template
document.querySelector('header').innerHTML = header.template;
document.querySelector('footer').innerHTML = footer.template
document.querySelector('#pedidos').innerHTML = pedidos.template
document.querySelector('#tablaPedidos').innerHTML = tablaPedidos.template
pedidos.script()
pedidos.inyectarCerveza()

tablaPedidos.detectarEventos()
pedidos.validacion()
