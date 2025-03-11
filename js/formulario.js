
document.querySelectorAll('.plato').forEach(plato => {
    plato.addEventListener('change', function() {
        let platoSeleccionado = this.dataset.tamano;
        let botonesTamano = document.querySelectorAll(`.tamano[data-plato="${platoSeleccionado}"]`);
        
        if (this.checked) {
            botonesTamano.forEach(btn => btn.disabled = false);
        } else {
            botonesTamano.forEach(btn => {
                btn.disabled = true;
                btn.classList.remove('activo');
            });
            calcularTotal();
        }
    });
});

document.querySelectorAll('.tamano').forEach(boton => {
    boton.addEventListener('click', function() {
        let plato = this.dataset.plato;
        document.querySelectorAll(`.tamano[data-plato="${plato}"]`).forEach(btn => btn.classList.remove('activo'));
        this.classList.add('activo');
        calcularTotal();
    });
});

function calcularTotal() {
    let seleccionados = [];
    document.querySelectorAll('.tamano.activo').forEach(boton => {
        seleccionados.push({ plato: boton.dataset.plato, size: boton.dataset.size });
    });

    let total = 0;
    if (seleccionados.length === 1) {
        let item = seleccionados[0];
        if (item.plato === "plato") {
            total = 10.20;
        } else {
            total = item.size === "grande" ? 9.50 : 6;
        }
    } else if (seleccionados.length === 2) {
        let sizes = seleccionados.map(item => item.size);
        if (sizes.includes("grande") && sizes.includes("pequeno")) {
            total = 13;
        } else {
            total = 10.20;
        }
    }

    document.getElementById("total-precio").textContent = total.toFixed(2);
}