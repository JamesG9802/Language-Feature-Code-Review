
import { useState } from "react";
import { LikertScale, Question, } from "./question";
import { survey_data, survey_scale } from "./survey";

/**
 * Question 4 - Reviewer Experience
 */
function Q4() {
    let [answer, setAnswer] = useState<any>("");
    const [isValid, _setIsValid] = useState(true);
    
    return <Question title="I have experience reviewing other people’s code." isValid={isValid}>
        <LikertScale id="q4" value={answer} onChange={(event)=>{
            setAnswer(event.target.value);
            survey_data.reviewer_experience = Number(event.target.value) as survey_scale;
        }} />
    </Question>
}

export default Q4;