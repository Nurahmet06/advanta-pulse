/* =========================================================
   ADVANTA PULSE
   STUDENT HOME
   ========================================================= */


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


function getStorageObject(key) {

    try {

        const data =
            JSON.parse(
                localStorage.getItem(key)
            );

        return (
            data &&
            typeof data === "object"
        )
            ? data
            : null;

    } catch (error) {

        return null;
    }
}


/* =========================================================
   CURRENT STUDENT
   ========================================================= */

function getCurrentStudent() {

    const student =
        getStorageObject(
            "advantaCurrentStudent"
        );


    if (
        student &&
        student.role === "student"
    ) {

        return student;
    }


    const user =
        getStorageObject(
            "advantaCurrentUser"
        );


    if (
        user &&
        user.role === "student"
    ) {

        return user;
    }


    return null;
}


const currentStudent =
    getCurrentStudent();


if (!currentStudent) {

    window.location.href =
        "index.html";
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


    const texts = {

        ru: {

            welcome: "Добро пожаловать",
            class: "класс",

            home: "Главная",
            tasks: "Задания",
            results: "Мои результаты",
            logout: "Выйти",

            activeTasks: "Активные задания",
            goToTasks: "Перейти к заданиям",

            average: "Средний результат",
            allResults: "Все результаты",

            best: "Лучший результат",
            view: "Посмотреть",

            activeTestsTitle: "Активные задания",
            activeTestsDescription:
                "Тесты, назначенные вашему классу",

            noTests: "Нет активных заданий",
            noTestsText:
                "Новые тесты появятся здесь",

            deadline: "Дедлайн",
            noDeadline: "Без дедлайна",

            minutes: "мин.",
            noTimeLimit:
                "Без ограничения времени",

            questions: "вопросов",
            start: "Начать тест",

            lastResult: "Последний результат",

            mathematics: "Математика",

            passed: "Пройден",
            failed: "Не пройден"
        },


        kz: {

            welcome: "Қош келдіңіз",
            class: "сынып",

            home: "Басты бет",
            tasks: "Тапсырмалар",
            results: "Менің нәтижелерім",
            logout: "Шығу",

            activeTasks: "Белсенді тапсырмалар",
            goToTasks: "Тапсырмаларға өту",

            average: "Орташа нәтиже",
            allResults: "Барлық нәтижелер",

            best: "Үздік нәтиже",
            view: "Көру",

            activeTestsTitle: "Белсенді тапсырмалар",
            activeTestsDescription:
                "Сіздің сыныбыңызға тағайындалған тесттер",

            noTests: "Белсенді тапсырмалар жоқ",
            noTestsText:
                "Жаңа тесттер осында пайда болады",

            deadline: "Соңғы мерзім",
            noDeadline: "Мерзімсіз",

            minutes: "мин.",
            noTimeLimit:
                "Уақыт шектеусіз",

            questions: "сұрақ",
            start: "Тестті бастау",

            lastResult: "Соңғы нәтиже",

            mathematics: "Математика",

            passed: "Өтті",
            failed: "Өтпеді"
        },


        en: {

            welcome: "Welcome",
            class: "class",

            home: "Home",
            tasks: "Tasks",
            results: "My results",
            logout: "Log out",

            activeTasks: "Active tasks",
            goToTasks: "Go to tasks",

            average: "Average result",
            allResults: "All results",

            best: "Best result",
            view: "View",

            activeTestsTitle: "Active tasks",
            activeTestsDescription:
                "Tests assigned to your class",

            noTests: "No active tasks",
            noTestsText:
                "New tests will appear here",

            deadline: "Deadline",
            noDeadline: "No deadline",

            minutes: "min.",
            noTimeLimit: "No time limit",

            questions: "questions",
            start: "Start test",

            lastResult: "Latest result",

            mathematics: "Mathematics",

            passed: "Passed",
            failed: "Not passed"
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
   STUDENT
   ========================================================= */

function getStudentFullName() {

    const fullName = [

        currentStudent?.firstName,
        currentStudent?.lastName

    ]
        .filter(Boolean)
        .join(" ")
        .trim();


    return fullName || "—";
}


/* =========================================================
   CLASS MATCH
   SAME LOGIC AS student-tasks.js
   ========================================================= */

function testBelongsToStudentClass(test) {

    if (
        !test ||
        !currentStudent
    ) {

        return false;
    }


    if (test.classId) {

        return (
            String(test.classId) ===
            String(currentStudent.classId)
        );
    }


    if (
        test.className &&
        currentStudent.className
    ) {

        return (
            test.className ===
            currentStudent.className
        );
    }


    if (
        Array.isArray(test.classIds)
    ) {

        return test.classIds.some(
            id =>
                String(id) ===
                String(currentStudent.classId)
        );
    }


    return false;
}


/* =========================================================
   ALL POSSIBLE RESULTS
   ========================================================= */

function getAllPossibleResults() {

    const keys = [

        "advantaResults",
        "advantaTestResults",
        "studentResults"

    ];


    const combined = [];


    keys.forEach(
        key => {

            const items =
                getStorageArray(key);


            items.forEach(
                item => {

                    const duplicate =
                        combined.some(
                            existing => {

                                if (
                                    existing.id &&
                                    item.id
                                ) {

                                    return (
                                        String(existing.id) ===
                                        String(item.id)
                                    );
                                }


                                return false;
                            }
                        );


                    if (!duplicate) {

                        combined.push(item);
                    }
                }
            );
        }
    );


    return combined;
}


/* =========================================================
   STUDENT RESULTS
   ========================================================= */

function getStudentResults() {

    return getAllPossibleResults()
        .filter(
            result => {

                if (result.studentId) {

                    return (
                        String(result.studentId) ===
                        String(currentStudent.id)
                    );
                }


                if (result.userId) {

                    return (
                        String(result.userId) ===
                        String(currentStudent.id)
                    );
                }


                return false;
            }
        );
}


/* =========================================================
   COMPLETED TEST
   IMPORTANT:
   EXACTLY SAME PRINCIPLE AS student-tasks.js
   ========================================================= */

function hasStudentCompletedTest(testId) {

    const results =
        getStudentResults();


    return results.some(
        result =>
            String(result.testId) ===
            String(testId)
    );
}


/* =========================================================
   DEADLINE
   ========================================================= */

function isExpired(test) {

    if (!test.deadline) {

        return false;
    }


    const deadline =
        new Date(
            test.deadline
        );


    if (
        Number.isNaN(
            deadline.getTime()
        )
    ) {

        return false;
    }


    return (
        deadline.getTime() <
        Date.now()
    );
}


/* =========================================================
   ACTIVE TESTS

   IMPORTANT:
   Same 4 rules as student-tasks.js
   ========================================================= */

function getActiveTests() {

    const tests =
        getStorageArray(
            "advantaTests"
        );


    return tests.filter(
        test => {

            /* 1. Published */

            if (
                test.status !== "published"
            ) {

                return false;
            }


            /* 2. Student's class */

            if (
                !testBelongsToStudentClass(test)
            ) {

                return false;
            }


            /* 3. Deadline */

            if (
                isExpired(test)
            ) {

                return false;
            }


            /* 4. Not completed */

            if (
                hasStudentCompletedTest(
                    test.id
                )
            ) {

                return false;
            }


            return true;
        }
    );
}


/* =========================================================
   SCORE
   ========================================================= */

function getResultScore(result) {

    const values = [

        result.score,
        result.percentage,
        result.result,
        result.percent

    ];


    for (
        const value of values
    ) {

        const number =
            Number(value);


        if (
            Number.isFinite(number)
        ) {

            return number;
        }
    }


    return null;
}


/* =========================================================
   RESULT COLORS

   0-49   RED
   50-69  YELLOW
   70-89  BLUE
   90-100 GREEN
   ========================================================= */

function getScoreColor(score) {

    if (score < 50) {

        return "#dc3545";
    }


    if (score < 70) {

        return "#d39e00";
    }


    if (score < 90) {

        return "#0d6efd";
    }


    return "#198754";
}


function applyScoreColor(
    element,
    score
) {

    if (!element) {
        return;
    }


    const color =
        getScoreColor(score);


    element.style.color =
        color;
}


/* =========================================================
   HEADER
   ========================================================= */

function renderStudentHeader() {

    document.getElementById(
        "welcomeText"
    ).textContent =
        uiText("welcome");


    document.getElementById(
        "studentName"
    ).textContent =
        getStudentFullName();


    const className =
        currentStudent?.className
        ||
        currentStudent?.classId
        ||
        "—";


    document.getElementById(
        "studentClass"
    ).textContent =
        `${className} ${uiText("class")}`;
}


/* =========================================================
   LANGUAGE
   ========================================================= */

function renderLanguage() {

    document.getElementById(
        "menuHome"
    ).textContent =
        uiText("home");


    document.getElementById(
        "menuTasks"
    ).textContent =
        uiText("tasks");


    document.getElementById(
        "menuResults"
    ).textContent =
        uiText("results");


    document.getElementById(
        "logoutText"
    ).textContent =
        uiText("logout");


    document.getElementById(
        "pageTitle"
    ).textContent =
        uiText("home");


    document.getElementById(
        "activeTasksLabel"
    ).textContent =
        uiText("activeTasks");


    document.getElementById(
        "goToTasks"
    ).textContent =
        uiText("goToTasks");


    document.getElementById(
        "averageLabel"
    ).textContent =
        uiText("average");


    document.getElementById(
        "allResultsLink"
    ).textContent =
        uiText("allResults");


    document.getElementById(
        "bestLabel"
    ).textContent =
        uiText("best");


    document.getElementById(
        "bestResultsLink"
    ).textContent =
        uiText("view");


    document.getElementById(
        "activeTestsTitle"
    ).textContent =
        uiText("activeTestsTitle");


    document.getElementById(
        "activeTestsDescription"
    ).textContent =
        uiText("activeTestsDescription");


    document.getElementById(
        "emptyTestsTitle"
    ).textContent =
        uiText("noTests");


    document.getElementById(
        "emptyTestsText"
    ).textContent =
        uiText("noTestsText");


    document.getElementById(
        "lastResultLabel"
    ).textContent =
        uiText("lastResult");


    renderStudentHeader();
}


/* =========================================================
   DATE
   ========================================================= */

function formatDeadline(value) {

    if (!value) {

        return uiText(
            "noDeadline"
        );
    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return value;
    }


    return date.toLocaleString(
        getLanguage() === "kz"
            ? "kk-KZ"
            : getLanguage() === "en"
                ? "en-US"
                : "ru-RU",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


/* =========================================================
   SUBJECT
   ========================================================= */

function getSubjectName(test) {

    const subject =
        test.subject
        ||
        test.subjectId;


    if (
        subject === "math"
    ) {

        return uiText(
            "mathematics"
        );
    }


    if (
        typeof t === "function" &&
        subject
    ) {

        const translated =
            t(subject);


        if (
            translated &&
            translated !== subject
        ) {

            return translated;
        }
    }


    return (
        test.subjectName
        ||
        subject
        ||
        uiText("mathematics")
    );
}


/* =========================================================
   ESCAPE
   ========================================================= */

function escapeHTML(value) {

    return String(
        value ?? ""
    )
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   ACTIVE TEST CARDS
   ========================================================= */

function renderActiveTests() {

    const tests =
        getActiveTests();


    const container =
        document.getElementById(
            "activeTestsContainer"
        );


    const empty =
        document.getElementById(
            "testsEmpty"
        );


    /*
      IMPORTANT:
      this number is now generated
      from EXACTLY the same filtered list.
    */

    document.getElementById(
        "activeTasksCount"
    ).textContent =
        tests.length;


    container.innerHTML =
        "";


    if (
        tests.length === 0
    ) {

        empty.classList.remove(
            "d-none"
        );

        return;
    }


    empty.classList.add(
        "d-none"
    );


    tests.forEach(
        test => {

            const testName =
                test.name
                ||
                test.title
                ||
                "Test";


            const questionsCount =
                Array.isArray(
                    test.questions
                )
                    ? test.questions.length
                    : 0;


            const timeText =
                test.timeLimit
                    ? `${test.timeLimit} ${uiText("minutes")}`
                    : uiText("noTimeLimit");


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "border rounded-4 p-4";


            card.innerHTML = `

                <div
                    class="d-flex flex-wrap justify-content-between align-items-center gap-3"
                >

                    <div>

                        <h5 class="fw-bold mb-2">

                            ${escapeHTML(testName)}

                        </h5>


                        <div
                            class="text-secondary small mb-1"
                        >

                            ${escapeHTML(
                                currentStudent.className || ""
                            )}

                            •

                            ${escapeHTML(
                                getSubjectName(test)
                            )}

                        </div>


                        <div
                            class="text-secondary small"
                        >

                            ${uiText("deadline")}:

                            ${escapeHTML(
                                formatDeadline(
                                    test.deadline
                                )
                            )}

                            &nbsp;•&nbsp;

                            ${questionsCount}

                            ${uiText("questions")}

                            &nbsp;•&nbsp;

                            ${escapeHTML(
                                timeText
                            )}

                        </div>

                    </div>


                    <a
                        href="test.html?id=${encodeURIComponent(test.id)}"
                        class="btn btn-primary"
                    >

                        ${uiText("start")}

                    </a>

                </div>
            `;


            container.appendChild(
                card
            );
        }
    );
}


/* =========================================================
   RESULTS
   ========================================================= */

function renderResults() {

    const results =
        getStudentResults();


    const scores =
        results
            .map(
                getResultScore
            )
            .filter(
                score =>
                    score !== null
            );


    const averageElement =
        document.getElementById(
            "averageResult"
        );


    const bestElement =
        document.getElementById(
            "bestResult"
        );


    const lastCard =
        document.getElementById(
            "lastResultCard"
        );


    /*
      RESET COLORS
    */

    averageElement.style.color =
        "";

    bestElement.style.color =
        "";


    if (
        scores.length === 0
    ) {

        averageElement.textContent =
            "—";


        bestElement.textContent =
            "—";


        lastCard.classList.add(
            "d-none"
        );


        return;
    }


    /* AVERAGE */

    const average =
        Math.round(
            scores.reduce(
                (sum, score) =>
                    sum + score,
                0
            )
            /
            scores.length
        );


    averageElement.textContent =
        `${average}/100`;


    applyScoreColor(
        averageElement,
        average
    );


    /* BEST */

    const best =
        Math.round(
            Math.max(
                ...scores
            )
        );


    bestElement.textContent =
        `${best}/100`;


    applyScoreColor(
        bestElement,
        best
    );


    /* LAST RESULT */

    const sortedResults =
        [...results]
            .sort(
                (a, b) => {

                    const aDate =
                        new Date(
                            a.completedAt
                            ||
                            a.createdAt
                            ||
                            a.date
                            ||
                            0
                        ).getTime();


                    const bDate =
                        new Date(
                            b.completedAt
                            ||
                            b.createdAt
                            ||
                            b.date
                            ||
                            0
                        ).getTime();


                    return (
                        bDate -
                        aDate
                    );
                }
            );


    const lastResult =
        sortedResults.find(
            result =>
                getResultScore(result)
                !== null
        );


    if (!lastResult) {

        lastCard.classList.add(
            "d-none"
        );

        return;
    }


    const score =
        Math.round(
            getResultScore(
                lastResult
            )
        );


    lastCard.classList.remove(
        "d-none"
    );


   const lastScoreElement =
    document.getElementById(
        "lastScore"
    );


const lastScoreCircle =
    document.getElementById(
        "lastScoreCircle"
    );


lastScoreElement.textContent =
    score;


const scoreColor =
    getScoreColor(score);


/* ЦВЕТ ЦИФРЫ */

lastScoreElement.style.setProperty(
    "color",
    scoreColor,
    "important"
);


/* ЦВЕТ КРУГА */

lastScoreCircle.style.setProperty(
    "border-color",
    scoreColor,
    "important"
);


lastScoreCircle.style.setProperty(
    "border-width",
    "3px",
    "important"
);


lastScoreCircle.style.setProperty(
    "border-style",
    "solid",
    "important"
);


/* ЛЁГКИЙ ЦВЕТНОЙ ФОН */

if (score < 50) {

    lastScoreCircle.style.backgroundColor =
        "rgba(220, 53, 69, 0.08)";

}

else if (score < 70) {

    lastScoreCircle.style.backgroundColor =
        "rgba(211, 158, 0, 0.08)";

}

else if (score < 90) {

    lastScoreCircle.style.backgroundColor =
        "rgba(13, 110, 253, 0.08)";

}

else {

    lastScoreCircle.style.backgroundColor =
        "rgba(25, 135, 84, 0.08)";

}


    document.getElementById(
        "lastTestName"
    ).textContent =
        lastResult.testName
        ||
        lastResult.title
        ||
        "Test";


    document.getElementById(
        "lastTestSubject"
    ).textContent =
        lastResult.subject === "math"
            ? uiText("mathematics")
            : (
                lastResult.subjectName
                ||
                uiText("mathematics")
            );


    const passingScore =
        Number(
            lastResult.passingScore
            ??
            60
        );


    const passed =
        score >= passingScore;


    const statusElement =
        document.getElementById(
            "lastTestStatus"
        );


    statusElement.textContent =
        passed
            ? uiText("passed")
            : uiText("failed");


    statusElement.className =
        passed
            ? "small text-success"
            : "small text-danger";
}


/* =========================================================
   LOGOUT
   ========================================================= */

document
    .getElementById(
        "logoutButton"
    )
    .addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            localStorage.removeItem(
                "advantaCurrentUser"
            );


            localStorage.removeItem(
                "advantaCurrentStudent"
            );


            window.location.href =
                "index.html";
        }
    );


/* =========================================================
   LANGUAGE SELECT
   ========================================================= */

const languageSelect =
    document.getElementById(
        "languageSelect"
    );


if (languageSelect) {

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


                renderPage();
            }
        }
    );
}


/* =========================================================
   LANGUAGE CHANGE
   ========================================================= */

window.addEventListener(
    "languageChanged",
    function () {

        renderPage();
    }
);


/* =========================================================
   PAGE
   ========================================================= */

function renderPage() {

    if (!currentStudent) {

        return;
    }


    renderLanguage();

    renderActiveTests();

    renderResults();
}


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderPage();
    }
);