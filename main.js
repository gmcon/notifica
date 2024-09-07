// Al pulsar el botón, verifica las notificaciones
document.getElementById('check-notifications').addEventListener('click', () => {
    fetch('/api/notificaciones')
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerHTML = data.mensaje;
            registrarInteraccion(); // Llamamos la función para registrar
        })
        .catch(error => {
            console.error('Error al obtener notificaciones:', error);
        });
});

// Función para registrar la interacción del alumno
function registrarInteraccion() {
    fetch('/api/registrar', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            console.log('Interacción registrada:', data);
        })
        .catch(error => {
            console.error('Error al registrar interacción:', error);
        });
}

// Registrar el Service Worker para convertir la web en PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('Service Worker registrado con éxito:', registration);
            })
            .catch(error => {
                console.log('Fallo al registrar el Service Worker:', error);
            });
    });
}
