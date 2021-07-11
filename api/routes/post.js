const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//Créer un post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch(err) {
        res.status(500).json(err)
    }
});

// Mettre à jour un post
router.put("/:id", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({ $set: req.body});
            res.status(200).json("Le Post a été mis à jour !");
        } else {
            res.status(403).json("Tu ne peux modifier que tes posts");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Supprimer un post
router.delete("/:id", async (req,res) => {
    try {
        const post= await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("Le post a été supprimé !")
        } else {
            res.status(403).json("Tu ne peux supprimer que tes posts !");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Aimer ou non un post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: {likes: req.body.userId }});
            res.status(200).json("Le post a été aimé !");
        } else {
            await post.updateOne({ $push: {likes: req.body.userId }});
            res.status(200).json("Le post n'est plus aimé !");
        }
    } catch (err) {
        res.status(500).json(err)
    }
});

//Get un post
router.get("/:id", async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get timeline posts
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get("/profile/:username", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username });
      const posts = await Post.find({ userId: user._id });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;