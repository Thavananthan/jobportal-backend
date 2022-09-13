const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const User = require("../models/User");
const Education = require("../models/Educations");
const Experience = require("../models/Experience");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      location,
      mobile,
      bio,
      picture,
      cover,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      });
    }
    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "This email address already exists,try with a different email address",
      });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: "first name must between 3 and 30 characters.",
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: "last name must between 3 and 30 characters.",
      });
    }

    const user = await new User({
      first_name,
      last_name,
      email,
      location,
      mobile,
      bio,
      picture,
      cover,
    }).save();

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      picture: user.picture,
      cover: user.cover,
      message: "Register Success !",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    // const user = await User.findById(req.user.id);
    const profile = await User.findById(id);

    if (!profile) {
      return res.json({ ok: false });
    }
    await profile.populate(
      "first_name last_name picture mobile location bio education"
    );
    const education = await Education.find({ user: id });
    const experience = await Experience.find({ user: id });

    res.json({ ...profile.toObject(), education, experience });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDetailsExperience = async (req, res) => {
  try {
    const { companyName, role } = req.body;
    //const updated = await User.findById(req.params.id);
    const updated = await Experience.findByIdAndUpdate(req.params.id, {
      companyName: companyName,
      role: role,
    });
    await updated.populate("user", "first_name last_name");

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const { url } = req.body;

    await User.findByIdAndUpdate(req.params.id, {
      picture: url,
    });
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCover = async (req, res) => {
  try {
    const { url } = req.body;

    await User.findByIdAndUpdate(req.params.id, {
      cover: url,
    });
    res.json(url);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Education
exports.createEdu = async (req, res) => {
  try {
    const post = await new Education(req.body).save();
    await post.populate("user", "first_name last_name");
    res.json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//update

exports.updateDetailsEducation = async (req, res) => {
  try {
    const {
      school,
      degree,
      fstudy,
      sYear,
      sMonth,
      eYear,
      eMonth,
      grade,
      activity,
    } = req.body;
    //const updated = await User.findById(req.params.id);

    const updated = await Education.findByIdAndUpdate(
      req.params.id,
      {
        school: school,
        degree: degree,
        fstudy: fstudy,
        sYear: sYear,
        sMonth: sMonth,
        eYear: eYear,
        eMonth: eMonth,
        grade: grade,
        activity: activity,
      },
      {
        new: true,
      }
    );
    await updated.populate("user", "first_name last_name");

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete Education

exports.deleteEdu = async (req, res) => {
  try {
    await Education.findByIdAndRemove(req.params.id);
    res.json({ status: "ok" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Expri
exports.createExp = async (req, res) => {
  try {
    const exp = await new Experience(req.body).save();
    await exp.populate("user", "first_name last_name");
    res.json(exp);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//delete expricence
exports.deleteExp = async (req, res) => {
  try {
    await Experience.findByIdAndRemove(req.params.id);
    res.json({ status: "ok" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
