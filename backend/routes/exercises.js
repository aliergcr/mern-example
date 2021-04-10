const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
        .then((exercises) => {
            res.json(exercises);
        })
        .catch((err) => {
            res.status(400).json('Error : ' + err);
        });
});

router.route('/add').post((req, res) => {
    const userName = req.body.userName;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({ userName, description, duration, date });

    newExercise
        .save()
        .then(() => res.json('Exercise added!'))
        .catch((err) => res.status(400).json('Error : ' + err));
});

module.exports = router;
