import { Server } from "socket.io";

const PORT = 9000;

const io = new Server(PORT, {
    cors: {
        origin: 'http://localhost:3000',
    },
})


let users = [];

const getUser = (userId) =>{
    return users.find(user => user.userId === userId);

}

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) && users.push({ userId, socketId })
}


const removeuser =(socketId)=>{
    users = users.filter(user =>user.socketId !== socketId);
}


io.on('connection', (socket) => {
    console.log('user connected');

    //connection
    socket.on('addUser', userId => {
        addUser(userId, socket.id);
        io.emit('getUser',users)
    })

    //send message
    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit('getMessage', {
            senderId, text
        })
    })

    //dissconnect

    socket.on('dissconnect',()=>{
        console.log('user Dissconnected');
        removeuser(socket.id);
        io.emit('getUsers',users);
    })
})