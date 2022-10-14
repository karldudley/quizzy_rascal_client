import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

import { socket } from '../../socket/index.js';
import './style.css'
import { Nav } from '../../components'

const Lobby = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const gameDetails = location.state.gameDetails

    const [playerDetails, setPlayerDetails] = useState([])
    const [hostName, setHost] = useState("")

    useEffect(() => {
      socket.emit("lobby", gameDetails.roomName)
      socket.on("playerData", (players, host) => {
        setPlayerDetails(players)
        setHost(host)
      })
      socket.on("begin", (data) => navigate('/questions', {state: {data, gameDetails}}))
    }, [navigate, gameDetails])

    const lobbyPlayers = (player) => {
      console.log(hostName)
      return (

        <div 
          className={player.playerName === hostName ? 'host' : 'player'} 
          key={player.playerName}
        >
          {player.playerName}
        </div>
      )
    }

    const startGame = () => {
      socket.emit("startGame", gameDetails.roomName)
    }
  
    return (
      <div>
        <Nav />
        <section className="instructions">
          <h1>Room Name: {gameDetails.roomName}</h1>
          <h2>The following players are currently waiting in the lobby:</h2>
        </section>
        <main className="home-main">
          {playerDetails.map(lobbyPlayers)}
        </main>
        <div className="start">
            {(gameDetails.playerName === hostName) 
            ?
            <Button className="item" sx={{borderRadius: '20px', mt:4}} variant="contained" type="submit" color="success" onClick={startGame} endIcon={<SendIcon />}>Start Game</Button>
            : 
            <h2 className="item">Please wait for the host to start the game</h2>}
          </div>
      </div>
    )
  }

export default Lobby
