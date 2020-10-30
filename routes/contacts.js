const express = require('express');
const router = express.Router();

//@route    GET api/contacts
//@desc     get all users contacts
//@access   private

// '/' pertains too api/contacts since its declared as such in server.js
router.get('/', (req, res) => {

    res.send('get all contacts');

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