// Datos de productos (simulados)
const products = [
    {
        id: 1,
        name: "Juego de mesa Catan ",
        price: 20990,
        category: "Juego",
        image: "images/Juego Catan (1).png",
        rating: 4.5,
        description: "El mejor juego de mesa estrategico para disfrutar tus tardes con amigos."
    },
    
];

// Variables globales
let cart = [];
let filteredProducts = [...products];

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    setupEventListeners();
});

// Renderizar productos en el grid
function renderProducts(productsToRender) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';

    if (productsToRender.length === 0) {
        productsContainer.innerHTML = '<p class="no-products">No se encontraron productos.</p>';
        return;
    }

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        //valoración
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(product.rating)) {
                stars += '★';
            } else {
                stars += '☆';
            }
        }

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">${stars} (${product.rating})</div>
                <div class="product-price">$${product.price}</div>
                <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });

    //botones de carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Categorias de productos
function filterProducts() {
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const sort = document.getElementById('sort').value;
    
    // Precios
    if (price !== 'all') {
        if (price === '0-10000') {
            filtered = filtered.filter(product => product.price < 10000);
        } else if (price === '11000-30000') {
            filtered = filtered.filter(product => product.price >= 11000 && product.price < 30000);
        } else if (price === '31000-50000') {
            filtered = filtered.filter(product => product.price >= 31000 && product.price < 50000);
        } else if (price === '51000+') {
            filtered = filtered.filter(product => product.price >= 51000);
        }
    }
    
    // Ordenar (Al)
    if (sort === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }
    
    filteredProducts = filtered;
    renderProducts(filtered);
}

// Buscar productos (Cuadro de busquedaa)
function searchProducts() {
    const searchTerm = document.querySelector('.search-bar input').value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        renderProducts(filteredProducts);
        return;
    }
    
    const results = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    renderProducts(results);
}
