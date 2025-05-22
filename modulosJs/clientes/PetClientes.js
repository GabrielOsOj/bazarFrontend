import * as Diccionarios from "../DiccionarioPeticiones.js";

/* --- peticiones cliente --- */
const DicClientes = Diccionarios.diccionarioClientes;

export async function petTraerClientes() {
    const respuesta = await fetch(new Request(DicClientes.traerClientes.ruta, {
        method: DicClientes.traerClientes.metodo,
    }));
    return await respuesta.json();
}

export async function petTraerClienteIndividual(idCliente) {
    await fetch(new Request(DicClientes.traerCliente.ruta, {
        method: DicClientes.traerCliente.metodo,
    })).then(r => { return r.json() })
        .then(r => {
            cargarDatos(tablaCliente, r)
        })
}

export async function petCrearCliente(nuevoCliente) {
    const respuesta = await fetch(new Request(DicClientes.crearCliente.ruta, {
        method: DicClientes.crearCliente.metodo,
        body: JSON.stringify(nuevoCliente),
        headers: {
            "content-type": "application/json"
        }
    }))

    return respuesta;
}

export async function petEliminarCliente(idCliente) {
    const respuesta = await fetch(new Request(DicClientes.eliminarCliente.ruta+"/"+idCliente,{
        method:DicClientes.eliminarCliente.metodo
    }))

    return respuesta;
}

export async function petEditarCliente(cliente) {
    const respuesta = await fetch(new Request(DicClientes.editarClientes.ruta +"/"+ cliente.id_cliente, {
        method: DicClientes.editarClientes.metodo,
        body: JSON.stringify(cliente),
        headers: {
            "content-type": "application/json"
        }
    }))

    return respuesta;
}