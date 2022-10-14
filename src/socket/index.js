import io from 'socket.io-client'

// const socket = io.connect("http://localhost:8080")
const socket = io.connect("https://quizzy-rascal-server.herokuapp.com/")

socket.on("connect", () => {
    console.log(`user connected to the socket id ${socket.id}`);
});

export { socket };
