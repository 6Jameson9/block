const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));


// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://localhost:27017/blockchain';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}/`));