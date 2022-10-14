import React, { useEffect, useState } from "react"
import { Button, Grid, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import axios from 'axios'
import { socket } from '../../socket/index.js';
import trophyIcon from './trophy-icon.png';
import Dropdown from '../../components/Dropdown'
import './style.css'

const Scoreboard = () => {
    const [scores, setScores] = useState([])
    const [error, setError] = useState();
    socket.emit("clean")
    

    const options = [
        { label: 'All', value:""},
        { label: 'General Knowledge', value: '9' },
        { label: 'Books', value: '10' },
        { label: 'Film', value: '11' },
        { label: 'Music', value: '12' },
        { label: 'Musicals & Theatre', value: '13' },
        { label: 'Television', value: '14' },
        { label: 'Video Games', value: '15' },
        { label: 'Board Games', value: '16' },
        { label: 'Science & Nature', value: '17' },
        { label: 'Computers', value: '18' },
        { label: 'Mathematics', value: '19' }
      ];

    const [category, setCategory] = useState("")

    useEffect(() => {
        async function getScores() {
          try {
            let { data } = await axios.get(
                `https://quizzy-rascal-server.herokuapp.com/players/${category}`
            );
            data.sort((a, b) => b.highScore - a.highScore)
            setScores(data);
    
          } catch (err) {
            setError(err.message);
          }
        }
        getScores();
      }, [category]);

    
    const handleDropdown = (e) => {
        setCategory(e.target.value)
    }
    

    const renderResult = scores.slice(0, 10).map ((player) => {
        let convertedDate = new Date(player.createdAt).toLocaleDateString('en-GB')
        return (
            <div key={player._id}>
            <Grid container className='grid' rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={4} >
                    <div className="player-row">{player.name}</div>
                </Grid>
                <Grid item xs={4} >
                    <div className="player-row">{player.highScore}</div>
                </Grid>
                <Grid item xs={4} >
                    
                    <div className="player-row">{convertedDate}</div>
                </Grid>
            </Grid>
            <Divider variant="middle" style={{background: 'white'}}/>
            </div>
        )
    })

  return (
    <>
    <Link to='/'><Button variant="outlined" className="backHomeBtn" sx={{position: 'absolute', marginTop: '4rem'}}>Back to Home</Button></Link>

    <div className="scorepage">
    <section></section>
    <div className="imgContainer">
        <img className="trophy" src={trophyIcon} alt="trophy icon"></img>
    </div>
      <section className='score-board'>
        <h1 style={{textAlign: 'center', padding: '3rem 0rem'}}>Scoreboard</h1>
        <Dropdown
            label="Category: "
            options={options}
            value={category}
            onChange={handleDropdown}
        />
        <Grid container className='grid' rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={4} >
                <div className="header-row">Name</div>
            </Grid>
            <Grid item xs={4} >
                <div className="header-row">Score</div>
            </Grid>
            <Grid item xs={4} >
                <div className="header-row">Date</div>
            </Grid>
  
        </Grid>
        <Divider variant="middle" style={{background: 'white'}}/>
            {scores ? renderResult : 
            <h4 id="loading">
            Loading Scores...
            </h4>
            }
      </section>
    </div>
    </>
  )
};

export default Scoreboard;
