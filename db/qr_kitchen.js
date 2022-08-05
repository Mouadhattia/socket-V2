const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "qr_kitchen",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
     
      is_open: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      logo:{
        type: DataTypes.STRING(260),
        defaultValue: "default_logo.png", 
        allowNull:false
      },
      color_1:{
        type: DataTypes.STRING(40),
        defaultValue: "#e4c99e",
        allowNull:false
      }  ,
      color_2:{
        type: DataTypes.STRING(40),
        defaultValue: "#ffff",
        allowNull:false
      }  ,
      color_3:{
        type: DataTypes.STRING(40),
        defaultValue: "#808080",
        allowNull:false
      }  
    },
   
    {
      sequelize,
      tableName: "qr_kitchen",
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
