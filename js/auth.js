// Obtener usuarios del localStorage o inicializar array vacío
let users = JSON.parse(localStorage.getItem('users')) || [];

// Clave para el usuario actual en sessionStorage
const CURRENT_USER_KEY = 'currentUser';
const REMEMBER_ME_KEY = 'rememberMe';

// Función para mostrar mensajes usando SweetAlert2
function showMessage(title, message, isError = false) {
    return Swal.fire({
        icon: isError ? 'error' : 'success',
        title: title,
        text: message,
        confirmButtonColor: '#6c5ce7',
        timer: isError ? null : 1500,
        showConfirmButton: isError
    });
}

// Función para verificar si hay una sesión activa
function isUserLoggedIn() {
    // Primero verificar sessionStorage
    if (sessionStorage.getItem(CURRENT_USER_KEY)) {
        return true;
    }
    
    // Si no hay en sessionStorage, verificar localStorage (remember me)
    if (localStorage.getItem(REMEMBER_ME_KEY) === 'true' && localStorage.getItem(CURRENT_USER_KEY)) {
        // Restaurar la sesión desde localStorage
        const user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
        sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        return true;
    }
    
    return false;
}

// Manejo del formulario de registro
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Mostrar spinner de carga
        const submitBtn = document.querySelector('#registerForm button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Procesando...';
        
        try {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const termsCheckbox = document.getElementById('terms');

            // Validaciones
            if (!name || !email || !password || !confirmPassword) {
                await showMessage('Error', 'Todos los campos son obligatorios', true);
                return;
            }

            if (!termsCheckbox.checked) {
                await showMessage('Error', 'Debes aceptar los términos y condiciones', true);
                return;
            }

            if (password !== confirmPassword) {
                await showMessage('Error', 'Las contraseñas no coinciden', true);
                return;
            }

            if (password.length < 6) {
                await showMessage('Error', 'La contraseña debe tener al menos 6 caracteres', true);
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                await showMessage('Error', 'Por favor ingresa un correo electrónico válido', true);
                return;
            }

            // Obtener usuarios existentes
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Verificar si el usuario ya existe
            const userExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
            if (userExists) {
                await showMessage('Error', 'Este correo electrónico ya está registrado. Por favor inicia sesión o utiliza otro correo.', true);
                return;
            }

            // Crear nuevo usuario (en una aplicación real, la contraseña debería estar hasheada)
            const newUser = {
                id: 'user_' + Date.now(),
                name,
                email: email.toLowerCase(),
                password, // ¡En una aplicación real, usa bcrypt o similar para hashear la controseña!
                createdAt: new Date().toISOString(),
                role: 'user',
                emailVerified: false
            };

            // Guardar usuario
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Mostrar mensaje de éxito
            await showMessage('¡Registro exitoso!', 'Tu cuenta ha sido creada correctamente. Por favor inicia sesión.', false);
            
            // Redirigir a la página de inicio de sesión después de 2 segundos
            setTimeout(() => {
                window.location.href = 'inicio-sesion.html';
            }, 2000);
            
        } catch (error) {
            console.error('Error en el registro:', error);
            await showMessage('Error', 'Ha ocurrido un error al procesar tu registro. Por favor, inténtalo de nuevo.', true);
        } finally {
            // Restaurar el botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Verificar si el usuario es administrador
function isAdmin() {
    return sessionStorage.getItem('adminAuthenticated') === 'true';
}

// Manejo del formulario de inicio de sesión
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe') ? document.getElementById('rememberMe').checked : false;
        
        // Verificar credenciales de administrador
        if (email === 'admin' && password === 'admin') {
            // Iniciar sesión como administrador
            sessionStorage.setItem('adminAuthenticated', 'true');
            
            // Redirigir al panel de administración
            window.location.href = 'panel-admin.html';
            return;
        }
        
        // Mostrar spinner de carga
        const loginBtn = document.querySelector('#loginForm button[type="submit"]');
        const loginSpinner = document.getElementById('loginSpinner');
        const loginText = document.getElementById('loginText');
        
        if (loginBtn && loginSpinner && loginText) {
            loginBtn.disabled = true;
            loginSpinner.classList.remove('d-none');
            loginText.textContent = 'Iniciando sesión...';
        }
        
        try {
            // Simular retraso de red (eliminar en producción)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Buscar usuario
            const user = users.find(u => u.email.toLowerCase() === email);
            
            if (user && user.password === password) {
                // Guardar sesión
                sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
                
                // Guardar en localStorage si el usuario quiere recordar la sesión
                if (rememberMe) {
                    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
                    localStorage.setItem(REMEMBER_ME_KEY, 'true');
                } else {
                    localStorage.removeItem(CURRENT_USER_KEY);
                    localStorage.removeItem(REMEMBER_ME_KEY);
                }
                
                // Actualizar la interfaz de usuario
                updateAuthUI();
                
                await showMessage('¡Bienvenido!', 'Has iniciado sesión correctamente.');
                
                // Redirigir a la página de inicio o a la URL guardada
                const redirectTo = sessionStorage.getItem('redirectAfterLogin') || 'index.html';
                window.location.href = redirectTo;
                
            } else {
                throw new Error('Credenciales inválidas');
            }
            
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            await showMessage('Error', 'Correo o contraseña incorrectos', true);
            
        } finally {
            // Restaurar el botón
            if (loginBtn && loginSpinner && loginText) {
                loginBtn.disabled = false;
                loginSpinner.classList.add('d-none');
                loginText.textContent = 'Iniciar Sesión';
            }
        }
    });
    
    // Verificar si hay credenciales guardadas al cargar la página
    document.addEventListener('DOMContentLoaded', function() {
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail && document.getElementById('email')) {
            document.getElementById('email').value = savedEmail;
            if (document.getElementById('rememberMe')) {
                document.getElementById('rememberMe').checked = true;
            }
        }
    });
}

/**
 * Actualiza la interfaz de usuario según el estado de autenticación
 * Debe llamarse después de cualquier cambio en el estado de autenticación
 */
function updateAuthUI() {
    const currentUser = isUserLoggedIn() ? 
        JSON.parse(sessionStorage.getItem(CURRENT_USER_KEY) || localStorage.getItem(CURRENT_USER_KEY)) : 
        null;
    
    // Elementos de la barra de navegación
    const welcomeText = document.getElementById('welcomeText');
    const divider = document.getElementById('divider');
    const profileLink = document.getElementById('profileLink');
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const logoutLink = document.getElementById('logoutLink');
    const userMenu = document.getElementById('userMenu');
    const userMenuButton = document.getElementById('userMenuButton');
    
    // Actualizar menú de usuario en la barra de navegación
    if (currentUser) {
        // Usuario autenticado
        if (welcomeText) welcomeText.textContent = `Hola, ${currentUser.name.split(' ')[0]}`;
        if (profileLink) profileLink.style.display = 'block';
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'block';
        if (divider) divider.style.display = 'inline';
        
        // Actualizar menú desplegable de usuario
        if (userMenuButton) {
            userMenuButton.textContent = currentUser.name.split(' ')[0];
            userMenuButton.innerHTML = `
                <i class="fas fa-user-circle me-1"></i>
                ${currentUser.name.split(' ')[0]}
            `;
        }
        
        // Mostrar opciones adicionales para administradores
        if (currentUser.role === 'admin') {
            const adminLink = document.createElement('a');
            adminLink.className = 'dropdown-item';
            adminLink.href = 'admin/dashboard.html';
            adminLink.innerHTML = '<i class="fas fa-tachometer-alt me-2"></i>Panel de Administración';
            
            if (userMenu && !document.getElementById('adminDashboardLink')) {
                adminLink.id = 'adminDashboardLink';
                const divider = document.createElement('div');
                divider.className = 'dropdown-divider';
                userMenu.insertBefore(divider, userMenu.firstChild);
                userMenu.insertBefore(adminLink, userMenu.firstChild);
            }
        }
    } else {
        // Usuario no autenticado
        if (welcomeText) welcomeText.textContent = 'Bienvenido';
        if (profileLink) profileLink.style.display = 'none';
        if (loginLink) loginLink.style.display = 'block';
        if (registerLink) registerLink.style.display = 'block';
        if (logoutLink) logoutLink.style.display = 'none';
        if (divider) divider.style.display = 'none';
        
        // Restablecer menú de usuario
        if (userMenuButton) {
            userMenuButton.innerHTML = '<i class="fas fa-user-circle me-1"></i>Mi Cuenta';
        }
        
        // Eliminar enlace de administración si existe
        const adminLink = document.getElementById('adminDashboardLink');
        if (adminLink && adminLink.nextElementSibling && 
            adminLink.nextElementSibling.classList.contains('dropdown-divider')) {
            adminLink.nextElementSibling.remove();
        }
        if (adminLink) adminLink.remove();
    }
    const userName = document.getElementById('userName');
    const userNameText = document.getElementById('userNameText');

    if (currentUser) {
        // Usuario autenticado
        if (userName) userName.textContent = currentUser.name.split(' ')[0]; // Mostrar solo el primer nombre
        if (userNameText) userNameText.textContent = currentUser.name;
        
        // Mostrar elementos para usuario autenticado
        if (welcomeText) welcomeText.classList.remove('d-none');
        if (divider) divider.classList.remove('d-none');
        if (profileLink) profileLink.classList.remove('d-none');
        if (logoutLink) logoutLink.classList.remove('d-none');
        
        // Ocultar elementos para usuario no autenticado
        if (loginLink) loginLink.classList.add('d-none');
        if (registerLink) registerLink.classList.add('d-none');
    } else {
        // Usuario no autenticado
        if (userName) userName.textContent = '';
        
        // Mostrar elementos para usuario no autenticado
        if (loginLink) loginLink.classList.remove('d-none');
        if (registerLink) registerLink.classList.remove('d-none');
        
        // Ocultar elementos para usuario autenticado
        if (welcomeText) welcomeText.classList.add('d-none');
        if (divider) divider.classList.add('d-none');
        if (profileLink) profileLink.classList.add('d-none');
        if (logoutLink) logoutLink.classList.add('d-none');
    }
}

/**
 * Cierra la sesión del usuario actual
 */
function logout() {
    // Eliminar datos de sesión
    sessionStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem('adminAuthenticated');
    
    // Si no se marcó "Recordar sesión", eliminar también del localStorage
    if (localStorage.getItem(REMEMBER_ME_KEY) !== 'true') {
        localStorage.removeItem(CURRENT_USER_KEY);
    }
    
    // Redirigir a la página de inicio
    window.location.href = 'index.html';
    
    // Actualizar la interfaz
    updateAuthUI();
    
    // Mostrar mensaje de cierre de sesión
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: 'info',
            title: 'Sesión cerrada',
            text: 'Has cerrado sesión correctamente',
            confirmButtonColor: '#6c5ce7',
            timer: 1500
        });
    }
}

// Inicialización cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Manejar clic en cerrar sesión
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
    
    // Verificar autenticación al cargar la página
    updateAuthUI();
});
