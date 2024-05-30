document.addEventListener('DOMContentLoaded', function () {
    const testimonios = [
        {
            texto: "Excelente servicio. Los recomiendo totalmente.",
            autor: "Cliente Satisfecho"
        },
        // Agregar más testimonios aquí
    ];
    const estudiosCasos = [
        {
            titulo: "Caso de Éxito 1",
            descripcion: "Este es un caso de éxito donde nuestra empresa ayudó a una compañía a alcanzar sus objetivos.",
            enlace: "caso1.html"
        },
        // Agregar más estudios de casos aquí
    ];
    // Función para añadir testimonios al HTML
    function mostrarTestimonios() {
        const testimoniosContainer = document.querySelector('.testimonio-carousel');
        testimonios.forEach(testimonio => {
            const testimonioElement = document.createElement('blockquote');
            testimonioElement.textContent = `"${testimonio.texto}"`;
            const autorElement = document.createElement('cite');
            autorElement.textContent = ` - ${testimonio.autor}`;
            testimonioElement.appendChild(autorElement);
            testimoniosContainer.appendChild(testimonioElement);
        });
    }
    // Función para añadir estudios de casos al HTML
    function mostrarEstudiosCasos() {
        const estudiosContainer = document.querySelector('.estudios-casos');
        estudiosCasos.forEach(estudio => {
            const estudioElement = document.createElement('div');
            estudioElement.innerHTML = `
                    <h4>${estudio.titulo}</h4>
                    <p>${estudio.descripcion}</p>
                    <a href="${estudio.enlace}" target="_blank">Más detalles</a>
                `;
            estudiosContainer.appendChild(estudioElement);
        });
    }

    // Llamar a las funciones para mostrar los testimonios y estudios de casos
    mostrarTestimonios();
    mostrarEstudiosCasos();
});
