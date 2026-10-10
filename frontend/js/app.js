/* =========================================================
   ADVANTA PULSE
   LOGIN
   ========================================================= */


const loginForm =
    document.getElementById(
        "loginForm"
    );


const emailInput =
    document.getElementById(
        "email"
    );


const passwordInput =
    document.getElementById(
        "password"
    );


const loginButton =
    document.getElementById(
        "loginButton"
    );


const loginMessage =
    document.getElementById(
        "loginMessage"
    );


const languageSelect =
    document.getElementById(
        "languageSelect"
    );


const togglePassword =
    document.getElementById(
        "togglePassword"
    );


const passwordIcon =
    document.getElementById(
        "passwordIcon"
    );


/* =========================================================
   STORAGE
   ========================================================= */

function getStorageArray(key) {

    try {

        const data =
            JSON.parse(
                localStorage.getItem(key)
            );


        return Array.isArray(data)
            ? data
            : [];

    } catch (error) {

        return [];
    }
}


/* =========================================================
   LANGUAGE
   ========================================================= */

function getLanguage() {

    if (
        typeof getCurrentLanguage === "function"
    ) {

        return getCurrentLanguage();
    }


    return (
        localStorage.getItem("language")
        ||
        "ru"
    );
}


function uiText(key) {

    const language =
        getLanguage();


    const texts = window.AdvantaI18n.scope("app");


    return (
        texts[language]?.[key]
        ||
        texts.ru[key]
        ||
        key
    );
}


/* =========================================================
   APPLY LANGUAGE
   ========================================================= */

function applyLoginLanguage() {

    document.documentElement.lang =
        getLanguage() === "kz"
            ? "kk"
            : getLanguage();


    document.getElementById(
        "systemDescription"
    ).textContent =
        uiText("description");


    document.getElementById(
        "loginTitle"
    ).textContent =
        uiText("loginTitle");


    document.getElementById(
        "emailLabel"
    ).textContent =
        uiText("email");


    emailInput.placeholder =
        uiText("emailPlaceholder");


    document.getElementById(
        "passwordLabel"
    ).textContent =
        uiText("password");


    passwordInput.placeholder =
        uiText("passwordPlaceholder");


    document.getElementById(
        "loginButtonText"
    ).textContent =
        uiText("login");


    document.getElementById(
        "registrationQuestion"
    ).textContent =
        uiText("registrationQuestion");


    document.getElementById(
        "registrationButton"
    ).textContent =
        uiText("registration");


    togglePassword.setAttribute(
        "aria-label",
        passwordInput.type === "password"
            ? uiText("showPassword")
            : uiText("hidePassword")
    );
}


/* =========================================================
   MESSAGE
   ========================================================= */

function showMessage(
    message,
    type = "danger"
) {

    loginMessage.className =
        `alert alert-${type}`;


    loginMessage.textContent =
        message;


    loginMessage.classList.remove(
        "d-none"
    );
}


function hideMessage() {

    loginMessage.classList.add(
        "d-none"
    );


    loginMessage.textContent =
        "";
}


/* =========================================================
   PASSWORD HASH
   Same SHA-256 as registration
   ========================================================= */

async function hashPassword(password) {

    const encoder =
        new TextEncoder();


    const data =
        encoder.encode(
            password
        );


    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            data
        );


    const hashArray =
        Array.from(
            new Uint8Array(
                hashBuffer
            )
        );


    return hashArray
        .map(
            byte =>
                byte
                    .toString(16)
                    .padStart(2, "0")
        )
        .join("");
}


/* =========================================================
   NORMALIZE EMAIL
   ========================================================= */

function normalizeEmail(email) {

    return String(
        email || ""
    )
        .trim()
        .toLowerCase();
}


/* =========================================================
   CURRENT USER
   ========================================================= */

function saveStudentSession(student) {

    const sessionUser = {

        id:
            student.id,

        firstName:
            student.firstName,

        lastName:
            student.lastName,

        email:
            student.email,

        phone:
            student.phone || "",

        role:
            "student",

        status:
            student.status,

        classId:
            student.classId,

        className:
            student.className,

        loggedInAt:
            new Date().toISOString()

    };


    /*
      Общий ключ текущего пользователя.
    */

    localStorage.setItem(
        "advantaCurrentUser",
        JSON.stringify(
            sessionUser
        )
    );


    /*
      Отдельный ключ оставляем для
      удобства student-страниц.
    */

    localStorage.setItem(
        "advantaCurrentStudent",
        JSON.stringify(
            sessionUser
        )
    );
}


/* =========================================================
   OPTIONAL STAFF SESSION
   В будущем сюда подключим настоящую
   авторизацию сотрудников.
   ========================================================= */

function saveStaffSession(staff) {

    const sessionUser = {

        ...staff,

        passwordHash:
            undefined,

        loggedInAt:
            new Date().toISOString()

    };


    localStorage.setItem(
        "advantaCurrentUser",
        JSON.stringify(
            sessionUser
        )
    );


    localStorage.removeItem(
        "advantaCurrentStudent"
    );
}


/* =========================================================
   FIND REQUEST STATUS
   ========================================================= */

function getLatestRequest(email) {

    const requests =
        getStorageArray(
            "advantaJoinRequests"
        )
        .filter(
            request =>
                normalizeEmail(
                    request.email
                ) === email
        );


    if (
        requests.length === 0
    ) {

        return null;
    }


    requests.sort(
        (a, b) => {

            const dateA =
                new Date(
                    a.createdAt || 0
                ).getTime();


            const dateB =
                new Date(
                    b.createdAt || 0
                ).getTime();


            return dateB - dateA;
        }
    );


    return requests[0];
}


/* =========================================================
   STUDENT LOGIN
   ========================================================= */

async function tryStudentLogin(
    email,
    passwordHash
) {

    const users =
        getStorageArray(
            "advantaUsers"
        );


    const student =
        users.find(
            user =>
                user.role === "student"
                &&
                normalizeEmail(
                    user.email
                ) === email
        );


    /*
      ACTIVE STUDENT EXISTS
    */

    if (
        student
    ) {

        if (
            student.status !== "active"
        ) {

            showMessage(
                uiText("inactive")
            );


            return true;
        }


        if (
            student.passwordHash !==
            passwordHash
        ) {

            showMessage(
                uiText("wrongCredentials")
            );


            return true;
        }


        saveStudentSession(
            student
        );


        window.location.href =
            "student-home.html";


        return true;
    }


    /*
      NO ACTIVE STUDENT:
      CHECK JOIN REQUEST.
    */

    const request =
        getLatestRequest(
            email
        );


    if (
        !request
    ) {

        return false;
    }


    /*
      Check password too, so we don't reveal
      request status to a random person who
      only knows the email address.
    */

    if (
        request.passwordHash !==
        passwordHash
    ) {

        showMessage(
            uiText("wrongCredentials")
        );


        return true;
    }


    if (
        request.status === "pending"
    ) {

        showMessage(
            uiText("pending"),
            "warning"
        );


        return true;
    }


    if (
        request.status === "rejected"
    ) {

        showMessage(
            uiText("rejected"),
            "danger"
        );


        return true;
    }


    if (
        request.status === "approved"
    ) {

        showMessage(
            uiText("approvedError"),
            "warning"
        );


        return true;
    }


    return false;
}


/* =========================================================
   STAFF LOGIN
   FUTURE-PROOF:
   Works automatically if later we create
   advantaStaffUsers.
   ========================================================= */

async function tryStaffLogin(
    email,
    passwordHash
) {

    const staffUsers =
        getStorageArray(
            "advantaStaffUsers"
        );


    const staff =
        staffUsers.find(
            user =>
                normalizeEmail(
                    user.email
                ) === email
        );


    if (
        !staff
    ) {

        return false;
    }


    if (
        staff.status
        &&
        staff.status !== "active"
    ) {

        showMessage(
            uiText("inactive")
        );


        return true;
    }


    if (
        staff.passwordHash !==
        passwordHash
    ) {

        showMessage(
            uiText("wrongCredentials")
        );


        return true;
    }


    saveStaffSession(
        staff
    );


    const destination = {
        teacher: "staff-home.html",
        "vice-principal": "vice-principal-home.html",
        vicePrincipal: "vice-principal-home.html",
        director: "director-home.html",
        administrator: "admin-home.html",
        admin: "admin-home.html"
    };
    window.location.href = destination[staff.role] || "index.html";


    return true;
}


/* =========================================================
   LOGIN
   ========================================================= */

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        hideMessage();


        const email =
            normalizeEmail(
                emailInput.value
            );


        const password =
            passwordInput.value;


        if (
            !email
            ||
            !password
        ) {

            showMessage(
                uiText("fillFields")
            );


            return;
        }


        loginButton.disabled =
            true;


        document.getElementById(
            "loginButtonText"
        ).textContent =
            uiText("loggingIn");


        try {

            const passwordHash =
                await hashPassword(
                    password
                );


            /*
              1. STUDENT
            */

            const studentHandled =
                await tryStudentLogin(
                    email,
                    passwordHash
                );


            if (
                studentHandled
            ) {

                return;
            }


            /*
              2. STAFF
              Пока работает только если позже
              добавим advantaStaffUsers.
            */

            const staffHandled =
                await tryStaffLogin(
                    email,
                    passwordHash
                );


            if (
                staffHandled
            ) {

                return;
            }


            /*
              NOTHING FOUND
            */

            showMessage(
                uiText("wrongCredentials")
            );

        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            showMessage(
                uiText("wrongCredentials")
            );

        } finally {

            loginButton.disabled =
                false;


            document.getElementById(
                "loginButtonText"
            ).textContent =
                uiText("login");
        }
    }
);


/* =========================================================
   SHOW / HIDE PASSWORD
   ========================================================= */

togglePassword.addEventListener(
    "click",
    function () {

        const hidden =
            passwordInput.type ===
            "password";


        passwordInput.type =
            hidden
                ? "text"
                : "password";


        passwordIcon.className =
            hidden
                ? "bi bi-eye-slash"
                : "bi bi-eye";


        togglePassword.setAttribute(
            "aria-label",
            hidden
                ? uiText("hidePassword")
                : uiText("showPassword")
        );
    }
);


/* =========================================================
   LANGUAGE SELECT
   ========================================================= */

if (
    languageSelect
) {

    languageSelect.value =
        getLanguage();


    languageSelect.addEventListener(
        "change",
        function () {

            if (
                typeof setLanguage ===
                "function"
            ) {

                setLanguage(
                    this.value
                );

            } else {

                localStorage.setItem(
                    "language",
                    this.value
                );


                applyLoginLanguage();
            }
        }
    );
}


/* =========================================================
   LANGUAGE EVENT
   ========================================================= */

window.addEventListener(
    "languageChanged",
    function () {

        applyLoginLanguage();
    }
);


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        applyLoginLanguage();
    }
);