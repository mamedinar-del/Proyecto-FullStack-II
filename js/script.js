document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registroForm');

    registroForm.addEventListener('submit', (event) => {
        // Previene el envío del formulario por defecto
        event.preventDefault();

        // Obtiene los valores de los campos
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validación simple (opcional, pero recomendada)
        if (username.length < 3) {
            alert('El nombre de usuario debe tener al menos 3 caracteres.');
            return;
        }

        if (password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        // Aquí iría el código para enviar los datos a un servidor.
        // Por ahora, solo mostraremos una alerta de éxito.
        console.log('Datos de registro:', { username, password });
        alert(`¡Registro exitoso para el usuario: ${username}!`);
        
        // Limpiar el formulario después del envío
        registroForm.reset();
    });
});