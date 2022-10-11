const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const bcrypt = require("bcrypt");
const { generateOTP } = require("../services/OTP");
const { sendMail } = require("../services/MAIL");

const User = require("../models/User");
const Education = require("../models/Educations");
const Experience = require("../models/Experience");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      password,
      email,
      location,
      mobile,
      bio,
      picture,
      cover,
    } = req.body;
    let upProfile = 0;
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
    if (picture != null && picture.trim().length > 0) {
      upProfile++;
    }
    if (cover != null && cover.trim().length > 0) {
      upProfile++;
    }

    const cryptedPassword = await bcrypt.hash(password, 12);
    const otpGenerated = generateOTP();

    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      otp: otpGenerated,
      location,
      mobile,
      bio,
      picture,
      cover,
      upProfile,
    }).save();
    await sendMail({
      to: email,
      OTP: otpGenerated,
    });

    res.send({
      _id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      upProfile: user.upProfile,
      picture: user.picture,
      cover: user.cover,
      message: "Register Success !",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await validateUserSignUp(email, otp);
  res.send(user);
};

const validateUserSignUp = async (email, otp) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return [false, "User not found"];
  }
  if (user && user.otp !== otp) {
    return [false, "Invalid OTP"];
  }
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      active: true,
    },
    {
      new: true,
    }
  );
  return { ...updatedUser.toObject() };
};

exports.updateuser = async (req, res) => {
  try {
    const { first_name, last_name, email, location, mobile, bio, upProfile } =
      req.body;
    //const updated = await User.findById(req.params.id);

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
        location: location,
        mobile: mobile,
        bio: bio,
        upProfile: upProfile,
      },
      {
        new: true,
      }
    );

    res.send({ ...updated.toObject() });
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
    //const updated = await Experience.findById(req.params.id);
    const updated = await Experience.findByIdAndUpdate(
      req.params.id,
      {
        companyName: companyName,
        role: role,
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

exports.search = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const results = await User.find({ $text: { $search: searchTerm } }).select(
      "first_name last_name picture"
    );
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
