const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUser, deleteUser } = require("../controller/userController");
const { protectUser } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",protectUser, logoutUser);
router.get("/get-user",protectUser, getUser);
router.delete("/delete-user",protectUser, deleteUser);

module.exports = router;