/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/car' , {useNewUrlParser: true});
const Schema = mongoose.Schema;

const db = mongoose.connection;
db.on('error' , console.error.bind(console , 'connection error:'));
db.once('open' , function(){

    console.log("We 're connected! ^__^")
});
//This For USer Information YY
const usersSchema = new Schema({
    username : {   
        firstName   : {type : String, trim : true , required : true},
        lastName    : {type : String , trim : true , required : true},
    },
    email: {
            type: String,
            required: [true, 'Email Field is required'],
            unique:true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
    
        password    : {type : String , required : true }
});

//This Schema for USer Information about the car
const shop = new Schema({

    shopname : {type : String , required : true},
    shoplocation : {type : String , coordinates : [Number] },
    workkinghour : { type : Number},
    specialties : { type : String},
    phoneNumber : {type : Number , required : true}

    
    

});

// const test = new usersSchema({firstName : "yazan" ,lastName : "Najjar" , email : "YAZANANANANAN" , phoneNumber: 123123 , password : "ASSAD" })



const user = mongoose.model('users' , usersSchema);
const shops = mongoose.model('shopinformation' , shop);



let save = (data => {

    for(var i= 0 ; i<data.length ;i++){

        var obj = {

            username   : data[i].username,
             email       : data[i].email,
            password    : data[i].password
        }

        var rebo = new usersSchema(obj);
        rebo.save();
    }
})


module.exports.user  = user;
module.exports.shop = shop;


