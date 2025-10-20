// Verificar autenticación al cargar el panel de administración
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, verificando autenticación...');
    
    // Verificar si el usuario está autenticado
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
    
    if (!isAuthenticated) {
        console.log('Usuario no autenticado, redirigiendo a inicio de sesión...');
        window.location.href = 'inicio-sesion.html';
        return;
    }
    
    console.log('Usuario autenticado, configurando panel...');
    
    // Esperar un momento para asegurar que los scripts se hayan cargado
    setTimeout(() => {
        // Configurar eventos
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', cerrarSesion);
        }
        
        const formProducto = document.getElementById('formProducto');
        if (formProducto) {
            formProducto.addEventListener('submit', guardarProducto);
        }
        
        const inputImagen = document.getElementById('imagen');
        if (inputImagen) {
            inputImagen.addEventListener('change', mostrarVistaPrevia);
        }
        
        // Cargar productos después de un breve retraso para asegurar que el DOM esté listo
        setTimeout(cargarProductos, 100);
    }, 100);
});

// Cargar productos en la tabla
function cargarProductos() {
    console.log('Cargando productos...');
    const tbody = document.getElementById('productosTableBody');
    if (!tbody) {
        console.error('No se encontró el elemento tbody');
        return;
    }
    
    tbody.innerHTML = '';
    
    // Verificar si los productos están disponibles
    if (!window.productos || typeof window.productos !== 'object') {
        console.error('No se encontró el objeto de productos en el ámbito global');
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4 text-danger">
                    No se pudieron cargar los productos. Por favor, recarga la página.
                </td>
            </tr>`;
        return;
    }
    
    // Convertir el objeto de productos a un array
    const productos = Object.values(window.productos);
    console.log('Productos encontrados:', productos);
    
    if (productos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4">
                    No hay productos registrados
                </td>
            </tr>`;
        return;
    }
    
    if (productos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4">No hay productos registrados</td></tr>';
        return;
    }
    
    productos.forEach(producto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${producto.imagen || 'images/placeholder.jpg'}" alt="${producto.nombre}" class="product-img"></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toLocaleString()}</td>
            <td>${producto.categoria.charAt(0).toUpperCase() + producto.categoria.slice(1)}</td>
            <td>
                ${producto.enOferta ? '<span class="badge bg-warning text-dark">En Oferta</span> ' : ''}
                ${producto.esNuevo ? '<span class="badge bg-success">Nuevo</span>' : ''}
            </td>
            <td>
                <button class="btn btn-sm btn-primary me-1 editar-producto" data-id="${producto.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger eliminar-producto" data-id="${producto.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    
    // Agregar eventos a los botones de editar y eliminar
    document.querySelectorAll('.editar-producto').forEach(btn => {
        btn.addEventListener('click', cargarProductoParaEditar);
    });
    
    document.querySelectorAll('.eliminar-producto').forEach(btn => {
        btn.addEventListener('click', confirmarEliminarProducto);
    });
}

// Cargar datos del producto para editar
function cargarProductoParaEditar(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    const producto = Object.values(window.productos).find(p => p.id === id);
    
    if (!producto) return;
    
    // Llenar el formulario con los datos del producto
    document.getElementById('productoId').value = producto.id;
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('descripcion').value = producto.descripcion;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('precioOriginal').value = producto.precioOriginal || '';
    document.getElementById('categoria').value = producto.categoria;
    document.getElementById('enOferta').checked = producto.enOferta || false;
    document.getElementById('esNuevo').checked = producto.esNuevo || false;
    
    // Mostrar vista previa de la imagen actual
    const imagenPreview = document.getElementById('imagenPreview');
    if (producto.imagen) {
        imagenPreview.innerHTML = `
            <p>Imagen actual:</p>
            <img src="${producto.imagen}" alt="Vista previa" class="img-thumbnail" style="max-height: 150px;">
        `;
    } else {
        imagenPreview.innerHTML = '';
    }
    
    // Cambiar el título del modal
    document.getElementById('modalProductoTitulo').textContent = 'Editar Producto';
    
    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('agregarProductoModal'));
    modal.show();
}

// Guardar producto (crear o actualizar)
function guardarProducto(e) {
    e.preventDefault();
    
    const id = document.getElementById('productoId').value;
    const esNuevo = !id;
    
    // Validar formulario
    if (!validarFormularioProducto()) {
        return;
    }
    
    // Obtener datos del formulario
    const producto = {
        id: esNuevo ? Date.now() : parseInt(id),
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        precio: parseFloat(document.getElementById('precio').value),
        precioOriginal: document.getElementById('precioOriginal').value ? 
            parseFloat(document.getElementById('precioOriginal').value) : null,
        categoria: document.getElementById('categoria').value,
        enOferta: document.getElementById('enOferta').checked,
        esNuevo: document.getElementById('esNuevo').checked,
        calificacion: 0,
        reseñas: 0
    };
    
    // Manejar la imagen (si se cargó una nueva)
    const inputImagen = document.getElementById('imagen');
    if (inputImagen.files && inputImagen.files[0]) {
        // En un entorno real, aquí subirías la imagen a un servidor
        // Por ahora, usamos una URL local
        producto.imagen = URL.createObjectURL(inputImagen.files[0]);
    } else if (!esNuevo) {
        // Mantener la imagen existente si no se carga una nueva
        const productoExistente = window.productos[`producto${id}`];
        if (productoExistente) {
            producto.imagen = productoExistente.imagen;
        }
    }
    
    // Actualizar o agregar el producto
    if (esNuevo) {
        // Generar una nueva clave para el producto
        const nuevoId = 'producto' + (Object.keys(window.productos).length + 1);
        window.productos[nuevoId] = producto;
    } else {
        // Actualizar producto existente
        const productoKey = Object.keys(window.productos).find(key => 
            window.productos[key].id === producto.id
        );
        if (productoKey) {
            window.productos[productoKey] = { ...window.productos[productoKey], ...producto };
        }
    }
    
    // Guardar los productos actualizados en localStorage
    guardarProductosEnStorage();
    
    // Disparar un evento personalizado para notificar a otras pestañas
    const event = new CustomEvent('productosActualizados', { detail: window.productos });
    window.dispatchEvent(event);
    
    // Mostrar mensaje de éxito
    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: `Producto ${esNuevo ? 'agregado' : 'actualizado'} correctamente.`,
        timer: 2000,
        showConfirmButton: false
    });
    
    // Cerrar el modal y actualizar la tabla
    const modal = bootstrap.Modal.getInstance(document.getElementById('agregarProductoModal'));
    modal.hide();
    
    // Recargar la tabla de productos
    cargarProductos();
    
    // Limpiar el formulario
    limpiarFormularioProducto();
}

// Validar formulario de producto
function validarFormularioProducto() {
    const nombre = document.getElementById('nombre').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const precio = document.getElementById('precio').value;
    
    if (!nombre) {
        mostrarError('El nombre del producto es obligatorio');
        return false;
    }
    
    if (!descripcion) {
        mostrarError('La descripción del producto es obligatoria');
        return false;
    }
    
    if (!precio || isNaN(precio) || parseFloat(precio) <= 0) {
        mostrarError('El precio debe ser un número mayor a cero');
        return false;
    }
    
    return true;
}

// Mostrar mensaje de error
function mostrarError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
        timer: 3000
    });
}

// Limpiar formulario de producto
function limpiarFormularioProducto() {
    document.getElementById('formProducto').reset();
    document.getElementById('productoId').value = '';
    document.getElementById('imagenPreview').innerHTML = '';
    document.getElementById('modalProductoTitulo').textContent = 'Agregar Nuevo Producto';
}

// Mostrar vista previa de la imagen
function mostrarVistaPrevia(e) {
    const input = e.target;
    const preview = document.getElementById('imagenPreview');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            preview.innerHTML = `
                <p>Vista previa:</p>
                <img src="${e.target.result}" alt="Vista previa" class="img-thumbnail" style="max-height: 150px;">
            `;
        }
        
        reader.readAsDataURL(input.files[0]);
    } else {
        preview.innerHTML = '';
    }
}

// Confirmar eliminación de producto
function confirmarEliminarProducto(e) {
    const id = parseInt(e.currentTarget.dataset.id);
    const producto = Object.values(window.productos).find(p => p.id === id);
    
    if (!producto) return;
    
    Swal.fire({
        title: '¿Estás seguro?',
        text: `¿Deseas eliminar el producto "${producto.nombre}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarProducto(id);
        }
    });
}

// Eliminar producto
function eliminarProducto(id) {
    const productoKey = Object.keys(window.productos).find(key => 
        window.productos[key].id === id
    );
    
    if (productoKey) {
        delete window.productos[productoKey];
        
        // Mostrar mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'El producto ha sido eliminado correctamente.',
            timer: 2000,
            showConfirmButton: false
        });
        
        // Recargar la tabla de productos
        cargarProductos();
    }
}

// Guardar productos en localStorage
function guardarProductosEnStorage() {
    try {
        // Guardar en localStorage
        localStorage.setItem('productos', JSON.stringify(window.productos));
        console.log('Productos guardados en localStorage');
        
        // Disparar evento personalizado para notificar a otras pestañas
        const event = new Event('storage');
        window.dispatchEvent(event);
        
        // Disparar evento personalizado para la misma pestaña
        const customEvent = new CustomEvent('productosActualizados');
        window.dispatchEvent(customEvent);
        
        console.log('Eventos de actualización de productos disparados');
    } catch (error) {
        console.error('Error al guardar productos en localStorage:', error);
    }
}

// Cerrar sesión
function cerrarSesion() {
    sessionStorage.removeItem('adminAuthenticated');
    window.location.href = 'inicio-sesion.html';
}

// Función para inicializar el modal de producto
function inicializarModalProducto() {
    const modal = document.getElementById('agregarProductoModal');
    if (modal) {
        modal.addEventListener('hidden.bs.modal', function () {
            limpiarFormularioProducto();
        });
    }
}

// Inicializar el modal cuando se cargue el DOM
document.addEventListener('DOMContentLoaded', inicializarModalProducto);
