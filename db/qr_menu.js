const { BOOLEAN } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "qr_menu",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      cat_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      restro_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      is_alcool: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      is_hot: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
      },
      is_cold: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      in_web: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      in_caisse: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      in_borne: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "default.png",
      },
      type: {
        type: DataTypes.ENUM("veg", "nonveg"),
        allowNull: false,
        defaultValue: "veg",
      },
      active: {
        type: DataTypes.ENUM("0", "1"),
        allowNull: false,
        defaultValue: "1",
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 9999,
      },
      nsteps: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      }
   
    },
   
    {
      sequelize,
      tableName: "qr_menu",
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
