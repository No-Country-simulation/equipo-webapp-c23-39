const { Preference, User } = require('../data');

exports.savePreferences = async (req, res) => {
  const { userId, preferences } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const createdPreferences = await Promise.all(preferences.map(async (pref) => {
      return await Preference.create({ userId, type: pref.type, value: pref.value });
    }));

    return res.status(201).json({ message: 'Preferencias guardadas exitosamente', preferences: createdPreferences });
  } catch (error) {
    console.error('Error guardando las preferencias:', error);
    return res.status(500).json({ message: 'Error guardando las preferencias', error: error.message });
  }
};

exports.getPreferences = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      include: [Preference],
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json({ preferences: user.Preferences });
  } catch (error) {
    console.error('Error obteniendo las preferencias:', error);
    return res.status(500).json({ message: 'Error obteniendo las preferencias', error: error.message });
  }
};

exports.updatePreference = async (req, res) => {
  const { preferenceId } = req.params;
  const { type, value } = req.body;

  try {
    const preference = await Preference.findByPk(preferenceId);
    if (!preference) {
      return res.status(404).json({ message: 'Preferencia no encontrada' });
    }

    preference.type = type;
    preference.value = value;
    await preference.save();

    return res.status(200).json({ message: 'Preferencia actualizada exitosamente', preference });
  } catch (error) {
    console.error('Error actualizando la preferencia:', error);
    return res.status(500).json({ message: 'Error actualizando la preferencia', error: error.message });
  }
};

exports.deletePreference = async (req, res) => {
  const { preferenceId } = req.params;

  try {
    const preference = await Preference.findByPk(preferenceId);
    if (!preference) {
      return res.status(404).json({ message: 'Preferencia no encontrada' });
    }

    await preference.destroy();
    return res.status(200).json({ message: 'Preferencia eliminada exitosamente' });
  } catch (error) {
    console.error('Error eliminando la preferencia:', error);
    return res.status(500).json({ message: 'Error eliminando la preferencia', error: error.message });
  }
};