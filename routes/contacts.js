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
//adding multiple middleware just put the in an [auth, check...]
router.post('/', [auth,
    check('name', ' Name is required').not().isEmpty()
], async (req, res) => {

    //res.send('ADD contacts');

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //if errors isnt empty, returns a response with error code 400 and a json array of the triggered errors in the above set of rules
        return res.status(400).json({errors:errors.array()});
    }

        const{name, email, phone, type} = req.body;

        try{
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user:req.user.id
            });
            const contact = await newContact.save();
            res.json(contact);

        }
        catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});

//@route    PUT api/contacts
//@desc     Updates contacts via id
//@access   private

// '/:id' pertains too api/contacts with the id of contacts 
router.put('/:id', auth, async (req, res) => {

    const{name, email, phone, type} = req.body;

    //res.send('UPDATE contact');

    //build contact object : to see if the following are submitted
    const contactFields = {};

    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        //how to game access to  id in router.put('/:id', use req.params.id
        let contact =  await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({msg: 'Contact not found.'})

        //make sure user owns contact !!important
        if(contact.user.toString() !== req.user.id)
        {
            return res.status(401).json({msg: 'Not authorized'});
        }
        //findbyID is a mongoose method
        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields},
            { new: true});

        res.json(contact);
    } catch (error) {
        console.error(err.message);
            res.status(500).send('Server Error');
    }
});


//@route    DELETE api/contacts
//@desc     delete contact via id
//@access   private

router.delete('/:id', auth, async (req, res) => {

    //res.send('DELETE contacts');
    try {
        //how to game access to  id in router.put('/:id', use req.params.id
        let contact =  await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({msg: 'Contact not found.'})

        //make sure user owns contact !!important
        if(contact.user.toString() !== req.user.id)
        {
            return res.status(401).json({msg: 'Not authorized'});
        }
        //findbyID is a mongoose method
        await Contact.findByIdAndRemove(req.params.id);

        res.json({msg: 'Contact Removed'});
    } catch (error) {
        console.error(err.message);
            res.status(500).send('Server Error');
    }
});


//need to export router for this file to work
module.exports = router;