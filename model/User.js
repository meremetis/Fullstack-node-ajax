//vaze mesa to dependansy gia to connection
var mongoose = require('mongoose');
var uniqueValidator=require('mongoose-unique-validator');//vivliothikh pou elenxei monadikotites dedomenwn
//paei sta unique kai elenxei an einai monadika

require('dotenv').config();//eisagw .env
const uri = process.env.ATLAS_URI//to onoma tis metavliths


//vazw to link ths vashs
//vazw to passeord
//prin to erwtimatiko gramw to onoma ths kolection px 
//admin:<admin>@cluster0.zjiirp0.mongodb.net/[       lessons         ]?retryWrites=true&w=majority
//vazw to uri apo to .env
mongoose.connect(uri, 
{useNewUrlParser:true, //gia na kanei parse ta dedomena pou tha mas erxonte
useUnifiedTopology:true});//epidi exei h vash pola clusters gia na apothikevei se opio tou pei o atlas

const connection = mongoose.connection;
connection.once("open",()=>{
  console.log("Connected to Database Succesfully");
})



//ftiaxnw to sxhma ton dedomenwn mu
var Schema = mongoose.Schema;
var userSchema = new Schema({
  username:{
    type:String,
    required:[true,'Username is required field'],
    trim:true,
    lowercase:true,
    unique:true
  },
  name:{
    type:String,
    required:[true,'Name is required field'],
  },
  surname:{
    type:String,
    required:[true,'Surame is required field'],
  },
  category:{
    type:String,
    required:[true,'Category is required field'],
  },
  email:{
    type:String,
    required:[true,'Category is required field'],
    trim:true,
    lowercase:true,
    unique:true,
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,//regular expresion gia email
    "Email address is not valid"]   
  },
});


 userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

