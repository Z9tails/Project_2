const router = require("express").Router();
const { comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  comment.findAll()
    .then((dbcommentData) => res.json(dbcommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  comment.create({
    postId: req.body.postId,
    comment_text: req.body.comment_text,
  })
    .then((dbcommentData) => res.json(dbcommentData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbcommentData) => {
      if (!dbcommentData) {
        res.status(404).json({ message: "No comment found with this id!" });
        return;
      }
      res.json(dbcommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
