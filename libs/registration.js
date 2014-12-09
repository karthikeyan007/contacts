var database = require('../controllers/database.js');


exports.userRegistration = function(Server, data, res) {
   
    if (data ===undefined ) {
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
        console.dir(data);
        res.header("Content-Type:","application/json");
        res.end(JSON.stringify(document));
    });
};
//multiply 2 variables
exports.multiply = function (multiplier1, multiplier2) {
 return 6;
};

