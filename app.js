require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const successAlert = () => {
    console.log(`Server listening on port ${port}`);
}

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URL, {useMongoClient: true})
    .then(() => console.log("Successfully connected to mongodb"))
    .catch(e => console.error(e));

app.listen(port, successAlert);