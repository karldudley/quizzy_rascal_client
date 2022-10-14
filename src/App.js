import { Home, Questions, Scoreboard, Lobby, Results } from './Pages'
import './App.css';

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='lobby' element={<Lobby />}></Route>
        <Route path='questions' element={<Questions />}></Route>
        <Route path='results' element={<Results />}></Route>
        <Route path='scoreboard' element={<Scoreboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
