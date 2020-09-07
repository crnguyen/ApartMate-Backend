const router = require('express').Router()
const db = require('../models')
const mongoose = require('mongoose')

//test route to see all users
router.get('/user', (req, res) => {
  db.User.find()
  .then(users => {
    res.send(users)
  })
})

// Route for Displaying All Users Belonging to the Group
router.get('/:groupId', (req, res) => {
  db.User.find({group_id: {$in: req.params.groupId}})
  .then(foundUsers => {
    console.log(foundUsers)
    res.send(foundUsers)
  })
  .catch(err => {
    console.log("This was the error: ", err)
    res.status(503).send({message: "You forgot to feed your Mongo"})
  })
})

// Route to Create Group
router.post('/create', (req, res) => {
  // see if req.user.id can hold the same values
  let groupPin = Math.random().toString().substr(2, 4)
  db.Group.create({
    name: req.body.name,
    users: mongoose.Types.ObjectId(req.body.user),
    pin: groupPin,
  })
  .then(createdGroup => {
    db.User.findByIdAndUpdate(
      {_id: req.body.user},
      {$push: {group_id: createdGroup._id}},
      {"new": true}
      )
      .then(res => {
        console.log(res)
      })
    res.status(201).send(createdGroup)
  })
  .catch((err) => {
    console.log("This was the error: " + err)
    res.status(503).send({ message: "You forgot to feed your Mongo" })
  })
})

// Route to Add a User to An Existing Group
router.put('/add/:groupId', (req, res) => {
  db.Group.findOneAndUpdate(
    { _id: req.params.groupId },
    { $push: { users: req.body.user }},
    {"new": true}
  )
  .then(updatedGroup => {
    db.User.findOneAndUpdate(
      { _id: req.body.user },
      { $push: { group_id: updatedGroup._id }},
      {"new": true}
    )
    res.status(201).send(updatedGroup)
  })
  .catch((err) => {
    console.log("🗑error: ", err)
    res.status(503).send({ message: "Mongo don't like that update 🍖" })
  })
})

//delete route
router.delete('/delete/:groupId', (req, res) => {
  db.Group.findByIdAndDelete(req.params.groupId)
  // .then(
  //   db.User.find({group_id: {$in: req.params.groupId}})
  // )
  // .then(foundUsers => {
  //   console.log(foundUsers)
  // })
  .then(
    res.status(201).send({ message: "Group Deleted" })
  )
  .catch((err) => {
    console.log("🗑error: ", err)
    res.status(503).send({ message: "Mongo don't like that delete 🍖" })
  })
})

module.exports = router
