const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/contact');

//@route    GET api/contacts
//@desc     get all users contacts
//@access   private

// '/' pertains too api/contacts since its declared as such in server.js
router.get('/', auth, async (req, res) => {

    //res.send('get all contacts');

    // contacts = contact model that finds the user id, user id is available since we pass in auth that stores the req user id object
    try{
        //sorts by most recent date
        const contacts = await Contact.find({ user: req.user.id}).sort({date: -1});
        res.json(contacts);
    }
    catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

//@route    POST api/contacts
//@desc     ADD new contacts
//@access   private
router.post('/', (req, res) => {

    res.send('ADD contacts');

});

//@route    PUT api/contacts
//@desc     Updates contacts via id
//@access   private

// '/:id' pertains too api/contacts with the id of contacts 
router.put('/:id', (req, res) => {

    res.send('UPDATE contact');

});


//@route    DELETE api/contacts
//@desc     delete contact via id
//@access   private

router.delete('/:id', (req, res) => {

    res.send('DELETE contacts');

});


//need to export router for this file to work
module.exports = router;