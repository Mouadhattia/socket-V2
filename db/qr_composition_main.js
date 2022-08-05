const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "qr_composition_main",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      cat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      tva: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 10,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "default.png",
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 9999,
      },
      active: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      }
  
    },
    {
      sequelize,
      tableName: "qr_composition_main",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
