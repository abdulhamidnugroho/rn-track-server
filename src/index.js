require('./models/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');
const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = 'mongodb+srv://admin_trackserver:886rPmHsy5dSjSM@trackserver.chggo.mongodb.net/TrackServer?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
})

mongoose.connection.on('connected', () => {
    console.log('connected to mongo');
});
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err)
});

app.get('/', requireAuth, (req, res) => {
    res.send(`email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('PORT 3000')
})