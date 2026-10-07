


const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

function showLoginForm() {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    loginBtn.classList.add("active");
    signupBtn.classList.remove("active");
}

function showSignupForm() {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    signupBtn.classList.add("active");
    loginBtn.classList.remove("active");
}

loginBtn.addEventListener("click", showLoginForm);
signupBtn.addEventListener("click", showSignupForm);
showSignup.addEventListener("click", showSignupForm);
showLogin.addEventListener("click", showLoginForm);




document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", () => {
        const input = icon.previousElementSibling;
        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            input.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    });
});




const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!\%*?&]).{8,}$/;

function showError(inputId, errorId, message) {
    const errorElement = document.getElementById(errorId);
    const inputElement = document.getElementById(inputId);
    errorElement.innerText = message;
    errorElement.classList.add("show");
    inputElement.classList.add("input-error");
}

function clearError(inputId, errorId) {
    const errorElement = document.getElementById(errorId);
    const inputElement = document.getElementById(inputId);
    errorElement.innerText = "";
    errorElement.classList.remove("show");
    inputElement.classList.remove("input-error");
}

function shake(form) {
    form.classList.add('shake-anim');
    setTimeout(() => { form.classList.remove('shake-anim'); }, 400);
}

function loading(button, text) {
    button.disabled = true;
    button.dataset.text = button.innerHTML;
    button.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> ${text}`;
}

function resetButton(button) {
    button.disabled = false;
    button.innerHTML = button.dataset.text;
}


document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', function () {
        this.classList.remove('input-error');
        const errId = this.id + 'Error';
        if (document.getElementById(errId)) {
            document.getElementById(errId).classList.remove('show');
        }
    });
    input.addEventListener('change', function () {
        this.classList.remove('input-error');
    });
});




window.addEventListener("DOMContentLoaded", () => {
    const savedMail = localStorage.getItem("rememberEmail");
    if (savedMail) {
        document.getElementById("loginEmail").value = savedMail;
        document.getElementById("rememberMe").checked = true;
    }
});




loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const role = document.getElementById("loginRole").value;

    if (role === "") {
        document.getElementById("loginRole").classList.add("input-error");
        isValid = false;
    }
    if (!emailPattern.test(email)) {
        showError("loginEmail", "loginEmailError", "Enter a valid email address.");
        isValid = false;
    }
    if (password.length < 8) {
        showError("loginPassword", "loginPasswordError", "Password must be at least 8 characters.");
        isValid = false;
    }

    if (!isValid) {
        shake(loginForm);
        return;
    }

    const loginButton = loginForm.querySelector(".main-btn");
    loading(loginButton, "Authenticating...");

    const remember = document.getElementById("rememberMe");
    if (remember.checked) {
        localStorage.setItem("rememberEmail", email);
    } else {
        localStorage.removeItem("rememberEmail");
    }

    localStorage.setItem("UserMail", email);
    localStorage.setItem("UserRole", role);

    setTimeout(() => {
        resetButton(loginButton);
        if (role === "admin") {
            window.location.href = "admin.html";
        } else {

            window.location.href = "user.html";
        }
    }, 1200);
});




signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    const role = document.getElementById("signupRole").value;
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("signupConfirmPassword").value;

    if (role === "") {
        document.getElementById("signupRole").classList.add("input-error");
        isValid = false;
    }
    if (name.length < 3) {
        showError("signupName", "signupNameError", "Name must be at least 3 characters.");
        isValid = false;
    }
    if (!emailPattern.test(email)) {
        showError("signupEmail", "signupEmailError", "Enter a valid email address.");
        isValid = false;
    }
    if (!passwordPattern.test(password)) {
        showError("signupPassword", "signupPasswordError", "Need 8+ chars, upper, lower, num & symbol.");
        isValid = false;
    }
    if (password !== confirm || confirm === "") {
        showError("signupConfirmPassword", "signupConfirmError", "Passwords do not match.");
        isValid = false;
    }

    if (!isValid) {
        shake(signupForm);
        return;
    }

    const signupButton = signupForm.querySelector(".main-btn");
    loading(signupButton, "Creating Identity...");

    const user = { name: name, email: email, password: password, role: role };
    localStorage.setItem("registeredUser", JSON.stringify(user));

    setTimeout(() => {
        resetButton(signupButton);
        signupForm.reset();
        showLoginForm();
        document.getElementById("loginEmail").value = email;
    }, 1500);
});