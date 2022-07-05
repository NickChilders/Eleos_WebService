const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    api_token: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    menu_code: {
        type: String
    },
    dashboard_code: {
        type: String
    },
    custom_settings_form_code: {
        type: String
    },
},
{
    toJSON: {
        transform(doc, ret) {
        delete ret._id;
        },
        versionKey: false,
    },
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
