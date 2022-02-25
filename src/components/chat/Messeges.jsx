import React from 'react'
import { Box, makeStyles } from '@material-ui/core';
import { useState, useEffect, useRef } from 'react';
import { AccountContext } from '../../context/AccountProvider';
import { useContext } from 'react';
import { newMessage, getMessage } from '../../service/api';

//component
import Footer from './Footer';
import Message from './Message';

const useStyles = makeStyles({
  wraper: {
    backgroundImage: `url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'})`,
    backgroundSize: '50%'

  },
  component: {
    height: '80vh',
    overflow: 'scroll'
  },
  container: {
    padding: '1px 80px'
  }
})

const Messeges = ({ person, conversation }) => {

  const [value, setValue] = useState();
  const [messages, setMessages] = useState([]);

  const classes = useStyles();
  const { account, socket, newMessagesFlag, setNewMessagesFlag } = useContext(AccountContext);
  const [incomingMessage, setIncomingMessage] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    socket.current.on('getMessage', data => {
      setIncomingMessage({
        sender: data.senderId,
        text: data.text,
        createAt: Date.now()
      })
    })
  }, [newMessagesFlag])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" })
  }, [messages])

  useEffect(() => {
    incomingMessage && conversation?.members?.includes(incomingMessage.sender) &&
      setMessages(prev => [...prev, incomingMessage])
  }, [incomingMessage, conversation])



  useEffect(() => {
    const getMessageDetails = async () => {
      let response = await getMessage(conversation._id)
      setMessages(response.data);
    }
    getMessageDetails();
  }, [conversation?._id, person._id, newMessagesFlag])

  const receiverId = conversation?.members?.find(member => member !== account.googleId);
  const sendText = async (e) => {

    let code = e.keyCode || e.which
    console.log(value);
    if (!value) return;
    if (code === 13) {
      let message = {
        sender: account.googleId,
        conversationId: conversation._id,
        text: value
      }

      socket.current.emit('sendMessage', {
        senderId: account.googleId,
        receiverId,
        text: value
      })


      await newMessage(message);
      setValue('');
      setNewMessagesFlag(prev => !prev);

    }

  }

  return (
    <Box className={classes.wraper}>
      <Box className={classes.component}>
        {
          messages && messages.map(message => (
            <Box className={classes.container} ref={scrollRef}>

              <Message message={message} />
            </Box>
          ))
        }
      </Box>
      <Footer sendText={sendText} setValue={setValue} value={value} />
    </Box>
  )
}

export default Messeges;