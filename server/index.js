const express = require("express");
require('dotenv').config();
const port = process.env.PORT || 4000;
const colors = require('colors');
const connectDB = require('./config/db.js');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema.js');
const app = express();
const cors = require("cors");

connectDB();

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log("Listening........"))

