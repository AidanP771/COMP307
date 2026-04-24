import { auth } from './api';

const loginForm = document.querySelector('form');

loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const email = emailInput.value.trim().toLowerCase();
    const password = (document.getElementById('password') as HTMLInputElement).value;

    // REGEX: Only @mcgill.ca or @mail.mcgill.ca
    const mcgillRegex = /^[a-z0-9.]+@(?:mail\.)?mcgill\.ca$/;

    if (!mcgillRegex.test(email)) {
        alert("Access Denied: You must use a valid McGill email address.");
        return;
    }

    // owners are @mcgill.ca (no 'mail.')
    const isOwner = email.endsWith('@mcgill.ca') && !email.includes('@mail.');
    

    try {
        const data = await auth.login(email, password);
        const userId = typeof data === 'string' ? data : data?.userId;
        const token = typeof data === 'object' ? data?.token : null;

        if (!userId) {
            throw new Error('Login response missing userId');
        }

        if (token) {
            localStorage.setItem('token', token);
        }
        localStorage.setItem('userId', userId);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', isOwner ? 'owner' : 'user');

        window.location.href = isOwner ? 'prof_dash.html' : 'main.html';

    } catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : 'Login failed';
        alert(`Login failed: ${message}`);
    }
});
