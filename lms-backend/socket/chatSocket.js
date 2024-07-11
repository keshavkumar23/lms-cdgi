const { Server } = require('socket.io');
const userSocketMap = {}; // { userId -> socketId }
let io;
let getReceiverSocketId;
const initializeChatSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: ['http://localhost:3000'],
            methods: ['GET', 'POST'],
        },
    });
    io.on('connection', (socket) => {
        const userId = socket.handshake.query.userId;
        console.log("User : ", socket.handshake.query.userId, "is available to chat");
        if (userId !== undefined) {
            userSocketMap[userId] = socket.id;
        }
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
        socket.on('disconnect', () => {
            delete userSocketMap[userId];
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        });
    });
    getReceiverSocketId = (receiverId) => {
        return userSocketMap[receiverId];
    };
};
module.exports = {
    initializeChatSocket,
    getIo: () => io,
    getReceiverSocketId: () => getReceiverSocketId,
};