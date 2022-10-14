// import { Grid } from "@mui/material";
// import { socket } from '../../socket/index.js';
// import React, { useEffect, useState } from "react"
// import { useLocation } from 'react-router-dom';
// import { motion } from "framer-motion"
// // import Button from '@mui/material/Button'
// // import SendIcon from '@mui/icons-material/Send';
// import './style.css'
// // import { render } from "@testing-library/react";


// const Questions = () => {
//     const [questionsData, setQuestionsData] = useState([])
//     const [seconds, setSeconds] = useState(0);

//     // STATE TO STORE USER INPUT
//     // const [q1choice, setQ1Choice] = useState()

//     const location = useLocation();
//     const roomName = location.state.roomName

//     //NEW WAY TO GET QUESTIONS - DELIVERED VIA SOCKETS FROM SERVER
//     useEffect(() => {
//         socket.emit("getQuestions", roomName)

//         socket.on("questions", (data, host) => {
//             setQuestionsData(data)
//         })
//       }, [roomName])


//     useEffect(() => {
//         const interval = setInterval(() => {
//             setSeconds(seconds => seconds + 5);
//         }, 5000)
//         return() => clearInterval(interval)
//     })

    
    
//     console.log(`${seconds}s have elapsed since mounting`)

//          for (let i=0; i < questionsData.length; i++){


//             var choice= [questionsData[i].correct_answer]
//             const wrong = questionsData[i].incorrect_answers
//             for (let n = 0; n < wrong.length; n++){
//                 choice.push(wrong[n])
//             }
            
        
//             let shuffledChoice = choice.sort(function() {
//                 return Math.random() - 0.5;
//             })
        
//             const checkCorrectness = (event) => {
//                 if ( event.target.textContent === questionsData[i].correct_answer){
//                     console.log(`Correct Answer!`)
                    
                    
//                 } else {
//                     console.log(`Incorrect Answer!`)
//                 }
//             }
        
        
//             const renderChoice = shuffledChoice.map((item, index) => {
        
//                 const handleUserSelection = (event) => {
                
//                     var otherChoice = document.querySelectorAll('.selected')
//                     otherChoice.forEach(choice => {
//                         choice.classList.remove('selected');
//                     })
                    
//                     event.target.classList.toggle('selected')
//                     let className = event.target.classList.value
        
//                     console.log(className)  
//                 }
        
        
//                 return(
//                     <Grid item xs={6} key={index}  >
//                         <motion.div
//                         onTap={handleUserSelection}
//                         className='choice'
//                         onClick={checkCorrectness}
//                         >{item}</motion.div>
//                     </Grid>
//                 )
//             })
            
//             return(
//                 <div className="question-container">
//                     <h1>Question {i+1}</h1>
//                     <div className="question-card">
//                         <h2 style={{textAlign: 'center'}}>{questionsData[i].question}</h2>
//                         <p style={{color: 'aliceblue'}}>Correct: {questionsData[i].correct_answer}</p>
        
//                         <form action="">
//                         <Grid container className='grid' rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//                             {renderChoice}
//                         </Grid>
//                         </form>
        
//                     </div>
//                 </div>
//             )
            
//         //  }
            
            
            
//         // }
//         }
    

//     }
        
//         // console.log(`${seconds}s have elapsed since mounting`)



    

// //   return (
// //     <main className="questions-section">
// //       {renderQuestions}
// //       <Grid container sx={{display: 'flex', justifyContent: 'center'}} textAlign="center">
// //         <Button variant="contained" justifyContent='center' size="large" endIcon={<SendIcon />}
// //         // onClick={}
// //         >
// //             Submit
// //         </Button>
// //       </Grid>
// //     </main>
// //   )
        
    
    
// // };

// // export default Questions;
