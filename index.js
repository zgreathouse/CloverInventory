const express = require('express');
const router = express.Router();

const app = express();

//middlewares
app.use(router);
app.use(express.static('frontend'));

//routes
require('./routes')(app);

app.listen(5000);
