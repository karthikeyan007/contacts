var mongoClient = require('mongodb').MongoClient;

exports.collectionUsers = 'Users';

exports.initializeDB = function (Server) {
    var connection_string = '127.0.0.1:27017/' + Server.APP_NAME;

    if (process.env.OPENSHIFT_APP_NAME !== undefined) {
        connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
                        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
                        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
                        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
                        process.env.OPENSHIFT_APP_NAME;
    }
    mongoClient.connect('mongodb://' + connection_string, function (err, db) {
        if (err) throw err;
        Server.db = db; //Save DB in global context
    });
}