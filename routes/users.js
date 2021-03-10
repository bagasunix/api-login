const router = require("express").Router();

/* GET Controllers. */
const userC = require("../controllers/loginC");

// Auth
router.post("/login", userC.login);

module.exports = router;
