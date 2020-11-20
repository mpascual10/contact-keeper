import React, {Fragment, useContext } from 'react'
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {

    //initialize context
    //we will have any methods associated with ContactContext
    const contactContext = useContext(ContactContext);

    const {contacts}= contactContext;

    return (
        <Fragment>
            {contacts.map(contact =>(
                <ContactItem key={contact.id} contact={contact}/>
            ))}
        </Fragment>
    );
};

export default Contacts;