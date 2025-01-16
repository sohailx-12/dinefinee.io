document.addEventListener('DOMContentLoaded', () => {

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const loginBtn = document.querySelector('.login-btn');
  const authSec = document.getElementById('auth-sec');
  const closeAuthBtn = document.getElementById('close-auth');
  const loginForm = document.querySelector('.login-form');
  const signupForm = document.querySelector('.signup-form');
  const loginTab = document.getElementById('login-tab');
  const signupTab = document.getElementById('signup-tab');
  const loginError = document.getElementById('login-error');
  const signupError = document.getElementById('signup-error');
  const loginSubmit = document.getElementById('login-btn');
  const signupSubmit = document.getElementById('signup-btn');

  
  console.log({ menuToggle, nav, loginBtn, authSec, closeAuthBtn, loginForm, signupForm, loginTab, signupTab });

  // Navigation menu toggle
  menuToggle?.addEventListener('click', () => {
      const isOpen = nav?.classList.toggle('open');
      menuToggle.textContent = isOpen ? '✖' : '☰';
  });

  // showing login and signup
  loginBtn?.addEventListener('click', () => {
      
      authSec.style.display = 'block';

      toggleAuthForm(true);
  });

  // Close the form
  closeAuthBtn?.addEventListener('click', () => {
      authSec.style.display = 'none';
  });

  // Switch between login and signup forms
  const toggleAuthForm = (showLogin) => {
      if (showLogin) {
          loginForm.style.display = 'block';
          signupForm.style.display = 'none';
      } else {
          loginForm.style.display = 'none';
          signupForm.style.display = 'block';
      }
  };

  // Listen for tab changes to switch forms
  loginTab?.addEventListener('click', () => toggleAuthForm(true));
  signupTab?.addEventListener('click', () => toggleAuthForm(false));

 
  signupSubmit?.addEventListener('click', async () => {
      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value.trim();

      if (name && email && password) {
          try {
              const response = await fetch('/api/auth/signup', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name, email, password })
              });
              const data = await response.json();

              if (response.ok) {
                  alert('Sign Up Successful! Redirecting to Login page...');
                  signupError.style.display = 'none';
                  toggleAuthForm(true); 
              } else {
                  signupError.textContent = data.message || 'Something went wrong.';
                  signupError.style.display = 'block';
              }
          } catch (error) {
              console.error('Error during signup:', error);
              signupError.textContent = 'An error occurred. Please try again.';
              signupError.style.display = 'block';
          }
      } else {
          signupError.textContent = 'Please fill in all fields.';
          signupError.style.display = 'block';
      }
  });

  
  loginSubmit?.addEventListener('click', async () => {
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value.trim();

      try {
          const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
          });
          const data = await response.json();

          if (response.ok) {
              alert(`Welcome back, ${data.name || 'User'}!`);
              loginError.style.display = 'none';
              authSec.style.display = 'none'; 
              localStorage.setItem('token', data.token); 
          } else {
              loginError.textContent = data.message || 'Invalid email or password.';
              loginError.style.display = 'block';
          }
      } catch (error) {
          console.error('Error during login:', error);
          loginError.textContent = 'An error occurred. Please try again.';
          loginError.style.display = 'block';
      }
  });

  
  authSec.style.display = 'none'; 
  toggleAuthForm(true); 
});
