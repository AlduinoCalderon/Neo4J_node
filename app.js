const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nodeRoutes = require('./routes/nodeRoutes');

const app = express();

// Configuración del motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Usar las rutas definidas
app.use('/', nodeRoutes);

// Iniciar el servidor
app.listen(3001, () => {
  console.log('Server started on port 3001');
});
