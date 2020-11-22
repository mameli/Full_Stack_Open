import React from 'react'

const Notification = ({ message, mode }) => {
    if (message === null) {
        return null
    }

    if (mode === "error"){
        return (
            <div className="error">
                {message}
            </div>
        )
    }

    return (
        <div className="notification">
            {message}
        </div>
    )
}

export default Notification