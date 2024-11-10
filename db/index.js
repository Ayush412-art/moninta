const mongoose = require('mongoose');



const AdminSchema = new mongoose.Schema({
   username : {
    type : String,
    required : true
   },
   password : {
    type : String,
    required : true
   }
});

const UserSchema = new mongoose.Schema({
   username : {
    type : String,
    requires : true
   },
   password : { 
    type : String,
    required : true
   },
   coursePurchase : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'course'
    }
   ]

   
   
});

const CourseSchema = new mongoose.Schema({
 
  title : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  price : {
    type : Number, 
    default : 0,
    required : true
  },
  imageLink : {
    type : String,
    required : true
  }

} ,{timestamps : true});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}