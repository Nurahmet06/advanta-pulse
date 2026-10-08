const registerForm = document.getElementById("registerForm");
const registerButton = document.getElementById("registerButton");
const studentClassSelect = document.getElementById("studentClass");

const registerMessage = document.getElementById("registerMessage");
const registerMessageText = document.getElementById("registerMessageText");


/* =========================
   ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
========================= */

function getStorageArray(key) {
    try {
        const data = JSON.parse(localStorage.getItem(key));
        return Array.isArray(data) ? data : [];
    } catch (error) {
        return [];
    }
}


function createId(prefix) {
    return `${prefix}_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 9)}`;
}


function normalizeEmail(email) {
    return email.trim().toLowerCase();
}


function normalizePhone(phone) {
    return phone.replace(/[^\d+]/g, "");
}


/*
  Пока у нас демо без настоящего backend.
  Поэтому пароль не сохраняем обычным текстом.
*/
async function hashPassword(password) {

    const encodedPassword =
        new TextEncoder().encode(password);

    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            encodedPassword
        );

    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );

    return hashArray
        .map(byte =>
            byte.toString(16).padStart(2, "0")
        )
        .join("");
}


/* =========================
   КЛАССЫ
========================= */

/*
  Это временная стартовая база классов.

  Позже классы будут создаваться /
  назначаться через кабинет учителя
  или администратора.

  Важно:
  ученик выбирает НЕ произвольный текст,
  а только существующий класс.
*/

function initializeClasses() {

    let classes = getStorageArray(
        "advantaClasses"
    );


    if (classes.length === 0) {

        classes = [

            {
                id: "class_5a",
                name: "5А",
                grade: 5,
                letter: "А",
                active: true
            },

            {
                id: "class_5b",
                name: "5Б",
                grade: 5,
                letter: "Б",
                active: true
            },

            {
                id: "class_6a",
                name: "6А",
                grade: 6,
                letter: "А",
                active: true
            }

        ];


        localStorage.setItem(
            "advantaClasses",
            JSON.stringify(classes)
        );
    }


    return classes;
}


/* =========================
   ЗАПОЛНЕНИЕ SELECT
========================= */

function loadClasses() {

    const classes = initializeClasses();


    studentClassSelect.innerHTML = `
        <option value="">
            Выберите свой класс
        </option>
    `;


    const activeClasses =
        classes
            .filter(item =>
                item.active !== false
            )
            .sort((a, b) => {

                if (a.grade !== b.grade) {
                    return a.grade - b.grade;
                }

                return a.name.localeCompare(
                    b.name,
                    "ru"
                );
            });


    activeClasses.forEach(classItem => {

        const option =
            document.createElement("option");

        option.value = classItem.id;
        option.textContent = classItem.name;

        studentClassSelect.appendChild(
            option
        );
    });
}


/* =========================
   РЕГИСТРАЦИЯ
========================= */

registerForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const firstName =
            document
                .getElementById("firstName")
                .value
                .trim();


        const lastName =
            document
                .getElementById("lastName")
                .value
                .trim();


        const selectedClassId =
            studentClassSelect.value;


        const email =
            normalizeEmail(
                document
                    .getElementById("registerEmail")
                    .value
            );


        const phone =
            normalizePhone(
                document
                    .getElementById("phone")
                    .value
            );


        const password =
            document
                .getElementById("registerPassword")
                .value;


        const confirmPassword =
            document
                .getElementById("confirmPassword")
                .value;


        /* Проверка имени */

        if (!firstName || !lastName) {

            alert(
                "Введите имя и фамилию"
            );

            return;
        }


        /* Проверка класса */

        if (!selectedClassId) {

            alert(
                "Выберите свой класс"
            );

            return;
        }


        const classes =
            getStorageArray(
                "advantaClasses"
            );


        const selectedClass =
            classes.find(
                classItem =>
                    classItem.id ===
                    selectedClassId
            );


        if (!selectedClass) {

            alert(
                "Выбранный класс не найден"
            );

            return;
        }


        /* Проверка пароля */

        if (password.length < 6) {

            alert(
                "Пароль должен содержать минимум 6 символов"
            );

            return;
        }


        if (password !== confirmPassword) {

            alert(
                "Пароли не совпадают"
            );

            return;
        }


        /* =========================
           ПРОВЕРКА СУЩЕСТВУЮЩИХ
           ПОЛЬЗОВАТЕЛЕЙ
        ========================= */

        const users =
            getStorageArray(
                "advantaUsers"
            );


        const existingUser =
            users.find(user =>
                normalizeEmail(
                    user.email || ""
                ) === email
            );


        if (existingUser) {

            alert(
                "Аккаунт с таким Email уже существует"
            );

            return;
        }


        /* =========================
           ПРОВЕРКА ЗАЯВОК
        ========================= */

        const joinRequests =
            getStorageArray(
                "advantaJoinRequests"
            );


        const existingRequest =
            joinRequests.find(request =>
                normalizeEmail(
                    request.email || ""
                ) === email &&
                request.status === "pending"
            );


        if (existingRequest) {

            alert(
                `У вас уже есть заявка в ${existingRequest.className}. Ожидайте подтверждения учителя.`
            );

            return;
        }


        /* =========================
           СОЗДАЁМ ЗАЯВКУ
        ========================= */

        registerButton.disabled = true;

        registerButton.textContent =
            "Отправляем запрос...";


        try {

            const passwordHash =
                await hashPassword(password);


            const studentId =
                createId("student");


            const requestId =
                createId("request");


            const joinRequest = {

                id: requestId,

                studentId: studentId,

                firstName: firstName,

                lastName: lastName,

                email: email,

                phone: phone,

                passwordHash: passwordHash,

                role: "student",

                status: "pending",


                /* Куда отправляется заявка */

                classId:
                    selectedClass.id,

                className:
                    selectedClass.name,


                /*
                  Позже здесь появится
                  конкретный ответственный
                  учитель класса.
                */

                approvalTeacherId:
                    selectedClass.approvalTeacherId ||
                    null,


                createdAt:
                    new Date().toISOString()
            };


            joinRequests.push(
                joinRequest
            );


            localStorage.setItem(
                "advantaJoinRequests",
                JSON.stringify(
                    joinRequests
                )
            );


            /*
              На этом компьютере запоминаем,
              что регистрация ожидает
              подтверждения.
            */

            localStorage.setItem(
                "advantaPendingStudent",
                JSON.stringify({

                    requestId: requestId,

                    studentId: studentId,

                    email: email,

                    classId:
                        selectedClass.id,

                    className:
                        selectedClass.name,

                    status: "pending"

                })
            );


            console.log(
                "Новая заявка ученика:",
                joinRequest
            );


            /* Скрываем форму */

            registerForm.classList.add(
                "d-none"
            );


            /* Показываем результат */

            registerMessageText.textContent =
                `Ваш запрос отправлен в ${selectedClass.name} класс. После подтверждения учителем вы сможете войти в систему.`;


            registerMessage.classList.remove(
                "d-none"
            );


        } catch (error) {

            console.error(
                "Ошибка регистрации:",
                error
            );


            alert(
                "Не удалось отправить запрос. Попробуйте ещё раз."
            );


            registerButton.disabled = false;

            registerButton.textContent =
                "Отправить запрос";
        }

    }
);


/* =========================
   ЗАПУСК
========================= */

loadClasses();