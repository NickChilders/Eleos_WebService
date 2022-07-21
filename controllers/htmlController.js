const asyncHandler = require('express-async-handler')
var path = require('path')

//Send html page
const getHomePage = asyncHandler( async(req,res) => {
    try{
        res.sendFile(path.join(__dirname, '../public/index.html'));
    }
    catch (error){
        console.log(error)
        throw new Error(`ERROR: ${error}`)
    }
});

module.exports = getHomePage;