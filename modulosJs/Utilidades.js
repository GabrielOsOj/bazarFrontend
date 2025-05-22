import * as main from "../source.js"

/* utilidades */
export function limpiarCamposCli() {
    main.nombreCli.value = "";
    main.apellidoCli.value = "";
    main.dniCli.value = "";
}

export function limpiarCamposProd() {
    main.nombreProducto.value = "";
    main.marcaProducto.value = "";
    main.costoProducto.value = 0;
    main.cantidadDisponible.value = 0;
}

export function aObjetoCliente(fila) {
    let cliente = {
        "id_cliente": "",
        "nombre": "",
        "apellido": "",
        "dni": ""
    };

    let celdas = fila.cells;

    cliente.id_cliente = celdas[0].innerText;
    cliente.nombre = celdas[1].innerText;
    cliente.apellido = celdas[2].innerText;
    cliente.dni = celdas[3].innerText;
    return cliente;
}

export function aObjetoProducto(fila) {
    let producto = {
        "codigo_producto": "",
        "nombre": "",
        "marca": "",
        "costo": "",
        "cantidad_disponible": "",
        "cantidad_comprada": ""
    };

    let celdas = fila.cells;

    producto.codigo_producto = celdas[0].innerText;
    producto.nombre = celdas[1].innerText;
    producto.marca = celdas[2].innerText;
    producto.costo = celdas[3].innerText;
    producto.cantidad_disponible = celdas[4].innerText;

    if(celdas[5]==undefined){
        producto.cantidad_comprada = ""
    }else{
        producto.cantidad_comprada = celdas[5].innerText
    }

    return producto;
}


export function transformadorVentas(ventaCompleta) {

    let ventaCorta = {
        "idVenta": ventaCompleta.codigo_venta,
        "fecha": ventaCompleta.fecha_venta,
        "dni": ventaCompleta.cliente.dni,
        "cantidad_productos": ventaCompleta.listaProductos.length,
        "total": ventaCompleta.total,
        "venta_completa": ventaCompleta
    }
    return ventaCorta;
}

export function transformadorProductos(productoLargo) {
    let productoCorto = {

        "id": productoLargo.codigo_producto,
        "nombre": productoLargo.nombre,
        "marca": productoLargo.marca,
        "costo": productoLargo.costo
    }
    return productoCorto
}

function crearBotonVacioParaDetalleVentas(ventaCompleta) {

    let boton = document.createElement("button");
    boton.addEventListener("click", () => {
        seleccionado.valor = ventaCompleta;
        main.cargarModalDetalle(ventaCompleta)
    })
    let celda = document.createElement("td");
    boton.textContent = "Ver Detalle";
    boton.className = "btn-detalles"
    celda.appendChild(boton);
    return celda;
}



export function cargarDatosConBoton(tabla, venta) {
    let nuevaTabla = document.createElement("tbody");
    for (let i = 0; i < venta.length; i++) {
        let fila = document.createElement("tr");
        fila.className = "fila";
        let valores = Object.values(venta[i]);
        for (let j = 0; j < valores.length - 1; j++) {

            let celda = document.createElement("td");
            let textoCelda = document.createTextNode(valores[j]);
            celda.className = "tabla-celda"
            celda.appendChild(textoCelda);
            fila.appendChild(celda);

        }
        fila.appendChild(crearBotonVacioParaDetalleVentas(venta[i].venta_completa));
        agregarEventoSeleccionado(fila);
        agregarEventoSeleccionadoVentaCompleta(fila,venta[i].venta_completa);
        nuevaTabla.appendChild(fila)
    }
    tabla.replaceChild(nuevaTabla, tabla.querySelector("tbody"));
}

export async function cargarDatosTablaInternaProductos(tabla, datos) {
    let nuevaTabla = document.createElement("tbody")

    datos
        .map(p => {
            return {
                "codigo_producto": p.id,
                "nombre": p.nombre,
                "marca": p.marca,
                "costo": p.precio,
                "cantidad_disponible": p.stock,
                "cantidad_comprada": 0
            }
        })
        .map(p => {
            return generarFila(p)
        })
        .map(f => {
            agregarEventoSeleccionMultiple(f)
            return f
        })
        .map(f => {
            return insertarCeldaAlFinal(f, crearCeldaInputSpinner(f))

        })
        .forEach(filaYevento => {
            nuevaTabla.appendChild(filaYevento);
        })

    tabla.replaceChild(nuevaTabla, tabla.querySelector("tbody"));
}

function crearCeldaInputSpinner(fila) {
    const celda = document.createElement('td');
    const contenedor = document.createElement('div');
    const input = document.createElement('input');
    const btnMas = document.createElement('button');
    const btnMenos = document.createElement('button');

    contenedor.className = 'input-spinner';
    btnMas.className = 'input-spinner-btn';
    btnMenos.className = 'input-spinner-btn';
    input.className = 'input-spinner-field';

    input.type = 'number';
    input.min = 0;
    input.value = 0;
    input.readOnly = true;

    btnMas.textContent = '+';
    btnMenos.textContent = '-';

    function actualizarBotones() {
        btnMenos.disabled = input.value <= input.min;
    }

    btnMas.addEventListener('click', () => {
        input.value = parseInt(input.value) + 1;
        // input.stepUp();
        emitir();
        actualizarBotones();
    });

    btnMenos.addEventListener('click', () => {
        input.value = parseInt(input.value) - 1;
        // input.stepDown();
        emitir();
        actualizarBotones();
    });

    function emitir() {
        fila.childNodes[fila.childNodes.length - 2].innerText = parseInt(input.value);
    }

    actualizarBotones();

    contenedor.append(btnMenos, input, btnMas);
    celda.appendChild(contenedor);

    return celda;
}

export function insertarCeldaAlFinal(fila, celda) {
    fila.appendChild(celda)
    return fila;
}

export function generarFila(datos, ignorar = 0) {

    let fila = document.createElement("tr");
    fila.className = "fila";
    let valores = Object.values(datos);

    for (let i = 0; i < valores.length - ignorar; i++) {
        let celda = document.createElement("td");
        let textoCelda = document.createTextNode(valores[i]);

        celda.className = "tabla-celda"
        celda.appendChild(textoCelda);
        fila.appendChild(celda);
    }
    
    fila.cells[fila.cells.length - 1].style.display = "none"
    fila.cells[fila.cells.length - 2].style.display = "none"
    return fila;
}

//funcion comun para cargar datos
export async function cargarDatos(tabla, datos) {
    let nuevaTabla = document.createElement("tbody");
    for (let i = 0; i < datos.length; i++) {

        let fila = document.createElement("tr");
        fila.className = "fila";
        let valores = Object.values(datos[i]);
        for (let j = 0; j < valores.length; j++) {

            let celda = document.createElement("td");
            let textoCelda = document.createTextNode(valores[j]);
            celda.className = "tabla-celda"
            celda.appendChild(textoCelda);
            fila.appendChild(celda);

        }
        agregarEventoSeleccionado(fila);

        nuevaTabla.appendChild(fila)
    }
    tabla.replaceChild(nuevaTabla, tabla.querySelector("tbody"));
}

// en visuales se manipula tambien, por las dudas
export let seleccionado = { "valor": null,
    "valor2":null
 }
export let seleccionados = { "valor": [] }

/*Se espera un elemento del tipo tr*/
export function agregarEventoSeleccionado(elemento) {
    elemento.addEventListener("click", (e) => {
        let fila = e.target.parentElement;
        desactivarSelecciones()
        fila.classList.add("fila_seleccionada");
        seleccionado.valor = fila;
    })
}

export function agregarEventoSeleccionadoVentaCompleta(fila,ventaCompleta){
    fila.addEventListener("click",()=>{
        seleccionado.valor = ventaCompleta;
    })
}

export function agregarEventoSeleccionMultiple(elemento) {
    elemento.addEventListener("click", (e) => {
        let fila = e.target.closest("tr");
        if (seleccionados.valor.includes(fila)) {
            return;
        }
        seleccionados.valor.push(fila);
    })
}

export function desactivarSelecciones() {
    let filasTodas = document.querySelectorAll(".fila");
    filasTodas.forEach(f => {
        f.classList.remove("fila_seleccionada");
    })
}