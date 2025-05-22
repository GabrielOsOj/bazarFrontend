import { configurarVistasSecciones } from "./modulosJs/Visuales.js"
import { limpiarCamposCli, aObjetoCliente, limpiarCamposProd, aObjetoProducto, transformadorVentas, cargarDatosConBoton, transformadorProductos, cargarDatosTablaInternaProductos, seleccionados } from "./modulosJs/Utilidades.js";
import { cargarClientes, crearCliente, editarCliente, eliminarCliente } from "./modulosJs/clientes/CRUDclientes.js";
import { cargarDatos, seleccionado } from "./modulosJs/Utilidades.js";
import { cargarProductos, crearProducto, editarProducto, eliminarProducto, faltaStockProductos } from "./modulosJs/productos/CRUDproductos.js";
import { cargarVentas, crearVenta, editarVenta, eliminarVenta, mayorVenta } from "./modulosJs/ventas/CRUDventas.js";
configurarVistasSecciones()


/*Abrir modal para cada cosa */
const fondoModal = document.getElementsByClassName("modalEntradaDatos")[0];

/*  ----  Cliente  ----  */
const bntNuevoCliente = document.getElementById("cliente-botones-nuevo");
const modalEntradaClientes = document.getElementById("modalcliente")
const modalClienteTitulo = document.getElementById("modalEntradaDatos-cliente-titulo")
//Botones internos del modal
const btnGuardarNuevoCli = document.getElementById("guardar")
const btnEditarCli = document.getElementById("editar")
const btnCancelarNuevoCli = document.getElementById("cancelar")

/*Campos cliente*/
let id_cliente = null;
export const nombreCli = document.getElementById("nombreCli");
export const apellidoCli = document.getElementById("apellidoCli");
export const dniCli = document.getElementById("dniCli");

//campo error
const campoError = document.getElementById('error-box');

//modal confirmacion de borrado
const fondoConfirmarEliminado = document.getElementById("modalConfirmacion");

//modal principal clientes
fondoModal.addEventListener("click", (event) => {

    if (event.target == fondoModal) {
        fondoModal.classList.remove("activo")
        limpiarCamposCli()
        campoError.classList.remove("activo")

        btnGuardarNuevoCli.style.display = "none";
        btnEditarCli.style.display = "none";
        modalEntradaClientes.style.display = "none";

        modalProducto.style.display = "none";
        btnIntProdGuardar.style.display = "none";
        errorBoxProducto.classList.remove('activo');

    }

})

/* Nuevo cliente */

bntNuevoCliente.addEventListener("click", () => {
    modalClienteTitulo.innerText = "Nuevo Cliente"
    fondoModal.classList.add("activo");
    modalEntradaClientes.style.display = "block";
    btnGuardarNuevoCli.style.display = "initial"
})


btnGuardarNuevoCli.addEventListener("click", () => {

    crearCliente({
        "id_cliente": "null",
        "nombre": nombreCli.value,
        "apellido": apellidoCli.value,
        "dni": dniCli.value
    })
        .then((e) => {
            if (e.ok) {
                fondoModal.classList.remove("activo");
                btnGuardarNuevoCli.style.display = "none"

                limpiarCamposCli()
                cargarTablaClientes()
            }
        })
        .catch((e) => {
            campoError.classList.add("activo");
            campoError.textContent = e.message;

        })

})

btnCancelarNuevoCli.addEventListener("click", () => {
    btnGuardarNuevoCli.style.display = "none";
    btnEditarCli.style.display = "none";
    fondoModal.classList.remove("activo")
    modalEntradaClientes.style.display = "none";
    limpiarCamposCli()

})

/*  Editar cliente */
const btnEditarCLiente = document.getElementById("cliente-botones-editar");

btnEditarCLiente.addEventListener("click", () => {
    if (seleccionado.valor == null) {
        return;
    }

    modalClienteTitulo.innerText = "Editar Cliente"
    fondoModal.classList.add("activo");
    modalEntradaClientes.style.display = "block";
    btnEditarCli.style.display = "initial";

    let cliente = aObjetoCliente(seleccionado.valor);

    id_cliente = cliente.id_cliente;
    nombreCli.value = cliente.nombre;
    apellidoCli.value = cliente.apellido;
    dniCli.value = cliente.dni;

})

btnEditarCli.addEventListener("click", () => {
    editarCliente(
        {
            "id_cliente": id_cliente,
            "nombre": nombreCli.value,
            "apellido": apellidoCli.value,
            "dni": dniCli.value
        }
    ).then((e) => {
        if (e) {
            fondoModal.classList.remove("activo");
            btnEditarCli.style.display = "none"

            limpiarCamposCli()
            cargarTablaClientes()
            seleccionado.valor = null;
        }
    })
        .catch(e => {
            campoError.classList.add("activo");
            campoError.textContent = e.message;
        })
})

/* Eliminar cliente */
const btnEliminarCliente = document.getElementById("cliente-botones-eliminar");
//botones internos
const btnConfirmarEliminacion = document.getElementById("btn-confirmar");
const btnCancelarEliminacion = document.getElementById("btn-cancelar");
const cuadroErrorCliente = document.getElementById("error-eliminar-cliente");

btnEliminarCliente.addEventListener("click", () => {

    if (seleccionado.valor == null) {
        return;
    }

    fondoConfirmarEliminado.style.display = "flex";
})

fondoConfirmarEliminado.addEventListener("click", (event) => {

    if (event.target == fondoConfirmarEliminado) {
        fondoConfirmarEliminado.style.display = "none"
    }

})

btnConfirmarEliminacion.addEventListener("click", () => {
    eliminarCliente(seleccionado.valor.cells[0].innerText)
        .then(() => {
            fondoConfirmarEliminado.style.display = "none"
            seleccionado.valor = null;
            cargarTablaClientes()
            fondoConfirmarEliminado.style.display = "none"
            cuadroErrorCliente.classList.remove("activo");

        }).catch((e)=>{
            cuadroErrorCliente.classList.add("activo");
            cuadroErrorCliente.innerText = e.message;
        })
})

btnCancelarEliminacion.addEventListener("click", () => {
    fondoConfirmarEliminado.style.display = "none"
    cuadroErrorCliente.classList.remove("activo");
    cuadroErrorCliente.innerText = "";
})

/* ----------------------- Productos ----------------------- */
const modalProducto = document.getElementById("modalProducto");
const modalProductoTitulo = document.getElementById("modalProducto-titulo");

const btnNuevoProducto = document.getElementById("producto-botones-nuevo");
const btnEditarProducto = document.getElementById("producto-botones-editar");
const btnEliminarProducto = document.getElementById("producto-botones-eliminar");
const btnFaltaStockProductos = document.getElementById("producto-botones-bajoStock");

//Botones internos
const btnIntProdGuardar = document.getElementById("btnProdGuardar");
const btnIntProdEditar = document.getElementById("btnProdEditar");
const btnIntProdCancelar = document.getElementById("btnProdCancelar");

//campos
let codigo_producto = null;
export const nombreProducto = document.getElementById("producto-nombre");
export const marcaProducto = document.getElementById("producto-marca");
export const costoProducto = document.getElementById("producto-costo");
export const cantidadDisponible = document.getElementById("producto-stock");

//cuadro de error
const errorBoxProducto = document.getElementById('producto-error-box');

/*Nuevo producto*/
btnNuevoProducto.addEventListener("click", () => {
    fondoModal.classList.add("activo");
    modalProducto.style.display = "initial";
    modalProductoTitulo.innerText = "Nuevo Producto";
    btnIntProdGuardar.style.display = "initial";
    limpiarCamposProd()
})

btnIntProdGuardar.addEventListener("click", () => {
    crearProducto({

        "codigo_producto": "null",
        "nombre": nombreProducto.value,
        "marca": marcaProducto.value,
        "costo": costoProducto.value,
        "cantidad_disponible": cantidadDisponible.value,
        "cantidad_comprada": "null",

    })
        .then((e) => {
            if (e.ok) {
                limpiarCamposProd()
                cargarTablaProductos()

                fondoModal.classList.remove("activo");
                modalProducto.style.display = "none";
                btnIntProdGuardar.style.display = "none";
                errorBoxProducto.classList.remove('activo');
            }
        })
        .catch((e) => {
            errorBoxProducto.textContent = e.message;
            errorBoxProducto.classList.add('activo');
        })

})

btnIntProdCancelar.addEventListener("click", () => {

    fondoModal.classList.remove("activo");
    modalProducto.style.display = "none";
    btnIntProdGuardar.style.display = "none";
    btnIntProdEditar.style.display = "none";
    errorBoxProducto.classList.remove('activo');

    limpiarCamposProd()
})

/* editar producto */
btnEditarProducto.addEventListener("click", () => {

    if (seleccionado.valor == null) {
        return;
    }

    fondoModal.classList.add("activo");
    modalProducto.style.display = "initial";
    modalProductoTitulo.innerText = "Editar Producto";
    btnIntProdEditar.style.display = "initial";

    let producto = aObjetoProducto(seleccionado.valor);

    codigo_producto = producto.codigo_producto;
    nombreProducto.value = producto.nombre;
    marcaProducto.value = producto.marca;
    costoProducto.value = producto.costo;
    cantidadDisponible.value = producto.cantidad_disponible;

})

btnIntProdEditar.addEventListener("click", () => {
    editarProducto({
        "codigo_producto": codigo_producto,
        "nombre": nombreProducto.value,
        "marca": marcaProducto.value,
        "costo": costoProducto.value,
        "cantidad_disponible": cantidadDisponible.value,
        "cantidad_comprada": null
    })
        .then(() => {
            limpiarCamposProd()
            cargarTablaProductos()

            fondoModal.classList.remove("activo");
            modalProducto.style.display = "none";
            btnIntProdEditar.style.display = "none";
            errorBoxProducto.classList.remove('activo');
        })
        .catch((e) => {
            console.log(e)
            errorBoxProducto.textContent = e.message;
            errorBoxProducto.classList.add('activo');
        })
})

/* Eliminar producto */
const modalConfirmacionEliminacionProducto = document.getElementById('modal-eliminar-producto');

const btnEliminarProductoConfirmar = document.getElementById("btnEliminarConfirmar");
const btnEliminarProductoCancelar = document.getElementById("btnEliminarCancelar");

const errorBoxEliminarProducto = document.getElementById("error-eliminar-producto");

btnEliminarProducto.addEventListener("click", () => {
    if (seleccionado.valor == null) {
        return;
    }
    modalConfirmacionEliminacionProducto.style.display = "flex"
})

btnEliminarProductoConfirmar.addEventListener("click", () => {

    eliminarProducto(seleccionado.valor.cells[0].innerText)
        .then(() => {
            modalConfirmacionEliminacionProducto.style.display = "none"
            cargarTablaProductos()
        }).catch(e=>{
            errorBoxEliminarProducto.textContent = e.message;
            errorBoxEliminarProducto.classList.add('activo');
        })
})

btnEliminarProductoCancelar.addEventListener("click", () => {
    errorBoxEliminarProducto.textContent = "";
    errorBoxEliminarProducto.classList.remove('activo');
    modalConfirmacionEliminacionProducto.style.display = "none";
})

modalConfirmacionEliminacionProducto.addEventListener("click", (event) => {
    if (event.target == modalConfirmacionEliminacionProducto) {
        modalConfirmacionEliminacionProducto.style.display = "none";
    }
})

//cargar productos con stock bajo
btnFaltaStockProductos.addEventListener("click",()=>{
    faltaStockProductos()
    .then((e)=>{
        console.log(e)
        cargarDatos(tablaProductos,e.map((p)=>{
            return{
                codigo_producto:p.codigo_producto,
                nombre:p.nombre,
                marca:p.marca,
                costo:p.costo,
                cantidad_disponible:p.cantidad_disponible

            }
        }))
    })
    .catch((e)=>{
        console.log(e)
    })
})
/*

/* ----------------------- Ventas -----------------------*/

//botones
const btnNuevaVenta = document.getElementById("btnVentaNuevaVenta");
const btnEditarVenta = document.getElementById("btnVentaEditarVenta");
const btnEliminarVenta = document.getElementById("btnVentaEliminarVenta");
const btnTraerMayorVenta = document.getElementById("btnVentaTraerMayor");

//modal para detalle de venta
const modalDetalleVenta = document.getElementById("modal-detalles-venta");

//campos modal detalle venta
const modDetIdVenta = document.getElementById("venta-codigo");
const modDetFecha = document.getElementById("venta-fecha");
const modDetTotal = document.getElementById("venta-total");
const modDetNombreCliente = document.getElementById("cliente-nombre");
const modDetApellidoCliente = document.getElementById("cliente-apellido");
const modDetDniCliente = document.getElementById("cliente-dni");
const modDetTablaProductos = document.getElementById("tabla-productos");
const modDetBtnCerrar = document.getElementById("cerrar-detalles");

//todos los botones de detalle
export function cargarModalDetalle(ventaCompleta) {
    modalDetalleVenta.style.display = "flex";
    modDetIdVenta.innerText = ventaCompleta.codigo_venta;
    modDetFecha.innerText = ventaCompleta.fecha_venta;
    modDetTotal.innerText = ventaCompleta.total + "$";
    modDetNombreCliente.innerText = ventaCompleta.cliente.nombre;
    modDetApellidoCliente.innerText = ventaCompleta.cliente.apellido;
    modDetDniCliente.innerText = ventaCompleta.cliente.dni;
    let productosCortos = ventaCompleta.listaProductos.map((p) => {
        return transformadorProductos(p);
    })
    cargarDatos(modDetTablaProductos, productosCortos)
}

modDetBtnCerrar.addEventListener("click", () => {
    modalDetalleVenta.style.display = "none";
})

/* Nueva Venta */
const modalNuevaVenta = document.getElementById('modal-nueva-venta');
const clienteSeleccionadoCuadro = document.getElementById('cliente-seleccionado');
const listaProductos = document.getElementById('lista-productos-seleccionados');
const modalClientes = document.getElementById('modal-seleccion-cliente');
const modalProductos = document.getElementById('modal-seleccion-productos');
const totalVenta = document.getElementById('total-venta');
const modalVentaTitulo = document.getElementById('modal-venta-titulo');

const cuadroErrorVenta = document.getElementById("error-nueva-venta");

//botones internos
const btnIntcerrarModalVenta = document.getElementById("cerrar-nueva-venta");
const btnIntFinalizarVenta = document.getElementById("finalizar-venta");
const btnIntEditarVenta = document.getElementById("editar-venta");
const btnIntCancelarVenta = document.getElementById("cancelar-venta");

//clientes
const btnIntSeleccionarCliente = document.getElementById("seleccionar-cliente")
const btnIntCerrarBuscarCliente = document.getElementById("btnIntCerrarBuscarCliente");
const btnIntSeleccionarClienteInterno = document.getElementById("btnSeleccionarClienteVenta")

// tablas internas
const tablaInternaCliente = document.getElementById("tabla-seleccion-cliente");
const tablaInternaSeleccionProductos = document.getElementById("tabla-interna-seleccion-productos")
const tablaInternaProductosSeleccionados = document.getElementById("tabla-seleccion");

//productos
const btnIntAgregarProducto = document.getElementById("agregar-productos");
const btnIntCerrarBuscarProducto = document.getElementById("btnIntCerrarBuscarProducto");
const btnIntEliminarProductoSeleccionado = document.getElementById("eliminar-producto")
const btnIntSeleccionarProductoInterno = document.getElementById("btnSeleccionarProductoVenta");

/*----*/
//controles modal principal
btnNuevaVenta.addEventListener("click", () => {
    modalNuevaVenta.style.display = "flex"
    modalVentaTitulo.innerText = "Nueva Venta";
    btnIntFinalizarVenta.style.display="block";
})

btnIntcerrarModalVenta.addEventListener("click", () => {
    limpiarCamposVenta();

})

//controles modal seleccion cliente
let clienteSeleccionado = null;

btnIntSeleccionarCliente.addEventListener("click", () => {
    modalClientes.style.display = "flex"
    seleccionado.valor = null;
    cargarTablaSeleccionClienteVentas()
})

btnIntCerrarBuscarCliente.addEventListener("click", () => {
    modalClientes.style.display = "none"
    seleccionado.valor = null;
})

btnIntSeleccionarClienteInterno.addEventListener("click", () => {

    if (seleccionado.valor == null) {
        return
    }

    clienteSeleccionado = aObjetoCliente(seleccionado.valor);
    modalClientes.style.display = "none"
    cargarCuadroClienteSeleccionado(clienteSeleccionado)
})

function cargarCuadroClienteSeleccionado(cliente){
    clienteSeleccionadoCuadro.innerText = clienteSeleccionado.nombre + " " + clienteSeleccionado.apellido + "           DNI:" + clienteSeleccionado.dni
}

//controles modal seleccion productos
let productosSeleccionados = [];

btnIntAgregarProducto.addEventListener("click", () => {
    modalProductos.style.display = "flex";
    cargarTablaSeleccionProductosVentas();
})

btnIntCerrarBuscarProducto.addEventListener("click", () => {
    modalProductos.style.display = "none";
})

btnIntSeleccionarProductoInterno.addEventListener("click", () => {

    if (seleccionados.valor == null) {
        return
    }

    let prodSelect = seleccionados.valor.map((f) => {
        let p = aObjetoProducto(f);
        return {
            codigo_producto: p.codigo_producto,
            nombre: p.nombre,
            costo: p.costo,
            cantidad_comprada: p.cantidad_comprada,
            sub_total: p.costo * p.cantidad_comprada
        }
    }).filter((p) => { return p.cantidad_comprada > 0 });
       
    productosSeleccionados = productosSeleccionados.concat(prodSelect);
    combinarRepetidos();
    cargarTablaProductosSeleccionadosVenta(productosSeleccionados);
    actualizarTotal(productosSeleccionados);

    modalProductos.style.display = "none";
    seleccionados.valor = [];
})

function combinarRepetidos() {

    let combinados = productosSeleccionados.reduce((acu, p) => {

        let existente = acu.find((acuP) => {return acuP.codigo_producto == p.codigo_producto });

        if (existente) {
            existente.cantidad_comprada = parseInt(existente.cantidad_comprada) + parseInt(p.cantidad_comprada);
            existente.sub_total = existente.cantidad_comprada * p.costo;
        } else {
            acu.push(p)
        }

        return acu;
    }, [])

    productosSeleccionados = combinados;
}

function actualizarTotal(listaDeProductos) {
    totalVenta.innerHTML = listaDeProductos.reduce((count,valor)=>{
        return count + valor.sub_total
    },0)
}

btnIntCancelarVenta.addEventListener("click",()=>{
    limpiarCamposVenta();
    btnIntFinalizarVenta.style.display="none";
    btnIntEditarVenta.style.display="none";
    
    modalNuevaVenta.style.display = "none";
})

btnIntFinalizarVenta.addEventListener("click",()=>{
    btnIntFinalizarVenta.disabled = true;

    if(clienteSeleccionado==null || productosSeleccionados.length==0){
        cuadroErrorVenta.classList.add("activo");
        cuadroErrorVenta.innerText = "Los campos no pueden estar vacios";
        btnIntFinalizarVenta.disabled = false;
        return;
    }
    
    let fechaActual = new Date();
    let nuevaVenta = {
        id_venta: null,
        fecha_venta: fechaActual.toISOString().split("T")[0],
        total : totalVenta.innerHTML,
        listaProductos: productosSeleccionados,
        cliente: clienteSeleccionado
    }
    crearVenta(nuevaVenta)
    .then(()=>{
        limpiarCamposVenta();
        modalNuevaVenta.style.display = "none"
        cargarTablaVentas()
        btnIntFinalizarVenta.disabled = false;
        btnIntFinalizarVenta.style.display="none";

    })
    .catch((e)=>{
        console.log(e)
        cuadroErrorVenta.classList.add("activo");
        cuadroErrorVenta.innerText = e.message;
        btnIntFinalizarVenta.disabled = false;
    });
})

btnIntEliminarProductoSeleccionado.addEventListener("click",()=>{

    if(seleccionado.valor==null){
        return;
    }

    let productoSeleccionadoParaBorrar = seleccionado.valor.cells[0].innerHTML

    productosSeleccionados = productosSeleccionados.filter((p)=>{
        return p.codigo_producto != productoSeleccionadoParaBorrar
    })
   
    actualizarTotal(productosSeleccionados)
    seleccionado.valor = null;
    cargarTablaProductosSeleccionadosVenta(productosSeleccionados)
})

function limpiarCamposVenta(){
    clienteSeleccionado =null
    clienteSeleccionadoCuadro.innerText = "No se ha seleccionado cliente";
    productosSeleccionados = [];
    cargarTablaProductosSeleccionadosVenta(productosSeleccionados);
    totalVenta.innerHTML = 0;
    cuadroErrorVenta.classList.remove("activo");
    cuadroErrorVenta.innerText="";
}

/* Editar venta*/
//se reusa el modal de nueva venta y todas sus constantes

let ventaSeleccionada = null;

btnEditarVenta.addEventListener("click",()=>{

    if(seleccionado.valor==null){
        return;
    }
    ventaSeleccionada = seleccionado.valor;
    modalNuevaVenta.style.display="flex";
    modalVentaTitulo.innerText = "Editar venta";
    btnIntEditarVenta.style.display = "block";
    
    clienteSeleccionado = ventaSeleccionada.cliente
    cargarCuadroClienteSeleccionado(clienteSeleccionado)

    let productos = ventaSeleccionada.listaProductos.map((p)=>({...p}));

    productosSeleccionados = productos.reduce((acu,p)=>{

        let existente = acu.find((acuP) => {return acuP.codigo_producto == p.codigo_producto });

        if(existente){
            existente.cantidad_comprada++;
        }else{
            acu.push(p);
            p.cantidad_comprada++;
        }
        return acu;

    },[])
    .map((p)=>{
        return  {
            codigo_producto: p.codigo_producto,
            nombre: p.nombre,
            costo: p.costo,
            cantidad_comprada: p.cantidad_comprada,
            sub_total: p.costo * p.cantidad_comprada
        }
    })
    
    cargarTablaProductosSeleccionadosVenta(productosSeleccionados.map((p)=>{
        return  {
            codigo_producto: p.codigo_producto,
            nombre: p.nombre,
            costo: p.costo,
            cantidad_comprada: p.cantidad_comprada,
            sub_total: p.costo * p.cantidad_comprada
        }
    }));
    
    actualizarTotal(productosSeleccionados)
});

btnIntEditarVenta.addEventListener("click",()=>{
    if(clienteSeleccionado==null || productosSeleccionados.length==0){
        cuadroErrorVenta.classList.add("activo");
        cuadroErrorVenta.innerText = "Los campos no pueden estar vacios";
        btnIntFinalizarVenta.disabled = false;
        return;
    }

    let ventaEditada={
        codigo_venta: ventaSeleccionada.codigo_venta,
        fecha_venta:ventaSeleccionada.fecha_venta,
        total:totalVenta.innerText,
        listaProductos: productosSeleccionados,
        cliente: clienteSeleccionado
    }

    editarVenta(ventaEditada)
    .then(()=>{
        limpiarCamposVenta();
        modalNuevaVenta.style.display = "none"
        cargarTablaVentas()
        btnIntFinalizarVenta.disabled = false;
        btnIntFinalizarVenta.style.display="none";

    })
    .catch((e)=>{
        cuadroErrorVenta.classList.add("activo")
        cuadroErrorVenta.innerText = e.message;
    })


})

/*Eliminar ventas*/
const modalConfirmarEliminacionVenta = document.getElementById("modal-eliminar-venta");
const btnIntConfirmarEliminarVenta = document.getElementById("confirmar-eliminar-venta");
const btnIntCancelarEliminarVenta = document.getElementById("cancelar-eliminar-venta");

/*Campos del modal eliminar venta*/
const textoModalEliminarVentaId = document.getElementById("eliminar-venta-id");
const textoModalEliminarVentaFecha = document.getElementById("eliminar-venta-fecha");

btnEliminarVenta.addEventListener("click",()=>{

    if(seleccionado.valor==null){
        return
    }

    modalConfirmarEliminacionVenta.style.display="flex";
    textoModalEliminarVentaId.innerText = seleccionado.valor.codigo_venta;
    textoModalEliminarVentaFecha.innerText = seleccionado.valor.fecha_venta;

})

btnIntConfirmarEliminarVenta.addEventListener("click",()=>{

    btnIntConfirmarEliminarVenta.disabled = true;

    eliminarVenta(seleccionado.valor.codigo_venta)
    .then(()=>{
        modalConfirmarEliminacionVenta.style.display="none";
        btnIntConfirmarEliminarVenta.disabled = false;
        seleccionado.valor = null;
        cargarTablaVentas()
    })
    .catch((e)=>{
       
    })

})

btnIntCancelarEliminarVenta.addEventListener("click",()=>{
    modalConfirmarEliminacionVenta.style.display="none";
})

/* traer mayor venta*/
//panel
const modalMayorVenta = document.getElementById("modal-mayor-venta");
//campos
const textoModalMayorVentaId = document.getElementById("mayor-venta-id");
const textoNombreMayorVenta = document.getElementById("mayor-venta-cliente");
const textoCantidadProductosMayorVenta = document.getElementById("mayor-venta-cantidad");
const textoTotalMayorVenta = document.getElementById("mayor-venta-total");
//boton
const btnIntCerrarMayorVenta = document.getElementById("int-confirmar-mayor-venta");


btnTraerMayorVenta.addEventListener("click",()=>{

    mayorVenta()
    .then((mayor)=>{
        console.log(mayor)
        modalMayorVenta.style.display = "flex";
        textoModalMayorVentaId.innerText = mayor.codigo_venta;
        textoNombreMayorVenta.innerText = mayor.nombreCliente;
        textoCantidadProductosMayorVenta.innerText = mayor.cantidadProductos;
        textoTotalMayorVenta.innerText = mayor.total;
    })
    .catch((e)=>{
        console.log(e);
    })

})

btnIntCerrarMayorVenta.addEventListener("click",()=>{
    modalMayorVenta.style.display = "none";
})

/* ----------------------- carga de datos ----------------------- */

const tablaCliente = document.getElementById("cliente-contenedor_tabla-tabla");
const tablaProductos = document.getElementById("producto-contenedor_tabla-tabla")
const tablaVentas = document.getElementById("ventas-contenedor_tabla-tabla")


async function cargarTablaClientes() {
    const datos = await cargarClientes()
    cargarDatos(tablaCliente, datos);
}

async function cargarTablaProductos() {
    const datos = await cargarProductos();
    cargarDatos(tablaProductos, datos);
}

async function cargarTablaVentas() {
    const datos = await cargarVentas();
    let datosFiltrados = datos.map((d) => { return transformadorVentas(d) })
    cargarDatosConBoton(tablaVentas, datosFiltrados);
}

// carga de datos de tablas internas
async function cargarTablaSeleccionClienteVentas() {
    const datos = cargarClientes();
    cargarDatos(tablaInternaCliente, await datos);
}

async function cargarTablaSeleccionProductosVentas() {
    const datos = cargarProductos();
    cargarDatosTablaInternaProductos(tablaInternaSeleccionProductos, await datos);
}

function cargarTablaProductosSeleccionadosVenta(datos) {
    cargarDatos(tablaInternaProductosSeleccionados, datos)
}

cargarTablaClientes();
cargarTablaProductos();
cargarTablaVentas();