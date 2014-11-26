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
        console.log("After Insert"+data);
        res.header("Content-Type:","application/json");
        res.end(JSON.stringify(document));
    });
    db.collection(database.collectionUsers).findOne({own_name:'x'}, function(err, item) {
      console.log("After Find"+item.own_name);
      assert.equal(null, err);
      
      assert.equal('x', item.own_name);
    });
};

