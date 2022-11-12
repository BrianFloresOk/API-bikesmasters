'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Direction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Direction.hasMany(models.User, {
        as: "usuario",
        foreignKey: "direccion_id"
    })
    }
  }
  Direction.init({
    direccion: DataTypes.STRING,
    altura: DataTypes.STRING,
    codigo_postal: DataTypes.STRING,
    localidad: DataTypes.STRING,
    pais: DataTypes.STRING,
    provincia: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Direction',
  });
  return Direction;
};