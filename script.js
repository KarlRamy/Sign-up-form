const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const showLoginBtn = document.getElementById('showLoginForm');
const showSignupBtn = document.getElementById('showSignupForm');
const successMessage = document.getElementById('successMessage');
const successText = document.getElementById('successText');
const successBackBtn = document.getElementById('showSignupFormSuccess');

function showLogin() {
    signupForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    successMessage.classList.add('hidden');
}

function showSignup() {
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
    successMessage.classList.add('hidden');
}

function showSuccess(message) {
    signupForm.classList.add('hidden');
    loginForm.classList.add('hidden');
    successMessage.classList.remove('hidden');
    successText.textContent = message;
}

function saveUser(userData) {
    let users = localStorage.getItem('users');
    users = users ? JSON.parse(users) : [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
}

function validateSignupForm(name, email, age, password) {
    document.getElementById('name-error').textContent = name.length >= 3 ? '' : 'Name must be at least 3 characters';
    document.getElementById('email-error').textContent = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Invalid email';
    document.getElementById('age-error').textContent = age > 18 ? '' : 'You must be over 18';
    const passwordValid = /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*]/.test(password) && password.length > 8;
    document.getElementById('password-error').textContent = passwordValid ? '' : 'Password too weak';
    return name.length >= 3 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && age > 18 && passwordValid;
}

signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = parseInt(document.getElementById('age').value);
    const password = document.getElementById('password').value;
    const isValid = validateSignupForm(name, email, age, password);

    if (isValid) {
        saveUser({ name, email, age, password });
        showSuccess('Signup successful!');
        signupForm.reset();
    } else {
        document.getElementById('signup-error').textContent = 'Please fix the errors';
    }
});

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        showSuccess(`Welcome back, ${user.name}!`);
        loginForm.reset();
    } else {
        document.getElementById('login-error').textContent = 'Invalid email or password.';
    }
});

showLoginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    showLogin();
});

showSignupBtn.addEventListener('click', function(e) {
    e.preventDefault();
    showSignup();
});

if (successBackBtn) {
    successBackBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showSignup();
    });
}

showSignup(); 
