require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_DEPLOY
  } = require('../config/envs');
//-------------------------------- CONFIGURACION PARA TRABAJAR LOCALMENTE-----------------------------------
const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false,  // lets Sequelize know we can use pg-native for ~30% more speed
    timezone: '-03:00', // Configura la zona horaria GMT-3 (Argentina)
  }
);
//-------------------------------------CONFIGURACION PARA EL DEPLOY---------------------------------------------------------------------
// const sequelize = new Sequelize(DB_DEPLOY, {
//   logging: false, 
//   native: false,  
//   timezone: '-03:00', 
// });

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { 
  Admin, 
  Client, 
  Garantor, 
  Property, 
  Lease, 
  PaymentReceipt, 
  ClientProperty, 
  SaleContract 
} = sequelize.models;

// Relaciones entre Client y Property a través de ClientProperty
Client.belongsToMany(Property, { through: 'ClientProperty', foreignKey: 'clientId' });
Property.belongsToMany(Client, { through: 'ClientProperty', foreignKey: 'propertyId' });

// Lease y Property (uno a uno)
Lease.belongsTo(Property, { foreignKey: 'propertyId' });
Property.hasOne(Lease, { foreignKey: 'propertyId' });

// Lease y Client (inquilino)
Lease.belongsTo(Client, { foreignKey: 'tenantId' });
Client.hasMany(Lease, { foreignKey: 'tenantId' });

// SaleContract y Property (uno a uno)
SaleContract.belongsTo(Property, { foreignKey: 'propertyId' });
Property.hasOne(SaleContract, { foreignKey: 'propertyId' });

// SaleContract y Client (vendedor y comprador)
SaleContract.belongsTo(Client, { as: 'Seller', foreignKey: 'sellerId' });
SaleContract.belongsTo(Client, { as: 'Buyer', foreignKey: 'buyerId' });
Client.hasMany(SaleContract, { as: 'Sales', foreignKey: 'sellerId' });
Client.hasMany(SaleContract, { as: 'Purchases', foreignKey: 'buyerId' });

// Garantor y Lease (uno a muchos)
Lease.hasMany(Garantor, { foreignKey: 'leaseId' });
Garantor.belongsTo(Lease, { foreignKey: 'leaseId' });

// PaymentReceipt y Lease (uno a muchos)
PaymentReceipt.belongsTo(Lease, { foreignKey: 'leaseId' });
Lease.hasMany(PaymentReceipt, { foreignKey: 'leaseId' });

// PaymentReceipt y Client (uno a muchos)
PaymentReceipt.belongsTo(Client, { foreignKey: 'idClient' });
Client.hasMany(PaymentReceipt, { foreignKey: 'idClient' });





//---------------------------------------------------------------------------------//
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
