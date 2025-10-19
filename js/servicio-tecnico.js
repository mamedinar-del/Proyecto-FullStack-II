// Configurar fecha mínima como el día actual
document.addEventListener('DOMContentLoaded', function() {
    const fechaInput = document.getElementById('fecha');
    const hoy = new Date().toISOString().split('T')[0];
    fechaInput.min = hoy;

    // Validación del formulario
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {
            
            const servicio = {
                nombre: document.getElementById('nombre').value,
                telefono: document.getElementById('telefono').value,
                email: document.getElementById('email').value,
                dispositivo: document.getElementById('dispositivo').value,
                marca: document.getElementById('marca').value,
                fecha: document.getElementById('fecha').value,
                hora: document.getElementById('hora').value,
                problema: document.getElementById('problema').value,
                garantia: document.getElementById('garantia').checked,
                fechaSolicitud: new Date().toISOString()
            };

            console.log('Datos del servicio:', servicio);

            Swal.fire({
                title: '¡Solicitud enviada!',
                text: 'Hemos recibido tu solicitud de servicio técnico. Nos pondremos en contacto contigo pronto para confirmar la cita.',
                icon: 'success',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#0d6efd'
            }).then(() => {
                // Limpiar el formulario después de enviar
                form.reset();
                form.classList.remove('was-validated');
            });
        }

        form.classList.add('was-validated');
    }, false);

    // Validación personalizada para el teléfono (solo números y signo +)
    const telefonoInput = document.getElementById('telefono');
    if (telefonoInput) {
        telefonoInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9+]/g, '');
        });
    }
});
