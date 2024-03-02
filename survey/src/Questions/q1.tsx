
import { useState } from "react";
import React from "react";
import { TextField } from "@mui/material";
import { Question, } from "./question";
import { survey_data } from "./survey";

/**
 * Question 1 - Years of experience.
 */
function Q1() {
    let [answer, setAnswer] = useState<any>("");
    const [isValid, setIsValid] = useState(true);
    
    return <Question title="Including any education, how many years have you been coding in total?" isValid={isValid}>
        <TextField 
            id="q1" label="Years" variant="standard" 
            value={answer}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                let new_answer = event.target.value.trim();
                let new_isValid = new_answer != "" && !isNaN(Number(new_answer));
                setAnswer(new_answer);
                setIsValid(new_isValid);
                if(new_isValid)
                    survey_data.all_experience = Number(new_answer);
            }}
            error={!isValid}
            helperText={!isValid ? "Please enter a whole number of years." : ""}
        />
    </Question>
}

export default Q1;