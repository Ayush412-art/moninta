const {User}  = require("../db");

function userMiddleware(req, res, next) {
    
            const {username , password} = req.headers;
          const user =   User.find({
                username : username,
                password : password
            })
            if(user){
            
                next();
            }
            else{
                res.status(403).send({msg : "Invalid information "})
            }
        
    
  
}

module.exports = userMiddleware;