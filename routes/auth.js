const express = require('express');
const router = express.Router();

//@route    GET api/auth
//@desc     get logged in user
//@access   private

// '/' pertains too api/auth since its declared as such in server.js
router.get('/', (req, res) => {

    res.send('get logged in user');

});

//post date to get authenticated
//@route    POST api/auth
//@desc     AUTH user and get token
//@access   public

// '/' pertains too api/auth since its declared as such in server.js
router.post('/', (req, res) => {

    res.send('log in user');

});


//need to export router for this file to work
module.exports = router;