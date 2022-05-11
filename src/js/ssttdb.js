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
        if(newSSTT){
            /* console.log(newSSTT) */
        }
    })
}

exports.getSSTTs = function(op){
    ssttdb.find({}, (err, newSSTT) => {
        /* console.log(newSSTT) */
        if(newSSTT){
            op(newSSTT)
        }
    })
}

exports.deleteSSTTs = function(op){
    ssttdb.remove({}, {multi: true}, function(err, numRemoved){
        console.log(numRemoved)
    })
}
