// Carrito de compras
let carrito = [];

// Elementos del DOM
const carritoBtn = document.querySelector('.carrito-btn');
const carritoSidebar = document.getElementById('carrito-sidebar');
const carritoCerrar = document.querySelector('.carrito-cerrar');
const carritoContenido = document.querySelector('.carrito-contenido');
const carritoTotal = document.querySelector('.carrito-total-precio'); // Corregido para que coincida con el HTML
const carritoContador = document.querySelector('.contador-carrito');

// Cargar carrito al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarCarrito();
    actualizarCarritoUI();
    
    // Event listeners para el carrito
    document.addEventListener('click', (e) => {
        // Manejar clic en el botón del carrito
        if (e.target.closest('.carrito-btn')) {
            e.preventDefault();
            toggleCarrito();
        }
        
        // Cerrar carrito al hacer clic en el botón de cerrar
        if (e.target.closest('.carrito-cerrar')) {
            e.preventDefault();
            toggleCarrito();
        }
        
        // Cerrar carrito al hacer clic fuera de él
        if (e.target === document.querySelector('.carrito-overlay')) {
            toggleCarrito();
        }
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('carrito-abierto')) {
            toggleCarrito();
        }
    });
});

// Función para alternar la visibilidad del carrito
function toggleCarrito(e) {
    if (e) e.preventDefault();
    document.body.classList.toggle('carrito-abierto');
    const sidebar = document.querySelector('#carrito-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Agregar producto al carrito (versión global)
function agregarAlCarritoGlobal(producto) {
    console.log('Agregando producto al carrito:', producto);
    
    if (!producto) {
        console.error('Error: No se proporcionó un producto válido');
        return;
    }
    
    // Asegurarse de que el ID sea un número
    const productoId = parseInt(producto.id);
    if (isNaN(productoId)) {
        console.error('Error: ID de producto inválido', producto.id);
        return;
    }
    
    // Buscar el índice del producto en el carrito
    const itemIndex = carrito.findIndex(item => item.id === productoId);
    
    if (itemIndex !== -1) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        carrito[itemIndex].cantidad = (parseInt(carrito[itemIndex].cantidad) || 0) + 1;
        console.log('Producto existente, cantidad incrementada a:', carrito[itemIndex].cantidad);
    } else {
        // Si es un producto nuevo, agregarlo al carrito con cantidad 1
        const nuevoProducto = {
            id: productoId,
            nombre: producto.nombre,
            precio: parseFloat(producto.precio) || 0,
            imagen: producto.imagen || 'img/placeholder.jpg',
            cantidad: 1
        };
        carrito.push(nuevoProducto);
        console.log('Nuevo producto agregado al carrito:', nuevoProducto);
    }
    
    // Actualizar la interfaz y guardar
    console.log('Carrito actualizado:', carrito);
    actualizarCarritoUI();
    guardarCarrito();
    
    // Mostrar notificación
    const productoAgregado = carrito.find(item => item.id === productoId);
    if (productoAgregado) {
        mostrarNotificacion(`${productoAgregado.nombre} (${productoAgregado.cantidad}) se ha añadido al carrito`);
    }
    
    // Mostrar el carrito después de agregar un producto
    toggleCarrito();
}

// Hacer la función global
window.agregarAlCarritoGlobal = agregarAlCarritoGlobal;

// Eliminar producto del carrito
function eliminarDelCarrito(productoId) {
    const index = carrito.findIndex(item => item.id === productoId);
    if (index !== -1) {
        carrito.splice(index, 1);
        actualizarCarritoUI();
        guardarCarrito();
    }
}

// Actualizar cantidad de un producto en el carrito
function actualizarCantidad(productoId, nuevaCantidad) {
    console.log('Actualizando cantidad. Producto ID:', productoId, 'Nueva cantidad:', nuevaCantidad);
    
    // Asegurarse de que la cantidad sea un número
    nuevaCantidad = parseInt(nuevaCantidad);
    if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
        nuevaCantidad = 1;
    }
    
    const producto = carrito.find(item => item.id === productoId);
    if (producto) {
        const cantidadAnterior = producto.cantidad;
        producto.cantidad = nuevaCantidad;
        console.log(`Cantidad actualizada de ${cantidadAnterior} a ${nuevaCantidad} para el producto ${productoId}`);
        
        // Actualizar la interfaz y guardar
        actualizarCarritoUI();
        guardarCarrito();
        
        // Mostrar notificación de actualización
        mostrarNotificacion(`Cantidad actualizada: ${producto.nombre} (${nuevaCantidad})`);
    } else {
        console.error('Producto no encontrado en el carrito:', productoId);
    }
}

// Actualizar la interfaz del carrito
function actualizarCarritoUI() {
    console.log('Actualizando UI del carrito. Productos en carrito:', carrito);
    
    // Actualizar el contador del carrito
    const totalItems = carrito.reduce((sum, item) => sum + (parseInt(item.cantidad) || 0), 0);
    console.log('Total de ítems en el carrito:', totalItems);
    
    // Actualizar el contador en el botón del carrito
    const contadorCarrito = document.querySelector('.contador-carrito');
    if (contadorCarrito) {
        contadorCarrito.textContent = totalItems;
        contadorCarrito.style.display = totalItems > 0 ? 'inline-flex' : 'none';
        
        // Asegurar que el contador sea visible si hay items
        if (totalItems > 0) {
            contadorCarrito.style.display = 'inline-flex';
            contadorCarrito.style.justifyContent = 'center';
            contadorCarrito.style.alignItems = 'center';
            contadorCarrito.style.position = 'absolute';
            contadorCarrito.style.top = '-8px';
            contadorCarrito.style.right = '-8px';
            contadorCarrito.style.backgroundColor = '#dc3545';
            contadorCarrito.style.color = 'white';
            contadorCarrito.style.borderRadius = '50%';
            contadorCarrito.style.width = '20px';
            contadorCarrito.style.height = '20px';
            contadorCarrito.style.fontSize = '12px';
        } else {
            contadorCarrito.style.display = 'none';
        }
    }
    
    if (!carritoContenido) {
        console.error('Error: No se encontró el contenedor del carrito');
        return;
    }
    
    // Si el carrito está vacío
    if (carrito.length === 0) {
        console.log('El carrito está vacío, mostrando mensaje');
        carritoContenido.innerHTML = `
            <div class="carrito-vacio">
                <i class="fas fa-shopping-cart fa-3x mb-3"></i>
                <h5>Tu carrito está vacío</h5>
                <p class="text-muted">Añade productos para comenzar</p>
            </div>`;
        if (carritoTotal) carritoTotal.textContent = '$0';
        return;
    }
    
    // Generar el HTML de los productos en el carrito
    let total = 0;
    let html = '';
    
    carrito.forEach((item, index) => {
        if (!item) {
            console.warn('Ítem inválido en el carrito en la posición', index);
            return;
        }
        
        const cantidad = parseInt(item.cantidad) || 1;
        const precio = parseFloat(item.precio) || 0;
        const subtotal = precio * cantidad;
        total += subtotal;
        
        console.log(`Procesando producto: ${item.nombre}, Cantidad: ${cantidad}, Precio: $${precio}, Subtotal: $${subtotal}`);
        
        html += `
            <div class="carrito-item" data-id="${item.id}">
                <img src="${item.imagen || 'img/placeholder.jpg'}" alt="${item.nombre}" 
                     onerror="this.src='img/placeholder.jpg'" 
                     style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;">
                <div class="carrito-item-info">
                    <div class="carrito-item-titulo">${item.nombre || 'Producto sin nombre'}</div>
                    <div class="carrito-item-precio">$${precio.toLocaleString('es-AR')} c/u</div>
                    <div class="carrito-item-cantidad">
                        <button class="btn-cantidad" data-id="${item.id}" data-action="decrease" 
                                style="width: 30px; height: 30px; border: 1px solid #ddd; background: #f8f9fa; border-radius: 4px; cursor: pointer;">-</button>
                        <span style="margin: 0 10px; min-width: 20px; text-align: center;">${cantidad}</span>
                        <button class="btn-cantidad" data-id="${item.id}" data-action="increase"
                                style="width: 30px; height: 30px; border: 1px solid #ddd; background: #f8f9fa; border-radius: 4px; cursor: pointer;">+</button>
                    </div>
                    <button class="btn-eliminar" data-id="${item.id}" 
                            style="background: none; border: none; color: #dc3545; cursor: pointer; margin-top: 5px; font-size: 14px;">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
                <div class="carrito-item-subtotal" style="margin-left: auto; font-weight: bold; padding: 0 10px;">
                    $${subtotal.toLocaleString('es-AR')}
                </div>
            </div>`;
    });
    
    carritoContenido.innerHTML = html;
    if (carritoTotal) carritoTotal.textContent = `$${total.toLocaleString()}`;
    
    // Delegación de eventos para los botones del carrito
    const manejarClickCarrito = (e) => {
        // Manejar clic en botones de cantidad
        const btnCantidad = e.target.closest('.btn-cantidad');
        if (btnCantidad) {
            e.preventDefault();
            e.stopPropagation();
            
            const productoId = parseInt(btnCantidad.getAttribute('data-id'));
            const action = btnCantidad.getAttribute('data-action');
            const itemIndex = carrito.findIndex(item => item.id === productoId);
            
            if (itemIndex !== -1) {
                // Obtener la cantidad actual del DOM para asegurar que estamos trabajando con los valores más recientes
                const cantidadElement = btnCantidad.closest('.carrito-item-cantidad').querySelector('span');
                let cantidadActual = parseInt(cantidadElement.textContent.trim()) || 1;
                
                // Calcular la nueva cantidad
                if (action === 'increase') {
                    cantidadActual += 1;
                } else if (action === 'decrease' && cantidadActual > 1) {
                    cantidadActual -= 1;
                }
                
                // Actualizar el carrito con la nueva cantidad
                carrito[itemIndex].cantidad = cantidadActual;
                
                // Actualizar la interfaz y guardar
                actualizarCarritoUI();
                guardarCarrito();
                
                console.log(`Cantidad actualizada: ${carrito[itemIndex].nombre} - ${cantidadActual}`);
                
                console.log(`Cantidad actualizada: ${item.nombre} - ${nuevaCantidad}`);
            }
            return;
        }
        
        // Manejar clic en botón eliminar
        const btnEliminar = e.target.closest('.btn-eliminar');
        if (btnEliminar) {
            e.preventDefault();
            e.stopPropagation();
            
            const productoId = parseInt(btnEliminar.getAttribute('data-id'));
            if (!isNaN(productoId)) {
                eliminarDelCarrito(productoId);
                mostrarNotificacion('Producto eliminado del carrito');
            }
            return;
        }
    };
    
    // Remover el event listener anterior para evitar duplicados
    carritoContenido.removeEventListener('click', manejarClickCarrito);
    carritoContenido.addEventListener('click', manejarClickCarrito);
    
    // Manejar clic en "Seguir comprando"
    const btnSeguirComprando = carritoContenido.closest('#carrito-sidebar')?.querySelector('.btn-outline-secondary');
    if (btnSeguirComprando) {
        // Remover event listeners anteriores para evitar duplicados
        const nuevoBoton = btnSeguirComprando.cloneNode(true);
        btnSeguirComprando.parentNode.replaceChild(nuevoBoton, btnSeguirComprando);
        
        nuevoBoton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Cerrar el carrito
            toggleCarrito();
            
            // Desplazarse a la sección de productos después de un pequeño retraso
            setTimeout(() => {
                const productosSection = document.querySelector('.productos-container');
                if (productosSection) {
                    productosSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300); // Pequeño retraso para que se complete la animación del carrito
        });
    }
}

// Guardar carrito en localStorage
function guardarCarrito() {
    try {
        // Asegurarse de que solo guardamos los datos necesarios
        const carritoParaGuardar = carrito.map(({ id, nombre, precio, cantidad, imagen }) => ({
            id,
            nombre,
            precio: parseFloat(precio) || 0,
            cantidad: parseInt(cantidad) || 1,
            imagen: imagen || ''
        }));
        
        localStorage.setItem('carrito', JSON.stringify(carritoParaGuardar));
        console.log('Carrito guardado:', carritoParaGuardar);
    } catch (error) {
        console.error('Error al guardar el carrito:', error);
    }
}

// Cargar carrito desde localStorage
function cargarCarrito() {
    try {
        const carritoGuardado = localStorage.getItem('carrito');
        console.log('Carrito guardado en localStorage:', carritoGuardado);
        
        if (carritoGuardado) {
            const datosParseados = JSON.parse(carritoGuardado);
            
            // Asegurarse de que sea un array
            if (Array.isArray(datosParseados)) {
                carrito = datosParseados.map(item => ({
                    id: parseInt(item.id) || 0,
                    nombre: item.nombre || 'Producto sin nombre',
                    precio: parseFloat(item.precio) || 0,
                    cantidad: parseInt(item.cantidad) || 1,
                    imagen: item.imagen || 'img/placeholder.jpg'
                }));
                
                console.log('Carrito cargado desde localStorage:', carrito);
            } else {
                console.warn('Los datos del carrito no son un array');
                carrito = [];
            }
        } else {
            console.log('No hay carrito guardado en localStorage');
            carrito = [];
        }
    } catch (error) {
        console.error('Error al cargar el carrito:', error);
        carrito = [];
    } finally {
        // Actualizar la UI en cualquier caso
        actualizarCarritoUI();
    }
}

// Mostrar notificación
function mostrarNotificacion(mensaje) {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 3000
        });
    } else {
        alert(mensaje);
    }
}

// Hacer funciones disponibles globalmente
window.actualizarCarritoUI = actualizarCarritoUI;
window.guardarCarrito = guardarCarrito;
window.cargarCarrito = cargarCarrito;
