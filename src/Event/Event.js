import React, { useState } from 'react';
import { DatePick } from "../Event/DatePick";

export function Event(props) {

    const [popUp, setPopUp] = useState(false);
    const [dateExists, setDateExists] = useState(false);


    function handlePopUp() {
        setPopUp(!popUp);
    }
    function handleDateExists() {
        setDateExists(true);
    }
    return (

        <div>
            <button onClick={handlePopUp}>
                {props.text}
            </button>
            <div>
                {popUp && <div>
                    <DatePick />
                    <button onClick={() => {
                        handleDateExists()
                    }}>
                        Opprett arrangement
            </button>
                    <div>
                        {dateExists &&
                            <p>
                                Arrangementet er {DatePick.value}
                            </p>}
                    </div>
                </div>}
            </div>


        </div >

    )

};


