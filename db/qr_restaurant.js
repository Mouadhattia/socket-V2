const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "qr_restaurant",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      status: {
        type: DataTypes.ENUM("active", "pending", "rejected"),
        allowNull: false,
        defaultValue: "active",
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      sub_title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      timing: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      telephone: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      latitude: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      longitude: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      main_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "default.png",
      },
      cover_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "default.png",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      openclosed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      ip_printer: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      ip_bar: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      port_printer: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      printAccess: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      hasSMS: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      delivery_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      delivery_minimum: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      emporter: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      surplace: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      payment_CB: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      active_delivery: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      active_cash: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      virement: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      rib: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      recuperation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      livraison_cout: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
      },
      stripe_secret: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      stripe_public: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      frais: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      kisok: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      logo: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      wifi: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      siret: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING(7),
        allowNull: true,
      },
      ad_img: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      bgImage: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      right_side_image_pub: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      tva: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "qr_restaurant",
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
