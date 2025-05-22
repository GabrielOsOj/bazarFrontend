import { petCrearVenta, petEditarVenta, petEliminarVenta, petTraerVentas, petMayorVenta } from "./PetVentas.js";

/*funciones crud */
export async function cargarVentas() {
    const datos = await petTraerVentas();
    let datosFiltrados = datos.map(v => {
        return {
            "codigo_venta": v.codigo_venta,
            "fecha_venta": v.fecha_venta,
            "total": v.total,
            "listaProductos": v.listaProductos,
            "cliente": v.cliente
        }
    })
    return datosFiltrados;
}

/*
    {
        "codigo_venta": 1,
        "fecha_venta": "2025-01-01",
        "total": 2000.0,
        "listaProductos":[],
        "cliente":{}
    }
*/

export async function crearVenta(venta) {

    const resp = await petCrearVenta(venta);
    if (!resp.ok) {
        const error = await resp.text();
        throw new Error(error);
    }
    return resp
}

export async function editarVenta(venta) {

    const resp = await petEditarVenta(venta);
    if (!resp.ok) {
        const error = await resp.text();
        throw new Error(error);
    }
    return await resp.text()
}

//espera un id
export async function eliminarVenta(idVenta) {

    const resp = await petEliminarVenta(idVenta);
    if (!resp.ok) {
        const error = await resp.text();
        throw new Error(error);
    }

    return await resp.text();
}


export async function mayorVenta(){
    const resp = await petMayorVenta();
    if (!resp.ok) {
        const error = await resp.text();
        throw new Error(error);
        }
    return resp.json()
}