const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patientName: String,
  patientEmail: String,
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  slot: String
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
