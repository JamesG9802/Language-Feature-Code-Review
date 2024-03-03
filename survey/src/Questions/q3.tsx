
import { useState } from "react";
import React from "react";
import { Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
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

function array_to_language_experience(language_array: string[]) {
    language_array.sort();
    let language_experience = "";
    for(let i = 0; i < language_array.length; i++) {
        language_experience += language_array[i]
        if(i != language_array.length - 1)
            language_experience += ","
    }
    survey_data.language_experience = language_experience;
}

/**
 * Question 3 - Languages Known
 */
function Q3() {
    const [isValid, _setIsValid] = useState(true);
    const [value, setValue] = React.useState<string[]>([]);
    
    return <Question title="Which programming, scripting, and markup languages have you done development work in over the past year?" isValid={isValid}>
        <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="q3-select">Languages</InputLabel>
                <Select
                id="q3-select"
                multiple
                value={value}
                onChange={(event)=>{
                    let array = typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
                    setValue(array);
                    array_to_language_experience(array);
                }}
                input={<OutlinedInput label="Languages" />}
                renderValue={(selected) => selected.join(', ')}
                >
                {languages.map((language) => (
                    <MenuItem key={language} value={language}>
                    <Checkbox checked={value.indexOf(language) > -1} />
                    <ListItemText primary={language} />
                    </MenuItem>
                ))
                }
                </Select>
        </FormControl>
        <div style={{display:"flex", flexDirection: "row", flexWrap: "wrap"}}>
            {
                value.map((language, index) => {
                    return language != "" && 
                    <Chip key={index} label={language} 
                        onDelete={() =>{
                            let index = value.indexOf(language);
                            if(index > -1) {
                                let copy = JSON.parse(JSON.stringify(value));
                                copy.splice(index, 1);
                                setValue(copy);
                            }
                    }}/>;
                })
            }
        </div>
    </Question>
}

export default Q3;