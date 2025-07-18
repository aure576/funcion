const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "2023897",
  key: "46e53dfe6f8d93182aaa",
  secret: "18cf3757c66e3beb13cd",
  cluster: "us2",
  useTLS: true,
});

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    // Desestructura y valida los campos requeridos
    const { message, sender, clientId } = body;
    if (!message || !sender) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "Faltan campos obligatorios: message o sender" }),
      };
    }

    // Envía el mensaje usando Pusher
    await pusher.trigger("chataurelio", "chatbidireccion", {
      message,
      sender,
      clientId,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
