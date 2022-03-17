import React, { useState } from 'react';
import { DatePick } from "../Event/DatePick";

export function Event(props) {

    const [date, setDate] = useState(false);
    function handlePopUp() {
        setDate(!date);
    }

    return (

        <div>
            <button onClick={handlePopUp}>
                {props.text}
            </button>
            <div>
                {date && <DatePick />}
            </div>

        </div>

    )

};


