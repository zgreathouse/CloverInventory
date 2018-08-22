const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('frontend'));

//routes
require('./routes/authRoutes')(app);

//dynamic port binding
const PORT = process.env.PORT || 5555;
app.listen(PORT);
