import { Box } from '@material-ui/core';
import { useState,  useContext,useEffect } from 'react';

import { UserContext } from '../../context/UserProvider';
import { getConversation } from '../../service/api';
import { AccountContext } from '../../context/AccountProvider';


//component
import ChatHeader from './ChatHeader';
import Messeges from './Messeges';

const Chat = () => {

  const { person } = useContext(UserContext);
  const { account } = useContext(AccountContext);
  const [conversation, setConversation] = useState({});

  useEffect(() => {
    const getConversationdetails = async () => {
      let data = await getConversation({ sender: account.googleId, receiver: person.googleId })
      setConversation(data);
    }
    getConversationdetails();

  }, [person.googleId])

  return (

    <Box>
      <ChatHeader />
      <Messeges conversation={conversation} person={person}/>
    </Box>
  )
}

export default Chat;