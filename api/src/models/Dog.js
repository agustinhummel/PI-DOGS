const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        has2Characters() {
          if (this.name.length < 2) {
            throw new Error(
              "The name of the breed should have at least two letters"
            );
          }
        },
      },
      unique: true,
    },
    height_Min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    height_Max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isLowerThan() {
          if (this.height_Max < this.height_Min) {
            throw new Error(
              "The Maximum height should be greater than the minimum height"
            );
          }
        },
      },
    },
    weight_Min: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    weight_Max: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isLowerThan() {
          if (this.weight_Max < this.weight_Min) {
            throw new Error(
              "The Maximum weight should be greater than the minimum weight"
            );
          }
        },
      },
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "https://cutewallpaper.org/24/dog-gif-transparent/cat-dog-gif-storyboard-on-behance.gif",
      validate: { isUrl: true },
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    temperament: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: false });
};
