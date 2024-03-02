
import { useState } from "react";
import { RadioGroup } from "@mui/material";
import { LikertScale, Question, } from "./question";
import { survey_data, survey_scale } from "./survey";

/**
 * Question 5 - Reviewee Experience
 */
function Q5() {
    let [answer, setAnswer] = useState<any>("");
    const [isValid, setIsValid] = useState(true);
    
    return <Question title="I have experience having other people review my code." isValid={isValid}>
        <LikertScale id="q5" value={answer} onChange={(event)=>{
            setAnswer(event.target.value);
            survey_data.reviewee_experience = Number(event.target.value) as survey_scale;
        }} />
    </Question>
}

export default Q5;