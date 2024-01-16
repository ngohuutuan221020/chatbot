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
////////////////////////////////
let handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userName = await getUserName(sender_psid);
      let response1 = {text: `Xin chào ${userName}`};
      let response2 = getStartedTemplate();
      await callSendAPI(sender_psid, response1);
      await callSendAPI(sender_psid, response2);
      resolve("OK");
    } catch (error) {
      reject(error);
    }
  });
};
let getStartedTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Chào mừng bạn đã đến với trang đặt lịch khám bệnh",
            subtitle: "Tôi có thể giúp gì cho bạn?",
            image_url: "https://suckhoe-fe.vercel.app/static/media/LOGO-SUC-KHOE.61251a14.jpg",
            buttons: [
              {
                type: "postback",
                title: "Bắt đầu",
                payload: "MAIN_MENU",
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

//START
let handleSendMainMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getMainMenuTemplate();
      await callSendAPI(sender_psid, response1);
      resolve("OK");
    } catch (error) {
      reject(error);
    }
  });
};
let getMainMenuTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Đặt lịch khám bệnh",
            subtitle: "Bạn có thể đặt lịch khám bệnh tại Sức khoẻ",
            image_url:
              "https://st3.depositphotos.com/27756932/36150/i/450/depositphotos_361504054-stock-photo-doctor-appointment-red-stethoscope-medical.jpg",
            buttons: [
              {
                type: "postback",
                title: "Đặt lịch khám bệnh",

                payload: "BOOKING",
              },
            ],
          },
          {
            title: "Chuyên khoa",
            subtitle: "Danh sách chuyên khoa",
            image_url:
              "https://th.bing.com/th/id/R.a99b1d7914da34f9dbd922f34ca125b4?rik=hH2mpKpMQ4bBMQ&riu=http%3a%2f%2fjainmaternityhospital.com%2fwp-content%2fuploads%2f2017%2f04%2fOur-Experts-1-1024x576.jpg&ehk=f6rekJ6AaZV9Oyte3tPWNtwHbM1Ux%2bEZ%2bhbIMO0K3YA%3d&risl=&pid=ImgRaw&r=0",
            buttons: [
              {
                type: "postback",
                title: "Xem danh sách các chuyên khoa",

                payload: "CHUYENKHOA",
              },
            ],
          },
          {
            title: "Bác sĩ",
            subtitle: "Danh sách các bác sĩ",
            image_url: "https://i.ytimg.com/vi/gcv3QQZaxA4/maxresdefault.jpg",
            buttons: [
              {
                type: "postback",
                title: "Xem danh sách bác sĩ",

                payload: "BACSI",
              },
            ],
          },
          {
            title: "Cơ sở y tế",
            subtitle: "Danh sách các cơ sở y tế",
            image_url: "https://admin.medinet.gov.vn/UploadImages/soytehcm/2019_10/15/hinh-hl-1.png",
            buttons: [
              {
                type: "postback",
                title: "Xem danh sách cơ sở y tế",

                payload: "COSOYTE",
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
  handleSendMainMenu: handleSendMainMenu,
};
