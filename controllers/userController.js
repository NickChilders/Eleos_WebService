const asyncHandler = require('express-async-handler')
const jwt_decode = require('jwt-decode');
const jwt_encode = require('jwt-encode');
const User = require('../models/userModel')


//Generate JWT. 
//This is just for personal exploratory purposes to make a user.
const generateToken = (username, full_name) => {
    return jwt_encode({ username, full_name }, process.env.SECRET, 'HS256')
}

//@desc     Makes new user in database. Just for exploratory purposes. 
//@route    POST /user
//@access   Public
const registerUser = asyncHandler( async(req, res) => {
    const {
        username, 
        full_name,
        menu_code,
        dashboard_code,
        custom_settings_form_code} = req.body

    if(!username) {
        res.status(400)
        throw new Error('Please add a username')
    }
    
    //Check if user exists
    const userExists = await User.findOne({username})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    if(!full_name) {
        res.status(400)
        throw new Error("Please add user's full_name")
    }

    //Create User
    const user = await User.create({
        api_token: generateToken(username, full_name), 
        username,
        full_name,
        menu_code,
        dashboard_code,
        custom_settings_form_code
    })
    if(user){
        user.api_token = 
        res.status(201).json({
            _id: user.id,
            api_token: user.api_token,
            username: user.username,
            full_name: user.username,
            menu_code: user.menu_code,
            dashboard_code: user.dashboard_code,
            custom_settings_form_code: user.custom_settings_form_code
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
});

//@desc     Authenticates user data
//@route    GET /authenticate/:token
//@access   Private
const getAuth = asyncHandler(async(req, res) => {
    const token = req.params.token
    if(req.headers["eleos-platform-key"] != process.env.ELEOS_KEY){
        res.status(401).send("401: Invalid Eleos Platform Key!!");
    }
    else{
        try{
            var decoded = jwt_decode(token)
            var user = Object.values(decoded)[0]
            const userExists = await User.findOne({user})
            if(!userExists){
                res.status(401)
                throw new Error(`User: ${userExists} does not exist`)
            }
            encoded = jwt_encode({"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": Object.values(decoded)[0], "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": Object.values(decoded)[1]}, process.env.SECRET, 'HS256');
           const response = {
                api_token: encoded,
                full_name: Object.values(decoded)[1]
            }
            res.send(response)
        } catch (error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
});

module.exports = {
    registerUser,
    getAuth
}
