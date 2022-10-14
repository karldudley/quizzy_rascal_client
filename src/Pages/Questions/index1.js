import { Grid } from "@mui/material";
import { socket } from '../../socket/index.js';
import React, { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import { motion } from "framer-motion"
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send';
import './style.css'


const Questions = () => {
    const [questionsData, setQuestionsData] = useState([]);
    const [ticks, setTicks] = useState(0);

    // STATE TO STORE USER INPUT
    // const [q1choice, setQ1Choice] = useState()
    // const [q2choice, setQ2Choice] = useState()
    // const [q1choice, setQ1Choice] = useState()
    // const [q1choice, setQ1Choice] = useState()
    // const [q1choice, setQ1Choice] = useState()
    // const [q1choice, setQ1Choice] = useState()
    // const [q1choice, setQ1Choice] = useState()
    // const [q1choice, setQ1Choice] = useState()
    // const [q1choice, setQ1Choice] = useState()
    // const [q1choice, setQ1Choice] = useState()

    const location = useLocation();
    const roomName = location.state.roomName

    // OLD WAY TO GET QUESTIONS - DIRECT API CALL
    // useEffect(() => {


    //     const fetchQuestions = async() => {
    //         try {
    //           console.log(`grabbing from API`)
    //           const data = await axios.get("https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple")
    //           console.log(data)
    //           var questions = data.data.results
    //           setQuestionsData(questions)
              
    //         } catch (error) {
    //           console.log(error)           
    //         }
    //     }
    //     fetchQuestions()
    // }, [])

    //NEW WAY TO GET QUESTIONS - DELIVERED VIA SOCKETS FROM SERVER
    useEffect(() => {
        socket.emit("getQuestions", roomName)

        socket.on("questions", (data, host) => {
            setQuestionsData(data)
        })
      }, [roomName])


    const renderQuestions = questionsData.map((question, index) => {
        var choice= [question.correct_answer]
        const wrong = question.incorrect_answers
        wrong.forEach((item) => {
            choice.push(item)
        })

        let shuffledChoice = choice.sort(function() {
            return Math.random() - 0.5;
        })

        const checkCorrectness = (event) => {
            if ( event.target.textContent === question.correct_answer){
                console.log(`Correct Answer!`)
                
                
            } else {
                console.log(`Incorrect Answer!`)
            }
        }

        

        const renderChoice = shuffledChoice.map((item, index) => {

            const handleUserSelection = (event) => {
            
                var otherChoice = document.querySelectorAll('.selected')
                otherChoice.forEach(choice => {
                    choice.classList.remove('selected');
                })
                
                // otherChoice.classList.value = 'choice'
                event.target.classList.toggle('selected')
                let className = event.target.classList.value
                // const choice = event.target.textContent
                console.log(className)
                
                // if (className === 'choice selected') {setQ1Choice(choice)}
                // console.log(q1choice)
                // console.log(question.correct_answer)
                
                
            }


            return(
                <Grid item xs={6} key={index}  >
                    <motion.div
                    onTap={handleUserSelection}
                    className='choice'
                    onClick={checkCorrectness}
                    >{item}</motion.div>
                </Grid>
            )
        })

        return(
            <div className="question-container" key={index}>
                <h1>Question {index+1}</h1>
                <div className="question-card">
                    <h2 style={{textAlign: 'center'}}>{question.question}</h2>
                    <p style={{color: 'aliceblue'}}>Correct: {question.correct_answer}</p>


                    <form action="">
                    <Grid container className='grid' rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {renderChoice}
                    </Grid>
                    </form>

                </div>
            </div>
        )
    }) 

    useEffect(() => {
        const interval = setInterval(() => {
            setTicks(ticks => ticks + 1);
        }, 10000)
        return() => clearInterval(interval)
    })


  return (
    <main className="questions-section">
      {renderQuestions[ticks]}
      <Grid container sx={{display: 'flex', justifyContent: 'center'}} textAlign="center">
        <Button variant="contained" justifyContent='center' size="large" endIcon={<SendIcon />}
        // onClick={}
        >
            Submit
        </Button>
      </Grid>
    </main>
  )
};

export default Questions;
