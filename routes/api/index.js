// Import all of the API routes to prefix their endpoint names & package them up
const router = require("express").Router();
const thoughtRoutes = require("./thought-routes.js");
const userRoutes = require("./user-routes.js");

// Add prefix of "/thoughts" to routes created in "thought-routes.js" file
router.use("/thoughts", thoughtRoutes);
// Add prefix of "/users" to routes created in "user-routes.js" file
router.use("/users", userRoutes);

module.exports = router;
