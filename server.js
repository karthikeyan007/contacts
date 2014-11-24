#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var mongo   = require('mongoskin');
//server4.js
/**
 *  Define the sample application.
 */
var SampleApp = function() {
    //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    
self.setupVariables = function()
 {
        //  Set the environment variables we need.
        self.ipaddress      = process.env.OPENSHIFT_NODEJS_IP;
        self.port           = process.env.OPENSHIFT_NODEJS_PORT || 8080;
   
//        self.mu             = require('mu2');
//        self.mu.root        = __dirname + "/templates";

        self.connection_string = '127.0.0.1:27017/YOUR_APP_NAME';
        // if OPENSHIFT env variables are present, use the available connection info:
        if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD)
        {
            self.connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
                                     process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
                                     process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
                                     process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
                                     process.env.OPENSHIFT_APP_NAME;
        }

        if (typeof self.ipaddress === "undefined")
        {
           
            self.ipaddress = "127.0.0.1";
        }
    };
  self.initializeDB = function() 
       {
           
        require('mongodb').MongoClient.connect('mongodb://' + self.connection_string, function(err, db) 
           {
            if(err) throw err;
            self.db = db;
            self.db.collection('contactspro').insert({"name":"David", "title":"About MongoDB"},
          function(err, doc)
          {
            if (err)
            {
                console.dir(err); 
                return;
            }
 	
            console.log("Contacts Created!!!");
         });
           });
       };


    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function()
     {
        self.routes = { };

        self.routes['/asciimo'] = function(req, res) {
           var link = "http://i.imgur.com/kmbjB.png";
          
         //    res.write("hai");
        
            res.send("<html><body><img src='" + link + "'></body></html>");
        };

        self.routes['/'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('index.html') );
        };
      

    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function()
     {
        self.createRoutes();
        self.app = express.createServer();

        //  Add handlers for the app (from the routes).
        for (var r in self.routes) 
            {
            self.app.get(r, self.routes[r]);
             }
        self.app.post('/regi',function(req,res)
        {  
            res.write("Regi");
            var jsondata="";
            req.on("readable",function()
                {
                var d=req.read();
                res.write("d1:"+d);
                if(typeof d=='string')
                {
                 jsondata+=d;
                }
                else if(typeof d=='object' && d instanceof Buffer)
                {
                jsondata+=d;
                }
                res.write("d2:"+d);
                });//req.on("readable


            req.on("end", function()
                { 
                 res.write("end function");
                  var out='';
                  var docid='';
                  var docid1='';
                 if(!jsondata)
                 {
                     out="i got no form data";
                 }
                 else
                 {
                    var json;
                    try
                    {
                     json=JSON.parse(jsondata);
                    
                    var types=json.types;
                    var name=json.own_name;
                    var ph_no=json.own_no;
                    var mail_address=json.own_email;
                    var address_detail=json.own_address;
                    var imei=json.own_imei;
                     }
                    catch(e)
                    {
                    }
                    if(!json)
                    {
                         out="Invalid json";
                    }
                    else
                    {
                    out="valid json"+jsondata;
                    }
                    } 
                    ////mongodb').MongoClient.connect
                require('mongodb').MongoClient.connect('mongodb://' + self.connection_string, function(err, db) 
                    {
                    if(err) throw err;
                    self.db = db;

                    self.db.collection('contactspro').insert({"name":name, "title":ph_no},
                    function(err, doc)
                    { 
                        
                        if (err)
                        {
                        console.dir(err); 
                        return;
                        }
                   
                    });
               
                    });
                 //////
                         res.write("insert");
                        res.write("doc_id"+doc.name);
                        res.write("doc_id"+doc.title);
                         //res.write("doc_id1"+docid1);
                res.end(out);
                });//res(end)
        
        });//post  
   
    };//initialize


    /**
     *  Initializes the sample application.
     */
    self.initialize = function()
    {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();
        self.initializeDB();
        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() 
    {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function()
        {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

 };   /*  Sample Application.  */



/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();

