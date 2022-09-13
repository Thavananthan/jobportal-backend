const express = require("express");
const {
  register,
  getProfile,
  updateDetailsEducation,
  updateDetailsExperience,
  updateProfilePicture,
  updateCover,
  createEdu,
  createExp,
  deleteExp,
  deleteEdu,
} = require("../controllers/user");

const router = express.Router();

router.post("/register", register);
router.post("/createEduc", createEdu);
router.post("/createExp", createExp);
router.delete("/deleteExp/:id", deleteExp);
router.delete("/deleteEdu/:id", deleteEdu);

router.get("/getProfile/:id", getProfile);
router.put("/updateDetailsEducation/:id", updateDetailsEducation);
router.put("/updateDetailsExperience/:id", updateDetailsExperience);
router.put("/updateProfilePicture/:id", updateProfilePicture);
router.put("/updateCover:/id", updateCover);

module.exports = router;
