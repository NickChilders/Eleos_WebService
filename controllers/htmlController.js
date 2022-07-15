const express = require('express');
const asyncHandler = require('express-async-handler')
var path = require('path')

const getHomePage = asyncHandler( async(req,res) => {
    try{
        res.sendFile(path.join(__dirname, '../public/index.html'));
    }
    catch (error){
        console.log(error)
        throw new Error(`ERROR: ${error}`)
    }
});

const contactPage = asyncHandler( async(req,res) => {
    try{
        res.sendFile(path.join(__dirname, '../public/index2.html'));
    }
    catch (error){
        console.log(error)
        throw new Error(`ERROR: ${error}`)
    }
});

module.exports = {
    getHomePage,
    contactPage
};