const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    direction: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    message_type: {
        type: String,
        required: true
    },
    body: {
      type: String,
      required: false
    },
    composed_at: {
        type: String,
        required: true
    },
    platform_received_at:{
        type: String,
        required: true
    }
},
{
    timestamps: true
})
//By default, Mongoose makes the collection plural and lowercase unless specified.
//Collection therefore, is 'messages'
module.exports = mongoose.model('Messages', messageSchema)