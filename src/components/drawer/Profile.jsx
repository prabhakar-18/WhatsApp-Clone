import React from 'react'
import { useContext } from 'react'
import { Box, Typography } from '@material-ui/core'
import { AccountContext } from '../../context/AccountProvider'
import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles({
    imageContainer:{
        display:'flex',
        justifyContent:'center'

    },
    displayPicture:{
        width:200,
        height:200,
        borderRadius:'50%',
        padding:'18px 0'
    },
    nameContainer:{
        background:'#FFFFFF',
        padding:'12px 30px',
        boxShadow:'0 1px 3px rbga(0,0,0,0.08)',
        '& :first-child':{
            fontSize:14,
            color: '#009688'
        },
        '& :last-child':{
            color: '#4A4A4A',
            margin:'14px 0'
        }

    },
    discription:{
        padding:'10px 20px 28px 30px',
        '& > *':{
            fontSize:12,
            color:'rgba(0,0,0,0.45)'
        }

    }


})

const Profile = () => {
    const classes = useStyle();

    const {account} = useContext(AccountContext)

    return (
        <>
            <Box className={classes.imageContainer}>
                <img src={account.imageUrl} alt='dp' className={classes.displayPicture} />
            </Box>
            <Box className={classes.nameContainer}>
                <Typography>Your Name</Typography>
                <Typography>{account.name}</Typography>

            </Box>
            <Box className={classes.discription}>
                <Typography>This is not your username or pin.This name will be visible to your WhatsApp contact </Typography>
            </Box>
            <Box className={classes.nameContainer}>
                <Typography>About</Typography>
                <Typography>Eat! Sleep! Code! and! Repeat!</Typography>

            </Box>

        </>
    )
}

export default Profile