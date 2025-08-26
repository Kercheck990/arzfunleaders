// script.js

document.addEventListener("DOMContentLoaded", () => {
    const loginPage = document.getElementById("login-page");
    const mainPage = document.getElementById("main-page");
    const loginForm = document.getElementById("login-form");
    const bypassBtn = document.getElementById("bypass-btn");
    const logoutBtn = document.getElementById("logout-btn");

    // Тестовые данные для входа
    const TEST_LOGIN = "admin";
    const TEST_PASSWORD = "1234";

    // Проверка входа
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const login = document.getElementById("login").value.trim();
        const password = document.getElementById("password").value.trim();

        if (login === TEST_LOGIN && password === TEST_PASSWORD) {
            goToMain();
        } else {
            alert("Неверный логин или пароль!");
        }
    });

    // Обход авторизации
    bypassBtn.addEventListener("click", () => {
        goToMain();
    });

    // Выход
    logoutBtn.addEventListener("click", () => {
        mainPage.classList.add("hidden");
        loginPage.classList.remove("hidden");
        loginForm.reset();
    });

    // Функция перехода на главное меню
    function goToMain() {
        loginPage.classList.add("hidden");
        mainPage.classList.remove("hidden");
    }
});
