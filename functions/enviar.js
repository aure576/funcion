const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "2023897",
  key: "46e53dfe6f8d93182aaa",
  secret: "18cf3757c66e3beb13cd",
  cluster: "us2",
  useTLS: true
});

exports.handler = async (event) => {
  const { message, sender } = JSON.parse(event.body);
  await pusher.trigger("chataurelio", "chatbidireccion", { message, sender });
  return { statusCode: 200, body: JSON.stringify({ status: "ok" }) };
};


exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  
  await pusher.trigger("chataurelio", "chatbidireccion", {
    message: body.message,
    sender: body.sender,
    clientId: body.clientId
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};
