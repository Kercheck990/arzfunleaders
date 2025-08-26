document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;

            if (login === 'admin' && password === 'admin') {
                window.location.href = 'main.html';
            } else {
                alert('Неверный логин или пароль!');
            }
        });
    }

    const factionTitle = document.getElementById('faction-title');
    const factionContent = document.getElementById('faction-content');
    if (factionTitle && factionContent) {
        const urlParams = new URLSearchParams(window.location.search);
        const factionId = urlParams.get('id');

        const factionsData = {
            'groove': {
                title: 'Groove Street',
                content: `
                    <div class="faction-content-box">
                        <h3>Информация о фракции Groove Street</h3>
                        <p>Groove Street Families - одна из старейших и наиболее уважаемых уличных банд Лос-Сантоса. Они славятся своей преданностью и контролем над своей территорией.</p>
                        <h4>Состав:</h4>
                        <p>Лидер: Dmitry_Ivanov<br>Заместитель: Nikita_Smirnov</p>
                    </div>
                `
            },
            'ballas': {
                title: 'Ballas',
                content: `
                    <div class="faction-content-box">
                        <h3>Информация о фракции Ballas</h3>
                        <p>Ballas - это безжалостная и высокоорганизованная банда, известная своей фиолетовой одеждой и ожесточенными конфликтами с конкурирующими группировками.</p>
                        <h4>Состав:</h4>
                        <p>Лидер: Aleksandr_Petrov<br>Заместитель: Ivan_Sidorov</p>
                    </div>
                `
            }
        };

        if (factionsData[factionId]) {
            factionTitle.textContent = factionsData[factionId].title;
            factionContent.innerHTML = factionsData[factionId].content;
        } else {
            factionTitle.textContent = 'Фракции';
            factionContent.innerHTML = '<h2>Выберите фракцию:</h2><a href="factions.html?id=groove" class="faction-card groove">Groove Street</a> <a href="factions.html?id=ballas" class="faction-card ballas">Ballas</a>';
        }
    }
});
