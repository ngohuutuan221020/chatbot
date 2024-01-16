import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import webRoutes from "./routes/web";
import chatbotService from "./services/chatbotService";
import connectDB from "./configs/connectDB";
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//config view Engine
viewEngine(app);

//config web routes
webRoutes(app);

let port = process.env.PORT || 2210;
chatbotService.getImageStarted();
connectDB();
app.listen(port, () => {
  console.log("Chatbot đang chạy với cổng: " + port);
});
