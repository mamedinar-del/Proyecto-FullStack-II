<div>
  <meta charSet="utf-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Conoce más sobre Level-Up Gamer, tu tienda de videojuegos de confianza con los mejores precios y servicio técnico especializado." />
  <title>Sobre Nosotros - Level-Up Gamer</title>
  {/* Favicon */}
  <link rel="shortcut icon" href="images/LogoTienda-SinFondo.png" type="image/x-icon" />
  {/* Estilo para desplazamiento suave */}
  <style dangerouslySetInnerHTML={{__html: "html{scroll-behavior:smooth;}" }} />
  {/* CSS */}
  <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href="css/style.css" />
  <link rel="stylesheet" href="css/responsive.css" />
  <link rel="stylesheet" href="css/jquery.mCustomScrollbar.min.css" />
  <link rel="stylesheet" href="css/whatsapp.css" />
  <link rel="stylesheet" href="css/carrito.css" />
  <link rel="stylesheet" href="css/floating-cart.css" />
  {/* Google Fonts */}
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
  {/* Font Awesome */}
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
  {/* Header */}
  <header className="header-area" style={{width: '100%'}}>
    <div className="container-fluid px-0">
      <div className="row g-0 justify-content-center">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center py-3" style={{maxWidth: 1800, margin: '0 auto', padding: '0 2rem'}}>
            {/* Logo */}
            <div className="logo" style={{marginRight: 20}}>
              <a href="index.html">
                <img src="images/LogoTienda-SinFondo.png" alt="Level-Up Gamer" style={{height: 90, transition: 'all 0.3s ease'}} />
              </a>
            </div>
            {/* Barra de búsqueda */}
            <div className="w-100" style={{maxWidth: 900, margin: '0 40px'}}>
              <div className="input-group" style={{height: 50}}>
                <input type="text" className="form-control" placeholder="Buscar productos..." style={{height: '100%', fontSize: '1.1rem'}} />
                <button className="btn btn-search" type="button" style={{height: '100%', minWidth: 60}}>
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
              <div className="ms-4" style={{width: 40}} />
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
                    <a className="nav-link" href="index.html"><i className="fas fa-home me-1" /> Inicio</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="about-us.html"><i className="fas fa-info-circle me-1" /> Sobre Nosotros</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="servicio-tecnico.html"><i className="fas fa-tools me-1" /> Servicio Técnico</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fas fa-truck me-1" /> Envíos</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fas fa-blog me-1" /> Blog</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#contacto"><i className="fas fa-headset me-1" /> Contacto</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
  {/* About Us Section */}
  <section className="py-5 bg-light">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold mb-3">Sobre Nosotros</h1>
            <div className="divider mx-auto bg-primary" style={{width: 80, height: 4}} />
          </div>
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img src="images/about-us.png" alt="Nuestra Tienda" className="img-fluid rounded shadow" />
            </div>
            <div className="col-lg-6">
              <h2 className="mb-4">Nuestra Historia</h2>
              <p className="lead">Level-Up Gamer nació de la pasión por los videojuegos y la tecnología. Fundada en 2015, nos hemos convertido en un referente en la industria del gaming en Chile, ofreciendo productos de calidad y un servicio excepcional.</p>
              <p>Lo que comenzó como un pequeño local en Santiago, hoy es una tienda en línea líder, reconocida por nuestra amplia selección de videojuegos, consolas y accesorios, además de nuestro compromiso con la satisfacción del cliente.</p>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-12">
              <h2 className="text-center mb-4">Nuestros Valores</h2>
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="card h-100 border-0 text-center p-4">
                    <div className="icon-box mx-auto mb-3">
                      <i className="fas fa-medal fa-3x text-primary" />
                    </div>
                    <h4>Calidad</h4>
                    <p>Trabajamos con los mejores proveedores para ofrecerte productos originales y de la más alta calidad.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 border-0 text-center p-4">
                    <div className="icon-box mx-auto mb-3">
                      <i className="fas fa-headset fa-3x text-primary" />
                    </div>
                    <h4>Soporte</h4>
                    <p>Nuestro equipo de expertos está siempre disponible para asesorarte y resolver cualquier duda.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100 border-0 text-center p-4">
                    <div className="icon-box mx-auto mb-3">
                      <i className="fas fa-shield-alt fa-3x text-primary" />
                    </div>
                    <h4>Garantía</h4>
                    <p>Todos nuestros productos cuentan con garantía oficial y servicio técnico especializado.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 p-lg-5 rounded shadow-sm">
            <h2 className="text-center mb-4">Nuestro Equipo</h2>
            <p className="text-center mb-5">Contamos con un equipo apasionado por los videojuegos, siempre dispuesto a ofrecerte la mejor experiencia de compra.</p>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="team-member text-center">
                  <div className="team-img mb-3">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Miembro del equipo" className="img-fluid rounded-circle" style={{width: 150, height: 150, objectFit: 'cover'}} />
                  </div>
                  <h4>Juan Pérez</h4>
                  <p className="text-muted">Fundador &amp; CEO</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="team-member text-center">
                  <div className="team-img mb-3">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Miembro del equipo" className="img-fluid rounded-circle" style={{width: 150, height: 150, objectFit: 'cover'}} />
                  </div>
                  <h4>María González</h4>
                  <p className="text-muted">Gerente de Ventas</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="team-member text-center">
                  <div className="team-img mb-3">
                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Miembro del equipo" className="img-fluid rounded-circle" style={{width: 150, height: 150, objectFit: 'cover'}} />
                  </div>
                  <h4>Carlos Rodríguez</h4>
                  <p className="text-muted">Jefe de Servicio Técnico</p>
                </div>
              </div>
            </div>
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
            <div className="footer-logo mb-3">
              <img src="images/LogoTienda-SinFondo-125x125.png" alt="Level-Up Gamer" className="img-fluid" style={{maxHeight: 80}} />
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
              <li><a href="index.html">Inicio</a></li>
              <li><a href="#">Productos</a></li>
              <li><a href="#">Ofertas</a></li>
              <li><a href="#">Nuevos Lanzamientos</a></li>
              <li><a href="about-us.html">Sobre Nosotros</a></li>
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
        <a href="#" className="btn btn-outline-secondary">Seguir comprando</a>
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
