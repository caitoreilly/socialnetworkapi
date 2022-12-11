const router = require("express").Router();

const {
  createThought,
  getAllThought,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controllers");

// set up GET all and POST at /api/thoughts
router.route("/").get(getAllThought).post(createThought);

// set up GET one, PUT, and DELETE at /api/thoughts/:thoughtId
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// set up PUT at /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").put(addReaction);

// set up DELETE at /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
