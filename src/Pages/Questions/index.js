import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from 'react-router-dom';
import { socket } from '../../socket/index.js';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import './index.css';
// import { render } from "@testing-library/react";

const Questions = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const questions = location.state.data
    const gameDetails = location.state.gameDetails

	// const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    //could use ths to check everyone is finished

    const [ticks, setTicks] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [pointsUpdate, setPointsUpdate] = useState([])

	const handleAnswerOptionClick = (isCorrect, event) => {
        var otherChoice = document.querySelectorAll('.selected')
        otherChoice.forEach(choice => {
            choice.classList.remove('selected');
        })
        event.target.classList.toggle('selected')
		if (isCorrect) {
			setScore(score + 1);
		}
        const buttons = document.getElementsByTagName("button");
        for (const button of buttons) {button.disabled = true;}
    }

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          return <div className="value">0</div>;
        }
      
        return (
          <div className="timer">
            <div className="text"></div>
            <div className="value">{remainingTime}</div>
            <div className="text"></div>
          </div>
        );
    };

    useEffect(() => {
        socket.once('broadcastupdate', (update) => {
            setPointsUpdate(update)
        })
        socket.emit("updatescores", {playerName: gameDetails.playerName, score: score, roomName: gameDetails.roomName})
        const timer = setInterval(() => {
            setSeconds(seconds => seconds + 1);
            if (ticks === questions.length-1) {
                navigate('/results', {state: {gameDetails: gameDetails, score:score}})
            }
            if (seconds === 10) {
                
                setShowScore(true)
                setTimeout(() => {
                    setShowScore(false)
                    setSeconds(0)
                }, 5000)
                setTicks(ticks => ticks + 1);
                console.log(ticks)
            }
        }, 1000)
        return() => clearInterval(timer)
        // eslint-disable-next-line
    },[seconds])
	return (
        <div className="questionBody">
            <div className='app'>
                {showScore ? (
                    <div className='question-section'>
                       <div>
                            <span>Latest scores...</span>
                        </div>
                        <div className='results'>
                            {pointsUpdate.sort((a, b) => b.score - a.score).map((result, index) => {
                                return(
                                <div key={index} className="position">
                                <div>Placed: {index+1} </div>
                                <br/>
                                <div className="winner" >
                                    <h4>{result.playerName}</h4>
                                    <h5>{result.score} / {questions.length-1}</h5>
                                </div>
                                </div>
                                )})}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Question {ticks + 1}</span>/{questions.length-1}
                            </div>
                            <div className='question-text'>{questions[ticks].questionText}</div>
                            {/* <div className='timer'>{10 - seconds}</div> */}
                            <div className="timer-wrapper">
                                <CountdownCircleTimer
                                size={90}
                                isPlaying
                                duration={10}
                                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                                colorsTime={[10, 6, 3, 0]}
                                onComplete={() => ({ shouldRepeat: true, delay: 1 })}
                                >
                                {renderTime}
                                </CountdownCircleTimer>
                            </div>
                        </div>
                        <div className='answer-section'>
                            {questions[ticks].answerOptions.map((answerOption, idx) => (
                                <button className='choice' style={{disabled:false}} key={idx} onClick={(event) => handleAnswerOptionClick(answerOption.isCorrect, event)}>{answerOption.answerText}</button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
	);
}

export default Questions;
