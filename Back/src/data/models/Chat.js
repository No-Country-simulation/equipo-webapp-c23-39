const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    "Chat",
    {
      description: {
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
    },
    {
      timestamps: true,
    }
  );
};