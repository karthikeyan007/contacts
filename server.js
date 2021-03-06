#!/bin/env node

var express    = require('express');
var database   = require('./controllers/database.js');
var routes     = require('./controllers/routes.js');
var cache      = require('./controllers/cache.js');
var bodyParser = require('body-parser');

/**
 *  Define the ContactsPro application.
 */
var ContactsProApp = function () {
    // Global Scope.
    var self = this;

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    
    self.setupVariables = function ()
    {
        if (process.env.OPENSHIFT_APP_NAME === undefined) {
            self.APP_NAME = 'ContactsPro';
        }
        //  Set the environment variables we need.
        self.ipaddress      = process.env.OPENSHIFT_NODEJS_IP;
        self.port           = process.env.OPENSHIFT_NODEJS_PORT || 8080;
        if (typeof self.ipaddress === "undefined") {
            self.ipaddress = "127.0.0.1";
        }
    };

    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function (sig) {
        if (typeof sig === "string") {
            console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
            process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()));
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function () {
        //  Process on exit and signals.
        process.on('exit', function () { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function (element, index, array) {
            process.on(element, function () { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Initializes the sample application.
     */
    self.initialize = function ()
    {
        self.setupVariables();
        cache.populateCache();
        
        self.setupTerminationHandlers();

        // Initialize database
        database.initializeDB(self);

        // Create the express server and routes.
        self.app = express();
        self.app.use(bodyParser.json());
        self.app.use(bodyParser.urlencoded({ extended: true })); 
        routes.createRoutes(self);
    };

    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function ()
    {   console.log("Node server started");
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function ()
        {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now()), self.ipaddress, self.port);
        });
    };
};   /*  ContactsPro Application.  */



/**
 *  main():  Main code.
 */
var contacts_app = new ContactsProApp();
contacts_app.initialize();
contacts_app.start();

