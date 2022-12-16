//********************* Imports*********************//
var express = require("express");
var app = express();
var User = require('./model/User.js');//kalo to module pou euriaksa to opio kanei to connection

var bodyParser = require('body-parser');//epidi tha exoume post metavlites 
app.use(bodyParser.json());//nomizw midle ware
app.use(bodyParser.urlencoded({extended:true}));//emnergopiw kliseis apo post


//********************* Setting Cors Policy *********************//
//Who can use our server

const cors = require('cors');
app.use(cors({
  origin:'*'
}));





//********************* Default Page Load *********************//
//anigei apo to files to idnex
app.use('/', express.static('files'));









app.post('/user/update', (req,res)=>{
  console.log('Update user');

  const username = req.body.username;
  console.log('Update user with username ', username);

  User.findOne({'username':username}, (err, user) =>{
    if (err) {
      console.log('Problem in removing user', err);
      res.json({'status':false, 'data':err});
    }
    else
    {
      user.name = req.body.name;
      user.surname = req.body.surname;
      user.category = req.body.category;
      user.email = req.body.email;
      
      user.save((err)=>
      {
        if (err) {
          res.json({'status':false, 'data':err});
        }
        else
        {
          res.json({'status':true, 'data':user});
        }
      })

    }

  });
});











app.delete('/user/delete', (req,res)=>{
  console.log('delete user');

  const username = req.query.username;
  console.log('Delete user with username ', username);

  User.findOneAndRemove({'username':username}, (err, user) =>{
    if (err) {
      console.log('Problem in removing user', err);
      res.json({'status':false, 'data':err});
    }
    else
    {
      res.json({'status':true, 'data':user});
    }
  });
});



















//********************* Insert All Users *********************//

app.get('/user/findAll', (req,res)=>{
  console.log('get all users');

  //einai dilomeno epano
  //fernei olous tus users
  //einai edolh mongo db
  User.find((err, allusers) =>{
    if (err) {
      console.log('Error in find all users', err);
      res.json({'status':false, 'data':err})
    }
    else
    {
      res.json({'status':true, 'data':allusers})
    }
  })
});

//********************* Insert One User *********************//
app.get('/user/findOne', (req,res)=>{
  console.log('Find a user');

  const username = req.query.username;

  console.log('Find user with username : ' , username);

  //edolh mongo db gia na vriskei enan
  User.findOne({'username':username}, (err, user)=>{
    if (err) {
      console.log('Error in find user ', username);
      res.json({'status':false, 'data':user});
    }
    else
    {
      res.json({'status':true, 'data':user});
    }
  })
})


//********************* Insert Data *********************//
//kanei isagwgh dedomenwn
app.post('/user/create', (req,res)=>{
  console.log("Insert user", req.body);
  const username = req.body.username;
  console.log("Insert user with username : ", username);

  let newUser = new User ({
    username: req.body.username,
    name: req.body.name,
    surname: req.body.surname,
    category: req.body.category,
    email: req.body.email
  })

  //ekorei tis times
  //einai edolh mongo db
  newUser.save((err)=>{
    if (err) {
      console.log('Error in inserting user', err);
      res.json({'data':err, 'status':false});
    }
    else
    {
      res.json({'data':newUser,'status':true});
    }
  })
});




//********************* Local Server Port *********************//
app.listen(3000, ()=>{
  console.log('Listening on port 3000');
})