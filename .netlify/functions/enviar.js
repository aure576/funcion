const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || "2023897",
  key: process.env.PUSHER_KEY || "46e53dfe6f8d93182aaa",
  secret: process.env.PUSHER_SECRET || "18cf3757c66e3beb13cd",
  cluster: process.env.PUSHER_CLUSTER || "us2",
  useTLS: true,
});

exports.handler = async (event) => {
  try {
    // Manejar preflight CORS
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
        body: '',
      };
    }

    // Validar que existe event.body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
        body: JSON.stringify({ success: false, error: "Request body is missing" }),
      };
    }

    const body = JSON.parse(event.body);

    // Desestructura y valida los campos requeridos
    const { message, sender, clientId } = body;
    if (!message || !sender) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
        body: JSON.stringify({ success: false, error: "Faltan campos obligatorios: message o sender" }),
      };
    }

    // Registrar el mensaje para depuración
    console.log(`Mensaje de ${sender}: ${message} (ClientID: ${clientId || 'ninguno'})`);

    // Envía el mensaje usando Pusher
    await pusher.trigger("chataurelio", "chatbidireccion", {
      message,
      sender,
      clientId,
      timestamp: new Date().toISOString()
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ 
        success: true,
        message: "Mensaje enviado correctamente",
        timestamp: new Date().toISOString()
      }),
    };
  } catch (error) {
    console.error('Error en la función:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
