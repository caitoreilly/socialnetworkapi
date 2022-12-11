const { Thought, User } = require("../models");

const thoughtController = {
  // functions will go here as methods
  // /api/thoughts

  // GET all thoughts
  getAllThought(req, res) {
    Thought.find({})
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // GET a single thought by its _id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then((thoughtData) => {
        // if no thought found, send 404 error
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

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
  updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  },
  // DELETE to remove a thought by its _id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json({ message: "Thought has been deleted!" });
      })
      .catch((err) => res.status(400).json(err));
  },
  // /api/thoughts/:thoughtId/reactions
  // POST to create a reaction stored in a single thought's reactions array field
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      .then((updatedThoughtData) => {
        if (!updatedThoughtData) {
          res.status(404).json({ message: "No thought with this id" });
          return;
        }
        res.json(updatedThoughtData);
      })
      .catch((err) => res.json(err));
  },
  // DELETE to pull & remove a reaction by the reaction's reactionId value
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((updatedThoughtData) => {
        if (!updatedThoughtData) {
          return res.status(404).json({ message: "No thought with this id" });
        }
        res.json(updatedThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;
