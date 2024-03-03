
import { useState } from "react";
import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Question, } from "./question";
import { survey_data } from "./survey";

const languages = [
    "Ada",
    "Apex",
    "APL",
    "Assembly",
    "Bash/Shell (all shells)",
    "C",
    "C#",
    "C++",
    "Clojure",
    "Cobol",
    "Crystal",
    "Dart",
    "Delphi",
    "Elixir",
    "Erlang",
    "F#",
    "Flow",
    "Fortran",
    "GDScript",
    "Go",
    "Groovy",
    "Haskell",
    "HTML/CSS",
    "Java",
    "JavaScript",
    "Julia",
    "Kotlin",
    "Lisp",
    "Lua",
    "MATLAB",
    "Nim",
    "Objective-C",
    "OCaml",
    "Perl",
    "PHP",
    "PL/SQL",
    "PowerShell",
    "Prolog",
    "Python",
    "R",
    "Raku",
    "Ruby",
    "Rust",
    "SAD",
    "Scala",
    "Solidify",
    "SQL",
    "Swift",
    "TypeScript",
    "VBA",
    "Visual Basic (.NET)",
    "Zig",
];

/**
 * Question 3 - Languages Known
 */
function Q3() {
    const [isValid, _setIsValid] = useState(true);
    
    return <Question title="Which programming, scripting, and markup languages have you done development work in over the past year?" isValid={isValid}>
        <FormGroup>
            {languages.map((language, index)=>{
                const [checked, setChecked] = React.useState(false);
                return <FormControlLabel key={index} label={language} control={
                    <Checkbox 
                        checked={checked}
                        onChange={(event)=>{
                            setChecked(event.target.checked);
                            let language_index = survey_data.language_experience.indexOf(languages[index]);
                            if(language_index > -1)
                                survey_data.language_experience.splice(language_index, 1);
                            if(event.target.checked)
                                survey_data.language_experience.push(languages[index]);
                        }} /> 
                }></FormControlLabel>
            })}
        </FormGroup>
    </Question>
}

export default Q3;