const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const Event = require('../models/Event');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const {CastError} = require('mongoose').Error;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const query = {};

    const event = await Event.find(query).populate('title description');
    res.send(event);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      res.send(event);
    } else {
      res.status(404).send({error: 'event not found'});
    }
  } catch {
    res.sendStatus(500);
  }
});

router.post('/', auth, permit('admin'), upload.single('image'), async (req, res) => {
  try {
    const eventData = {
      title: req.body.title,
      description: req.body.description,
      published: req.body.published,
    };

    if (req.file) {
        eventData.image = 'uploads/' + req.file.filename;
    }

    if (req.body.description) {
        eventData.description = req.body.description;
    }

    const event = new Event(eventData);

    await event.save();
    res.send(event);
  } catch (error) {
    if (error.errors.description instanceof CastError) {
      error.errors.description.message = `Value "${req.body.description}" is not a valid number!`;
    }

    res.status(400).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (event) {
      res.send(`Event '${event.title} removed'`);
    } else {
      res.status(404).send({error: 'Event not found'});
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;