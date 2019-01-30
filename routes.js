module.exports = function(ctx) {
    const assert = require('assert');
    // extract context from passed in object
    const db = ctx.db,
        server = ctx.server

    // assign collection to variable for further use
    const collection = db.collection('events')

    //definindo post
    server.post('/events', (req, res, next) => {
        // adicionando timestamp aos dados inseridos
        const data = Object.assign({}, req.params, {
            timestamp: new Date()
        })
        console.log(data);
        // inserindo obj na collection
        collection.insertOne(data)
            .then(doc => res.send(200, doc.ops[0]))
            .catch(err => res.send(500, err))
        next()
    })

    //definindo get do autocomplete
    server.get('/auto', (req, res, next) => {

        let limit = parseInt(req.query.limit, 20) || 20, // limintando os registros da sugestão            
            qry = req.query || {};
        let val = qry.event;
        qry.event = { '$regex': val, '$options': 'i' }; //implementar busca contida
        collection.distinct('event', qry) //trazendo apenas registros unicos
            .then(docs => res.send(200, docs))
            .catch(err => res.send(500, err))

        next()

    })

}