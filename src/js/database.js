const Datastore = require('nedb')

let db = new Datastore({
    filename: 'db/database.db',
    autoload: true
})

exports.addClient = function(idCall, phone, name, rut, comuna){
    var client = {
        idCall: idCall,
        phone: phone,
        name: name,
        rut: rut,
        comuna: comuna
    }
    db.insert(client, function(error, newObject){
        /* console.log(newObject) */
    })
}

exports.getClient = function(op) {
    db.find({}, function(error, clients){
        if(clients){
            op(clients);
        }
    })
}