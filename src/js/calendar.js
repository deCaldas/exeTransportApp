document.addEventListener("DOMContentLoaded", function () {
    const daysContainer = document.querySelector(".days");

    // Generate calendar days
    for (let i = 1; i <= 31; i++) {
        const dayElement = document.createElement("div");
        dayElement.textContent = i;
        daysContainer.appendChild(dayElement);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Obtener referencias a los campos de fecha y hora
    const fechaInput = document.getElementById("fecha");
    const horaInput = document.getElementById("hora");

    // Función para actualizar el campo de fecha seleccionada
    function actualizarFecha(event) {
        const fechaSeleccionada = event.target.value;
        fechaInput.value = fechaSeleccionada;
    }

    // Función para actualizar el campo de hora seleccionada
    function actualizarHora(event) {
        const horaSeleccionada = event.target.value;
        horaInput.value = horaSeleccionada;
    }

    // Agregar listeners de eventos a los campos de fecha y hora
    fechaInput.addEventListener("change", actualizarFecha);
    horaInput.addEventListener("change", actualizarHora);
});
