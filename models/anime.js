'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  anime.init({
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    image: DataTypes.STRING,
    episodeCount: DataTypes.INTEGER,
    averageRating: DataTypes.FLOAT,
    popularityRank: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'anime',
  });
  return anime;
};