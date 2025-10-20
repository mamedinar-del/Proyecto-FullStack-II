// Hacer que la función esté disponible globalmente
window.actualizarContadorCarrito = function() {
    const contadorFlotante = document.getElementById('cartCount');
    try {
        // Obtener el carrito actualizado del localStorage
        const carritoGuardado = localStorage.getItem('carrito');
        const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
        const totalItems = carrito.reduce((sum, item) => sum + (parseInt(item.cantidad) || 0), 0);
        
        if (contadorFlotante) {
            contadorFlotante.textContent = totalItems;
            // Mostrar u ocultar el contador según si hay productos
            if (totalItems > 0) {
                contadorFlotante.style.display = 'flex';
                contadorFlotante.style.justifyContent = 'center';
                contadorFlotante.style.alignItems = 'center';
                contadorFlotante.style.position = 'absolute';
                contadorFlotante.style.top = '-5px';
                contadorFlotante.style.right = '-5px';
                contadorFlotante.style.backgroundColor = '#dc3545';
                contadorFlotante.style.color = 'white';
                contadorFlotante.style.borderRadius = '50%';
                contadorFlotante.style.width = '20px';
                contadorFlotante.style.height = '20px';
                contadorFlotante.style.fontSize = '12px';
            } else {
                contadorFlotante.style.display = 'none';
            }
        }
    } catch (e) {
        console.error('Error al actualizar el contador del carrito:', e);
        if (contadorFlotante) {
            contadorFlotante.style.display = 'none';
        }
    }
};

// Sobrescribir la función actualizarCarritoUI para que también actualice nuestro contador
const originalActualizarCarritoUI = window.actualizarCarritoUI || function() {};
window.actualizarCarritoUI = function() {
    // Llamar a la función original
    originalActualizarCarritoUI.apply(this, arguments);
    
    // Actualizar nuestro contador
    if (typeof window.actualizarContadorCarrito === 'function') {
        window.actualizarContadorCarrito();
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Función para abrir el carrito
    function abrirCarrito(e) {
        if (e) e.preventDefault();
        
        console.log('Abriendo carrito desde botón flotante');
        
        // Verificar si el carrito ya está abierto
        const isOpen = document.body.classList.contains('carrito-abierto');
        
        // Si está abierto, no hacer nada para evitar parpadeos
        if (isOpen) {
            console.log('El carrito ya está abierto');
            return;
        }
        
        // Intentar usar la función global toggleCarrito
        if (typeof window.toggleCarrito === 'function') {
            console.log('Usando toggleCarrito global');
            window.toggleCarrito(e);
            return;
        }
        
        // Si no está disponible, buscar el botón del carrito
        const btnCarrito = document.querySelector('.carrito-btn');
        if (btnCarrito) {
            console.log('Haciendo clic en el botón del carrito existente');
            btnCarrito.click();
            return;
        }
        
        // Si no hay botón, alternar manualmente las clases
        console.log('Alternando manualmente las clases del carrito');
        document.body.classList.add('carrito-abierto');
        const sidebar = document.querySelector('#carrito-sidebar');
        const overlay = document.querySelector('.carrito-overlay');
        
        if (sidebar) {
            sidebar.classList.add('active');
        }
        
        if (overlay) {
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
        }
    }

    // Agregar evento al botón flotante
    const btnFloatingCart = document.getElementById('btnFloatingCart');
    if (btnFloatingCart) {
        btnFloatingCart.addEventListener('click', abrirCarrito);
    }

    // Actualizar el contador al cargar la página
    if (typeof window.actualizarContadorCarrito === 'function') {
        window.actualizarContadorCarrito();
    }

    // Escuchar cambios en el localStorage para actualizar el contador
    window.addEventListener('storage', function(e) {
        if (e.key === 'carrito' && typeof window.actualizarContadorCarrito === 'function') {
            window.actualizarContadorCarrito();
        }
    });

    // Si hay un carrito en la página, asegurarse de que esté por encima del botón flotante
    const carritoSidebar = document.getElementById('carrito-sidebar');
    if (carritoSidebar) {
        carritoSidebar.style.zIndex = '10000'; // Un valor mayor que el del botón flotante
    }

    // Forzar una actualización inicial después de un pequeño retraso
    setTimeout(function() {
        if (typeof window.actualizarContadorCarrito === 'function') {
            window.actualizarContadorCarrito();
        }
    }, 500);
});
