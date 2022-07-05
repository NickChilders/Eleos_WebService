const asyncHandler = require('express-async-handler')
const jwt_decode = require('jwt-decode');
const jwt_encode = require('jwt-encode');
const User = require('../models/userModel')

//@desc     Makes new user in database. Just for exploratory purposes. 
//@route    POST /user
//@access   Public
const registerUser = asyncHandler( async(req, res) => {
    const {
        api_token,
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

//@desc     Get authenticates user data
//@route    GET /authenticate/:token
//@access   Private
const getMe = asyncHandler(async(req, res) => {
    const token = req.params.token
    //troubleshooting
    console.log(req.headers)
    if(req.headers["eleos-platform-key"] != process.env.SECRET){
        //troubleshooting
        console.log(req.headers)
        res.status(401).send(`${req.headers}401: Invalid Eleos Platform Key!!`);
    }
    else{
        try{
            var decoded = jwt_decode(token)
            var userValue = Object.values(decoded)
            var user = await User.findOne({username: decoded.username, full_name: decoded.full_name})

            var encoded = jwt_encode({username: user.username, full_name: user.full_name}, process.env.SECRET, 'HS256')
            //Just for terminal use
            const response = {
                api_token: encoded,
                username: user.username,
                full_name: user.full_name,
                menu_code: user.menu_code,
                dashboard_code: user.dashboard_code,
                custom_settings_form_code: user.custom_settings_form_code
            }
            //troubleshooting
            console.log(req.headers)
            res.send(response)
        } catch (error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
})

//Generate JWT. This is just for exploratory purposes for register user.
const generateToken = (username, full_name) => {
    return jwt_encode({ username, full_name }, process.env.SECRET, 'HS256')
}

module.exports = {
    registerUser,
    getMe
}
