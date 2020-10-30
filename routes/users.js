const express = require('express');
const router = express.Router();

//@route    POST api/users
//@desc     register user
//@access   public

// '/' pertains too api/users since its declared as such in server.js
router.post('/', (req, res) => {

    res.send('registers a user');

});

//need to export router for this file to work
module.exports = router;