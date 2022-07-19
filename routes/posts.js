const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.post("/delete", PostsController.Delete);

router.post('/updateLikes/:id', PostsController.UpdateLikes);

// implementing delete function
// router.delete("/", PostsController.Delete); // assume it's "/" first.

module.exports = router;
