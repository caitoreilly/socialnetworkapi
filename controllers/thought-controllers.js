const { Thought, User } = require("../models");

const thoughtController = {
  // functions will go here as methods
  // /api/thoughts

  // GET all thoughts

  // GET a single thought by its _id

  // POST to create a new thought (push the created thought's _id to the associated user's thoughts array field)
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then((userData) => {
        if (!userData) {
          return res.json({
            message: "Thought created but not associated to user",
          });
        }
        res.json({ message: "Thought created" });
      })
      .catch((err) => {
        res.json(err);
      });
  },
  // PUT to update a thought by its _id

  // DELETE to remove a thought by its _id

  // /api/thoughts/:thoughtId/reactions
  // POST to create a reaction stored in a single thought's reactions array field

  // DELETE to pull & remove a reaction by the reaction's reactionId value
};

module.exports = thoughtController;
