require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const passport = require('passport')
const JWT_SECRET = process.env.JWT_SECRET

const db = require('../../models')


//(public) test route
router.get('/test', (req, res) => {
    res.json({msg: 'User endpoint 👌'})
})

// POST api/users/register (public)
router.post('/register', (req, res) => {
    db.User.findOne({ email: req.body.email })
    .then(user => {
        if(user) {
            return res.status(400).json({ message: 'Email already exists!'})
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    newUser.password = hash
                    newUser.save()
                    .then(newUser => res.json(newUser))
                    .catch(err => console.log(err))
                })
            })
        }
    })
})

// POST api/users/login (public)
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    db.User.findOne({ email })
    .then(user => {
        if(!user){
            res.status(400).json({message: 'User not found'})
        } else {
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(isMatch){
                    const payload = {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }

                    jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                        res.json({ success: true, token: `Bearer ${token}` })
                    })
                } else {
                    return res.status(400).json({ password: 'Password or email is incorrect' })
                }
            })
        }
    })
})

// GET api/users/current (private)
router.get('/current', passport.authenticate('jwt', {session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name, 
        email: req.user.email
    })
})

module.exports = router