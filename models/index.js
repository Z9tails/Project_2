// import all models
const Post = require("./Post");
const User = require("./User");
const comment = require("./comment");

// create associations
User.hasMany(Post, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

comment.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

comment.belongsTo(Post, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

User.hasMany(comment, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Post.hasMany(comment, {
  foreignKey: "postId",
});

module.exports = { User, Post, comment };
