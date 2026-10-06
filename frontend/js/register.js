const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("registerEmail").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Пароли не совпадают");
        return;
    }

    const student = {
        firstName,
        lastName,
        email,
        phone,
        role: "student",
        status: "pending"
    };

    console.log("Новый ученик:", student);

    localStorage.setItem(
        "registeredStudent",
        JSON.stringify(student)
    );

    document
        .getElementById("registerMessage")
        .classList.remove("d-none");

});