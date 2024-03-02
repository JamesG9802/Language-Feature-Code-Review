import { useState } from 'react'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import './App.css'
import { survey_data } from './Questions/survey';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button, CssBaseline, Paper, Typography } from '@mui/material';
import { QuestionSection } from './Questions/question';
import Q1 from './Questions/q1'
import Q2 from './Questions/q2';
import Q3 from './Questions/q3';
import Q4 from './Questions/q4';
import Q5 from './Questions/q5';


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
    ].join(',')
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

  function safe_to_continue(): boolean {
    if(currentPage == 0) {
      if(survey_data.all_experience == -1 ||
        survey_data.pro_experience == -1 ||
        survey_data.reviewer_experience == -1 ||
        survey_data.reviewee_experience == - 1)
        return false;
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
            Survey authors <a href="mailto:jcg64@njit.edu">James Gaiser</a> and <a href="mailto:dtd35@njit.edu">Dylan Dunsheath</a>.
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
          <Button variant="contained" onClick={()=>{
            if(safe_to_continue())
              setCurrentPage(currentPage+1)
            else {
              window.scrollTo({top: 0, behavior: 'smooth'});
            }
          }}>Continue</Button>
          <Button onClick={()=>{console.log(survey_data)}}> Query</Button>
        </div>
      </div>
      
    </ThemeProvider>
  )
}

export default App
