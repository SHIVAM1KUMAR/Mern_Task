const express = require('express');
const School = require('../models/School');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'schoolImages');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Add a new school
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, address, city, state, contact, email_id } = req.body;
    const image = req.file ? req.file.path : '';

    const newSchool = new School({
      name,
      address,
      city,
      state,
      contact,
      email_id,
      image
    });

    await newSchool.save();
    res.status(201).json(newSchool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all schools
router.get('/', async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
