import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import { Search, MoreVert } from '@material-ui/icons';
import { AccountContext } from '../../context/AccountProvider';

const useStyle = makeStyles({
    header:{
        display:'flex',
        height:35,
        background:'#ededed',
        padding:'10px 16px',
        alignItems:'center'

    },
    dp:{
        width:37,
        height:37,
        borderRadius:'50%',
        padding:'0 2px',

    },
    name:{
        marginLeft:10

    },
    status:{
        fontSize:12,
        marginLeft:10,
        color:'rgba(0,0,0,0.6)'

    },
    right:{
        marginLeft:'auto',
        '& >*':{
            padding:8,
            fontSize:22,
            color:'#919191'
        }
    }


})


const ChatHeader = () => {

    const {person} = useContext(UserContext);
    const classes = useStyle();

    const {activeUsers} = useContext(AccountContext);

  return (
    <Box className={classes.header}>
        <img src= {person.imageUrl} alt='dp'  className={classes.dp}/>
        <Box>
            <Typography className={classes.name}>{person.name}</Typography>
            <Typography className={classes.status}>{activeUsers ?.find(user =>user.userId === person.googleId)? 'Online':'Offline'}</Typography>
        </Box>
        <Box  className={classes.right}>
            <Search/>
            <MoreVert/>
        </Box>
    </Box>
  )
}

export default ChatHeader;