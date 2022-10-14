import React from "react";
import logo from './quizzy-rascal-logo.png';
import { Grid, Avatar} from "@mui/material";

import './style.css'

const Nav = () => {

  return (
    <header style={{backgroundColor: 'white'}}>

      <Grid container
      style={{alignItems: 'center', justifyContent: 'center'}}
      >
        <Avatar alt="logo" src={logo} role="Logo" style={{width: 100, height: 100}}/>
        <p data-testid="siteName" style={{color: 'gray', fontWeight: '500', textTransform: 'uppercase'}} >Quizzy Rascal</p>
      </Grid>

     


    </header>
  )
};

export default Nav;
