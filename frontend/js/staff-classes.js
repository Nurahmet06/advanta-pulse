/* =========================================================
   ADVANTA PULSE
   СПИСОК КЛАССОВ УЧИТЕЛЯ
   ========================================================= */


/* =========================================================
   ТЕКУЩИЙ УЧИТЕЛЬ
   Пока тестовый аккаунт.
   Позже будет приходить из авторизации.
   ========================================================= */

const currentTeacher = {

    id: "teacher_math_1",

    name: "Айгуль Сериковна",

    subjectId: "math",

    subjectName: "Математика",

    classIds: [
        "class_5a",
        "class_5b",
        "class_6a"
    ]
};


/* =========================================================
   ELEMENTS
   ========================================================= */

const classesContainer =
    document.getElementById("classesContainer");

const teacherName =
    document.getElementById("teacherName");

const teacherSubject =
    document.getElementById("teacherSubject");

const classesDescription =
    document.getElementById("classesDescription");


/* =========================================================
   STORAGE
   ========================================================= */

function getStorageArray(key) {

    try {

        const value =
            JSON.parse(
                localStorage.getItem(key)
            );

        return Array.isArray(value)
            ? value
            : [];

    } catch (error) {

        return [];
    }
}


function saveStorageArray(key, value) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );
}


/* =========================================================
   КЛАССЫ
   ========================================================= */

function initializeClasses() {

    let classes =
        getStorageArray(
            "advantaClasses"
        );


    /*
      Если классов ещё нет,
      создаём стартовые.
    */

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
    }


    /*
      Привязываем к классам
      текущего учителя и его предмет.
    */

    classes =
        classes.map(
            function (classItem) {

                if (
                    currentTeacher.classIds.includes(
                        classItem.id
                    )
                ) {

                    return {

                        ...classItem,

                        teacherId:
                            currentTeacher.id,

                        approvalTeacherId:
                            currentTeacher.id,

                        subjectId:
                            currentTeacher.subjectId,

                        subjectName:
                            currentTeacher.subjectName
                    };
                }


                return classItem;
            }
        );


    saveStorageArray(
        "advantaClasses",
        classes
    );


    return classes;
}


/* =========================================================
   МОИ КЛАССЫ
   ========================================================= */

function getTeacherClasses() {

    const classes =
        initializeClasses();


    return classes
        .filter(
            function (classItem) {

                return (
                    classItem.active !== false
                    &&
                    currentTeacher.classIds.includes(
                        classItem.id
                    )
                );
            }
        )
        .sort(
            function (a, b) {

                if (
                    a.grade !== b.grade
                ) {

                    return (
                        a.grade - b.grade
                    );
                }


                return a.name.localeCompare(
                    b.name,
                    "ru"
                );
            }
        );
}


/* =========================================================
   УЧЕНИКИ
   ========================================================= */

function getStudents(classId) {

    return getStorageArray(
        "advantaUsers"
    ).filter(
        function (user) {

            return (
                user.role === "student"
                &&
                user.status === "active"
                &&
                user.classId === classId
            );
        }
    );
}


/* =========================================================
   ЗАЯВКИ
   ========================================================= */

function getRequests(classId) {

    return getStorageArray(
        "advantaJoinRequests"
    ).filter(
        function (request) {

            return (
                request.classId === classId
                &&
                request.status === "pending"
            );
        }
    );
}


/* =========================================================
   ТЕСТЫ
   ========================================================= */

function getTests(classId) {

    return getStorageArray(
        "advantaTests"
    ).filter(
        function (test) {


            /*
              Новая структура
            */

            if (
                test.classId === classId
            ) {

                return true;
            }


            /*
              На случай старых тестов,
              где classId ещё не записан,
              но есть className.
            */

            const classes =
                getStorageArray(
                    "advantaClasses"
                );


            const currentClass =
                classes.find(
                    function (classItem) {

                        return (
                            classItem.id === classId
                        );
                    }
                );


            if (
                currentClass
                &&
                test.className ===
                    currentClass.name
            ) {

                return true;
            }


            /*
              На случай временной структуры
              с несколькими classIds.
            */

            if (
                Array.isArray(
                    test.classIds
                )
                &&
                test.classIds.includes(
                    classId
                )
            ) {

                return true;
            }


            return false;
        }
    );
}


/* =========================================================
   SUBJECT
   ========================================================= */

function getSubjectName() {

    if (
        typeof t === "function"
        &&
        currentTeacher.subjectId
    ) {

        return t(
            currentTeacher.subjectId
        );
    }


    return currentTeacher.subjectName;
}


/* =========================================================
   DYNAMIC LANGUAGE
   ========================================================= */

function getPageText(key) {

    const language =
        typeof getCurrentLanguage === "function"
            ? getCurrentLanguage()
            : "ru";


    const texts = {

        ru: {

            description:
                "Выберите класс для перехода в его кабинет",

            students:
                "учеников",

            requests:
                "заявок",

            tests:
                "тестов",

            openClass:
                "Открыть класс"

        },


        kz: {

            description:
                "Сынып кабинетіне өту үшін сыныпты таңдаңыз",

            students:
                "оқушы",

            requests:
                "өтінім",

            tests:
                "тест",

            openClass:
                "Сыныпты ашу"

        },


        en: {

            description:
                "Select a class to open its dashboard",

            students:
                "students",

            requests:
                "requests",

            tests:
                "tests",

            openClass:
                "Open class"

        }

    };


    return (
        texts[language]?.[key]
        ||
        texts.ru[key]
        ||
        key
    );
}


/* =========================================================
   HEADER
   ========================================================= */

function renderHeader() {

    if (
        teacherName
    ) {

        teacherName.textContent =
            currentTeacher.name;
    }


    if (
        teacherSubject
    ) {

        const teacherWord =
            typeof t === "function"
                ? t("teacher")
                : "Учитель";


        teacherSubject.textContent =
            `${teacherWord} • ${getSubjectName()}`;
    }


    if (
        classesDescription
    ) {

        classesDescription.textContent =
            getPageText(
                "description"
            );
    }
}


/* =========================================================
   RENDER CLASSES
   ========================================================= */

function renderClasses() {

    if (
        !classesContainer
    ) {

        return;
    }


    const classes =
        getTeacherClasses();


    classesContainer.innerHTML =
        "";


    classes.forEach(
        function (classItem) {

            const students =
                getStudents(
                    classItem.id
                );


            const requests =
                getRequests(
                    classItem.id
                );


            const tests =
                getTests(
                    classItem.id
                );


            const column =
                document.createElement(
                    "div"
                );


            column.className =
                "col-lg-4 col-md-6";


            column.innerHTML = `

                <a
                    href="staff-class.html?class=${encodeURIComponent(classItem.id)}"
                    class="text-decoration-none text-dark"
                >

                    <div
                        class="content-card h-100"
                        style="
                            cursor: pointer;
                            transition: transform 0.2s ease;
                        "
                    >


                        <div
                            class="d-flex justify-content-between align-items-start"
                        >


                            <div>


                                <div
                                    class="overview-icon mb-3"
                                >

                                    <i class="bi bi-people"></i>

                                </div>


                                <h3
                                    class="fw-bold mb-1"
                                >

                                    ${classItem.name}

                                </h3>


                                <p
                                    class="text-secondary mb-0"
                                >

                                    ${getSubjectName()}

                                </p>


                            </div>



                            <div
                                class="d-flex align-items-center gap-2"
                            >


                                ${
                                    requests.length > 0

                                        ?

                                        `
                                        <span
                                            class="badge text-bg-danger rounded-pill"
                                        >
                                            ${requests.length}
                                        </span>
                                        `

                                        :

                                        ""
                                }


                                <i
                                    class="bi bi-chevron-right text-secondary"
                                ></i>


                            </div>


                        </div>



                        <div
                            class="d-flex flex-wrap gap-4 mt-4"
                        >


                            <!-- STUDENTS -->

                            <div>

                                <div
                                    class="fw-bold fs-5"
                                >

                                    ${students.length}

                                </div>

                                <small
                                    class="text-secondary"
                                >

                                    ${getPageText("students")}

                                </small>

                            </div>



                            <!-- REQUESTS -->

                            <div>

                                <div
                                    class="fw-bold fs-5"
                                >

                                    ${requests.length}

                                </div>

                                <small
                                    class="text-secondary"
                                >

                                    ${getPageText("requests")}

                                </small>

                            </div>



                            <!-- TESTS -->

                            <div>

                                <div
                                    class="fw-bold fs-5"
                                >

                                    ${tests.length}

                                </div>

                                <small
                                    class="text-secondary"
                                >

                                    ${getPageText("tests")}

                                </small>

                            </div>


                        </div>



                        <div
                            class="mt-4 text-primary small fw-semibold"
                        >

                            ${getPageText("openClass")}

                            <i
                                class="bi bi-arrow-right ms-1"
                            ></i>

                        </div>


                    </div>

                </a>
            `;


            classesContainer.appendChild(
                column
            );
        }
    );
}


/* =========================================================
   LANGUAGE CHANGE
   ========================================================= */

window.addEventListener(
    "languageChanged",
    function () {

        renderHeader();

        renderClasses();

    }
);


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderHeader();

        renderClasses();

    }
);