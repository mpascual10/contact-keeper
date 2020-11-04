const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const auth = require('../middleware/auth');

const {check, validationResult} = require('express-validator/check');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//@route    GET api/auth
//@desc     get logged in user
//@access   private

// '/' pertains too api/auth since its declared as such in server.js
//adding middleware? put as second param before (req, res) ex .get('/', auth, (req,res))
router.get('/', auth, async (req, res) => {
    //test
    //res.send('get logged in user');

    //if we send the correct token and logged in, the req object is going to have a user object attached to it with the current ID
    // .select('-password') removes password from requested objects
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

//post date to get authenticated
//@route    POST api/auth
//@desc     AUTH user and get token
//@access   public

// '/' pertains too api/auth since its declared as such in server.js
router.post('/',[

    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Password is required').exists()
    
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //if errors isnt empty, returns a response with error code 400 and a json array of the triggered errors in the above set of rules
        return res.status(400).json({errors:errors.array()});

    }

    const {email, password} = req.body;
   
    try {
        //checks email
        let user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({msg: 'Invalid Credentials'});
        }
        //checks password
        //bcrypt compares the passworder entered with the users password in the db
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({msg: 'Invalid Credentials'});
        }
        //same as in user.js
        const payload = {

            user:{
                id: user.id
            }

        };

        //to get a token we need to sign it
        //has 4 params, the payload and the secret, an object of options, acallback with an error and the webtoken
        //secret should be in a config folder
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err,token) => {

            if(err) throw err;
            res.json({token});

        });

    }catch (err){
        console.error(err.message);
        res.status(500).send('Server BROKE ON AUTH');
    }

});


//need to export router for this file to work
module.exports = router;