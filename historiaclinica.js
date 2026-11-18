document.addEventListener('DOMContentLoaded', () => {
    cargarSelectsMascotas();
    listarHistoriales('TODAS');

    document.getElementById('form-historia').addEventListener('submit', guardarHistoria);
});

function cargarSelectsMascotas() {
    const mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
    const selectForm = document.getElementById('hc-mascota');
    const selectFiltro = document.getElementById('filtro-mascota');

    const opciones = mascotas.map(m => `<option value="${m.idMascota}">${m.nombreMascota} (Dueño: ${m.nombreDuenio})</option>`).join('');

    selectForm.innerHTML = '<option value="">Seleccione Mascota...</option>' + opciones;
    selectFiltro.innerHTML = '<option value="TODAS">-- Mostrar Todas las Mascotas --</option>' + opciones;
}

function guardarHistoria(e) {
    e.preventDefault();

    const nuevaFicha = {
        idHistoria: crypto.randomUUID(),
        idMascota: document.getElementById('hc-mascota').value,
        fechaAtencion: document.getElementById('hc-fecha').value,
        peso: document.getElementById('hc-peso').value || 'N/R',
        temperatura: document.getElementById('hc-temp').value || 'N/R',
        diagnostico: document.getElementById('hc-diagnostico').value.trim(),
        tratamiento: document.getElementById('hc-tratamiento').value.trim(),
        fechaProximoControl: document.getElementById('hc-proximo').value || 'Sin programar'
    };

    const historias = JSON.parse(localStorage.getItem('historiasClinicas')) || [];
    historias.push(nuevaFicha);
    localStorage.setItem('historiasClinicas', JSON.stringify(historias));

    document.getElementById('form-historia').reset();
    filtrarHistorialPorMascota();
}

function filtrarHistorialPorMascota() {
    const idSeleccionado = document.getElementById('filtro-mascota').value;
    listarHistoriales(idSeleccionado);
}

function listarHistoriales(idMascotaFiltro) {
    let historias = JSON.parse(localStorage.getItem('historiasClinicas')) || [];
    const mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
    const tbody = document.getElementById('tabla-historias-body');

    tbody.innerHTML = '';

    if (idMascotaFiltro !== 'TODAS') {
        historias = historias.filter(h => h.idMascota === idMascotaFiltro);
    }

    if (historias.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No se encontraron registros de historia clínica.</td></tr>`;
        return;
    }

    historias.forEach(h => {
        const mascota = mascotas.find(m => m.idMascota === h.idMascota);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${h.fechaAtencion}</td>
            <td><strong>${mascota ? mascota.nombreMascota : 'Desconocida'}</strong></td>
            <td>${h.peso} kg / ${h.temperatura} °C</td>
            <td>${h.diagnostico}</td>
            <td>${h.tratamiento}</td>
            <td><span class="badge bg-info text-dark">${h.fechaProximoControl}</span></td>
        `;
        tbody.appendChild(row);
    });
}
