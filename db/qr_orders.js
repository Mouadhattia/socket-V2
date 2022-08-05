const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "qr_orders",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      source: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      customer_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      customer_company: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      code1: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      code2: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      interphone: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      etage: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      customer_tel: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      customer_adress: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      table_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed","rejected","ready","cooking"),
        allowNull: false,
        defaultValue: "pending",
      },
      message: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      seen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      order_type: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      how_paid: {
        type: DataTypes.STRING(30),
        defaultValue: "tout",
      },
      pay_method: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      translate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      tva: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      recieved_amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      from_kiosk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "qr_orders",
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
