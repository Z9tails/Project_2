const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class comment extends Model {}

comment.init(
  {
    comment_text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "comment",
  }
);

module.exports = comment;
