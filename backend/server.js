const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());



const appointmentRoutes = require('./routes/appointment.routes');
app.use('/api', appointmentRoutes);

app.use('/', (req, res) => {
    res.status(200).json({Message: 'Welcome to the Hospital Management System API'});    
});

mongoose.connect('mongodb://localhost:27017/hospital', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
});
