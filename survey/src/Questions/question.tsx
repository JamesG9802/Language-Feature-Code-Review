import { useState } from "react";
import React from "react";

import {  FormControlLabel, Paper, Radio, RadioGroup, RadioGroupProps, Typography, useTheme } from "@mui/material";
import "./question.css";
import Q6 from './q6';
import Q7 from './q7';
import Q8 from './q8';
import Q9 from './q9';
import Q10 from './q10';
import Q11 from './q11';
import Q12 from './q12';
import Q13 from './q13';
import Q14 from './q14';
import Q15 from './q15';
import Q16 from './q16';
import Q17 from './q17';
import Q18 from './q18';
import Q19 from './q19';

type QuestionSectionProps = {
    children?: React.ReactNode,
    sectionTitle?: string
}
type QuestionProps = {
    children?: React.ReactNode,
    title?: string,
    isValid?: boolean
}

/**
 * We only show a subset of the code snippets (the correct variation or incorrect variation).
 */
export let random_questions: number[] = [];

//  generic features question will always be asked
random_questions.push(Math.random() > 0.5 ? 0 : 1);
//  Add 5 more questions, but cannot be both the correct/incorrect version
let possibile_questions = [2, 4, 6, 8, 10, 12]

//  https://stackoverflow.com/a/2450976
function shuffle(array: number[]) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}
possibile_questions = shuffle(possibile_questions);
possibile_questions.pop();
for(let i = 0; i < possibile_questions.length; i++) {
    //  Either the correct or incorrect version
    random_questions.push(Math.random() > 0.5 ? possibile_questions[i] : possibile_questions[i] + 1);
}

export let question_start_time: number;

export function QuestionSection({children, sectionTitle} : QuestionSectionProps) {
    const theme = useTheme();

    return (
    <div className="Question-Section_container">
        <div className="Question-Section_header" style={{
            backgroundColor: theme.palette.primary.main
        }}>
            <Typography variant="h4" style={{textAlign: "left", color: theme.palette.primary.contrastText}}>
                {sectionTitle}
            </Typography>
        </div>
        {children}
    </div>);
}

export function Question({children, title} : QuestionProps ) {
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    
    return <Paper square elevation={
        isHovered && !isFocused ? 5 :
        isHovered && isFocused ? 20 :
        1
    }>
        <div 
            tabIndex={0} 
            className="Question_content"  
            onFocus={()=>setIsFocused(true)}
            onBlur={()=>setIsFocused(false)}
            onMouseEnter={()=>setIsHovered(true)}
            onMouseLeave={()=>setIsHovered(false)}
        >
            <Typography variant="h5" style={{textAlign: "left"}}>
                {title}
            </Typography>
            {children}
        </div>
    </Paper>
}

/**
 * Component for a 6 point likert scale.
 * @param param0
 * @returns 
 */
export function LikertScale({value, onChange}: RadioGroupProps) {
    return (
    <RadioGroup value={value} onChange={onChange} row>
        <FormControlLabel value="1" control={<Radio />} label="Strongly Disagree" />
        <FormControlLabel value="2" control={<Radio />} label="Disagree" />
        <FormControlLabel value="3" control={<Radio />} label="Slightly Disagree" />
        <FormControlLabel value="4" control={<Radio />} label="Slightly Agree" />
        <FormControlLabel value="5" control={<Radio />} label="Agree" />
        <FormControlLabel value="6" control={<Radio />} label="Strongly Agree" />
    </RadioGroup>
    );
}

export function number_to_prefix(number: number) {
    switch(number) {
        default:
        case 0: return "g-c"
        case 1: return "g-w"
        case 2: return "sy-k-c"
        case 3: return "sy-k-w"
        case 4: return "sy-s-c"
        case 5: return "sy-s-w"
        case 6: return "se-k-c"
        case 7: return "se-k-w"
        case 8: return "se-s-c"
        case 9: return "se-s-w"
        case 10: return "p-k-c"
        case 11: return "p-k-w"
        case 12: return "p-s-c"
        case 13: return "p-s-w"
    }
}

function number_to_question(number: number) {
    switch(number) {
        default:
        case 0: return <Q6/>
        case 1: return <Q7/>
        case 2: return <Q8/>
        case 3: return <Q9/>
        case 4: return <Q10/>
        case 5: return <Q11/>
        case 6: return <Q12/>
        case 7: return <Q13/>
        case 8: return <Q14/>
        case 9: return <Q15/>
        case 10: return <Q16/>
        case 11: return <Q17/>
        case 12: return <Q18/>
        case 13: return <Q19/>
    }
}

export function get_random_question(page_number: number) {
    return number_to_question(random_questions[page_number - 1]);
}

export function set_question_time_start(time: number) {
    question_start_time = time;
}