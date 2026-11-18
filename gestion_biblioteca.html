<!DOCTYPE html>
<html lang="es">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" href="style.css">
        <title>Música - Biblioteca "profesora Beatriz Sanchez"</title>
        <script src="js/auth.js"></script>
    </head>

    <body>

        <header>
            <nav class="navbar navbar-expand-lg w-100">
                <div class="container">

                    <div>
                        <h1>Biblioteca "profesora Beatriz Sanchez"</h1>
                        <p>Accede a nuestra colección </p>
                    </div>

                    <button class="navbar-toggler" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#menuPrincipal"
                        aria-controls="menuPrincipal"
                        aria-expanded="false"
                        aria-label="Abrir menú">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse justify-content-end" id="menuPrincipal">

                        <ul class="navbar-nav ms-auto align-items-lg-center">
                            <li class="nav-item">
                                <a class="nav-link text-white fw-bold" href="index.html">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white fw-bold" href="institucional.html">Institucional</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white fw-bold" href="contacto.html">Contacto</a>
                            </li>
                            <li class="nav-item nav-admin-only d-none">
                                <a class="nav-link text-white fw-bold active" href="música.html">Música</a>
                            </li>
                            <li class="nav-item nav-admin-only d-none">
                                <a class="nav-link text-white fw-bold" href="danza.html">Danza</a>
                            </li>
                            <li class="nav-item nav-admin-only d-none">
                                <a class="nav-link text-white fw-bold" href="teatro.html">Teatro</a>
                            </li>
                            <li class="nav-item nav-admin-only d-none">
                                <a class="nav-link text-white fw-bold" href="historiaclinica.html">Historia Clínica</a>
                            </li>
                        </ul>

                        <button id="modoOscuro" class="btn btn-outline-light ms-lg-3 mt-2 mt-lg-0">
                            🌙
                        </button>

                        <div id="user-session-info" class="ms-lg-3 mt-2 mt-lg-0"></div>

                    </div>

                </div>
            </nav>
        </header>

        <main class="container py-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión bibliotecaria</h2>
                <span class="fs-5">Total registradas: <span id="totalMascotas" class="badge bg-primary">0</span></span>
            </div>

            <!-- Formulario de Alta y Modificación de la colección -->
            <div class="card mb-4 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title" id="tituloFormulario">Registrar libro</h5>
                    <form id="formMascota" class="row g-3">
                        <div class="col-md-4">
                            <label for="autor" class="form-label">Autor</label>
                            <input type="text" class="form-control" id="autor" required>
                        </div>
                        <div class="col-md-4">
                            <label for="título" class="form-label">Título</label>
                            <input type="text" class="form-control" id="título" required>
                        </div>
                        <div class="col-md-4">
                            <label for="editorial" class="form-label">Editorial</label>
                            <input type="text" class="form-control" id="editorial" required>
                        </div>
                        <div class="col-md-6">
                            <label for="tipo" class="form-label">Tipo (Método, Libro, Partitura)</label>
                            <input type="text" class="form-control" id="tipo" required>
                        </div>
                        <div class="col-md-6">
                            <label for="inventario" class="form-label">Inventario</label>
                            <input type="number" class="form-control" id="inventario" min="1" required>
                        </div>
                        <div class="col-12 text-end">
                            <button type="button" class="btn btn-secondary me-2 d-none" id="btnCancelar">Cancelar</button>
                            <button type="submit" class="btn btn-primary" id="btnGuardar">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Buscador y Tabla -->
            <div class="card shadow-sm">
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-6 ms-auto">
                            <input type="text" id="buscador" class="form-control" placeholder="Buscar por autor, título o editorial...">
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-striped table-hover align-middle">
                            <thead class="table-dark">
                                <tr>
                                    <th>Autor</th>
                                    <th>Título</th>
                                    <th>Editorial</th>
                                    <th>Tipo</th>
                                    <th>Inventario</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="tablaLibros"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>

        <!-- Modal de Confirmación de Eliminación -->
        <div class="modal fade" id="modalEliminar" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirmar Eliminación</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <p id="modalEliminarTexto">¿Seguro que querés eliminar este libro?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" id="btnConfirmarEliminar">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>

        <footer>
            <p>Biblioteca "profesora Beatriz Sanchez" - Italia 61, P.B.</p>
        </footer>

        <script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
        <script src="js/mascotas.js"></script>
        <script src="js/modo-oscuro.js"></script>

    </body>

</html>
