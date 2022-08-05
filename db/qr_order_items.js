const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "qr_order_items",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      note: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      variation: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      tva:{
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      from_kiosk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      is_comp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      is_hot: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
      },
      is_cold: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      ready:{
        type: DataTypes.BOOLEAN,
          defaultValue: 0,
      }
    },
    {
      sequelize,
      tableName: "qr_order_items",
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
