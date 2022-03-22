import React, { useState } from 'react';
import { DatePick } from "../Event/DatePick";
import { format } from "date-fns";


export function Event(props) {

    const [popUp, setPopUp] = useState(false);
    const [dateExists, setDateExists] = useState(false);
    const [date, setDate] = useState();

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
                    <DatePick value={date} setValue={setDate} />
                    <button onClick={() => {
                        handleDateExists();
                        handlePopUp();
                    }}>
                        Opprett arrangement
            </button>

                </div>}
                <div>
                    {dateExists &&
                        <p>
                            Arrangementsdato {format(date, 'do MMMM Y')}
                        </p>}
                </div>
            </div>
        </div >

    )

};


