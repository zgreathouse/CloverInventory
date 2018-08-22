const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./config/keys');

const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());


//routes
require('./routes/authRoutes')(app);
require('./routes/inventoryRoutes')(app);

//dynamic port binding
const PORT = process.env.PORT || 5000;
app.listen(PORT);
