const asyncHandler = require('express-async-handler');
const jwt_decode = require('jwt-decode');
const User = require('../models/userModel');
const Load = require('../models/loadModel');

authenticate = async (token) => {
    var decoded = jwt_decode(token, process.env.SECRET, true, 'HS256')
    var user = Object.values(decoded)[0]
    const userExists = await User.findOne({user})
    if(userExists){
        return true
    } else{
        return false
    }
}

//@desc     Retrieves list of loads 
//@route    GET /loads
//@access   Public
const getLoad = asyncHandler(async (req,res) => {
    if(req.headers["eleos-platform-key"] != process.env.ELEOS_KEY){
        res.status(401).send("401: Invalid Eleos Platform Key!!");
    }
    else{
        try{
            var token = req.headers.authorization.split("=")[1]
            if(!(await authenticate(token))){
                res.status(401).send("Error: Invalid User Token");
            }
            else{
                res.send(await Load.find().exec())           
            }            
        }catch(error){
            res.status(401);
            res.send(error);
            console.log(error);
        }
    }
});

module.exports = {
    getLoad
}