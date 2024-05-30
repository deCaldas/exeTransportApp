// Función principal para gestionar la solicitud de transporte
export default async function solicitudTransporte() {
    try {
        const elementos = obtenerElementosDOM();
        validarDatos(elementos);
        const preferencias = obtenerPreferencias();

        const distancia = await obtenerDistancia(elementos.origen, elementos.destino);
        const precioEstimado = calcularPrecioEstimado(distancia, elementos.tipoVehiculo, elementos.tipoServicio);

        actualizarPrecioEstimado(precioEstimado);

        await enviarSolicitudViaje({
            ...elementos,
            precio: precioEstimado,
            preferencias
        });

        mostrarConfirmacion();
    } catch (error) {
        mostrarError(error.message);
        console.error(error);
    }
}

// Obtener elementos del DOM
function obtenerElementosDOM() {
    return {
        origen: document.getElementById("origen").value,
        destino: document.getElementById("destino").value,
        fechaViaje: document.getElementById("fechaViaje").value,
        horaViaje: document.getElementById("horaViaje").value,
        pasajeros: parseInt(document.getElementById("pasajeros").value),
        tipoServicio: document.getElementById("tipoServicio").value,
        tipoVehiculo: document.getElementById("tipoVehiculo").value,
        precioEstimado: document.getElementById("precioEstimado")
    };
}

// Validar datos del formulario
function validarDatos({ origen, destino, fechaViaje, horaViaje, pasajeros, tipoServicio, tipoVehiculo }) {
    if (!origen || !destino) {
        throw new Error("Debe ingresar un origen y destino válidos.");
    }
    if (!fechaViaje) {
        throw new Error("Debe ingresar una fecha de viaje válida.");
    }
    if (!horaViaje) {
        throw new Error("Debe ingresar una hora de viaje válida.");
    }
    if (isNaN(pasajeros) || pasajeros <= 0) {
        throw new Error("Debe ingresar el número de pasajeros válido.");
    }
    if (tipoServicio === "Seleccione un servicio") {
        throw new Error("Debe elegir un servicio válido.");
    }
    if (tipoVehiculo === "Seleccione un vehículo") {
        throw new Error("Debe seleccionar un tipo de vehículo válido.");
    }
}

// Obtener preferencias adicionales
function obtenerPreferencias() {
    return {
        asientosBebes: document.getElementById("asientosBebes")?.checked || false,
        asistenciaEquipaje: document.getElementById("asistenciaEquipaje")?.checked || false,
        informacionAdicional: document.getElementById("informacionAdicional")?.value || ""
    };
}

// Actualizar el precio estimado en la UI
function actualizarPrecioEstimado(precio) {
    const precioEstimado = document.getElementById("precioEstimado");
    precioEstimado.textContent = `Precio estimado: $${precio}`;
}

// Mostrar mensaje de confirmación
function mostrarConfirmacion() {
    alert("Su solicitud de viaje ha sido enviada. Un representante se pondrá en contacto con usted en breve.");
}

// Mostrar errores en la UI
function mostrarError(mensaje) {
    alert(mensaje);
}

async function obtenerDistancia(origen, destino) {
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Reemplaza con tu clave API de Google Maps

    // Función para obtener las coordenadas (latitud y longitud) de una ubicación
    async function obtenerCoordenadas(ubicacion) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(ubicacion)}&key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK') {
            const { lat, lng } = data.results[0].geometry.location;
            return { lat, lng };
        } else {
            throw new Error(`Error al obtener coordenadas para ${ubicacion}: ${data.status}`);
        }
    }

    // Función para calcular la distancia entre dos puntos en la Tierra
    function calcularDistancia(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radio de la Tierra en kilómetros
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            0.5 - Math.cos(dLat) / 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            (1 - Math.cos(dLon)) / 2;
        return R * 2 * Math.asin(Math.sqrt(a));
    }

    try {
        const [coordenadasOrigen, coordenadasDestino] = await Promise.all([
            obtenerCoordenadas(origen),
            obtenerCoordenadas(destino)
        ]);

        const distancia = calcularDistancia(
            coordenadasOrigen.lat, coordenadasOrigen.lng,
            coordenadasDestino.lat, coordenadasDestino.lng
        );

        return distancia;
    } catch (error) {
        console.error(error);
        throw new Error('No se pudo calcular la distancia');
    }
}

// Ejemplo de uso la función `obtenerDistancia`
/** 
    obtenerDistancia('Nueva York, NY', 'Los Ángeles, CA')
        .then(distancia => {
            console.log(`La distancia es de ${distancia.toFixed(2)} km`);
        })
        .catch(error => {
            console.error('Error:', error);
        }); 
*/

// Calcular el precio estimado
function calcularPrecioEstimado(distancia, tipoVehiculo, tipoServicio) {
    const tarifaBase = 10;
    let tarifaPorKm;

    switch (tipoVehiculo) {
        case "Mototaxi":
            tarifaPorKm = 1.5;
            break;
        case "Sedan":
            tarifaPorKm = 2.5;
            break;
        case "SUV":
            tarifaPorKm = 2;
            break;
        case "Minivan":
            tarifaPorKm = 2.5;
            break;
        case "Autobús":
            tarifaPorKm = 3.5;
            break;
        case "Chivero":
            tarifaPorKm = 3.5;
            break;
        default:
            tarifaPorKm = 1.5;
            break;
    }

    let costoTipoServicio = 0;
    if (tipoServicio === "Premium") {
        costoTipoServicio = 5;
    }

    return tarifaBase + (tarifaPorKm * distancia) + costoTipoServicio;
}

// Enviar solicitud de viaje al servidor (simulado)
async function enviarSolicitudViaje({ origen, destino, fechaViaje, horaViaje, pasajeros, tipoServicio, tipoVehiculo, precio, preferencias }) {
    console.log("Solicitud de viaje enviada:", {
        origen,
        destino,
        fechaViaje,
        horaViaje,
        pasajeros,
        tipoServicio,
        tipoVehiculo,
        precio,
        preferencias
    });

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}
