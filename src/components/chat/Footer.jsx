import { Box, InputBase, makeStyles } from '@material-ui/core'
import React from 'react'
import { EmojiEmotionsOutlined, AttachFile, Mic, SettingsOverscanOutlined } from '@material-ui/icons'



const useStyles = makeStyles(theme =>({
    footer: {
        height: 55,
        background: '#ededed',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        '& > *': {
            margin: 5,
            color: '#919191'

        }

    },
    clipIcons: {
        transform:'rotate(40deg)'

    },
    searchBox:{
        backgroundColor:'#FFFFFF',
        borderRadius:18,
        width:'calc(95% - 100px)'
    },
    inputRoot:{ 
        width:'100%'

    },
    inputInput:{
        padding:theme.spacing(1,1,1,0),
        paddingLeft:25,
        fontSize:14,
        width:'100%',
        height:20

    },
}))

const Footer = ({sendText, setValue,value}) => {
    const classes = useStyles();
    return (
        <Box className={classes.footer}>
            <EmojiEmotionsOutlined />
            <AttachFile className={classes.clipIcons} />
            <Box className={classes.searchBox}  >
                <InputBase
                    placeholder='Type a message'
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,

                    }}
                    imputProps={{ 'arial-label': 'search' }}
                    onKeyPress = {(e) => sendText(e)}
                    onChange = {(e) => setValue(e.target.value)}
                    value ={value}
                />
            </Box>
            <Mic />
        </Box>
    )
}

export default Footer