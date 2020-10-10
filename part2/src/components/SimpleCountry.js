import React, { useState } from 'react'
import FullCountry from './Country'

const SimpleCountry = ({ Country }) => {
    const [fulldisp, setFulldisp] = useState(false)

    const handleDisp = () => {
        setFulldisp(true)
    }

    if (fulldisp === true) {
        return (
            <FullCountry key={Country.alpha2Code} Country={Country} />
        )
    }
    return (
        <div>
            {Country.name}
            <button onClick={handleDisp}>show</button>
        </div>
    )
}

export default SimpleCountry