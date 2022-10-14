import React, {useState} from "react"
import { useNavigate } from 'react-router-dom'
import { Nav } from '../../components'
import { motion } from "framer-motion";
import CloseIcon from '@mui/icons-material/Close';
import { Button , FormControl, InputLabel, Input, MenuItem, FormHelperText} from "@mui/material";
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';

import { socket } from '../../socket/index.js';
import './style.css'

const Home = () => {
  const navigate = useNavigate()

  const [joinFormactive, setjoinFormActive] = useState(0)
  const [createFormactive, setcreateFormActive] = useState(0)

  // ---------- useState to store input in INPUT FORM -------------
  const [name, setName] = React.useState('');
  const [room, setRoom] = React.useState('');

  const handleChangeName = (e) => {
    setName(e.target.value)
  }

  const handleChangeRoom = (e) => {
    setRoom(e.target.value)
  }

  const promptRoomInput = () => {
    setjoinFormActive(true)
  }

  const handleJoinGame = (e) => {
    e.preventDefault()

    const gameDetails =  {
      roomName: room,
      playerName: name
    }

    // implement check room name is available
    if (room !== "") {
      socket.emit("join", gameDetails, (res) => {
        
        console.log("socket response", res);

        if (res.code === "success") {
          navigate('/lobby', {state: {gameDetails}})
        } else {
          setRoom('');
        }
      })
    }

    console.log(`I will prompt user to questions page - Specific Room`)
    console.log(`Name stored in useState: ${name}`)
    console.log(`Room stored in useState: ${room}`)
    
  }
  
  // ------------- useState to store Input in CREATE FORM  -------------
  const [category, setCategory] = React.useState('');
  const [difficulty, setDifficulty] = React.useState('');
  const [count, setCount] = React.useState('');
  
  const promptCreateGame = () => {
    setcreateFormActive(true)
  }  
  
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleChangeDifficulty = (e) => {
    setDifficulty(e.target.value);
  };
  const handleChangeCount = (e) => {
    setCount(e.target.value);
  };

  const handleCreateGame =(e) => {
    e.preventDefault()

    const gameDetails =  {
      roomName: room,
      playerName: name,
      difficulty: difficulty,
      count: count,
      category: category

    }

    // implement check room name is available
    if (room !== "") {
      socket.emit("create", gameDetails, (res) => {
        
        console.log("socket response", res);

        if (res.code === "success") {
          navigate('/lobby', {state: {gameDetails}})
        } else {
          setRoom('');
        }
      })
    }
  }


  // ------------- Close Button  -------------
  
  const closePrompt = () => {
    setjoinFormActive(0)
    setcreateFormActive(0)
  }


  return (
    <div>
      <Nav />
      <section className="instructions">
        <h1 data-testid='Instructions'>Instructions</h1>
        <h3>
            <ol>
                <li>Select a mode</li>
                <li>Each mode has 10 questions</li>
                <li>Top 10 winners will be on the scoreboard</li>
            </ol>
        </h3>
      </section>

      <main className="home-main">
        
        <motion.div className={(joinFormactive || createFormactive) ? 'joinGame square' : 'active joinGame square'}
        style={{backgroundColor: '#5ED6BE', color: 'white', boxShadow: '5px 5px 30px grey'}}
        whileHover={{ scale: 1.1}} transition={{ type: "spring", stiffness: 100, damping: 10 }}
        role='Join'
        onClick={promptRoomInput}
        >
            Join a Game
        </motion.div>

        <motion.div className={(joinFormactive || createFormactive) ? 'createGame square' : 'active createGame square'}
        style={{backgroundColor: '#DD92BF', color: 'white', boxShadow: '5px 5px 30px grey'}}
        whileHover={{ scale: 1.1}} transition={{ type: "spring", stiffness: 100, damping: 10 }}
        role='Create'
        onClick={promptCreateGame}
        >
            Create new Game
        </motion.div>
      </main>

        <div className={joinFormactive ? 'active inputForm-container' : 'inputForm-container'}  >
          <div style={{display: 'flex', justifyContent: 'flex-end', paddingBottom: '3rem'}}>
            <CloseIcon className='closeBtn' style={{right: '0px'}} role='closeBtn' onClick={closePrompt}/>
          </div>
          <div>

              <FormControl component="form" className='form' onSubmit={handleJoinGame} role='form' data-testid="joinForm ">
                <InputLabel htmlFor="name" aria-label="name"></InputLabel>
                <Input type="text" id="name"  aria-describedby="joinName" placeholder="Input your name" role='inputNameToJoin'
                onChange={handleChangeName}></Input>
                <FormHelperText id="name">Input name</FormHelperText>

                <FormControl>
                <InputLabel htmlFor="room" aria-label="room"></InputLabel>
                <Input type="text" id="room"  aria-describedby="room number" placeholder="Input room name"
                onChange={handleChangeRoom}
                ></Input>
                </FormControl>
                <FormHelperText id="room">Input room</FormHelperText>

                <Button sx={{borderRadius: '20px', mt:4}} variant="contained" type="submit" color="success" endIcon={<SendIcon />}>Join Game</Button>
              </FormControl>

          </div>
        </div>

       <div className={createFormactive ? 'active createForm-container' : 'createForm-container'}  >
          <div style={{display: 'flex', justifyContent: 'flex-end', paddingBottom: '3rem'}}>
            <CloseIcon className='closeBtn' style={{right: '0px'}} onClick={closePrompt}/>
          </div>
          <div>

              <FormControl component="form" className='form' onSubmit={handleCreateGame} >
              <InputLabel htmlFor="name" aria-label="name"></InputLabel>
                <Input type="text" id="name"  aria-describedby="name" placeholder="Input your name"
                onChange={handleChangeName}></Input>
                <FormHelperText id="name">Input name</FormHelperText>

                <FormControl>
                <InputLabel htmlFor="room" aria-label="room"></InputLabel>
                <Input type="text" id="room"  aria-describedby="room number" placeholder="Input room name"
                onChange={handleChangeRoom}
                ></Input>
                </FormControl>
                <FormHelperText id="room">Input room</FormHelperText>
              

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    role='dropdownCategory'
                    onChange={handleChangeCategory}
                  >
                    <MenuItem value={'9'}>General Knowledge</MenuItem>
                    <MenuItem value={'10'}>Books</MenuItem>
                    <MenuItem value={'11'}>Film</MenuItem>
                    <MenuItem value={'12'}>Music</MenuItem>
                    <MenuItem value={'13'}>Musicals & Theatres</MenuItem>
                    <MenuItem value={'14'}>Television</MenuItem>
                    <MenuItem value={'15'}>Video Games</MenuItem>
                    <MenuItem value={'16'}>Board Games</MenuItem>
                    <MenuItem value={'17'}>Science & Nature</MenuItem>
                    <MenuItem value={'18'}>Computers</MenuItem>
                    <MenuItem value={'19'}>Mathematics</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    role="dropdownDifficulty"
                    value={difficulty}
                    label="Difficulty"
                    onChange={handleChangeDifficulty}
                  >
                    <MenuItem value={'easy'}>Easy</MenuItem>
                    <MenuItem value={'medium'}>Medium</MenuItem>
                    <MenuItem value={'hard'}>Hard</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Number</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    role="dropdownType"
                    value={count}
                    label="Number"
                    onChange={handleChangeCount}
                  >
                    <MenuItem value={'5'}>5</MenuItem>
                    <MenuItem value={'10'}>10</MenuItem>
                  </Select>
                </FormControl>

                <Button sx={{borderRadius: '20px', mt:4}} variant="contained" type="submit" color="success" endIcon={<SendIcon />}>Create Game</Button>

              </FormControl>
          </div>
        </div>

        

    </div>
  )
};

export default Home;
