import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});

export function getSocketId(userId) {
    return onlineUsersMap[userId];
}

export function getMySocketId() {
    return socket.id;
}

const onlineUsersMap = {};

io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) onlineUsersMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(onlineUsersMap));

    socket.on("disconnect", () => {
        console.log("A user disconected: ", socket.id);

        delete onlineUsersMap[userId];
        io.emit("getOnlineUsers", Object.keys(onlineUsersMap));
    });
});

export { app, server, io };
