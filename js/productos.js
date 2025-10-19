const productos = {
    producto1: {
        id: 1,
        nombre: 'Mando Inalámbrico PS5',
        descripcion: 'Mando inalámbrico DualSense para PlayStation 5 con retroalimentación háptica.',
        precio: 59990,
        precioOriginal: 69990,
        enOferta: true,
        esNuevo: false,
        calificacion: 5,
        reseñas: 24,
        imagen: 'images/producto1.jpg',
        categoria: 'accesorios'
    },
    producto2: {
        id: 2,
        nombre: 'Call of Duty: Black Ops 7- PS5',
        descripcion: 'Vive la clásica experiencia Black Ops en una realidad completamente distorsionada.',
        precio: 49990,
        precioOriginal: null,
        enOferta: false,
        esNuevo: false,
        calificacion: 4,
        reseñas: 18,
        imagen: 'images/producto2.jpg',
        categoria: 'juegos'
    },
    producto3: {
        id: 3,
        nombre: 'Auriculares Gaming Razer',
        descripcion: 'Auriculares con sonido envolvente 7.1, micrófono retráctil y luces RGB personalizables.',
        precio: 39990,
        precioOriginal: null,
        enOferta: false,
        esNuevo: true,
        calificacion: 5,
        reseñas: 32,
        imagen: 'images/producto3.jpg',
        categoria: 'accesorios'
    }
};

let productosFiltrados = Object.values(productos);

document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos(productosFiltrados);
    configurarEventos();
});

function configurarEventos() {
    const buscador = document.querySelector('.buscador input');
    if (buscador) {
        buscador.addEventListener('input', buscarProductos);
    }

    const filtros = document.querySelectorAll('.filtro-categoria, .filtro-orden');
    filtros.forEach(filtro => {
        filtro.addEventListener('change', filtrarProductos);
    });

    // Configurar evento para los botones de agregar al carrito
    document.addEventListener('click', (e) => {
        const btnAgregar = e.target.closest('.btn-agregar-carrito');
        if (btnAgregar) {
            e.preventDefault();
            e.stopPropagation();
            
            // Encontrar la tarjeta de producto más cercana
            const card = btnAgregar.closest('.card');
            if (card) {
                const productoId = parseInt(card.getAttribute('data-producto-id'));
                console.log('Botón de agregar al carrito clickeado. ID del producto:', productoId);
                
                if (!isNaN(productoId)) {
                    // Buscar el producto en el objeto de productos
                    const producto = Object.values(productos).find(p => p.id === productoId);
                    
                    if (producto) {
                        console.log('Producto encontrado:', producto);
                        // Llamar a la función global del carrito
                        if (typeof window.agregarAlCarritoGlobal === 'function') {
                            window.agregarAlCarritoGlobal(producto);
                        } else {
                            console.error('Error: La función agregarAlCarritoGlobal no está definida');
                        }
                    } else {
                        console.error('Producto no encontrado con ID:', productoId);
                    }
                } else {
                    console.error('ID de producto inválido:', card.getAttribute('data-producto-id'));
                }
            }
        }
    });

    // Configurar evento para las tarjetas de producto
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        if (card && !e.target.closest('.btn-agregar-carrito') && !e.target.closest('.btn-vista-rapida')) {
            const productoId = card.getAttribute('data-producto-id');
            const producto = productos[`producto${productoId}`];
            if (producto) {
                const nombreUrl = producto.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^\-|\-$)/g, '');
                if (productoId === 1) {
                    window.location.href = 'single-control.html';
                } else if (productoId === 2) {
                    window.location.href = 'single-cod.html';
                } else {
                    window.location.href = `producto-detalle.html?id=${productoId}&nombre=${nombreUrl}`;
                }
            }
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-vista-rapida')) {
            e.preventDefault();
            const button = e.target.closest('.btn-vista-rapida');
            const productoId = parseInt(button.getAttribute('data-producto-id'));
            
            const producto = Object.values(productos).find(p => p.id === productoId);
            
            if (producto) {
                const nombreUrl = producto.nombre
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
                
                if (productoId === 1) {
                    window.location.href = 'single-control.html';
                } else if (productoId === 2) {
                    window.location.href = 'single-cod.html';
                } else {
                    window.location.href = `single-control.html?id=${productoId}&nombre=${nombreUrl}`;
                }
            }
        }
    });
}

function renderizarProductos(productosARenderizar) {
    const contenedorProductos = document.querySelector('.productos-container');
    if (!contenedorProductos) return;
    
    contenedorProductos.innerHTML = '';

    const productosArray = Array.isArray(productosARenderizar) 
        ? productosARenderizar 
        : Object.values(productosARenderizar);

    if (productosArray.length === 0) {
        contenedorProductos.innerHTML = '<div class="col-12 text-center py-5"><p class="lead">No se encontraron productos que coincidan con tu búsqueda.</p></div>';
        return;
    }

    productosArray.forEach(producto => {
        const cardHTML = `
            <div class="col-md-4 mb-4">
                <div class="card h-100" data-producto-id="${producto.id}">
                    <div class="imagen-producto-container">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <button class="btn-vista-rapida" data-producto-id="${producto.id}">
                            <i class="fas fa-eye"></i> Vista Rápida
                        </button>
                        ${producto.enOferta ? '<span class="badge bg-danger">Oferta</span>' : ''}
                        ${producto.esNuevo ? '<span class="badge bg-success">Nuevo</span>' : ''}
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <div class="calificacion mb-2">
                            ${'★'.repeat(Math.floor(producto.calificacion))}${'☆'.repeat(5 - Math.floor(producto.calificacion))}
                            <span class="ms-2 text-muted small">(${producto.reseñas} reseñas)</span>
                        </div>
                        <p class="card-text flex-grow-1">${producto.descripcion}</p>
                        <div class="precio mb-3">
                            ${producto.precioOriginal ? 
                                `<span class="precio-original">$${producto.precioOriginal.toLocaleString()}</span>` : ''}
                            <span class="precio-actual">$${producto.precio.toLocaleString()}</span>
                        </div>
                        <button class="btn btn-agregar-carrito mt-auto">
                            <i class="fa fa-shopping-cart me-2"></i>Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
        contenedorProductos.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function buscarProductos(e) {
    const terminoBusqueda = e.target.value.toLowerCase();
    
    if (terminoBusqueda.trim() === '') {
        productosFiltrados = Object.values(productos);
    } else {
        productosFiltrados = Object.values(productos).filter(producto => 
            producto.nombre.toLowerCase().includes(terminoBusqueda) ||
            producto.descripcion.toLowerCase().includes(terminoBusqueda) ||
            producto.categoria.toLowerCase().includes(terminoBusqueda)
        );
    }
    
    renderizarProductos(productosFiltrados);
}

function filtrarProductos() {
    const categoria = document.getElementById('categoria')?.value;
    const precio = document.getElementById('precio')?.value;
    const orden = document.getElementById('orden')?.value;
    
    let resultados = [...Object.values(productos)];
    
    if (categoria && categoria !== 'todas') {
        resultados = resultados.filter(producto => producto.categoria === categoria);
    }
    
    if (precio && precio !== 'todos') {
        switch(precio) {
            case '0-30000':
                resultados = resultados.filter(p => p.precio <= 30000);
                break;
            case '30001-50000':
                resultados = resultados.filter(p => p.precio > 30000 && p.precio <= 50000);
                break;
            case '50001+':
                resultados = resultados.filter(p => p.precio > 50000);
                break;
        }
    }
    
    if (orden) {
        switch(orden) {
            case 'precio-asc':
                resultados.sort((a, b) => a.precio - b.precio);
                break;
            case 'precio-desc':
                resultados.sort((a, b) => b.precio - a.precio);
                break;
            case 'nombre-asc':
                resultados.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case 'nombre-desc':
                resultados.sort((a, b) => b.nombre.localeCompare(a.nombre));
                break;
        }
    }
    
    productosFiltrados = resultados;
    renderizarProductos(resultados);
}

function agregarAlCarrito(productoId) {
    const producto = productos[`producto${productoId}`];
    if (!producto) return;
    
    // Usar la función de carrito.js
    if (typeof window.agregarAlCarritoGlobal === 'function') {
        window.agregarAlCarritoGlobal(producto);
    }
}

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

// La función guardarCarrito ahora está en carrito.js
// La función cargarCarrito ahora está en carrito.js

// Inicialización movida a carrito.js
