const express = require('express')
const router = express.Router()
const {fetchUsers}= require ("../controllers/users")


router.get('/getAll',fetchUsers)

module.exports= router