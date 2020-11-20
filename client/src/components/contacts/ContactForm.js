import React, {useState, useContext} from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    
    //usecontext(contactcontext) gives you access to the methods in state
    const contactContext = useContext(ContactContext);


    //these are the empty input variables that will be updated and passed to the api
    //input defaults
    const [contact, setContact] = useState({

        name:'',
        email:'',
        phone:'',
        type:'personal'

    });

    const {name, email, phone, type} = contact;
    
    //e..onchange takes in an event parameter
    //... is the spread operator, uses the current state, then passes through whatever you want to change via the event parameter. which is changed with whatever you  set the value to
    const onChange = e => setContact({...contact, [e.target.name]:e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        contactContext.addContact(contact);
        setContact({
            name:'',
            email:'',
            phone:'',
            type:'personal'
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">Add Contact</h2>
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange}/>
            <input type="email" placeholder="Email" name="email" value={email} onChange={onChange}/>
            <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange}/>

            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange}/>{' '}Personal{' '}
            <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange}/>{' '}Professional{' '}

            <div>
                <input type="submit" value="Add Contact" className="btn btn-primary btn-block"></input>
            </div>
        </form>
    )
}

export default ContactForm;