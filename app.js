const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const gameRoutes = require('./routes/gameRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', gameRoutes)

app.use((req, res, next) => {
    res.status(404).send({ message: 'Something went wrong, please again later!' })
})

app.listen(5000);