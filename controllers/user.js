const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");
const User = require("../models/User");

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
    res.json({ ...profile.toObject() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDetailsEducation = async (req, res) => {
  try {
    const { infos } = req.body;
    //const updated = await User.findById(req.params.id);

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      {
        education: infos,
      },
      {
        new: true,
      }
    );
    res.json(updated.education);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDetailsExperience = async (req, res) => {
  try {
    const { jobs } = req.body;
    //const updated = await User.findById(req.params.id);
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      {
        experience: jobs,
      },
      {
        new: true,
      }
    );

    res.json(updated.experience);
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
