const express = require('express');
const router = express.Router();
const config = require('config');
const request = require('request');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
  }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('diets', 'Diets are required')
        .not()
        .isEmpty(),
      check('allergies', 'Allergies are required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      location,
      bio,
      diets,
      allergies,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (diets) {
      profileFields.diets = diets.split(',').map(diet => diet.trim());
    }
    if (allergies) {
      profileFields.allergies = allergies.split(',').map(allergy => allergy.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
            // Using upsert option (creates new doc if no match is found):
            let profile = await Profile.findOneAndUpdate(
              { user: req.user.id },
              { $set: profileFields },
              { new: true, upsert: true }
          );
    res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/diets
// @desc     Add a diet
// @access   Private
router.put(
  '/diets',
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      const {
          name
      } = req.body;

      const newDiet = {
          name
      };

      try {
          const profile = await Profile.findOne({ user: req.user.id });

          profile.diet.unshift(newDiet);

          await profile.save();

          res.json(profile);
      } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
      }
  }
);

// @route    DELETE api/profile/diet
// @desc     Remove a diet you are no longer on
// @access   Private

router.delete('/diet/:diet_id', auth, async (req, res) => {
  try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      const dietIds = foundProfile.diets.map(diet => diet._id.toString());
      const removeIndex = dietIds.indexOf(req.params.diet_id);
      if (removeIndex === -1) {
          return res.status(500).json({ msg: 'Server error' });
      } else {
          foundProfile.diets.splice(
              removeIndex,
              1
          );
          await foundProfile.save();
          return res.status(200).json(foundProfile);
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
  }
});



module.exports = router;
