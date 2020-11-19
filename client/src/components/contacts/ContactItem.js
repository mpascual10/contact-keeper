import React from 'react';
import PropTypes from 'prop-types';
import ContactState from '../../context/contact/ContactState';

//passes in contact as a prop
const ContactItem = ({contact}) => {

    const {name, id, email, phone, type} = contact;

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name} {' '} 
                <span 
                style={{ float: 'right'}}
                className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                
            </h3>
            <ul className='list'>

                {email && (<li>
                                <i className='fas fa-envelope-open'> {email}</i>
                          </li>
                          )}

                {phone && (<li>
                                <i className='fas fa-phone'> {phone}</i>
                          </li>
                          )}
            </ul>
            <p>
                <button className='btn btn-dark btn-sm'>Edit</button>
                <button className='btn btn-danger btn-sm'>Delete</button>
            </p>
        </div>
    )
};

ContactItem.prototype = {
    contact: PropTypes.object.isRequired,
}

export default ContactItem;