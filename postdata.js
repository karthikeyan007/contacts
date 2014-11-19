var http=require('http');
var mongo = require('mongodb');
var dateFormat = require('dateformat');
var mongoUri = 'mongodb://localhost/karthick'; //Database connection
function handle(req,res)
{
var formdata="";
req.on("readable",function()
{
var d=req.read();
if(typeof d=='string')
{
formdata+=d;
}
else if(typeof d=='object' && d instanceof Buffer)
{
formdata+=d;
}
}
);


req.on("end",
function()
{
var out='';
if(!formdata)
{
out="i got no form data";
}
else
{
var json;
try
{
json=JSON.parse(formdata);
/*var name=json.name;
//res.write(name);
no=json.number;
//res.write(no);
email=json.email;*/
var a='';
var name='';
var email='';
var no='';
var cou='';
var Arr=[];


var con=mongo.Db.connect(mongoUri,function (err,con){
console.log("s2");
var a = con.collection('register');


for (var i=0; i<json['sync_contact_list'].length; i++)
{
name=json.sync_contact_list[i]['name'];
 no=json.sync_contact_list[i]['number'];
city=json.sync_contact_list[i]['city'];
cou=json.sync_contact_list[i]['country'];


//collection.update({_id:"123"}, {$set: {author:"Jessica"}});
//a.update({"name":'sonu'},{$set: {"title":'welcome'}},function(e,o){});
console.log("s3");
//a.insert({"name":"qmax","mobile":"222","city":'chennai',"country":"india"},function(e,o){
 

 var dat=dateFormat(Date(),"yyyy-mm-dd");

a.insert({"Dare":dat,"name":name,"mobile":no,"city":city,"country":cou},function(e,o){
if(e)
{ console.log("error"+e); }
else
{ console.log("Inserted"); }
});


console.log("s4");

Arr.push(json.sync_contact_list[i]);
 }
 
 });
console.log("s1");
//app.post("/",function(req,res){
/*
var con=mongo.Db.connect(mongoUri,function (err,con){
console.log("s2");
var a = con.collection('register');
//collection.update({_id:"123"}, {$set: {author:"Jessica"}});
//a.update({"name":'sonu'},{$set: {"title":'welcome'}},function(e,o){});
console.log("s3");
a.insert({"name":"qmax","mobile":"222","city":'chennai',"country":"india"},function(e,o){
if(e)
{ console.log("error"+e); }
else
{ console.log("Inserted"); }
});

});*/
//});




var a2='';
a2={'sync':Arr};
//a.push(sync,Arr);
//var b=JSON.stringify(Arr);
var b=JSON.stringify(a2);
//a.push(sync,b);
res.write(b);
//res.write(JSON.stringify(a));
//res.write(email);

//res.write(formdata);
//res.write(JSON.stringify(a));
//console.log(json.name);
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
out="valid json"+formdata;

}
}




res.end(out);
}
);
}
var s=http.createServer(handle);
 s.listen(8000);
		console.log("Server listening for 8000");
