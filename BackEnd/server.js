const express = require('express')
const cors = require ('cors')
const usersRoutes = require ('./routes/user.js')
const cookieParser = require('cookie-parser')
const passport = require('passport')

const app = express()
// * Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(cors())

/* passport */
app.use(passport.initialize()) 
require('./security/passport')(passport)

app.use('/api/users',usersRoutes)

const port = 5000


app.listen(port,()=>console.log(`App listening on port ${port}!`))

