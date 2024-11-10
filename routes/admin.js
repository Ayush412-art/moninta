const express = require('express');
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require('../db');
const router = express.Router();

// Admin Routes
router.post('/signup',async (req, res) => {
    const {username , password} = req.body;
    const isAdmin =  await Admin.find({username : username});
    if(isAdmin.length >= 1){
       return res.send({msg : "user already exists"})
        
    }
    await Admin.create({username : username , password : password})

    res.status(200).json({msg: "user created sucessfully"})
    

});

router.post('/courses', adminMiddleware, async(req, res) => {
    const {title , description , price , imglink  } = req.body;
    const course = await Course.create({title : title , description : description , price : price , imageLink : imglink})
    res.status(200).json({msg : "course created sucessfully" , courseId : course._id})

});

router.get('/courses', adminMiddleware, async(req, res) => {
   const allCourses = await Course.find({});
   res.send(allCourses);
});

module.exports = router;