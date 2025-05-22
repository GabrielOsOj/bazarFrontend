import { petCrearCliente,petEditarCliente,petEliminarCliente,petTraerClienteIndividual,petTraerClientes } from "./PetClientes.js";

/*funciones crud */
export async function cargarClientes() {
    const datos = await petTraerClientes();
    return datos;
}

export async function crearCliente(cliente) {
    const resp = await petCrearCliente(cliente);
    if (!resp.ok) {
        const error = await resp.text();
        throw new Error(error);
    }
    return resp
}

export async function editarCliente(cliente) {

    const resp = await petEditarCliente(cliente);
    if (!resp.ok) {
        const error = await resp.text();
        throw new Error(error);
    }
    return await resp.text()
}
//espera un id
export async function eliminarCliente(idCliente) {

    const resp = await petEliminarCliente(idCliente);
    if (!resp.ok) {
        const error = await resp.text();
        throw new Error(error);
    }

    return await resp.text();
}