var http=require('http');
var mongo = require('mongodb');
var dateFormat = require('dateformat');
var mongoUri = 'mongodb://localhost/contactspro'; //Database connection
function handle(req,res)
{
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
			var con=mongo.Db.connect(mongoUri,function (err,con){

			var types=json.types;
			var name=json.own_name;
			var ph_no=json.own_no;
			var mail_address=json.own_email;
			var address_detail=json.own_address;
			var imei=json.own_imei;

			console.log("s2");
			var a = con.collection('telephone_directory');
			console.log("s3");
			 var dat=dateFormat(Date(),"yyyy-mm-dd");
var d='Hello World';
			a.insert({"contact_id":dat,"name":name,"ph_no":ph_no},function(e,o){
			//var cursor=a.find( { ph_no: "ph_no" } );
				var p="9765782";
				d = 'Hello Siva!';
				console.log(d)
				 cursor = a.find( { "ph_no": ph_no}).limit(1);
				 cursor.each(function(err, doc) {
				  if(err) throw err;
				  if(doc != null)
				  { console.log(doc);
				   // d=doc.ph_no; 
				    console.log(doc.ph_no);
				   }
				  if(doc == null)
				  { console.log("null"+doc);
				  }

			 });
			console.log(d);
		//console.log("cur:"+cursor);
		/*
		if(e)
		{ console.log("error"+e);

		 }
		else
		{ console.log("Inserted"); }
		*/
		});
	 });
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
	}
	);//req.on("end"
}//function handle
var s=http.createServer(handle);
s.listen(8000);
console.log("Server listening for 8000");
