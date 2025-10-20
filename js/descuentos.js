document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    const formDescuento = document.getElementById('form-descuento');
    if (formDescuento) {
        formDescuento.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('email-descuento');
            const codigoDescuento = document.getElementById('codigo-descuento');
            const codigoGenerado = document.getElementById('codigo-generado');
            
            if (!isValidEmail(emailInput.value)) {
                showAlert('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }
            
            const codigo = generateDiscountCode();
            
            codigoGenerado.textContent = codigo;
            codigoDescuento.classList.remove('d-none');
            
            emailInput.disabled = true;
            formDescuento.querySelector('button').disabled = true;
            
            localStorage.setItem('discountCode', codigo);
            localStorage.setItem('discountEmail', emailInput.value);
            
            showAlert('¡Código de descuento generado con éxito!', 'success');
            
            codigoDescuento.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
    
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-copiar')) {
            const codigo = document.getElementById('codigo-generado').textContent;
            copyToClipboard(codigo);
            
            const tooltip = bootstrap.Tooltip.getInstance(e.target.closest('.btn-copiar'));
            const originalTitle = e.target.closest('.btn-copiar').getAttribute('data-bs-original-title');
            e.target.closest('.btn-copiar').setAttribute('data-bs-original-title', '¡Copiado!');
            tooltip.show();
            
            setTimeout(() => {
                e.target.closest('.btn-copiar').setAttribute('data-bs-original-title', originalTitle);
            }, 2000);
            
            showAlert('Código copiado al portapapeles', 'success');
        }
    });
    
    function checkExistingDiscount() {
        const savedCode = localStorage.getItem('discountCode');
        const savedEmail = localStorage.getItem('discountEmail');
        
        if (savedCode && savedEmail) {
            const emailInput = document.getElementById('email-descuento');
            const codigoDescuento = document.getElementById('codigo-descuento');
            const codigoGenerado = document.getElementById('codigo-generado');
            
            emailInput.value = savedEmail;
            emailInput.disabled = true;
            codigoGenerado.textContent = savedCode;
            codigoDescuento.classList.remove('d-none');
            formDescuento.querySelector('button').disabled = true;
        }
    }
    
    checkExistingDiscount();
});

function generateDiscountCode() {
    const prefix = 'DESC20-';
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
        
        if ((i + 1) % 3 === 0 && i < 5) {
            code += '-';
        }
    }
    
    return prefix + code;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function showAlert(message, type = 'success') {
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
