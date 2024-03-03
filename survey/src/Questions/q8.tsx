
import { useState } from "react";
import { LikertScale, Question, } from "./question";
import { survey_data, survey_scale } from "./survey";
import { Typography } from "@mui/material";

/**
 * Question 8 - SyntaxKernel+Correct
 */
function Q8() {
    const [readable, setReadable] = useState<any>("");
    const [simple, setSimple] = useState<any>("");
    const [maintain, setMaintain] = useState<any>("");
    const [expected, setExpected] = useState<any>("");
    const [approved, setApproved] = useState<any>("");
    const [isValid, _setIsValid] = useState(true);
    
    return <>
    <Typography style={{textAlign:"left"}}variant="body1" >
    You are tasked to review the following code snippet. It is written in C and is intended to copy an array of Movies to a new destination in memory and sort them based on their views in ascending order using radix sort.
    </Typography>
    <pre style={{textAlign:"left"}}>
{`/**
 * A data type storing information about a movie.
*/
typedef struct Movie {
	char name[256];
	unsigned int views;
} Movie;

/**
 * An algorithm to copy the sorted contents of src to dst.
 * Uses the least significant digit radix sort algorithm and sorts based on Movie views.
 * It is assumed that src and dst are valid arrays of the same size and that n <= 100.
 * It is assumed that integers are 32 bit numbers.
 * @param src the source array of Movies. Untouched by the sorting.
 * @param dst the destination array of Movies. Will contain the sorted data.
 * @param n the number of elements in src.
*/
void radix_clone(Movie src[], Movie dst[], unsigned int n) {
    Movie bucket0[100], bucket1[100];
    unsigned int count0 = 0u, count1 = 0u, mask = 0u, i = 0u, d = 0u;

    //  Copy src to dst.
    for(i = 0; i < n; i++) {
        dst[i] = src[i];
    }

    //   Iterate through each bit, starting from the least significant digit.
    for(d = 0; d <= 31; d++) {
        count0 = 0;
        count1 = 0;
        mask = 1 << d;
        //  Assigns elements to a bucket based on the digit (0 or 1).
        for (i = 0; i < n; i++) {
            switch (dst[i].views & mask) {
                case 0:
                    bucket0[count0++] = dst[i];
                    break;
                default:
                    bucket1[count1++] = dst[i];
            }
        }
        //  Replace dst with bucket contents.
        for (i = 0; i < count0; i++) {
            dst[i] = bucket0[i];
        }
        for (i = 0; i < count1; i++) {
            dst[count0 + i] = bucket1[i];
        }
    }
}`}
    </pre>
    <Question title="The code is readable." isValid={isValid}>
        <LikertScale value={readable} onChange={(event)=>{
            setReadable(event.target.value);
            survey_data["sy-k-c_readable"] = Number(event.target.value) as survey_scale;
        }} />
    </Question>
    <Question title="The code is simple." isValid={isValid}>
        <LikertScale value={simple} onChange={(event)=>{
            setSimple(event.target.value);
            survey_data["sy-k-c_simple"] = Number(event.target.value) as survey_scale;
        }} />
    </Question>
    <Question title="The code is maintainable." isValid={isValid}>
        <LikertScale value={maintain} onChange={(event)=>{
            setMaintain(event.target.value);
            survey_data["sy-k-c_maintainable"] = Number(event.target.value) as survey_scale;
        }} />
    </Question>
    <Question title="The code works as expected." isValid={isValid}>
        <LikertScale value={expected} onChange={(event)=>{
            setExpected(event.target.value);
            survey_data["sy-k-c_works"] = Number(event.target.value) as survey_scale;
        }} />
    </Question>
    <Question title="You would approve and accept this code into a codebase." isValid={isValid}>
        <LikertScale value={approved} onChange={(event)=>{
            setApproved(event.target.value);
            survey_data["sy-k-c_approve"] = Number(event.target.value) as survey_scale;
        }} />
    </Question>
    </>
}

export default Q8;