require("dotenv").config();
import request from "request";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let callSendAPI = (sender_psid, response) => {
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };
  request(
    {
      uri: "https://graph.facebook.com/v9.0/me/messages",
      qs: {access_token: PAGE_ACCESS_TOKEN},
      method: "POST",
      json: request_body,
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
};
let handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = {text: "OK, CHATBOT Live"};
      await callSendAPI(sender_psid, response);
      resolve("OK");
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleGetStarted: handleGetStarted,
};
