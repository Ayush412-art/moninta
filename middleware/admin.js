// Middleware for handling auth
const {Admin} = require('../db')
async function adminMiddleware(req, res, next) {
    //
        const {username , password} = req.headers;
       await Admin.find({
         username : username,
         password : password
        }).then((value)=>{
            if(value){
                next();
            }
            else{
                    res.status(401).json({msg: "unauthorized"})
            }
        })
        
    

}

module.exports = adminMiddleware;