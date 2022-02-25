import { Box, Typography, makeStyles } from "@material-ui/core";
import { useContext,useState,useEffect } from "react";
import { AccountContext } from "../../context/AccountProvider";
import { SetConversation,getConversation } from '../../service/api';
import { UserContext } from "../../context/UserProvider";

const useStyles = makeStyles({
    displaypicture: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        padding: '0 14px'

    },
    component: {
        display: 'flex',
        height: 40,
        padding: 13,
        cursor: 'pointer'

    },
    timestamp:{
        fontSize:12 ,
        marginLeft:'auto',
        marginRight:20,
        color:'#000000999'
    },
    text:{
        color:'rgba(0,0,0,0.6)',
        fontSize:14
    }
})

const Conversations = ({ user }) => {
    const url = user.imageUrl;
    const classes = useStyles();

    const { account, newMessagesFlag } = useContext(AccountContext);
    const { setPerson } = useContext(UserContext);
    const [message, setMessage] = useState({});

    useEffect(() => {
        const getConversationMessage = async() => {
            const data = await getConversation({ sender: account.googleId, receiver: user.googleId });
            setMessage({ text: data.message, timestamp: data.updatedAt });
        }
        getConversationMessage();

    }, [newMessagesFlag])


    const setUser = async () => {
        setPerson(user);
        await SetConversation({ senderId: account.googleId, reciverId: user.googleId })
    }
    return (
        <Box className={classes.component} onClick={() => setUser()}>
            <Box>
                <img src={url} alt='display-picture' className={classes.displaypicture} />
            </Box>

            <Box style={{width:'100%'}}>
                <Box style={{display:'flex'}}>
                    <Typography >{user.name}</Typography>
                    {
                        message.text &&
                        <Typography className={classes.timestamp}>
                            {new Date(message.timestamp).getHours()}:{new Date(message.timestamp).getMinutes()}
                        </Typography>
                    }
                </Box>
                <Box>
                    <Typography className={classes.text}>{message.text}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default Conversations;