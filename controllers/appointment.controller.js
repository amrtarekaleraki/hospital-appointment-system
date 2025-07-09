const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

exports.getDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
};

exports.bookAppointment = async (req, res) => {
  const { patientName, patientEmail, doctorId, slot } = req.body;

  const doctor = await Doctor.findById(doctorId);
  if (!doctor.availableSlots.includes(slot)) {
    return res.status(400).json({ message: 'Slot not available' });
  }

  const appointment = new Appointment({ patientName, patientEmail, doctorId, slot });
  await appointment.save();

  doctor.availableSlots = doctor.availableSlots.filter(s => s !== slot);
  await doctor.save();

  res.json({ message: 'Appointment booked', appointment });
};

exports.getAppointments = async (req, res) => {
  const appointments = await Appointment.find().populate('doctorId');
  res.json(appointments);
};



// Create a doctor with available slots
exports.createDoctor = async (req, res) => {
  try {
    const { name, specialization, availableSlots } = req.body;

    if (!name || !specialization || !Array.isArray(availableSlots)) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    const doctor = new Doctor({
      name,
      specialization,
      availableSlots,
    });

    await doctor.save();
    res.status(201).json({ message: 'Doctor created', doctor });
  } catch (error) {
    console.error('Create doctor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
