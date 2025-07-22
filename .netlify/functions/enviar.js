const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || "2023897",
  key: process.env.PUSHER_KEY || "46e53dfe6f8d93182aaa",
  secret: process.env.PUSHER_SECRET || "18cf3757c66e3beb13cd",
  cluster: process.env.PUSHER_CLUSTER || "us2",
  useTLS: true,
});

// Función para llamar a OpenAI
async function getGPTResponse(message, senderName) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `Eres Aurelio AI, un asistente virtual amigable y profesional. 
            Responde de manera útil y concisa. El usuario se llama ${senderName}.
            Mantén un tono conversacional y cercano.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      console.error('Error OpenAI:', response.status, response.statusText);
      return "Lo siento, estoy experimentando algunas dificultades técnicas. ¿Podrías intentar de nuevo en un momento?";
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return "Disculpa, hay un problema temporal con mi sistema. ¿Podrías reformular tu pregunta?";
  }
}

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

    // Enviar el mensaje original al chat
    await pusher.trigger("chataurelio", "chatbidireccion", {
      message,
      sender,
      clientId,
      timestamp: new Date().toISOString(),
      type: 'user_message'
    });

    // Enviar notificación al admin (tú)
    await pusher.trigger("chataurelio", "admin_notification", {
      message,
      sender,
      clientId,
      timestamp: new Date().toISOString(),
      type: 'new_user_message'
    });

    // Si el mensaje NO es de Aurelio AI (para evitar bucle infinito)
    if (sender !== "Aurelio AI" && sender !== "Admin" && process.env.OPENAI_API_KEY) {
      try {
        // Obtener respuesta de GPT
        const gptResponse = await getGPTResponse(message, sender);
        
        // Enviar respuesta de GPT al chat con un pequeño delay
        setTimeout(async () => {
          await pusher.trigger("chataurelio", "chatbidireccion", {
            message: gptResponse,
            sender: "Aurelio AI",
            clientId,
            timestamp: new Date().toISOString(),
            type: 'ai_response'
          });

          // Notificar al admin sobre la respuesta de GPT
          await pusher.trigger("chataurelio", "admin_notification", {
            message: `GPT respondió a ${sender}: "${gptResponse}"`,
            sender: "Sistema",
            clientId,
            timestamp: new Date().toISOString(),
            type: 'ai_response_sent',
            originalMessage: message,
            originalSender: sender
          });
        }, 2000); // Delay de 2 segundos para parecer más natural

      } catch (error) {
        console.error('Error con GPT:', error);
        // Si GPT falla, notificar al admin
        await pusher.trigger("chataurelio", "admin_notification", {
          message: `Error GPT para mensaje de ${sender}: "${message}"`,
          sender: "Sistema",
          clientId,
          timestamp: new Date().toISOString(),
          type: 'ai_error',
          error: error.message
        });
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ 
        success: true,
        message: "Mensaje procesado correctamente",
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
