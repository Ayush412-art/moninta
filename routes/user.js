const express = require('express');
const router = express.Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db")
// User Routes
router.post('/signup', async(req, res) => {
   const {username , password} = req.body;
   const isUser = await User.find({
    username : username
   })
   if(isUser.length >= 1){
    return res.status(401).send({msg : "user already exists"})
   }
   await User.create({
    username : username,
    password : password
   }).then(()=>{
    res.status(200).send({msg : "user created sucessfully"})
   }) 
   .catch((err)=>{
    res.send({err})
   })
});

router.get('/courses', async(req, res) => {
   const course = await Course.find({})
   res.send(course);
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    const courseID = req.params.courseId;
    const {username} = req.body
   await User.updateOne({
        username : username
    },{
           "$push" : {coursePurchase : courseID}
    }).then(()=>{
        res.status(200).send({msg:"purchased sucessfully"})
    })
    .catch((err)=>{
        console.log(err)
    })
    

});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    const {username} = req.body
    const user = await User.findOne({username : username})
   const courseid =  user.coursePurchase
    const courses = await Course.find({
        _id : {"$in" : courseid}
    })
  

    res.json({courses})
});

module.exports = router