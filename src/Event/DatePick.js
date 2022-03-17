
import React, { useState } from 'react';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";


export function DatePick() {

    const [value, setValue] = useState();
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    inputFormat="dd/MM/yyyy"
                    label="Date of event"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            margin="normal"
                            variant="outlined"
                            color="success"
                            fullWidth
                            {...params}
                        />
                    )}
                />
            </LocalizationProvider>
        </div>
    )
}

