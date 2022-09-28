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
  updateuser,
  search,
} = require("../controllers/user");

const router = express.Router();

router.post("/register", register);
router.post("/createEduc", createEdu);
router.post("/createExp", createExp);
router.post("/search/:searchTerm", search);

router.delete("/deleteExp/:id", deleteExp);
router.delete("/deleteEdu/:id", deleteEdu);

router.get("/getProfile/:id", getProfile);
router.put("/updateDetailsEducation/:id", updateDetailsEducation);
router.put("/updateDetailsExperience/:id", updateDetailsExperience);
router.put("/updateProfilePicture/:id", updateProfilePicture);
router.put("/updateCover/:id", updateCover);
router.put("/updateuser/:id", updateuser);

module.exports = router;
