// ====== Авторизация ======
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin") {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", username);
        window.location.href = "main.html";
    } else {
        alert("❌ Неверный логин или пароль");
    }
}

// ====== Обход авторизации ======
function skipLogin() {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", "Гость");
    window.location.href = "main.html";
}

// ====== Проверка авторизации ======
function checkAuth() {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html";
    }
}

// ====== Выход ======
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

// ====== Профиль ======
function loadProfile() {
    checkAuth();
    const username = localStorage.getItem("username") || "Неизвестный";
    document.getElementById("profile-name").innerText = username;
    document.getElementById("profile-role").innerText = 
        username === "admin" ? "Администратор" : "Игрок";
}

// ====== Лидеры фракций ======
function loadLeaders() {
    checkAuth();
    let leaders = JSON.parse(localStorage.getItem("leaders")) || {
        "Groove": ["Kercheck990"],
        "Ballas": ["Farmila"]
    };

    const container = document.getElementById("leaders-list");
    container.innerHTML = "";

    for (let faction in leaders) {
        let block = document.createElement("div");
        block.classList.add("faction-block");

        let title = document.createElement("h3");
        title.innerText = faction;
        block.appendChild(title);

        let ul = document.createElement("ul");
        leaders[faction].forEach((leader, index) => {
            let li = document.createElement("li");
            li.innerText = leader;

            // кнопка удаления
            let btn = document.createElement("button");
            btn.innerText = "❌";
            btn.onclick = function() {
                leaders[faction].splice(index, 1);
                localStorage.setItem("leaders", JSON.stringify(leaders));
                loadLeaders();
            };

            li.appendChild(btn);
            ul.appendChild(li);
        });
        block.appendChild(ul);

        // форма добавления
        let input = document.createElement("input");
        input.placeholder = "Ник нового лидера";
        input.id = faction + "-input";

        let addBtn = document.createElement("button");
        addBtn.innerText = "Добавить";
        addBtn.onclick = function() {
            let nick = document.getElementById(faction + "-input").value.trim();
            if (nick) {
                leaders[faction].push(nick);
                localStorage.setItem("leaders", JSON.stringify(leaders));
                loadLeaders();
            }
        };

        block.appendChild(input);
        block.appendChild(addBtn);

        container.appendChild(block);
    }
}

// ====== Навигация ======
function goPage(page) {
    window.location.href = page;
}
