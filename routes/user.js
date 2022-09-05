const express = require("express");
const {
  register,
  getProfile,
  updateDetailsEducation,
  updateDetailsExperience,
  updateProfilePicture,
  updateCover,
} = require("../controllers/user");

const router = express.Router();

router.post("/register", register);
router.get("/getProfile/:id", getProfile);
router.put("/updateDetailsEducation/:id", updateDetailsEducation);
router.put("/updateDetailsExperience/:id", updateDetailsExperience);
router.put("/updateProfilePicture/:id", updateProfilePicture);
router.put("/updateCover:/id", updateCover);

module.exports = router;
