const RUTA_BASE = "http://localhost:8080/"
const RUTA_BASE_CLIENTES = RUTA_BASE + "clientes"
const RUTA_BASE_PRODUCTOS = RUTA_BASE + "productos"
const RUTA_BASE_VENTAS = RUTA_BASE + "ventas"

export const diccionarioClientes = {
    "traerClientes": {
        "ruta": RUTA_BASE_CLIENTES,
        "metodo": "get"
    },
    "traerCliente": {
        "ruta": RUTA_BASE_CLIENTES + "/",
        "metodo": "get"
    },
    "crearCliente": {
        "ruta": RUTA_BASE_CLIENTES + "/crear",
        "metodo": "post"
    },
    "editarClientes": {
        "ruta": RUTA_BASE_CLIENTES + "/editar",
        "metodo": "put"
    },
    "eliminarCliente": {
        "ruta": RUTA_BASE_CLIENTES + "/eliminar",
        "metodo": "delete"
    }
};

export const diccionarioProductos = {
    "traerProductos": {
        "ruta": RUTA_BASE_PRODUCTOS,
        "metodo": "get"
    },
    "traerProducto": {
        "ruta": RUTA_BASE_PRODUCTOS + "/",
        "metodo": "get"
    },
    "crearProducto": {
        "ruta": RUTA_BASE_PRODUCTOS + "/crear",
        "metodo": "post"
    },
    "editarProducto": {
        "ruta": RUTA_BASE_PRODUCTOS + "/editar",
        "metodo": "put"
    },
    "eliminarProducto": {
        "ruta": RUTA_BASE_PRODUCTOS + "/eliminar",
        "metodo": "delete"
    },
    "faltaStock":{
        "ruta": RUTA_BASE_PRODUCTOS + "/falta_stock",
        "metodo": "get"
    }
}

export const diccionarioVentas ={
    "traerVentas": {"ruta":RUTA_BASE_VENTAS,
        "metodo": "get"},
    "traerVenta": {"ruta":RUTA_BASE_VENTAS+"/",
        "metodo": "get"},
    "crearVenta": {"ruta":RUTA_BASE_VENTAS+"/crear"
        ,"metodo": "post"
    },
    "editarVenta": {"ruta":RUTA_BASE_VENTAS+"/editar",
        "metodo": "put"
    },
    "eliminarVenta": {"ruta":RUTA_BASE_VENTAS+"/eliminar",
        "metodo": "delete"
    },
    "mayorVenta":{"ruta":RUTA_BASE_VENTAS+"/mayor_venta",
        "metodo": "get"
    }
} 

