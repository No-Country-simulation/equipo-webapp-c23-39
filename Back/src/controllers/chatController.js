const { Chat, User } = require('../data');

exports.saveChat = async (req, res) => {
  const { userId, content, topic } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const chat = await Chat.create({ userId, content, topic });
    return res.status(201).json({ message: 'Chat guardado exitosamente', chat });
  } catch (error) {
    console.error('Error guardando el chat:', error);
    return res.status(500).json({ message: 'Error guardando el chat', error: error.message });
  }
};

exports.getChats = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: [Chat],
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json({ chats: user.Chats });
  } catch (error) {
    console.error('Error obteniendo los chats:', error);
    return res.status(500).json({ message: 'Error obteniendo los chats', error: error.message });
  }
};

exports.deleteChat = async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await Chat.findByPk(chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat no encontrado' });
    }

    await chat.destroy();
    return res.status(200).json({ message: 'Chat eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando el chat:', error);
    return res.status(500).json({ message: 'Error eliminando el chat', error: error.message });
  }
};