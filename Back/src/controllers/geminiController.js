const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Chat, Preference, User } = require('../data');
require('dotenv').config();

const travelKeywords = ['viaje', 'turismo', 'itinerario', 'destino', 'hotel', 'reserva', 'vuelo', 'excursión', 'tour', 'atracción'];

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.chatWithGemini = async (req, res) => {
  const { userId, message } = req.body;

  try {
    // Verificar que el usuario existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar que el mensaje no sea undefined
    if (!message) {
      return res.status(400).json({ message: 'El mensaje no puede estar vacío.' });
    }

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
    const prompt = `${message}. Preferencias del usuario: ${preferencesText}`;
    const result = await model.generateContent(prompt);
    const botResponse = result.response.text();

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
    console.error('Error comunicándose con Gemini:', error.response ? error.response.data : error.message);
    return res.status(500).json({ message: 'Error comunicándose con Gemini', error: error.message });
  }
};
  
  