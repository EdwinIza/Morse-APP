const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000; // Puedes ajustar el puerto según tus necesidades

// Configura el proxy para redirigir las solicitudes a tu URL de envío de correos electrónicos
app.use('/api', createProxyMiddleware({
  target: 'https://56805718008-o9scf0ii6pnq90o5eu4ne6a767ro0e1h.apps.googleusercontent.com-email-api-url.com',
  changeOrigin: true,
}));

// Configura los encabezados CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100'); // Reemplaza con la URL de tu aplicación Ionic
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor intermedio escuchando en el puerto ${port}`);
});
