const User = require("../models/user");
const Post = require('../models/post');

const UsersController = {
  New: (req, res) => {
    res.render("users/new", { session: req.session });
  },

  // Create: (req, res) => {
  //   const user = new User(req.body);
  //   user.save((err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else if (result) {
  //       res.status(409).render("users/new", { 
  //         error: 'User already exists!', 
  //         name: req.name, 
  //         surname: req.surname});
  //     } else {
  //     res.status(201).redirect("/posts");
  //     }
  //   });
  // },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err, result) => {
      if (err) {
        console.log(err);
        res.status(409).render("users/new", { 
          error: 'User already exists!', 
          name: req.name, 
          surname: req.surname});
      } else if (result) {
        res.status(201).redirect("sessions/new");
      // } else {
      // res.status(201).redirect("/posts");  // Do we need this?
      }
    });
  },

  SelfProfile: (req, res) => {
    console.log(req.body)
    const accountEmail = req.session.user.email;
    Post.find({user: accountEmail}, (err, posts) => {
      if (err) {
        throw err;
      }
      posts.reverse() // reorders posts, so newest post is always at the top of the list
      posts.forEach((post) => {
        if (post.user === req.session.user.email) {
          Object.assign(post, {canDelete: true})
        }
      })
      res.render("users/profile", {posts: posts, email: accountEmail, session: req.session});
    });
  },
  ShowProfile: (req, res) => {
    console.log(req.session);
    console.log(req.body);
    Post.find({user: req.body.email}, (err, posts) => {
      if (err) {
        throw err;
      } else {
      const userPosts = posts.reverse()
      posts.forEach((post) => {
        if (post.user === req.session.user.email) {
          Object.assign(post, {canDelete: true})
        }
      }) // reorders posts, so newest post is always at the top of the list
      Post.find({recipient: req.body.email}, (err, posts) => {
        console.log(posts);
        posts.forEach((post) => {
          if (post.user === req.session.user.email) {
            Object.assign(post, {canDelete: true})
          }
        })
        const wallPosts = posts.reverse();
        res.render("users/profile", {posts: userPosts, wallPosts: wallPosts, email: req.body.email, session: req.session});
      })}
    })
  }
};

module.exports = UsersController;
