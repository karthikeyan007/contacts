var registration = require('../libs/registration.js');
var contacts     = require('../libs/contacts.js');
var cache        = require('./cache.js');

exports.createRoutes = function (Server) {
    ///Attach GET routes
    attachGetRoutes(Server);

    ///Attach POST routes
    attachPostRoutes(Server);
    attachPostRoutes1(Server);
    
  
    

    ///Add more routes here

};

function attachGetRoutes(Server) {
    Server.app.get('/', function (req, res) {
        res.setHeader('Content-Type', 'text/html');
        res.send(cache.get_cache('index.html'));

    });
}

function attachPostRoutes(Server) {
    Server.app.post('/registration', function (req, res) {
        console.dir(req.body);
        registration.userRegistration(Server, req.body, res);
    });
}
function attachPostRoutes1(Server) {
    Server.app.post('/contacts', function (req, res) {
        console.dir(req.body);
       contacts.usercontacts(Server, req.body, res);
    });
}

