


async function checkAuthStatus() {
    try {
        const response = await fetch('/api/auth/status');
        const data = await response.json();
        return data.isAuthenticated;
    } catch (error) {
        console.error('Auth status check failed:', error);
        return false;
    }
}


async function updateAuthUI() {
    const isAuthenticated = await checkAuthStatus();
    const logoutButton = document.getElementById('logout-button');
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');

    if (isAuthenticated) {
        if (logoutButton) logoutButton.style.display = 'block';
        if (loginButton) loginButton.style.display = 'none';
        if (signupButton) signupButton.style.display = 'none';
    } else {
        if (logoutButton) logoutButton.style.display = 'none';
        if (loginButton) loginButton.style.display = 'block';
        if (signupButton) signupButton.style.display = 'block';
    }
}


document.addEventListener('DOMContentLoaded', updateAuthUI);