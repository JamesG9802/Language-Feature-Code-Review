import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css'
import { survey_data, survey_type, set_survey_data } from './Questions/survey';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button, CssBaseline, LinearProgress, Typography } from '@mui/material';
import { QuestionSection, get_random_question, number_to_prefix, 
  question_start_time, set_question_time_start, random_questions } from './Questions/question';
import Q1 from './Questions/q1'
import Q2 from './Questions/q2';
import Q3 from './Questions/q3';
import Q4 from './Questions/q4';
import Q5 from './Questions/q5';
import { send_survey_data } from './network';

const darkTheme = createTheme({ 
  palette: { mode: 'dark' },
  typography: {
    fontSize: 13,
    fontFamily: [
      "Open Sans",
      "Inter", 
      "system-ui", 
      "Avenir", 
      "Helvetica", 
      "Arial", 
      "sans-serif"
    ].join(','),
    body2: {
      fontWeight: "bold"
    }
  }
});
const lightTheme = createTheme({
  ...darkTheme, 
  palette: { mode: 'light' }
});

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDarkMode ? darkTheme : lightTheme;

  const [currentPage, setCurrentPage] = useState(0); 
  const [loading, setLoading] = useState(true);

  function safe_to_continue(): boolean {
    if(currentPage == 0) {
      if(survey_data.all_experience == -1 ||
        survey_data.pro_experience == -1 ||
        survey_data.reviewer_experience == -1 ||
        survey_data.reviewee_experience == - 1)
        return false;
    }
    else if(currentPage > 0 && currentPage < 7) {
      const prefix = number_to_prefix(random_questions[currentPage - 1]);
      const temp_data = JSON.parse(JSON.stringify(survey_data)) as any;
      if(temp_data[prefix+"_readable"] == undefined ||
      temp_data[prefix+"_simple"] == undefined ||
      temp_data[prefix+"_maintainable"] == undefined ||
      temp_data[prefix+"_works"] == undefined ||
      temp_data[prefix+"_approve"] == undefined) {
        return false;
      }
    }
    return true;
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className='page-root'>
        <div className='root-container'>
          <Typography variant="h1">Survey</Typography>
          <Typography className="pad-t-b" variant="body1">
            Survey conducted by NJIT students <a href="mailto:jcg64@njit.edu">James Gaiser</a> and <a href="mailto:dtd35@njit.edu">Dylan Dunsheath</a>.
          </Typography>
          { currentPage == 0 &&
            <QuestionSection sectionTitle="About you">
              <Q1/>
              <Q2/>
              <Q3/>
              <Q4/>
              <Q5/>
            </QuestionSection>
          }
          {
            currentPage > 0 && currentPage < 7 &&
            <>
              <Button id="partial_button" variant="contained" onClick={()=>{
                if(confirm("Do you want to stop taking the survey now? Press OK to submit the data you provided so far.")) {
                  setCurrentPage(7);
                  //  Clean up data
                  //  only send data from questions the user has fully filled out
                  const prefix = number_to_prefix(random_questions[currentPage - 1]);
                  const temp_data = JSON.parse(JSON.stringify(survey_data)) as any;
                  console.log(survey_data)
                  temp_data[prefix+"_readable"] = undefined;
                  temp_data[prefix+"_simple"] = undefined;
                  temp_data[prefix+"_maintainable"] = undefined;
                  temp_data[prefix+"_works"] = undefined;
                  temp_data[prefix+"_approve"] = undefined;
                  set_survey_data(temp_data as survey_type);
                  send_survey_data(survey_data, (data) => {
                    console.log(data);
                    setLoading(false);
                  }, (error)=> {
                    alert("Failed to submit survey data 😔");
                    console.error(error);
                  })
                }
              }}>Submit Partial Survey</Button>
              <QuestionSection sectionTitle="Code Review">
                {get_random_question(currentPage)}
              </QuestionSection>
            </>
          }
          {
            currentPage >= 7 &&
            loading &&
            <>
            <Typography>Please don't leave until your response is recorded.</Typography>
            <LinearProgress/>
            </>
          }
          {
            currentPage >= 7 &&
            !loading &&
            <>
            <Typography variant="h2">Survey submitted. Thank you for your help!</Typography>
            </>
          }
          { currentPage < 7 &&
          <Button variant="contained" onClick={()=>{          
            console.log(survey_data);  
            window.scrollTo({top: 0, behavior: 'smooth'});
            if(safe_to_continue()) {
              //  Record duration
              if(currentPage > 0 && currentPage < 7) {
                const prefix = number_to_prefix(random_questions[currentPage - 1]) + "_duration";
                const temp_data = JSON.parse(JSON.stringify(survey_data)) as any;
                temp_data[prefix] = Date.now() - question_start_time;
                set_survey_data(temp_data as survey_type);
              }
              if(currentPage == 6) {
                send_survey_data(survey_data, (data) => {
                  console.log(data);
                  setLoading(false);
                }, (error)=> {
                  alert("Failed to submit survey data 😔");
                  console.error(error);
                })
              }
              set_question_time_start(Date.now());
              setCurrentPage(currentPage+1)
            }
            else
              alert("Please fill in all fields.");
          }}>{currentPage < 6 ? "Continue" : "Finish"}</Button>
          }
        </div>
      </div>
      
    </ThemeProvider>
  )
}

export default App
