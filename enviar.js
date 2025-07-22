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

    // Determinar el canal y evento según el remitente
    let channelName = "chataurelio";
    let eventName = "chatbidireccion";
    
    // Registrar el mensaje para depuración
    console.log(`Mensaje de ${sender}: ${message} (ClientID: ${clientId || 'ninguno'})`);

    // Envía el mensaje usando Pusher
    await pusher.trigger(channelName, eventName, {
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
