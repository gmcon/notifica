const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para servir archivos estáticos (como style.css)
app.use(express.static('public'));

// Función para registrar la IP del alumno
function registrarIP(req) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;  // Capturar IP
    const fecha = new Date().toISOString();  // Obtener fecha y hora
    const log = `Fecha: ${fecha}, IP: ${ip}\n`;

    // Guardar la IP en un archivo de log
    fs.appendFile('registro_ips.txt', log, (err) => {
        if (err) {
            console.error('Error al registrar la IP:', err);
        } else {
            console.log('IP registrada:', log);
        }
    });
}

// Ruta para obtener las notificaciones en formato JSON
app.get('/api/notificaciones', (req, res) => {
    // Registrar la IP cada vez que un alumno accede a esta ruta
    registrarIP(req);

    const filePath = path.join(__dirname, 'notificacion.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo notificacion.json:', err);
            return res.status(500).json({ error: 'Error al leer la notificación.' });
        }

        try {
            const notificacion = JSON.parse(data).notificacion;
            res.json({ mensaje: notificacion });
        } catch (jsonErr) {
            console.error('Error al parsear el archivo JSON:', jsonErr);
            res.status(500).json({ error: 'Error al procesar la notificación.' });
        }
    });
});

// Ruta principal para mostrar el contenido en HTML
app.get('/', (req, res) => {
    // Registrar la IP cada vez que un alumno accede a la página principal
    registrarIP(req);

    const filePath = path.join(__dirname, 'notificacion.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo notificacion.json:', err);
            return res.status(500).send('Error al leer la notificación.');
        }

        try {
            const notificacion = JSON.parse(data).notificacion;
            res.send(`<h1>Notificación actual: ${notificacion}</h1>`);
        } catch (jsonErr) {
            console.error('Error al parsear el archivo JSON:', jsonErr);
            res.status(500).send('Error al procesar la notificación.');
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
