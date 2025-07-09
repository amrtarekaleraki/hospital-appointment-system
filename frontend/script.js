const API = 'http://localhost:5000/api';

async function loadDoctors() {
  const res = await fetch(`${API}/doctors`);
  const doctors = await res.json();
  const container = document.getElementById('doctors');
  container.innerHTML = '';
  
  doctors.forEach(doc => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <strong>${doc.name}</strong> (${doc.specialization})<br>
      Available Slots:<br>
      <ul>
        ${doc.availableSlots.map(slot => `
          <li>${new Date(slot).toLocaleString()}</li>
        `).join('')}
      </ul>
    `;
    container.appendChild(div);
  });
}

async function loadAppointments() {
  const res = await fetch(`${API}/appointments`);
  const data = await res.json();
  const container = document.getElementById('appointments');
  container.innerHTML = data.map(app => `
    <div class="card">
      <strong>${app.patientName}</strong> (${app.patientEmail})<br>
      Doctor: ${app.doctorId.name} - ${app.doctorId.specialization}<br>
      Time: ${new Date(app.slot).toLocaleString()}
    </div>
  `).join('');
}

loadDoctors();
loadAppointments();
