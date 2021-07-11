const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

//Créer un commentaire
router.post("/", async (req, res) => {
    const newComment = new Comment(req.body)
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch(err) {
        res.status(500).json(err)
    }
});

// get les commentaire pour un Id post donné :id => idPost
router.get("/:id", async (req,res) => {
    try {
        const comments = await Comment.find({PostId: req.params.id});
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Mettre à jour un commentaire
router.put("/:id", async (req,res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if(comment.postId === req.body.postId){
            await comment.updateOne({ $set: req.body});
            res.status(200).json("Le commentaire a été mis à jour !");
        } else {
            res.status(403).json("Tu ne peux modifier que tes posts");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Supprimer un commentaire
router.delete("/:id", async (req,res) => {
    try {
        const comment= await Comment.findById(req.params.id);
        await comment.deleteOne();
        res.status(200).json("Le commentaire a été supprimé !")
       
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;