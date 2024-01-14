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
let getUserName = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    request(
      {
        uri: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        method: "GET",
      },
      (err, res, body) => {
        if (!err) {
          body = JSON.parse(body);
          let userName = `${body.last_name} ${body.first_name}`;
          resolve(userName);
          console.log("message sent!");
        } else {
          console.error("Unable to send message:" + err);
        }
      }
    );
  });
};
let handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userName = await getUserName(sender_psid);
      let response1 = {text: `Xin chào ${userName}`};
      let response2 = sendGetStartedTemplate();
      await callSendAPI(sender_psid, response1);
      await callSendAPI(sender_psid, response2);
      resolve("OK");
    } catch (error) {
      reject(error);
    }
  });
};

let sendGetStartedTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Chào mừng bạn đã đến với trang đặt lịch khám bệnh",
            subtitle: "Tôi có thể giúp gì cho bạn?",
            image_url:
              "https://st3.depositphotos.com/27756932/36150/i/450/depositphotos_361504054-stock-photo-doctor-appointment-red-stethoscope-medical.jpg",
            buttons: [
              {
                type: "postback",
                title: "Bắt đầu",
                payload: "START",
              },
              {
                type: "postback",
                title: "Hướng dẫn sử dụng Bot!",
                payload: "USER_MANUAL",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};
module.exports = {
  handleGetStarted: handleGetStarted,
};
