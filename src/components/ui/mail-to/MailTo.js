import React from 'react';
import './MailTo.scss';

const MailTo = (props) => {
    return (
        <div>
            <a href={props.email} target="_top">
                <i class="tiny material-icons">mail</i>
            </a>
        </div>
    );
}

export default MailTo;