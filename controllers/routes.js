var registration = require('../libs/registration.js');

exports.createRoutes = function (Server) {
    ///Attach GET routes
    attachGetRoutes(Server);

    ///Attach POST routes
    attachPostRoutes(Server);

    ///Add more routes here

};

function attachGetRoutes(Server) {
    Server.app.get('/', function (req, res) {
        res.setHeader('Content-Type', 'text/html');
        res.send(Server.cache_get('index.html'));
    });
}

function attachPostRoutes(Server) {
    Server.app.post('/registration', function (req, res) {
        var data = req.body;
        registration.userRegistration(Server, data, res);
    });
}