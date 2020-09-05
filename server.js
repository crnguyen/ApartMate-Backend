require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 8000
const passport = require('passport')


app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//passport middleware
app.use(passport.initialize())
require('./config/passport')(passport)

const users = require('./routes/api/users')

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Backend 🍑'})
})

app.use('/api/users' , users)

app.listen(port, () => {
    console.log(`Listening to the smooth sounds of ${port}`)
})
