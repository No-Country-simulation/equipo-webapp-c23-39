const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Admin',
    {
        adminId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Esto asegura que sea incremental
        allowNull: false,
      },
        
      
        username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  
      },
      role: {
        type:DataTypes.STRING,
        defaultValue: "admin",
      },

      
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      paranoid: true,
    }
  );
};
