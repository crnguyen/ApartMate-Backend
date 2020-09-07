const router = require('express').Router()
const db = require('../models')

// {GET} get all chores for current user
router.get('/', (req, res) => {
    //find chores associated to userid
    //send to page
    
})

//{POST} create new chores
router.post('/new', (req, res) => {
    db.Chore.create({
        taskName: req.body.taskName,
        taskDetail: req.body.taskDetail,
        group_id: req.body.groupId,
        dueDate: req.body.dueDate,
        startDate: req.body.startDate,
        completeDate: req.body.completeDate,
        isRecurring: req.body.isRecurring,
        icon: req.body.icon
    })
    .then(createdChore => {
        res.send(createdChore)
    })
    .catch(err => {
        console.log("This was the error: " + err)
        res.status(503).send({message: "You forgot to feed your Mongo"})
    })
})

//{PUT} update chores
router.put('/edit/:choreId', (req, res) => {
    //find chore by id
    //$set updated field
    
})


module.exports = router