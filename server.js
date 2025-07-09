const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const moment = require('moment'); // For EJS view formatting
require('dotenv').config();

const Doctor = require('./models/Doctor'); // ✅ Load Doctor model
const Appointment = require('./models/Appointment'); // ✅ Load Appointment model

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); // public assets

// Routes
const appointmentRoutes = require('./routes/appointment.routes');
app.use('/api', appointmentRoutes);

// EJS Home Route: Show doctors in the UI
app.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.render('index', {
      customers: doctors,
      moment,
      currentpage: 'index' // 
    });
  } catch (err) {
    console.error('Error loading doctors:', err);
    res.status(500).send('Server Error');
  }
});


// EJS Appointment Form Route
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctorId');
    res.render('appointments', {
      customers: appointments,
      moment,
      currentpage: 'appointments' // 
    });
  } catch (err) {
    console.error('Error loading appointments:', err);
    res.status(500).send('Server Error');
  }
});



// Connect to DB and start server
mongoose.connect('mongodb://localhost:27017/hospital', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
});
