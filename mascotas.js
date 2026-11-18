// Referencias a los elementos del HTML
const formulario = document.getElementById("formMascota");
const inputNombreMascota = document.getElementById("nombreMascota");
const inputNombreDuenio = document.getElementById("nombreDuenio");
const inputColor = document.getElementById("color");
const inputEdad = document.getElementById("edad");
const inputPeso = document.getElementById("peso");
const tablaMascotas = document.getElementById("tablaMascotas");
const totalMascotas = document.getElementById("totalMascotas");
const tituloFormulario = document.getElementById("tituloFormulario");
const btnGuardar = document.getElementById("btnGuardar");
const btnCancelar = document.getElementById("btnCancelar");
const inputBuscador = document.getElementById("buscador");

// Modal de Bootstrap para confirmar la eliminación
const modalEliminar = new bootstrap.Modal(document.getElementById("modalEliminar"));
const textoModalEliminar = document.getElementById("modalEliminarTexto");
const btnConfirmarEliminar = document.getElementById("btnConfirmarEliminar");

// Clave bajo la que se guarda la entidad en LocalStorage
const CLAVE_STORAGE = "mascotas";

// Guarda el id de la mascota que se está editando (null = alta nueva)
let idEnEdicion = null;

// Guarda el id del registro que se quiere eliminar (mientras el modal está abierto)
let idPorEliminar = null;

// Formato del peso con coma decimal
const formatoPeso = new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: 2
});

// LocalStorage
function obtenerMascotas() {
    const datos = localStorage.getItem(CLAVE_STORAGE);
    return datos ? JSON.parse(datos) : [];
}

function guardarMascotas(mascotas) {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(mascotas));
}

// Evita que un texto con símbolos (por ejemplo "<") rompa la tabla
function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

// Pasa a minúsculas y saca las tildes, para que "marron" encuentre "Marrón"
function normalizar(texto) {
    return String(texto)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// Listar (aplicando el filtro del buscador) y actualizar total
function mostrarMascotas() {
    const todas = obtenerMascotas();
    const termino = normalizar(inputBuscador.value.trim());

    const mascotas = todas.filter(function (mascota) {
        const texto = mascota.nombreMascota + " " + mascota.nombreDuenio + " " + mascota.color;
        return normalizar(texto).includes(termino);
    });

    tablaMascotas.innerHTML = "";

    // El total es el de mascotas registradas, no el de las que muestra el filtro
    totalMascotas.textContent = todas.length;

    if (todas.length === 0) {
        tablaMascotas.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted">
                    No hay mascotas registradas.
                </td>
            </tr>`;
        return;
    }

    if (mascotas.length === 0) {
        tablaMascotas.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted">
                    No se encontraron mascotas para esa búsqueda.
                </td>
            </tr>`;
        return;
    }

    mascotas.forEach(function (mascota) {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${escaparHTML(mascota.nombreMascota)}</td>
            <td>${escaparHTML(mascota.nombreDuenio)}</td>
            <td>${escaparHTML(mascota.color)}</td>
            <td>${mascota.edad}</td>
            <td>${formatoPeso.format(mascota.peso)}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary"
                    data-accion="editar" data-id="${mascota.idMascota}">Editar</button>
                <button class="btn btn-sm btn-outline-danger"
                    data-accion="eliminar" data-id="${mascota.idMascota}">Eliminar</button>
            </td>`;
        tablaMascotas.appendChild(fila);
    });
}

// Volver el formulario al modo "registrar"
function salirModoEdicion() {
    idEnEdicion = null;
    formulario.reset();
    tituloFormulario.textContent = "Registrar mascota";
    btnGuardar.textContent = "Guardar";
    btnCancelar.classList.add("d-none");
}

// Editar: cargar los datos de la fila en el formulario
function cargarParaEditar(id) {
    const mascota = obtenerMascotas().find(function (m) {
        return m.idMascota === id;
    });
    if (!mascota) return;

    inputNombreMascota.value = mascota.nombreMascota;
    inputNombreDuenio.value = mascota.nombreDuenio;
    inputColor.value = mascota.color;
    inputEdad.value = mascota.edad;
    inputPeso.value = mascota.peso;

    idEnEdicion = id;
    tituloFormulario.textContent = "Editar mascota";
    btnGuardar.textContent = "Guardar cambios";
    btnCancelar.classList.remove("d-none");
    formulario.scrollIntoView({ behavior: "smooth" });
}

// Eliminar, paso 1: abrir el modal de confirmación
function pedirConfirmacionEliminar(id) {
    const mascota = obtenerMascotas().find(function (m) {
        return m.idMascota === id;
    });
    if (!mascota) return;

    idPorEliminar = id;
    textoModalEliminar.textContent = "¿Seguro que querés eliminar a " + mascota.nombreMascota + "?";
    modalEliminar.show();
}

// Eliminar, paso 2: el usuario confirmó en el modal
function eliminarMascota() {
    const restantes = obtenerMascotas().filter(function (m) {
        return m.idMascota !== idPorEliminar;
    });
    guardarMascotas(restantes);

    // Si justo se estaba editando el que se borró, se limpia el formulario
    if (idEnEdicion === idPorEliminar) {
        salirModoEdicion();
    }

    idPorEliminar = null;
    modalEliminar.hide();
    mostrarMascotas();
}

// Registrar o guardar cambios
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombreMascota = inputNombreMascota.value.trim();
    const nombreDuenio = inputNombreDuenio.value.trim();
    const color = inputColor.value.trim();
    const edad = Number(inputEdad.value);
    const peso = Number(inputPeso.value);

    // Validaciones
    if (nombreMascota === "") {
        alert("Ingresá el nombre de la mascota.");
        return;
    }
    if (nombreDuenio === "") {
        alert("Ingresá el nombre del dueño.");
        return;
    }
    if (color === "") {
        alert("Ingresá el color de la mascota.");
        return;
    }
    if (inputEdad.value === "" || !Number.isInteger(edad) || edad < 0) {
        alert("La edad debe ser un número entero, 0 o mayor.");
        return;
    }
    if (isNaN(peso) || peso <= 0) {
        alert("El peso debe ser un número mayor a 0.");
        return;
    }

    const mascotas = obtenerMascotas();

    if (idEnEdicion === null) {
        // Alta: se genera un id nuevo
        mascotas.push({
            idMascota: crypto.randomUUID(),
            nombreMascota: nombreMascota,
            nombreDuenio: nombreDuenio,
            color: color,
            edad: edad,
            peso: peso
        });
    } else {
        // Edición: se reemplaza el registro, conservando su id
        const indice = mascotas.findIndex(function (m) {
            return m.idMascota === idEnEdicion;
        });
        mascotas[indice] = {
            idMascota: idEnEdicion,
            nombreMascota: nombreMascota,
            nombreDuenio: nombreDuenio,
            color: color,
            edad: edad,
            peso: peso
        };
    }

    guardarMascotas(mascotas);

    // Se limpia el buscador para que el registro recién guardado no quede oculto
    inputBuscador.value = "";

    mostrarMascotas();
    salirModoEdicion();
});

// Un listener para los botones de todas las filas
tablaMascotas.addEventListener("click", function (evento) {
    const boton = evento.target.closest("button[data-accion]");
    if (!boton) return;

    const id = boton.dataset.id;
    if (boton.dataset.accion === "editar") {
        cargarParaEditar(id);
    } else if (boton.dataset.accion === "eliminar") {
        pedirConfirmacionEliminar(id);
    }
});

btnCancelar.addEventListener("click", salirModoEdicion);

// Botón "Eliminar" dentro del modal
btnConfirmarEliminar.addEventListener("click", eliminarMascota);

// Cada vez que se escribe en el buscador, se vuelve a dibujar la tabla filtrada
inputBuscador.addEventListener("input", mostrarMascotas);

// Al cargar la página, mostrar lo que ya está guardado
mostrarMascotas();
