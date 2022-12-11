const router = require("express").Router();

const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controllers");

// set up GET all and POST at /api/users
router.route("/").get(getAllUser).post(createUser);

// set up GET one, PUT, and DELETE at /api/users/:userId
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// set up PUT and DELETE at /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").put(addFriend).delete(deleteFriend);

module.exports = router;
