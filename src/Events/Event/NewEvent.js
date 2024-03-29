import React, { useState } from "react";
import { DatePick } from "./DatePick";
import { format } from "date-fns";
import { db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";

export function NewEvent(props) {
  const [popUp, setPopUp] = useState(false);
  const [dateExists, setDateExists] = useState(false);
  const [date, setDate] = useState();
  const id = props.id;
  const groupRef = doc(db, "Teams-beta", id);

  function handleStorage() {
    updateDoc(groupRef, {
      eventDate: date,
    });
  }
  function handlePopUp() {
    setPopUp(!popUp);
  }
  function handleDateExists() {
    setDateExists(true);
  }

  return (
    <div>
      <button onClick={handlePopUp}>{props.text}</button>

      <div>
        {popUp && (
          <div>
            <DatePick value={date} setValue={setDate} />
            <button
              onClick={() => {
                handleDateExists();
                handlePopUp();
                handleStorage();
              }}
            >
              Create event
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
