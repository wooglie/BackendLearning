const express = require('express');
const graphql = require('express-graphql');

const schema = require("./schema/schema");

const PORT = 4444;
const server = express()

server.use("/graphql", graphql({
    schema: schema,
    graphiql: true
}));

server.listen(PORT, console.log("Running on " + PORT))