// Dark Mode Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    formStatus.textContent = 'Sending message...';
    formStatus.style.color = 'inherit';

    try {
        // REPLACE with your live Railway backend URL when deployed
        const API_URL = 'http://localhost:5000/api/contact';

        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (res.ok) {
            formStatus.textContent = 'Message sent successfully! Thank you.';
            formStatus.style.color = 'green';
            contactForm.reset();
        } else {
            throw new Error(data.error || 'Failed to send message.');
        }
    } catch (err) {
        formStatus.textContent = err.message || 'Error connecting to server.';
        formStatus.style.color = 'red';
    }
});