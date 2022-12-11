const router = require("express").Router();

const {
    createThought
  
} = require("../../controllers/thought-controllers");

// set up GET all and POST at /api/users
router.route("/").post(createThought);

// set up GET one, PUT, and DELETE at /api/users/:userId
// router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// set up POST at /api/users/:userId/friends/:friendId
// router.route("/:userId/friends/:friendId").put(addFriend).delete(deleteFriend);

module.exports = router;

