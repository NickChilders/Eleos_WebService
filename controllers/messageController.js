const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Message = require('../models/messageModel');

//@desc     Sends message 
//@route    PUT /messages/:handle
//@access   Public
const sendMessage = asyncHandler (async (req, res) => {
    if(req.headers["eleos-platform-key"] != process.env.ELEOS_KEY){
        res.status(401).send("401: Invalid Eleos Platform Key!!");
    }
    else{
        const {
            direction,
            username,
            message_type,
            composed_at,
            platform_received_at,
            body
        } = req.body
        if(!direction || !username || !message_type || !composed_at || !platform_received_at){
            res.status(400)
            throw new Error('Please add all required fields: direction, username, message_type, composed_at, platform_received_at')
        }
        const newMessage = new Message({
            direction: direction,
            username: username,
            message_type: message_type,
            composed_at: new Date().toISOString(),
            platform_received_at: platform_received_at,
            body: body
        })
        newMessage.save()
        .then(res.send({"handle": req.params.handle}));
        //This is just for terminal/exploratory use
        console.log(newMessage)
    }
});

module.exports = {
    sendMessage
}