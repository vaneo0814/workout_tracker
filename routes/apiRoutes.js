const Workout = require("../models/workout");

module.exports = function (app) {
    //grabbing all the workouts logged
    app.get("/api/workouts", (req, res) => {
        Workout.find({}).then((workout) => {
            res.json(workout);
        }).catch((err) => {
            res.json(err);
        })
    });

    // creating a new workout in database
    app.post("/api/workouts", (req, res) => {
        Workout.create({}).then((workout) => {
            res.json(workout);
        }).catch((err) => {
            res.json(err);
        })
    });


    //CONFUSED WITH PUT !!!.....
    app.put("/api/workouts/:id", (req, res) => {
        Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } },
            {
                new: true,
                runValidators: true
            }).then((workout) => {
                res.json(workout);
            }).catch((err) => {
                res.json(err);
            })
    })

    //getting all workouts in range // do a limit of 7 days with .limit()
    app.get("/api/workouts/range", (req, res) => {
        Workout.find({}).limit(7).then((workout) => {
            res.json(workout);
        }).catch((err) => {
            res.json(err);
        })
    });
};