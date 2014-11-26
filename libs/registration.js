var database = require('../controllers/database.js');


exports.userRegistration = function(Server, data, res) {
    console.log("data"+data);
    console.log("Server"+Server);
    if (data ==='undefined') {
        console.error('Registration information not supplied ' + data);
        res.status(500).send('Invalid request sent. '  +
                             'Please check your JSON data and try again');
        return;
    }

    var db = Server.db;
    db.collection(database.collectionUsers).insert(data, function(err, document){
        if (err) {
            console.error(err);
            return;
        }
        res.header("Content-Type:","application/json");
        res.end(JSON.stringify(document));
    });
};

