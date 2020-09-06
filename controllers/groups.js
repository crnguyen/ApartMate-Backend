const router = require('express').Router()
const db = require('../models')

// Route for Displaying All Users Belonging to the Group
router.get('/:id', (req, res) => {
  db.Group.findOne({_id: req.params.id})
  .then(foundGroup => {
    console.log(foundGroup.users)
    res.send(foundGroup.users)
  })
  .catch(err => {
    console.log("This was the error: " + err)
    res.status(503).send({message: "You forgot to feed your Mongo"})
  })
})

// Route to Create Group
router.post('/create', (req, res) => {
  // see if req.user.id can hold the same values
  let groupPin = Math.random().toString().substr(2, 4);
  db.Group.create({
    name: req.body.name,
    users: req.body.user,
    pin: groupPin,
  })
  .then(createdGroup => {
    db.User.findOneAndUpdate(
      {_id: req.body.user},
      { $push: {group_id: createdGroup._id}}
      )
    res.status(201).send(createdGroup)
  })
  .catch((err) => {
    console.log("This was the error: " + err);
    res.status(503).send({ message: "You forgot to feed your Mongo" });
  });
})

// Route to Add a User to An Existing Group
router.put('/add/:id', (req, res) => {
  db.Group.updateOne(
    { _id: req.params.id },
    { $push: { users: req.body.user }}
  )
  .then(updatedGroup => {
    db.User.findOneAndUpdate(
      { _id: req.body.user },
      { $push: { group_id: updatedGroup._id } }
    );
    res.status(201).send(updatedGroup)
  })
  .catch((err) => {
    console.log("🗑error: ", err);
    res.status(503).send({ message: "Mongo don't like that update 🍖" });
  });
})

module.exports = router;
