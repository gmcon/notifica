const express = require('express');
const app = express();
const port = 3000;

let interacciones = 0;
let notificacionActual = "No hay nuevas notificaciones.";

// Middleware para servir archivos estáticos como HTML, CSS, y JS
app.use(express.static(__dirname));

// API para obtener notificaciones
app.get('/api/notificaciones', (req, res) => {
    res.json({ mensaje: notificacionActual });
});

// API para registrar la interacción del usuario
app.post('/api/registrar', (req, res) => {
    interacciones += 1;
    res.json({ mensaje: `Interacción registrada. Total: ${interacciones}` });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

// nueva notificacion
app.post('/api/actualizar-notificacion', express.json(), (req, res) => {
    const nuevaNotificacion = req.body.notificacion;
    if (nuevaNotificacion) {
        notificacionActual = nuevaNotificacion;
        res.json({ mensaje: 'Notificación actualizada correctamente.' });
    } else {
        res.status(400).json({ mensaje: 'Error: Notificación no proporcionada.' });
    }
});
