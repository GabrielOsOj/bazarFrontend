import { petTraerProductos,petCrearProducto,petEditarProducto,petEliminarProducto, petFaltaStockProductos } from "./PetProductos.js";

/*funciones crud */
export async function cargarProductos() {
    const datos = await petTraerProductos();
    let datosFiltrados = datos.map(p => {
        return {
            "id":p.codigo_producto,
            "nombre":p.nombre,
            "marca": p.marca,
            "precio":p.costo,
            "stock":p.cantidad_disponible
        }
    })
    return datosFiltrados;
}

/*
    private Long codigo_producto;
    private String nombre;
    private String marca;
    private Double costo;
    private Double cantidad_disponible;
    private Double cantidad_comprada;
*/ 

export async function crearProducto(producto) {


    if(producto.costo==""){
        producto.costo = 0;
    }

    if(producto.cantidad_disponible==""){
        producto.cantidad_disponible = 0;
    }

    const resp = await petCrearProducto(producto);
    if (!resp.ok) {
        const error = await resp.text();
        throw new Error(error);
    }
    return resp
}

export async function editarProducto(cliente) {

    const resp = await petEditarProducto(cliente);
    if (!resp.ok) {
        const error = await resp.text();
        throw new Error(error);
    }
    return await resp.text()
}
//espera un id
export async function eliminarProducto(idCliente) {

    const resp = await petEliminarProducto(idCliente);
    if (!resp.ok) {
        const error = await resp.text();
        throw new Error(error);
    }

    return await resp.text();
}

export async function faltaStockProductos() {
    const resp = await petFaltaStockProductos();
    if(!resp.ok){
        const error = await resp.text();
        throw new Error(error);
    }
    return await resp.json();
}