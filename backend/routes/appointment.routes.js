const express = require('express');
const router = express.Router();
const controller = require('../controllers/appointment.controller');

router.get('/doctors', controller.getDoctors);
router.post('/book', controller.bookAppointment);
router.get('/appointments', controller.getAppointments);
router.post('/doctors', controller.createDoctor); // 


module.exports = router;
