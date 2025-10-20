<div>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="shortcut icon" href="images/LogoTienda-SinFondo.png" type="image/x-icon" />
  <title>Agendar Servicio Técnico - Level-Up Gamer</title>
  {/* Google Fonts - Roboto */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
  <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
  {/* Bootstrap CSS */}
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  {/* Font Awesome */}
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  {/* SweetAlert2 */}
  {/* Estilos personalizados */}
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="css/servicio-tecnico.css" />
  <link rel="stylesheet" href="css/carrito.css" />
  <link rel="stylesheet" href="css/floating-cart.css" />
  <style dangerouslySetInnerHTML={{__html: "\n        html {\n            scroll-behavior: smooth;\n        }\n    " }} />
  {/* Header */}
  <header className="header-area">
    <div className="container-fluid px-0">
      <div className="row g-0 justify-content-center">
        <div className="col-12">
          <div className="header-content">
            {/* Logo */}
            <div className="logo">
              <a href="index.html">
                <img src="images/LogoTienda-SinFondo.png" alt="Level-Up Gamer" className="logo-img" />
              </a>
            </div>
            {/* Barra de búsqueda */}
            <div className="search-container">
              <div className="search-input-group">
                <input type="text" className="form-control search-input" placeholder="Buscar productos..." />
                <button className="btn btn-search" type="button">
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
            {/* Iconos de usuario y carrito */}
            <div className="d-flex align-items-center justify-content-end">
              {/* Menú de Usuario */}
              <div className="dropdown me-3">
                <button className="btn btn-light text-dark dropdown-toggle custom-account-btn" type="button" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false" title="Mi Cuenta">
                  <i className="fas fa-user" />
                  <span id="userName" />
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu" id="userDropdown">
                  {/* Las opciones se cargarán dinámicamente con JavaScript */}
                  <li className="dropdown-item-text d-none" id="welcomeText">Bienvenido, <span id="userNameText" /></li>
                  <li><hr className="dropdown-divider d-none" id="divider" /></li>
                  <li><a className="dropdown-item d-none" href="#" id="profileLink">Mi Perfil</a></li>
                  <li><a className="dropdown-item" href="inicio-sesion.html" id="loginLink">Iniciar Sesión</a></li>
                  <li><a className="dropdown-item" href="registro.html" id="registerLink">Registrarse</a></li>
                  <li><a className="dropdown-item d-none text-danger" href="#" id="logoutLink">Cerrar Sesión</a></li>
                </ul>
              </div>
              {/* Espacio reservado para mantener el diseño */}
              <div className="ms-4 spacer" />
              {/* Mobile Menu Button */}
              <button className="navbar-toggler d-lg-none ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Row: Navigation Menu */}
      <div className="row">
        <div className="col-12">
          {/* Navegación Principal */}
          <nav className="navbar navbar-expand-lg navbar-light bg-white py-0 border-top">
            <div className="container-fluid px-5">
              <div className="collapse navbar-collapse" id="mainNavbar">
                <ul className="navbar-nav w-100 justify-content-between">
                  <li className="nav-item">
                    <a className="nav-link" href="index.html"><i className="fas fa-home me-1" />Inicio</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="about-us.html"><i className="fas fa-info-circle me-1" />Sobre Nosotros</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="servicio-tecnico.html"><i className="fas fa-tools me-1" />Servicio Técnico</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fas fa-truck me-1" />Envíos</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fas fa-blog me-1" />Blog</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#contacto"><i className="fas fa-headset me-1" />Contacto</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
  {/* Sección de Contacto */}
  <section className="contact-section">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="contact-card">
            <div className="contact-header">
              <i className="fas fa-tools" />
              <h2>Agenda tu Servicio Técnico</h2>
              <p className="text-muted">Solicita una revisión técnica para tus dispositivos. Completa el formulario y te contactaremos para confirmar la cita.</p>
            </div>
            <form id="contactForm" noValidate>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                  <input type="text" className="form-control form-control-lg" id="nombre" required />
                  <div className="invalid-feedback">
                    Por favor ingresa tu nombre completo.
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <label htmlFor="telefono" className="form-label">Teléfono de Contacto</label>
                  <input type="tel" className="form-control form-control-lg" id="telefono" required />
                  <div className="invalid-feedback">
                    Por favor ingresa tu número de teléfono.
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input type="email" className="form-control form-control-lg" id="email" required />
                <div className="invalid-feedback">
                  Por favor ingresa un correo electrónico válido.
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label htmlFor="tipoDispositivo" className="form-label">Tipo de Dispositivo</label>
                  <select className="form-select form-select-lg" id="tipoDispositivo" required>
                    <option value selected disabled>Selecciona un dispositivo</option>
                    <option value="consola">Consola de Videojuegos</option>
                    <option value="pc">PC Gamer</option>
                    <option value="notebook">Notebook Gamer</option>
                    <option value="telefono">Teléfono/Celular</option>
                    <option value="tablet">Tablet</option>
                    <option value="periferico">Periférico (Teclado, Mouse, etc.)</option>
                    <option value="otro">Otro</option>
                  </select>
                  <div className="invalid-feedback">
                    Por favor selecciona un tipo de dispositivo.
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <label htmlFor="marca" className="form-label">Marca</label>
                  <input type="text" className="form-control form-control-lg" id="marca" required />
                  <div className="invalid-feedback">
                    Por favor ingresa la marca del dispositivo.
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <label htmlFor="fecha" className="form-label">Fecha Preferente</label>
                  <input type="date" className="form-control form-control-lg" id="fecha" min required />
                  <div className="invalid-feedback">
                    Por favor selecciona una fecha.
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <label htmlFor="hora" className="form-label">Hora Preferente</label>
                  <select className="form-select form-select-lg" id="hora" required>
                    <option value selected disabled>Selecciona una hora</option>
                    <option value="09:00 - 11:00">09:00 - 11:00</option>
                    <option value="11:00 - 13:00">11:00 - 13:00</option>
                    <option value="13:00 - 15:00">13:00 - 15:00</option>
                    <option value="15:00 - 17:00">15:00 - 17:00</option>
                    <option value="17:00 - 19:00">17:00 - 19:00</option>
                  </select>
                  <div className="invalid-feedback">
                    Por favor selecciona un horario.
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="problema" className="form-label">Descripción del Problema</label>
                <textarea className="form-control" id="problema" rows={4} placeholder="Describe con el mayor detalle posible el problema que presenta tu dispositivo..." required defaultValue={""} />
                <div className="form-text">Incluye detalles como: ¿Cuándo comenzó el problema? ¿Qué has intentado para solucionarlo?</div>
                <div className="invalid-feedback">
                  Por favor describe el problema que presenta tu dispositivo.
                </div>
              </div>
              <div className="mb-4 form-check">
                <input type="checkbox" className="form-check-input" id="garantia" defaultValue={1} />
                <label className="form-check-label" htmlFor="garantia">Mi dispositivo está en garantía</label>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" className="btn btn-submit">
                  <i className="fas fa-calendar-check me-2" /> Agendar Servicio Técnico
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Footer */}
  <footer id="contacto" className="footer-section">
    <div className="container">
      <div className="row g-4">
        <div className="col-lg-4 col-md-6">
          <div className="footer-widget">
            <h5 className="widget-title">Sobre Nosotros</h5>
            <p>Level-Up Gamer es tu tienda de videojuegos, consolas y accesorios gamer. Ofrecemos los mejores precios y la mejor atención al cliente.</p>
            <div className="social-links mt-3">
              <a href="#" className="me-2"><i className="fab fa-facebook-f" /></a>
              <a href="#" className="me-2"><i className="fab fa-twitter" /></a>
              <a href="#" className="me-2"><i className="fab fa-instagram" /></a>
              <a href="#" className="me-2"><i className="fab fa-youtube" /></a>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-6">
          <div className="footer-widget">
            <h5 className="widget-title">Enlaces Rápidos</h5>
            <ul className="footer-links">
              <li><a href="index.html">Inicio</a></li>
              <li><a href="#productos">Productos</a></li>
              <li><a href="#ofertas">Ofertas</a></li>
              <li><a href="servicio-tecnico.html">Soporte Técnico</a></li>
              <li><a href="#">Términos y Condiciones</a></li>
              <li><a href="#">Política de Privacidad</a></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="footer-widget">
            <h5 className="widget-title">Categorías</h5>
            <ul className="footer-links">
              <li><a href="#">Videojuegos</a></li>
              <li><a href="#">Consolas</a></li>
              <li><a href="#">Accesorios</a></li>
              <li><a href="#">Figuras de Acción</a></li>
              <li><a href="#">Merchandising</a></li>
              <li><a href="#">Juegos de Mesa</a></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="footer-widget">
            <h5 className="widget-title">Contacto</h5>
            <ul className="contact-info">
              <li className="d-flex mb-2">
                <i className="fas fa-map-marker-alt me-3 mt-1" />
                <span>Antonio Varas 666, Santiago, Chile</span>
              </li>
              <li className="d-flex mb-2">
                <i className="fas fa-phone-alt me-3 mt-1" />
                <span>+56 9 7526 0485</span>
              </li>
              <li className="d-flex mb-2">
                <i className="fas fa-envelope me-3 mt-1" />
                <span>contacto@levelupgamer.cl</span>
              </li>
              <li className="d-flex">
                <i className="fas fa-clock me-3 mt-1" />
                <span>Lun-Vie: 10:00 - 20:00<br />Sáb: 11:00 - 19:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom mt-4 pt-4 border-top border-light">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">© 2023 Level-Up Gamer. Todos los derechos reservados.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <div className="payment-methods">
              <span className="me-2">Métodos de pago:</span>
              <i className="fab fa-cc-visa me-2" />
              <i className="fab fa-cc-mastercard me-2" />
              <i className="fab fa-cc-amex me-2" />
              <i className="fab fa-cc-paypal me-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* Scripts de Bootstrap y personalizados */}
  {/* Script de autenticación */}
  {/* Carrito lateral */}
  <div id="carrito-sidebar">
    <div className="carrito-header">
      <h4>Tu Carrito</h4>
      <button className="carrito-cerrar">×</button>
    </div>
    <div className="carrito-contenido">
      {/* Los productos se cargarán aquí dinámicamente */}
    </div>
    <div className="carrito-footer">
      <div className="carrito-total">
        <span>Total:</span>
        <span className="carrito-total-precio">$0</span>
      </div>
      <div className="carrito-acciones">
        <a href="index.html" className="btn btn-outline-secondary">Seguir comprando</a>
        <a href="#" className="btn btn-primary">Pagar ahora</a>
      </div>
    </div>
  </div>
  <div className="carrito-overlay" />
  {/* Botón flotante del carrito */}
  <div className="floating-cart">
    <button className="btn-cart-float" id="btnFloatingCart" title="Ver carrito">
      <i className="fas fa-shopping-cart" />
      <span className="cart-count" id="cartCount">0</span>
    </button>
  </div>
</div>
