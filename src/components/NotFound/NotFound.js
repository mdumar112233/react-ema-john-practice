import React from 'react';

const NotFound = () => {
    document.title = 'not found';
    return (
        <div>
            <h3>No match</h3>
            <h4>404 not found</h4>
        </div>
    );
};

export default NotFound;