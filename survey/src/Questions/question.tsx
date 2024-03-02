import { Children, ReactElement, ReactNode, useState } from "react";
import React from "react";

import { Button, Divider, FormControlLabel, Paper, Radio, RadioGroup, RadioGroupProps, Typography, useTheme } from "@mui/material";
import "./question.css";

type QuestionSectionProps = {
    children?: React.ReactNode,
    sectionTitle?: string
}
type QuestionProps = {
    children?: React.ReactNode,
    title?: string,
    isValid?: boolean
}
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

export function Question({children, title, isValid} : QuestionProps ) {
    const theme = useTheme();

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