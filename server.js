import mongoose from "mongoose";
import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";
import cors from "cors";
import {
  registerUser,
  loginUser,
  getMe,
} from "./controller/UserController.js";
import { authenticateToken } from "./utils/checkAuth.js";
// import Message from "./models/MessageModel.js";

const app = express();
app.use(
  cors()
);
app.use(express.json());
// // Создание HTTP сервера
// const httpServer = createServer(app);
// // Инициализация Socket.io с HTTP сервером
// const io = new Server(httpServer);

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("sendMessage", async (data) => {
//     const { sender, content, conversation } = data;

//     try {
//       const message = new Message({ sender, content, conversation });
//       await message.save();

//       io.to(conversation).emit("newMessage", message);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   });

//   socket.on("joinConversation", (conversationId) => {
//     socket.join(conversationId);
//     console.log(`User joined conversation ${conversationId}`);
//   });

//   socket.on('leaveConversation', (conversationId) => {
//     socket.leave(conversationId);
//     console.log(`User left conversation ${conversationId}`);
//   });

//   // Другие обработчики событий, если они есть
// });

const PORT = 7777;

app.post("/api/v1/auth/register", registerUser);
app.post("/api/v1/auth/login", loginUser);
app.get("/api/v1/auth/getMe", authenticateToken, getMe);


const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@chat.qaorljr.mongodb.net/Chat?retryWrites=true&w=majority"
    );
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
  }
};

start();
