import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Socket.io Server is running");
});

const io = new Server(httpServer, {
  cors: {
    origin: "https://your-react-app.vercel.app", // Your deployed frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (msg) => {
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Export the serverless function
export default (req, res) => {
  if (!res.socket.server.io) {
    httpServer.listen(0); // Use dynamic ports for serverless
    res.socket.server.io = io;
  }
  res.end();
};
