async function trigger() {
    const email = 'jibinabhram@gmail.com';
    const password = 'StrongPassword123!';

    try {
        const response = await fetch('http://localhost:5001/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log('TRIGGER_RESPONSE:', data);
    } catch (err) {
        console.error('TRIGGER_ERROR:', err.message);
    }
}

trigger();
