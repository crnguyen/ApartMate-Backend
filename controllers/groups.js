const router = require('express').Router()
const db = require('../models')

// Route for Groups Home (display users)
router.get('/:id', (req, res) => {
  db.User.find({groupId: { $in: [req.params.id]}})
  .then(foundUsers => {
    res.send(foundUsers)
  })
  .catch(err => {
    console.log("This was the error: " + err)
    res.status(503).send({message: "You forgot to feed your Mongo"})
  })
})

router.post('/create', (req, res) => {
  // see if req.user.id can hold the same values
  let groupPin = Math.random().toString().substr(2, 4);
  db.Group.create({
    name: req.body.name,
    users: req.body.users,
    pin: groupPin,
  })
  .then(createdGroup => {
    res.status(201).send(createdGroup)
  })
  .catch((err) => {
    console.log("This was the error: " + err);
    res.status(503).send({ message: "You forgot to feed your Mongo" });
  });
})

module.exports = router;
