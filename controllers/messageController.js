const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Message = require('../models/messageModel');

var duplicateHandle = "";

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
        
        //Checking for duplicate handles to avoid duplicate requests
        if(duplicateHandle == req.params.handle){
            res.status(400)
            throw new Error('Handle has already been used. Possible duplicate. Ignore.')
        }
        else{
            duplicateHandle = req.params.handle 
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