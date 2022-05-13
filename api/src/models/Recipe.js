const { DataTypes, UUIDV4 } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    summary: {
      type: DataTypes.STRING(800),
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue:
        "https://images.food52.com/wulM9ARxwbCaQEeW0R6fmjisGZY=/fit-in/1200x1200/2d6bdab3-4206-4c3d-ac52-e428177251bc--default-recipe.jpg",
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    createdDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
