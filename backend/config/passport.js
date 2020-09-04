require('dotenv').config()

//passport stragety for auth with a JSON Wet Token
//This allows to auth endpoints using token
const JwtStragegy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const db = require('../models')


// object literal containing options to control
// how the token is extracted from the request or verified
const options = {}
// jwtFromRequest {required} function that accepts a request as
// the only param and returns the JWT either as a string or null
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = process.env.JWT_SECRET

module.exports = (passport) => {
    passport.use(new JwtStragegy(options, (jwt_payload, done) => {
        db.User.findById(jwt_payload.id)
        .then(user => {
            if(user) {
                return done(null, user)
            }
            return done(null, false)
        })
        .catch(err => console.log(err))
    }))
}