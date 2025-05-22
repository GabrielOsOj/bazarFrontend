import { desactivarSelecciones, seleccionado } from "./Utilidades.js";

const botones = document.getElementsByClassName("navbar-botones-boton");

const nombresSecciones = ["clientes", "productos", "ventas"];
const seccionCliente = document.getElementById("seccionClientes");
const seccionVenta = document.getElementById("seccionVentas");
const seccionProducto = document.getElementById("seccionProductos");

export function configurarVistasSecciones() {
    for (let i = 0; i < botones.length; i++) {

        botones[i].addEventListener("click", () => {
            seleccionado.valor=null;
            desactivarSelecciones()
            cambiarVista(botones[i].getAttribute("name"));

        });

    }
}

export function cambiarVista(nombre) {
    
    switch (nombre) {
        case nombresSecciones[0]:
            seccionCliente.style.display = "initial";
            seccionProducto.style.display = "none";
            seccionVenta.style.display = "none"

            break;
        case nombresSecciones[1]:
            seccionProducto.style.display = "initial";
            seccionCliente.style.display = "none";
            seccionVenta.style.display = "none";

            break;
        case nombresSecciones[2]:
            seccionVenta.style.display = "initial"
            seccionCliente.style.display = "none";
            seccionProducto.style.display = "none";
            break;
    }

}
