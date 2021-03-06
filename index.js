const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const fileStream = require('fs');
const PORT = 3000;
let accessLogStream = fileStream.createWriteStream(
	path.join(__dirname, 'dataLogs.log'),
	{ flags: 'a' }
);
let customersRouter = require('./customers/router');
let productsRouter = require('./products/router');
let app = express();

app.set('view-engine', 'ejs');

app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/customers', customersRouter);
app.use('/products', productsRouter);

app.listen(PORT, function() {
	console.log('Server running on port: ' + PORT);
});
