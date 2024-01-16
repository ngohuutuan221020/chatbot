import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import webRoutes from "./routes/web";
import connectDB from "./configs/connectDB";
import listChuyenKhoa from "./services/chatbotService";
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//config view Engine
viewEngine(app);

//config web routes
webRoutes(app);
connectDB();

let port = process.env.PORT || 2210;
listChuyenKhoa.listChuyenKhoa();
app.listen(port, () => {
  console.log("Chatbot đang chạy với cổng: " + port);
});
