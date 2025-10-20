<div>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="shortcut icon" href="images/LogoTienda-SinFondo.png" type="image/x-icon" />
  <title>Panel de Administración - Level-Up Gamer</title>
  {/* Bootstrap CSS */}
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  {/* Font Awesome */}
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  {/* SweetAlert2 */}
  <style dangerouslySetInnerHTML={{__html: "\n        :root {\n            --primary-color: #6c5ce7;\n            --secondary-color: #5649c0;\n            --light-gray: #f8f9fa;\n            --dark-gray: #343a40;\n        }\n        body {\n            background-color: #f5f6fa;\n        }\n        .sidebar {\n            min-height: 100vh;\n            background: var(--dark-gray);\n            color: white;\n            padding: 20px 0;\n        }\n        .sidebar-header {\n            padding: 0 20px 20px;\n            border-bottom: 1px solid rgba(255,255,255,0.1);\n            text-align: center;\n        }\n        .sidebar-menu {\n            padding: 20px 0;\n        }\n        .sidebar-menu .nav-link {\n            color: rgba(255,255,255,0.7);\n            padding: 10px 20px;\n            margin: 5px 0;\n            border-radius: 0;\n            transition: all 0.3s;\n        }\n        .sidebar-menu .nav-link:hover,\n        .sidebar-menu .nav-link.active {\n            background: rgba(255,255,255,0.1);\n            color: white;\n        }\n        .sidebar-menu .nav-link i {\n            margin-right: 10px;\n            width: 20px;\n            text-align: center;\n        }\n        .main-content {\n            padding: 30px;\n        }\n        .card {\n            border: none;\n            border-radius: 10px;\n            box-shadow: 0 0 15px rgba(0,0,0,0.05);\n            margin-bottom: 30px;\n        }\n        .card-header {\n            background: white;\n            border-bottom: 1px solid rgba(0,0,0,0.05);\n            padding: 20px 25px;\n            font-weight: 600;\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n        }\n        .btn-primary {\n            background-color: var(--primary-color);\n            border: none;\n            padding: 8px 20px;\n        }\n        .btn-primary:hover {\n            background-color: var(--secondary-color);\n        }\n        .table th {\n            border-top: none;\n            font-weight: 600;\n            color: var(--dark-gray);\n            text-transform: uppercase;\n            font-size: 0.8rem;\n            letter-spacing: 0.5px;\n        }\n        .table td {\n            vertical-align: middle;\n        }\n        .product-img {\n            width: 50px;\n            height: 50px;\n            object-fit: cover;\n            border-radius: 5px;\n        }\n        .badge {\n            padding: 6px 10px;\n            font-weight: 500;\n        }\n    " }} />
  <div className="container-fluid">
    <div className="row">
      {/* Sidebar */}
      <div className="col-md-2 px-0 sidebar">
        <div className="sidebar-header">
          <h4>Panel de Administración</h4>
        </div>
        <div className="sidebar-menu">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#productos" data-bs-toggle="tab">
                <i className="fas fa-box" /> Productos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" id="logoutBtn">
                <i className="fas fa-sign-out-alt" /> Cerrar Sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Main Content */}
      <div className="col-md-10 ms-auto main-content">
        <div className="tab-content">
          {/* Productos Tab */}
          <div className="tab-pane fade show active" id="productos">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="mb-0">Gestión de Productos</h2>
              <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#agregarProductoModal">
                <i className="fas fa-plus me-2" />Agregar Producto
              </button>
            </div>
            <div className="card">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody id="productosTableBody">
                      {/* Los productos se cargarán aquí dinámicamente */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Modal Agregar/Editar Producto */}
  <div className="modal fade" id="agregarProductoModal" tabIndex={-1} aria-hidden="true">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="modalProductoTitulo">Agregar Nuevo Producto</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" />
        </div>
        <form id="formProducto" encType="multipart/form-data">
          <div className="modal-body">
            <input type="hidden" id="productoId" defaultValue />
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre del Producto</label>
                  <input type="text" className="form-control" id="nombre" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">Descripción</label>
                  <textarea className="form-control" id="descripcion" rows={3} required defaultValue={""} />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="precio" className="form-label">Precio ($)</label>
                      <input type="number" className="form-control" id="precio" min={0} step="0.01" required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="precioOriginal" className="form-label">Precio Original ($)</label>
                      <input type="number" className="form-control" id="precioOriginal" min={0} step="0.01" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="categoria" className="form-label">Categoría</label>
                  <select className="form-select" id="categoria" required>
                    <option value="juegos">Juegos</option>
                    <option value="consolas">Consolas</option>
                    <option value="accesorios">Accesorios</option>
                    <option value="perifericos">Periféricos</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="imagen" className="form-label">Imagen del Producto</label>
                  <input className="form-control" type="file" id="imagen" accept="image/*" />
                  <small className="text-muted">Dejar en blanco para mantener la imagen actual</small>
                  <div id="imagenPreview" className="mt-2" />
                </div>
                <div className="form-check form-switch mb-3">
                  <input className="form-check-input" type="checkbox" id="enOferta" />
                  <label className="form-check-label" htmlFor="enOferta">En Oferta</label>
                </div>
                <div className="form-check form-switch mb-3">
                  <input className="form-check-input" type="checkbox" id="esNuevo" />
                  <label className="form-check-label" htmlFor="esNuevo">Producto Nuevo</label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" className="btn btn-primary">Guardar Producto</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* Scripts */}
</div>
