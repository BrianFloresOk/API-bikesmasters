'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        as: "category",
        foreignKey: "category_id",
      })
      Product.belongsTo(models.User, {
        as: "usuarios",
        foreignKey: "user_id",
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    marca: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    image: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    user_id: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};