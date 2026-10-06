const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Введите email и пароль");
        return;
    }

    console.log("Попытка входа:", email);

    alert("Вход пока тестовый. Backend подключим следующим этапом.");

});