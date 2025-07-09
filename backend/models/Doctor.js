const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  availableSlots: [String] // Example: ["2025-07-10T10:00", "2025-07-10T11:00"]
},{timestamps: true});

module.exports = mongoose.model('Doctor', DoctorSchema);
