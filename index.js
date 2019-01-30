// Dependências
const config = require('./config'),
    restify = require('restify'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    corsMiddleware = require('restify-cors-middleware')
const cors = corsMiddleware({
        origins: ['*'],
        allowHeaders: ["Authorization"],
        exposeHeaders: ["Authorization"]
    })
    //Inicializado Restify
const server = restify.createServer({
    name: config.name,
    version: config.version
})
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.jsonBodyParser({ mapParams: true }))
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser({ mapParams: true }))
server.use(restify.plugins.fullResponse())

//Conectando ao servidor
server.listen(config.port, () => {
    const client = new MongoClient(config.db.uri, { useNewUrlParser: true });
    client.connect(function(err) {
        assert.equal(null, err);
        console.log("Conectado com sucesso.");
        const db = client.db(config.db.name);
        require('./routes')({ db, server })
    });
})