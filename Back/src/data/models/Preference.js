const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    "Preference",
    {
      type: {
        type: DataTypes.ENUM('adventure', 'activities', 'hobbies', 'places', 'accommodation'),
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
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