document.addEventListener('DOMContentLoaded', function() {
    initTooltips();
    
    setupImageGallery();
    
    setupQuantitySelector();
});


function initTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}


function setupImageGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail-item img');
    if (thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                changeImage(this);
            });
        });
    }
}

/**
 * Cambia la imagen principal al hacer clic en las miniaturas
 * @param {HTMLElement} element - Elemento de imagen en miniatura
 */
function changeImage(element) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = element.src;
        mainImage.alt = element.alt;
        
        document.querySelectorAll('.thumbnail-item img').forEach(img => {
            img.closest('.thumbnail-item').classList.remove('active');
        });
        element.closest('.thumbnail-item').classList.add('active');
    }
}


function setupQuantitySelector() {
    const increaseBtn = document.querySelector('.btn-increase-quantity');
    const decreaseBtn = document.querySelector('.btn-decrease-quantity');
    const quantityInput = document.getElementById('quantity');

    if (increaseBtn && quantityInput) {
        increaseBtn.addEventListener('click', increaseQuantity);
    }
    
    if (decreaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', decreaseQuantity);
    }
    
    if (quantityInput) {
        quantityInput.addEventListener('change', function() {
            if (parseInt(this.value) < 1) {
                this.value = 1;
            }
        });
    }
}


function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput && parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const productId = document.querySelector('input[name="product_id"]')?.value;
    
    if (!productId) {
        console.error('ID de producto no encontrado');
        return;
    }
    
    console.log(`Agregando ${quantity} unidades del producto ${productId} al carrito`);
    
    showNotification('Producto agregado al carrito', 'success');
    
    updateCartCounter(quantity);
}

/**
 * Muestra una notificación al usuario
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación (success, error, warning, info)
 */
function showNotification(message, type = 'info') {

    if (typeof Swal !== 'undefined') {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
        });

        Toast.fire({
            icon: type,
            title: message
        });
    } else {
        alert(message);
    }
}

/**
 * @param {number} quantity
 */
function updateCartCounter(quantity = 1) {
    const cartCounter = document.querySelector('.contador-carrito');
    if (cartCounter) {
        const currentCount = parseInt(cartCounter.textContent) || 0;
        const newCount = currentCount + quantity;
        cartCounter.textContent = newCount;
        cartCounter.style.display = newCount > 0 ? 'flex' : 'none';
    }
}
