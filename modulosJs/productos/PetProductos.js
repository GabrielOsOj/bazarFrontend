import * as Diccionarios from "../DiccionarioPeticiones.js";

const DicProductos = Diccionarios.diccionarioProductos;

export async function petTraerProductos() {
    const respuesta = await fetch(new Request(DicProductos.traerProductos.ruta, {
        method: DicProductos.traerProductos.metodo,
    }));
    return await respuesta.json();
}

// export async function petTraerProductoIndividual(idProducto) {
//     await fetch(new Request(DicProductos.traerProducto.ruta, {
//         method: DicProductos.traerProducto.metodo,
//     })).then(r => { return r.json() })
//         .then(r => {
//             cargarDatos(tablaCliente, r)
//         })
// }

export async function petCrearProducto(nuevoProducto) {
    const respuesta = await fetch(new Request(DicProductos.crearProducto.ruta, {
        method: DicProductos.crearProducto.metodo,
        body: JSON.stringify(nuevoProducto),
        headers: {
            "content-type": "application/json"
        }
    }))

    return respuesta;
}

export async function petEliminarProducto(idProducto) {
    const respuesta = await fetch(new Request(DicProductos.eliminarProducto.ruta+"/"+idProducto,{
        method:DicProductos.eliminarProducto.metodo
    }))

    return respuesta;
}

export async function petEditarProducto(producto) {
    const respuesta = await fetch(new Request(DicProductos.editarProducto.ruta +"/"+ producto.codigo_producto, {
        method: DicProductos.editarProducto.metodo,
        body: JSON.stringify(producto),
        headers: {
            "content-type": "application/json"
        }
    }))

    return respuesta;
}

export async function petFaltaStockProductos() {
    const respuesta = await fetch(new Request(DicProductos.faltaStock.ruta,
        { method: DicProductos.faltaStock.metodo }))

    return respuesta;
}