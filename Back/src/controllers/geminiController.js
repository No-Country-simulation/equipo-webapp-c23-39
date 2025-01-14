const axios = require('axios');
const { Chat, Preference } = require('../data');
require('dotenv').config();

const travelKeywords = ['viaje', 'turismo', 'itinerario', 'destino', 'hotel', 'reserva', 'vuelo', 'excursión', 'tour', 'atracción'];

exports.chatWithGemini = async (req, res) => {
  const { userId, message } = req.body;

  try {
    // Validar que la consulta esté relacionada con viajes y turismo
    const isTravelRelated = travelKeywords.some(keyword => message.toLowerCase().includes(keyword));

    if (!isTravelRelated) {
      return res.status(400).json({ message: 'El bot solo responde sobre itinerarios y turismo.' });
    }

    // Obtener las preferencias del usuario
    const preferences = await Preference.findAll({ where: { userId } });

    // Formatear las preferencias en un string para enviar a Gemini
    const preferencesText = preferences.map(pref => `${pref.type}: ${pref.value}`).join(', ');

    // Enviar la consulta a Gemini junto con las preferencias del usuario
    const response = await axios.post('https://api.gemini.com/v1/chat', {
      message: `${message}. Preferencias del usuario: ${preferencesText}`,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const botResponse = response.data;

    // Guardar el chat en la base de datos
    await Chat.create({
      userId,
      content: message,
      topic: 'chatbot',
      date: new Date(),
    });

    await Chat.create({
      userId,
      content: botResponse,
      topic: 'chatbot',
      date: new Date(),
    });

    return res.status(200).json({ response: botResponse });
  } catch (error) {
    console.error('Error comunicándose con Gemini:', error);
    return res.status(500).json({ message: 'Error comunicándose con Gemini', error: error.message });
  }
};