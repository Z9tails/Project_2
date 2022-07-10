const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const { update } = require('../models/Post');
const withAuth = require('../utils/auth');

// get all posts for homepage
router.get('/', async (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: [
      'id',
      'title',
    ],
    include: [
      {
        model: Comment,
      },  
      {
        model: User,
        attributes: ['username',]
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get('/post/:id', async (req, res) => {
  const postData = await Post.findByPk(req.params.id, {
    include: [
    {
      model: User,
      attributes:['username'],
    },
    {
      model: Comment,
      include: [User], 
    }
    ]
  });

  console.log(postData);

  if (postData) {
    const post = postData.get({ plain: true });
    res.render('single-post', { post, loggedIn: true});
  } else {
    res.status(404).end();
  }
});

router.get('/login', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/registration', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render('registration');
});


router.get('/dashboard', withAuth, async (req, res) => {
  
  Post.findAll({
    where: {
      userId: req.session.userId
    },
    include: [User, Comment]
    
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      console.log(posts);
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/dashboard/edit/:id', withAuth, async (req, res) => {
  Post.findByPk(req.params.id)
    .then(dbPostData => {
      
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        
        res.render('edit-post', {
          post, loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


module.exports = router;
