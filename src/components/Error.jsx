import React from "react";

const Error = ({ error }) => {

    if (!error) {
        return null;
    }

    return (
        <div className='error-message'>
        {error && <p>Sorry! {error}! Please try again.</p>}
      </div>
    );
}

export default Error;