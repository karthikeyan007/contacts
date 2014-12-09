var database = require('../controllers/database.js');


exports.usercontacts = function(Server, data, res, req) {
   
    if (data ===undefined ) {
        console.error('Contacts information not supplied ' + data);
        res.status(500).send('Invalid request sent. '  +
                             'Please check your JSON data and try again');
        return;
    }
    var jsondata="";
	req.on("readable",function()
	{
		var d=req.read();
		if(typeof d=='string')
		{
			jsondata+=d;
		}
		else if(typeof d=='object' && d instanceof Buffer){
			jsondata+=d;
		}
	});//req.on("readable


	req.on("end", function()
	{
	var out='';
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

			
				
		    cursor.each(function(err, doc) {
			    if(err) throw err;
			    if(doc != null)
			    {
                                console.log(doc);
				   // d=doc.ph_no; 
				    console.log(doc.ph_no);
				   }
				  if(doc == null)
				  { console.log("null"+doc);
				  }

			   });
			console.log(d);
            
		
	
	console.log("s1");


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

	res.end(out);
	});//req.on("end"
   var db = Server.db;
    db.collection(database.collectioncontacts).insert(data, function(err, document){
        if (err) {
            console.error(err);
            return;
        }
       
       console.dir(data);
        res.header("Content-Type:","application/json");
        res.end(JSON.stringify(document));
    });
};
