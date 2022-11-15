'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.UserRol, {
        as: "userRol",
        foreignKey: "rol_id"
      })

      User.belongsTo(models.Direction, {
        as: "direccion",
        foreignKey: "direccion_id"
      })

      User.belongsToMany(models.Product, {
        as: "misProductos",
        through: "cart",
        foreignKey: "usuario_id",
        otherKey: "product_id"
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    direccion_id: DataTypes.INTEGER,
    rol_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    telefono: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};