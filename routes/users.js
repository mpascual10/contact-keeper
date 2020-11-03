const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator/check');

const User = require('../models/User');
//@route    POST api/users
//@desc     register user
//@access   public

// '/' pertains too api/users since its declared as such in server.js
router.post('/', [

    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please set a password with 6 or more characters').isLength({min: 6})

], async (req, res) => {
    //this will request for ther data sent to the route : name, email etc
    //res.send(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //if errors isnt empty, returns a response with error code 400 and a json array of the triggered errors in the above set of rules
        return res.status(400).json({errors:errors.array()});

    }

    const{name, email, password} = req.body;
    try{
        //findOne({email: email}) is the same as findOne({email}) since its the same word
        let user = await User.findOne({email});

        //if a users exists return 400 response
        if(user){
            return res.status(400).json({msg:'User already exists'});
        }

        user = new User({
            name,
            email,
            password
        });
        //takes in a number of rounder, # determines security of hash
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.send('user saved');
    }catch(err) {
        console.error(err.message);
        res.satus(500).send('server error');
    }

    //for testing
    //res.send('passed');
});

//need to export router for this file to work
module.exports = router;