import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery/dist/jquery.min.js';
import 'jquery-mousewheel/jquery.mousewheel.min.js';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
import '../App.css';

const Index = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Función para formatear precios
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  // Función para cargar productos
  const cargarProductos = () => {
    try {
      // Aquí iría la lógica para cargar los productos
      // Por ahora, usaremos un array vacío
      setProductos([]);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  // Efecto para cargar los productos al montar el componente
  useEffect(() => {
    cargarProductos();
  }, []);

  // Función para agregar al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, { ...producto, cantidad: 1 }]);
  };

  // Función para eliminar del carrito
  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  // Función para calcular el total del carrito
  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  return (
    <div className="Index">
      {/* Sección del carrusel */}
      <div id="main_slider" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="images/slider-1.jpg" className="d-block w-100" alt="Slide 1" />
            <div className="carousel-caption d-none d-md-block">
              <h2>Bienvenido a Level-Up Gamer</h2>
              <p>Los mejores juegos y accesorios para gamers</p>
              <Link to="/productos" className="btn btn-primary">Ver productos</Link>
            </div>
          </div>
          {/* Agrega más slides según sea necesario */}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#main_slider" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#main_slider" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* Sección de productos destacados */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Productos Destacados</h2>
          <div className="row">
            {productos.length > 0 ? (
              productos.map((producto, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="card h-100">
                    <img 
                      src={producto.imagen} 
                      className="card-img-top" 
                      alt={producto.nombre} 
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{producto.nombre}</h5>
                      <p className="card-text">{producto.descripcion}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="h5 mb-0">{formatPrice(producto.precio)}</span>
                        <button 
                          className="btn btn-primary"
                          onClick={() => agregarAlCarrito(producto)}
                        >
                          <i className="fas fa-cart-plus me-2"></i>Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No hay productos disponibles en este momento.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sección de descuento */}
      <section id="descuento" className="py-5 position-relative" style={{ minHeight: '500px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div className="position-absolute w-100 h-100" style={{ top: 0, left: 0, zIndex: 0 }}>
          <img src="images/banner-descuento.png" alt="Oferta de descuento" className="w-100 h-100" style={{ objectFit: 'cover' }} />
        </div>
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row justify-content-end">
            <div className="col-md-6">
              <div className="bg-white p-4 rounded shadow">
                <h2 className="mb-4">¡Oferta Especial!</h2>
                <p className="lead mb-4">Descuento del 20% en todos los videojuegos seleccionados</p>
                <p className="mb-4">Válido hasta el 31/12/2023</p>
                <Link to="/ofertas" className="btn btn-primary btn-lg">Ver ofertas</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carrito lateral */}
      {mostrarCarrito && (
        <div id="carrito-sidebar" className="active">
          <div className="carrito-header">
            <h4>Tu Carrito</h4>
            <button className="carrito-cerrar" onClick={() => setMostrarCarrito(false)}>
              &times;
            </button>
          </div>
          <div className="carrito-body">
            {carrito.length > 0 ? (
              <>
                <div className="carrito-items">
                  {carrito.map((item, index) => (
                    <div key={index} className="carrito-item">
                      <img src={item.imagen} alt={item.nombre} className="carrito-item-img" />
                      <div className="carrito-item-details">
                        <h6>{item.nombre}</h6>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>{formatPrice(item.precio)} x {item.cantidad}</span>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => eliminarDelCarrito(index)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="carrito-total">
                  <h5>Total: {formatPrice(calcularTotal())}</h5>
                </div>
                <div className="d-grid gap-2 mt-3">
                  <Link to="/checkout" className="btn btn-primary">Finalizar compra</Link>
                  <button className="btn btn-outline-secondary" onClick={() => setMostrarCarrito(false)}>Seguir comprando</button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <i className="fas fa-shopping-cart fa-3x mb-3 text-muted"></i>
                <p>Tu carrito está vacío</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setMostrarCarrito(false)}
                >
                  Seguir comprando
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Botón flotante del carrito */}
      <div className="floating-cart" onClick={() => setMostrarCarrito(true)}>
        <i className="fas fa-shopping-cart"></i>
        {carrito.length > 0 && (
          <span className="cart-count">{carrito.length}</span>
        )}
      </div>
    </div>
  );
};

export default Index;
