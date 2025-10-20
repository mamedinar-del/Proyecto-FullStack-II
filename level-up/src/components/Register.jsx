<div>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="shortcut icon" href="images/LogoTienda-SinFondo.png" type="image/x-icon" />
  <title>Registro - Level-Up Gamer</title>
  {/* Bootstrap CSS */}
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  {/* Font Awesome */}
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  {/* SweetAlert2 */}
  {/* Estilos personalizados */}
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="css/registro.css" />
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
              <div className="spacer" />
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
                    <a className="nav-link" href="servicio-tecnico.html"><i className="fas fa-tools me-1" />Servicio Técnico</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fas fa-truck me-1" />Envíos</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fas fa-blog me-1" />Blog</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fas fa-headset me-1" />Contacto</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
  {/* Contenido Principal */}
  <main className="container py-5">
    <div className="register-container">
      <div className="register-header">
        <h2>Crear una cuenta</h2>
        <p className="text-muted">Completa el formulario para registrarte</p>
      </div>
      <form id="registerForm" className="needs-validation" noValidate>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <div className="input-group">
              <span className="input-group-text"><i className="fas fa-user" /></span>
              <input type="text" className="form-control" id="name" name="name" placeholder="Tu nombre" required />
            </div>
            <div className="invalid-feedback">
              Por favor ingresa tu nombre.
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="lastname" className="form-label">Apellido</label>
            <div className="input-group">
              <span className="input-group-text"><i className="fas fa-user" /></span>
              <input type="text" className="form-control" id="lastname" name="lastname" placeholder="Tu apellido" required />
            </div>
            <div className="invalid-feedback">
              Por favor ingresa tu apellido.
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <div className="input-group">
            <span className="input-group-text"><i className="fas fa-envelope" /></span>
            <input type="email" className="form-control" id="email" name="email" placeholder="tucorreo@ejemplo.com" required />
          </div>
          <div className="invalid-feedback">
            Por favor ingresa un correo electrónico válido.
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text"><i className="fas fa-lock" /></span>
              <input type="password" className="form-control" id="password" name="password" placeholder="••••••••" required minLength={6} />
              <button className="btn btn-outline-secondary" type="button" id="togglePassword">
                <i className="far fa-eye" />
              </button>
            </div>
            <div className="password-requirements">
              Mínimo 6 caracteres
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
            <div className="input-group">
              <span className="input-group-text"><i className="fas fa-lock" /></span>
              <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="••••••••" required minLength={6} />
              <button className="btn btn-outline-secondary" type="button" id="toggleConfirmPassword">
                <i className="far fa-eye" />
              </button>
            </div>
            <div id="passwordMatch" className="password-requirements">
              Las contraseñas deben coincidir
            </div>
          </div>
        </div>
        <div className="form-check mb-4">
          <input className="form-check-input" type="checkbox" id="terms" name="terms" required />
          <label className="form-check-label" htmlFor="terms">
            Acepto los <a href="#" className="text-primary">Términos y Condiciones</a> y la <a href="#" className="text-primary">Política de Privacidad</a>
          </label>
          <div className="invalid-feedback">
            Debes aceptar los términos y condiciones para continuar.
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-register w-100 mb-3">
          <span id="registerSpinner" className="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true" />
          <span id="registerText">Crear Cuenta</span>
        </button>
        <div id="registerError" className="alert alert-danger d-none" role="alert">
          Ha ocurrido un error al registrar tu cuenta. Por favor, inténtalo de nuevo.
        </div>
        <div className="register-footer">
          <p className="mb-0">¿Ya tienes una cuenta? <a href="inicio-sesion.html">Inicia sesión aquí</a></p>
        </div>
      </form>
    </div>
  </main>
  {/* Footer */}
  <footer className="footer-section">
    <div className="container">
      <div className="row g-4">
        <div className="col-lg-4 col-md-6">
          <div className="footer-widget">
            <div className="footer-logo mb-3">
              <img src="images/LogoTienda-SinFondo-125x125.png" alt="Level-Up Gamer" className="img-fluid footer-logo-img" />
            </div>
            <p className="mb-3">Tu tienda gamer de confianza con los mejores precios y la mejor atención al cliente. Ofrecemos productos de calidad y servicio técnico especializado.</p>
            <div className="social-links">
              <a href="#" className="me-2"><i className="fab fa-facebook-f" /></a>
              <a href="#" className="me-2"><i className="fab fa-twitter" /></a>
              <a href="#" className="me-2"><i className="fab fa-instagram" /></a>
              <a href="#" className="me-2"><i className="fab fa-youtube" /></a>
              <a href="#" className="me-2"><i className="fab fa-tiktok" /></a>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-6">
          <div className="footer-widget">
            <h5 className="widget-title">Enlaces Rápidos</h5>
            <ul className="footer-links">
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Productos</a></li>
              <li><a href="#">Ofertas</a></li>
              <li><a href="#">Nuevos Lanzamientos</a></li>
              <li><a href="#">Sobre Nosotros</a></li>
              <li><a href="#">Contáctanos</a></li>
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
              <i className="fas fa-university" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* Scripts */}
</div>
