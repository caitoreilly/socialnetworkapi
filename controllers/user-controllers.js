const { User, Thought } = require("../models");
const { db } = require("../models/User");

const userController = {
  // functions will go here as methods
  // /api/users

  // GET all users
  getAllUser(req, res) {
    User.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // GET a single user by its _id and populated thought & friend data
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate("friends")
      .populate("thoughts")
      .then((dbUserData) => {
        // if no user found, send 404 error
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // POST a new user (create a new user)
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  // PUT to update a user by its _id
  updateUser({ params, body }, res) {
    User.findByIdAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(400).json(err));
  },
  // DELETE to remove user by its _id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json({ message: "User has been deleted!" });
      })
      .catch((err) => res.status(400).json(err));
  },
  // /api/users/:userId/friends/:friendId
  // PUT to Add a new friend to a user's friend list
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then((updatedUserData) => {
        if (!updatedUserData) {
          return res.status(404).json({ message: "No user with this id" });
        }
        res.json(updatedUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // DELETE to remove a friend from a user's friend list
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((updatedUserData) => {
        if (!updatedUserData) {
          return res.status(404).json({ message: "No user with this id" });
        }
        res.json(updatedUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
