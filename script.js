// script.js

document.addEventListener("DOMContentLoaded", () => {
    const TEST_LOGIN = "admin";
    const TEST_PASSWORD = "1234";

    const loginForm = document.getElementById("login-form");
    const bypassBtn = document.getElementById("bypass-btn");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const login = document.getElementById("login").value.trim();
            const password = document.getElementById("password").value.trim();

            if (login === TEST_LOGIN && password === TEST_PASSWORD) {
                window.location.href = "main.html"; // путь к главному меню
            } else {
                alert("Неверный логин или пароль!");
            }
        });
    }
        });
    }
});
