const express = require('express');
const app = express();
const cors = require('cors');
const usersRoutes = require('./routes/user.js');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/users', usersRoutes);

const port = 5000;

app.listen(port, () => console.log(`App listening on port ${port}!`));
