const express = require('express');
const asyncHandler = require('express-async-handler')
var path = require('path')

const getPage = asyncHandler( async(req,res) => {
    try{
        res.sendFile(path.join(__dirname, '../public/index.html'));
    }
    catch (error){
        console.log(error)
        throw new Error(`ERROR: ${error}`)
    }
});

module.exports = getPage;