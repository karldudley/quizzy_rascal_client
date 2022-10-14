import React, { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import { socket } from '../../socket/index.js';
import axios from 'axios'
import {Link} from "react-router-dom"


const Results = () => {
  const location = useLocation();
  const gameDetails = location.state.gameDetails
  const score = location.state.score
  const [results, setResults] = useState([])

  useEffect(() => {
    socket.emit("results", gameDetails.roomName)
    socket.on("resultsData", (players) => {
      setResults(players)
    })

  }, [gameDetails])

  const sendResults = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const options = {
                headers: { 'Content-Type': 'application/json' }
            }
            const results = {
                "name": gameDetails.playerName,
                "highScore": (score / Number(gameDetails.count)) * 100,
                "category": gameDetails.category
              }
            console.log(results);
            const { data } = await axios.post(`https://quizzy-rascal-server.herokuapp.com/players`, results, options)
           
            if (data.err){
                throw Error(data.err)
            }
            resolve('Scores sent to leaderboard!')
        } catch (err) {
            reject(`Can't send results: ${err}`);
        }
    })
  }


  useEffect(() => {
        sendResults()
        // eslint-disable-next-line
  }, [])

  return (
    <div className="questionBody">
      
      <div className='app'>
        <div className='question-section'>
              <div>
                  <span>Quiz Results</span>
              </div>
              <div className='results'>
              {results.sort((a, b) => b.score - a.score).map((result, index) => {
                return(
                <div key={index} className="position">
                  <div>Placed: {index+1} </div>
                  <br/>
                  <div className="winner" >
                    <h4>{result.playerName}</h4>
                    <h5>{result.score} / 10</h5>
                  </div>
                </div>
              )})}
              
              </div>
              <div><Link to="/scoreboard"><button>See High Scores</button></Link></div>
        </div>
      </div>
    </div>

  )
}

export default Results
