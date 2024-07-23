const express = require('express')
const app = express()
const cors = require ('cors')


// * Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


const port = 5000



app.listen(port,()=>console.log(`App listening on port ${port}!`))

