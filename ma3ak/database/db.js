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
        firstName   : {type : String, trim : true , required : true},
        lastName    : {type : String , trim : true , required : true},
        email: {
            type: String,
            required: [true, 'Email Field is required'],
            unique:true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },

        phoneNumber : {type : Number , unique : true},
        password    : {type : String , required : true }
});

//This Schema for USer Information about the car
const InfoCar = new Schema({

    carType : {type : String , required : true},
    carModel : {type : String , required:true},
    carYear : {type : Number , required : true},
    address : {type : String , required : true},
    streetName : {type : String , required : true},
    area : {type:String , required :true}

});

// const test = new usersSchema({firstName : "yazan" ,lastName : "Najjar" , email : "YAZANANANANAN" , phoneNumber: 123123 , password : "ASSAD" })



const user = mongoose.model('users' , usersSchema);
const infoCar = mongoose.model('infoCar' , InfoCar);



let save = (data => {

    for(var i= 0 ; i<data.length ;i++){

        var obj = {

            firstName : data[i].firstName,
            lastName :  data[i].lastName,
            email :     data[i].email,
            phoneNumber : data[i].phoneNumber,
            password : data[i].password
        }

        var rebo = new usersSchema(obj);
        rebo.save();
    }
})


module.exports.user  = user;
module.exports.InfoCar = InfoCar;


