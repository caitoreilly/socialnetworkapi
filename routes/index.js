const router = require("express").Router();

// Import all of the API routes from /api/index.js
const apiRoutes = require("./api");

// Add prefix of "/api" to all of the API routes imported from the API folder
router.use("/api", apiRoutes);

router.use((req, res) => {
    res.status(404).send("404 Error!");
});

module.exports = router;