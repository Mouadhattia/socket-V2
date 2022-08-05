const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "qr_user",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      manager_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      group_id: {
        type: DataTypes.STRING(16),
        allowNull: false,
        defaultValue: "free",
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      user_type: {
        type: DataTypes.ENUM("user", "employer"),
        allowNull: true,
      },
      balance: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      forgot: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      confirm: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("0", "1", "2"),
        allowNull: true,
      },
      view: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      tagline: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      salary_min: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      salary_max: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      category: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      subcategory: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      sex: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      postcode: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      city_code: {
        type: DataTypes.CHAR(50),
        allowNull: true,
      },
      state_code: {
        type: DataTypes.CHAR(50),
        allowNull: true,
      },
      country_code: {
        type: DataTypes.CHAR(50),
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING(225),
        allowNull: false,
        defaultValue: "default_user.png",
      },
      lastactive: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      facebook: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      twitter: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      googleplus: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      instagram: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      linkedin: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      youtube: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      oauth_provider: {
        type: DataTypes.ENUM("", "facebook", "google", "twitter"),
        allowNull: true,
      },
      oauth_uid: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      oauth_link: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      online: {
        type: DataTypes.ENUM("0", "1"),
        allowNull: false,
        defaultValue: "0",
      },
      notify: {
        type: DataTypes.ENUM("0", "1"),
        allowNull: true,
        defaultValue: "0",
      },
      notify_cat: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      menu_layout: {
        type: DataTypes.ENUM("both", "grid", "list"),
        allowNull: false,
        defaultValue: "both",
      },
    },
    {
      sequelize,
      tableName: "qr_user",
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
