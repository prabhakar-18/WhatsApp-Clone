import { useRef } from "react";
import { useEffect } from "react";
import { createContext, useState } from "react";
import {io} from 'socket.io-client';

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState();
  const [activeUsers, setActiveUsers] = useState([]);
  const [newMessagesFlag, setNewMessagesFlag] = useState(false)



  const socket = useRef();

  useEffect(() =>{
    socket.current = io('ws://localhost:9000')
  },[])


  return (
    <AccountContext.Provider value={{ account, setAccount ,socket,setActiveUsers ,activeUsers,newMessagesFlag, setNewMessagesFlag}}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
