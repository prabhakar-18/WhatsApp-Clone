import React,{useContext} from 'react'
import {AppBar,Toolbar,makeStyles,Box} from '@material-ui/core'
import { AccountContext } from '../context/AccountProvider';
//component import
import Login from './account/Login';
import ChatBox from './ChatBox';

const useStyle = makeStyles({
    component:{
        background:'#DCDCDC',
        height:'100vh'
    },
    loginHeader:{
        height:200,
        background:'#00bfa5',
        boxShadow:'none'
    },
    Header:{
        height:115,
        background:'#128C7E',
        boxShadow:'none'
    }

})



const Messenger = () => {
    const classes = useStyle();
    const {account} = useContext(AccountContext);
  return (
    <Box className={classes.component}>
        <AppBar className={account ? classes.Header:classes.loginHeader}>
            <Toolbar></Toolbar>
        </AppBar>
        {account ? <ChatBox/>:<Login />}

    </Box>
  )
}

export default Messenger;
