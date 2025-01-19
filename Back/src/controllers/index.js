const { catchedAsync } = require("../utils");
const userController = require("./userController.js");
const chatController = require("./chatController.js");
const preferenceController = require("./preferenceController.js");
const geminiController  = require("./geminiController.js");

module.exports = {
  register: catchedAsync(userController.register),
  login: catchedAsync(userController.login),
  saveChat: catchedAsync(chatController.saveChat),
  getChats: catchedAsync(chatController.getChats),
  deleteChat: catchedAsync(chatController.deleteChat),
  savePreference: catchedAsync(preferenceController.savePreference),
  getPreferences: catchedAsync(preferenceController.getPreferences),
  updatePreference: catchedAsync(preferenceController.updatePreference),
  deletePreference: catchedAsync(preferenceController.deletePreference),
  chatWithGemini: catchedAsync(geminiController.chatWithGemini),
};
