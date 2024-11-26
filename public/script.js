// JavaScript code for form submission
function submitForm() {
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        roll_number: document.getElementById('roll_number').value.trim(),
        college_name: document.getElementById('college_name').value.trim(),
        branch: document.getElementById('branch').value.trim(),
        address: document.getElementById('address').value.trim(),
        graduation_year: parseInt(document.getElementById('graduation_year').value.trim(), 10)
    };

    // if (!formData.name || !formData.email || !formData.roll_number || !formData.college_name || !formData.branch || !formData.address || !formData.graduation_year) {
    //     document.getElementById('statusMessage').textContent = 'Error: All fields are required!';
    //     return;
    // }

    fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('statusMessage').textContent = 'Registration successful!';
        } else {
            document.getElementById('statusMessage').textContent = `Error: ${data.message}`;
        }
    })
    .catch(error => {
        document.getElementById('statusMessage').textContent = 'Error: Registration failed!';
        console.error('Error:', error);
    });
}

// JavaScript code for "Show All Registrations"
function showAllRegistrations() {
    fetch('/registrations')
        .then(response => response.json())
        .then(data => {
            const registrationsDiv = document.getElementById('registrations');
            registrationsDiv.innerHTML = ''; // Clear previous data

            if (data.success && data.registrations.length > 0) {
                data.registrations.forEach((registration, index) => {
                    const entry = document.createElement('p');
                    entry.textContent = `${index + 1}. ${registration.name} - ${registration.email} - ${registration.roll_number} - ${registration.college_name} - ${registration.branch} - ${registration.address} - ${registration.graduation_year}`;
                    registrationsDiv.appendChild(entry);
                });
            } else {
                registrationsDiv.textContent = 'No registrations found.';
            }
        })
        .catch(error => {
            document.getElementById('statusMessage').textContent = 'Error fetching registrations.';
            console.error('Error:', error);
        });
}
