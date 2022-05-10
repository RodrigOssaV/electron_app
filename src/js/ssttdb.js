const Datastore = require('nedb')

let ssttdb = new Datastore({
    filename: 'db/ssttdb.db',
    autoload: true
})

exports.addSSTT = function(name, description){
    var sstt = {
        name: name,
        description: description
    }
    ssttdb.insert(sstt, function(err, newSSTT){
        
    })
}
