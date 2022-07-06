const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, comment } = require("../models");
const withAuth = require("../utils/auth");

// get all posts for dashboard
router.get("/", (req, res) => {
  console.log(req.session);
  console.log("======================");
  Post.findAll({
    where: {
      userId: req.session.userId,
    },
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", (req, res) => {
  Post.findByPk(req.params.id)

    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });

        res.render("edit-post", {
          post,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
