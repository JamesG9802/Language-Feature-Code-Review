
import { useState } from "react";
import React from "react";
import { TextField } from "@mui/material";
import { Question, } from "./question";
import { survey_data } from "./survey";

/**
 * Question 2 - Professional Years of experience.
 */
function Q2() {
    let [answer, setAnswer] = useState<any>("");
    const [isValid, setIsValid] = useState(true);
    
    return <Question title="NOT including education, how many years have you coded professionally (as a part of your work)?" isValid={isValid}>
        <TextField 
            id="q2" label="Years" variant="standard" 
            value={answer}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                let new_answer = event.target.value.trim();
                let new_isValid = new_answer != "" && !isNaN(Number(new_answer));
                setAnswer(new_answer);
                setIsValid(new_isValid);
                if(new_isValid)
                    survey_data.pro_experience = Number(new_answer);
            }}
            error={!isValid}
            helperText={!isValid ? "Please enter a whole number of years." : ""}
        />
    </Question>
}

export default Q2;