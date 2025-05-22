import * as Diccionarios from '../DiccionarioPeticiones.js';
const DicVentas = Diccionarios.diccionarioVentas;


export async function petTraerVentas() {
    const respuesta = await fetch(new Request(DicVentas.traerVentas.ruta, {
        method: DicVentas.traerVentas.metodo,
    }));
    return await respuesta.json();
}

// export async function petTraerProductoIndividual(idProducto) {
//     await fetch(new Request(DicVentas.traerProducto.ruta, {
//         method: DicVentas.traerProducto.metodo,
//     })).then(r => { return r.json() })
//         .then(r => {
//             cargarDatos(tablaCliente, r)
//         })
// }

export async function petCrearVenta(nuevaVenta) {
    const respuesta = await fetch(new Request(DicVentas.crearVenta.ruta, {
        method: DicVentas.crearVenta.metodo,
        body: JSON.stringify(nuevaVenta),
        headers: {
            "content-type": "application/json"
        }
    }))

    return respuesta;
}

export async function petEliminarVenta(idVenta) {
    const respuesta = await fetch(new Request(DicVentas.eliminarVenta.ruta+"/"+idVenta,{
        method:DicVentas.eliminarVenta.metodo
    }))

    return respuesta;
}

export async function petEditarVenta(venta) {
    const respuesta = await fetch(new Request(DicVentas.editarVenta.ruta +"/"+ venta.codigo_venta, {
        method: DicVentas.editarVenta.metodo,
        body: JSON.stringify(venta),
        headers: {
            "content-type": "application/json"
        }
    }))

    return respuesta;
}

export async function petMayorVenta() {
    const respuesta = await fetch(new Request(DicVentas.mayorVenta.ruta, { method: DicVentas.mayorVenta.metodo }))
    return respuesta;
}