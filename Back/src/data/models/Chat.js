const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    "Chat",
    {
      content: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Nombre de la tabla de usuarios
          key: 'id',
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      topic: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};