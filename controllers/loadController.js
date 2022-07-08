const asyncHandler = require('express-async-handler');
const jwt_decode = require('jwt-decode');
const jwt_encode = require('jwt-encode');
const User = require('../models/userModel');
const Load = require('../models/loadModel');

authenticate = async (token) => {
    var decoded = jwt_decode(token, process.env.SECRET, true, 'HS256')
    var user = await User.findOne({username: Object.values(decoded)[0], full_name: Object.values(decoded)[1]})
    if(user.username == Object.values(decoded)[0]){
        return true
    } else{
        return false
    }
}

//@desc     Retrieves list of loads 
//@route    GET /loads/
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
                Load.find()
                .then(loads => res.send(loads))
                .catch((error) => {
                    res.status(401);
                });
                //Just for terminal use
                Load.find()
                .then(consoleLoads => console.log(consoleLoads))
            }
        }catch(error){
            console.log(error);
            res.send(error);
        }
    }
});

module.exports = {
    getLoad
}