function abrirModal(id) {
    document.getElementById(id).style.display = "block";
}

function cerrarModal(id) {
    document.getElementById(id).style.display = "none";
}

window.onclick = function (event) {
    var modales = document.getElementsByClassName("modal");
    for (var i = 0; i < modales.length; i++) {
        if (event.target == modales[i]) {
            modales[i].style.display = "none";
        }
    }
}
