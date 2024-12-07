import { Server } from "socket.io";
import { createServer } from "http";

// Create an HTTP server
const httpServer = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Socket.io Server is running");
});

// Initialize Socket.io with CORS support for your frontend
const io = new Server(httpServer, {
  cors: {
    origin: "https://private-message-app-eight.vercel.app/", // Your deployed frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (msg) => {
    io.emit("message", msg); // Emit message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Export serverless function
export default (req, res) => {
  if (!res.socket.server.io) {
    // Attach socket.io server only once
    res.socket.server.io = io;
    httpServer.listen(3000);  // Adjusted to static port as serverless environment needs this
  }
  res.end();
};
