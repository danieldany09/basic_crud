var MongoClient=require('mongodb').MongoClient;
var url='mongodb://127.0.0.1:27017/';
console.log("MongoDB");

exports.saveData= function (name, email,phone,city,gender, response) {
    
    MongoClient.connect(url,function(err,db){ //Connection to server
    if(err) throw err;
    var dbcon=db.db('ex7');  //opening the db
    var msg="";
    var myobj = {"name":name , "email":email,"phone":phone,"city":city,"gender":gender}; 
    dbcon.collection("users").insertOne(myobj,function(err,res){
        if (err)
        {
            console.log(err);
            msg="Data Not inserted";
        }
        else
        {
            msg=`${name} ${email} ${phone} ${city} ${gender}   ***Inserted***`;
            console.log("Document inserted");
        }
        response.write(`<h1>Data Inserted**</h1>`)
        response.write(msg);
        response.end();
        db.close();
    });
    
    });     
  }; 



exports.updateData = (name,email,phone,city,gender,response) =>{
    MongoClient.connect(url,function(err,db){ //Connection to server
        if(err) throw err;
        var dbcon=db.db('ex7');  //opening the db
        var msg="";
        var myobj ={'phone':phone}
        var myobj1={$set:{"name":name ,'email':email ,"phone":phone,"city":city,"gender":gender}};
        dbcon.collection("users").updateOne(myobj,myobj1,{ upsert: true },
            function(err,res){
            if (err)
            {
                console.log(err);
                msg="Data Not Updated";
            }
            else
            {
                msg=`${name} ${email} ${phone} ${city} ${gender}   ***Updated***`;
                console.log("Document Updated");
            }
            response.write(`<h1>Data Updated</h1>`)
            response.write(msg);
            response.end();
            db.close();
        });
        
        });     
      }; 

exports.deleteData = (phone,response) =>{
    MongoClient.connect(url,function(err,db){ //Connection to server
        if(err) throw err;
        var dbcon=db.db('ex7');  //opening the db
        var msg="";
        var myobj ={'phone':phone}
       
        dbcon.collection("users").deleteOne(myobj,
            function(err,res){
            if (err)
            {
                console.log(err);
                msg="Data Not deleted";
            }
            else
            {
               msg="document deleted"
                console.log("Document deleted");
            }
            response.write(`<h1>Data Deleted !!</h1>`)
            response.write(msg);
            response.end();
            db.close();
        });
        
        });     
      }; 




  exports.showData= function (city, response) {
    
    MongoClient.connect(url,function(err,db){ //Connection to server
    if(err) throw err;
    var dbcon=db.db('ex7');  //opening the db
    var msg="";
    var query 
    if(city){
    query= {"city":city};  
    }else{
        query={}
    }
    console.log(query);
    dbcon.collection("users").find(query).toArray(function(err, result) {
        if (err)
        {
            console.log(err);
            msg="Error!!!";
        }
        else
        {
            console.log(result);
     
            var Length = result.length;
            console.log("Length:"+Length);
            msg=`<table border='1'>
            <tr>
            <td>S.No</td>
            <td>Name</td>
            <td>Phone</td>
            <td>Email</td>
            <td>City</td>
            <td>Gender</td>
            </tr>`;
            for(var i=0; i<Length; i++)
            {
                msg+=`<tr>
                <td>${i+1}</td>
                <td>${result[i].name}</td>
                <td>${result[i].phone}</td>
                <td>${result[i].email}</td>
                <td>${result[i].city}</td>
                <td>${result[i].gender}</td>
                </tr>`;
                 
            }
            msg+="</table>";
            console.log(msg);
        }
        response.write(`<h1>Showing Data </h1>`)
        response.write(msg);
        response.end();
        db.close();
     
      });
    });
        
  }; 


