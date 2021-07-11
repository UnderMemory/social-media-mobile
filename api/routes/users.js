const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//Modifier User
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Compte mis à jour");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("Tu ne peux modifier que ton compte !");
  }
});

//Supprimer User
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Compte supprimé");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("Tu ne peux supprimer que ton compte !");
  }
});

//Get un User
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId 
      ? await User.findById(userId) 
      : await User.findOne({username:username});
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Amis
router.get("/friends/:userId", async (req,res) =>{
  try{
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map(friendId => {
        console.log(User.findById(friendId))
        return User.findById(friendId)
      })
    )
    let friendList = [];
    friends.map(friend => {
      const {_id, username, profilePicture} = friend;
      friendList.push({_id, username, profilePicture});
    });
    res.status(200).json(friendList)
  } catch (err){
    res.status(500).json(err)
  }
})

//Follow un User

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("Tu suis maintenant cette personne");
      } else {
        res.status(403).json("Tu follow déjà cette personne");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Tu ne peux te follow toi même");
  }
});

//Unfollow un User

router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("Tu ne follow plus cette personne");
        } else {
          res.status(403).json("Tu ne follow pas cette personne");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("Tu ne peux pas te unfollow");
    }
  });

module.exports = router;