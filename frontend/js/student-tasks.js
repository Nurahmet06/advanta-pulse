/* =========================================================
   ADVANTA PULSE
   STUDENT ASSIGNMENTS
   Показываем только НЕПРОЙДЕННЫЕ тесты
   ========================================================= */


/* =========================================================
   ДАННЫЕ ТЕКУЩЕГО УЧЕНИКА

   Пока класс 5А используется как demo.
   Позже это будет брать backend из аккаунта.
   ========================================================= */

const registeredStudent =
    JSON.parse(
        localStorage.getItem(
            "registeredStudent"
        )
    );


const currentStudentClass =
    localStorage.getItem(
        "studentClass"
    ) || "5А";


const currentStudentFirstName =
    registeredStudent?.firstName
    || "Ученик";


const currentStudentLastName =
    registeredStudent?.lastName
    || "";


/* =========================================================
   ELEMENTS
   ========================================================= */

const studentTasksContainer =
    document.getElementById(
        "studentTasksContainer"
    );


const noStudentTasks =
    document.getElementById(
        "noStudentTasks"
    );


const noTasksTitle =
    document.getElementById(
        "noTasksTitle"
    );


const noTasksText =
    document.getElementById(
        "noTasksText"
    );


/* =========================================================
   DEADLINE
   ========================================================= */

function formatStudentDeadline(value) {

    if (!value) {
        return "—";
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


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const year =
        date.getFullYear();


    const hours =
        String(
            date.getHours()
        ).padStart(2, "0");


    const minutes =
        String(
            date.getMinutes()
        ).padStart(2, "0");


    return `${day}.${month}.${year}, ${hours}:${minutes}`;
}


/* =========================================================
   SUBJECT ICON
   ========================================================= */

function getSubjectIcon(subject) {

    if (subject === "math") {
        return "bi-calculator";
    }

    if (
        subject === "english"
        ||
        subject === "kazakh"
    ) {
        return "bi-translate";
    }

    if (subject === "physics") {
        return "bi-lightning";
    }

    if (subject === "chemistry") {
        return "bi-droplet";
    }

    if (subject === "biology") {
        return "bi-flower1";
    }

    if (subject === "history") {
        return "bi-bank";
    }

    if (subject === "geography") {
        return "bi-globe";
    }

    if (subject === "informatics") {
        return "bi-laptop";
    }


    return "bi-book";
}


/* =========================================================
   EMPTY TEXT
   ========================================================= */

function renderNoTasksText() {

    const language =
        getCurrentLanguage();


    if (language === "kz") {

        noTasksTitle.textContent =
            "Белсенді тапсырмалар жоқ";

        noTasksText.textContent =
            "Жаңа тесттер осы жерде пайда болады";

    }

    else if (language === "en") {

        noTasksTitle.textContent =
            "No active assignments";

        noTasksText.textContent =
            "New tests will appear here";

    }

    else {

        noTasksTitle.textContent =
            "Нет активных заданий";

        noTasksText.textContent =
            "Новые тесты появятся здесь";
    }
}


/* =========================================================
   ПРОВЕРКА:
   ПРОХОДИЛ ЛИ УЧЕНИК ЭТОТ ТЕСТ
   ========================================================= */

function hasStudentCompletedTest(
    testId,
    results
) {

    return results.some(
        function (result) {

            return (
                String(result.testId)
                ===
                String(testId)

                &&

                result.studentFirstName
                ===
                currentStudentFirstName

                &&

                result.studentLastName
                ===
                currentStudentLastName
            );

        }
    );
}


/* =========================================================
   RENDER TASKS
   ========================================================= */

function renderStudentTasks() {

    /* Все тесты */

    const allTests =
        JSON.parse(
            localStorage.getItem(
                "advantaTests"
            )
        ) || [];


    /* Все результаты */

    const allResults =
        JSON.parse(
            localStorage.getItem(
                "advantaResults"
            )
        ) || [];


    /*
       Ученик видит тест, только если:

       1. Тест назначен
       2. Тест назначен его классу
       3. Ученик ещё НЕ проходил этот тест
    */

    const assignedTests =
        allTests.filter(
            function (test) {

                const published =
                    test.status ===
                    "published";


                const correctClass =
                    test.className ===
                    currentStudentClass;


                const completed =
                    hasStudentCompletedTest(
                        test.id,
                        allResults
                    );


                return (
                    published
                    &&
                    correctClass
                    &&
                    !completed
                );

            }
        );


    studentTasksContainer.innerHTML =
        "";


    /* =====================================================
       НЕТ ЗАДАНИЙ
       ===================================================== */

    if (
        assignedTests.length === 0
    ) {

        noStudentTasks
            .classList
            .remove(
                "d-none"
            );


        renderNoTasksText();


        return;
    }


    noStudentTasks
        .classList
        .add(
            "d-none"
        );


    /* =====================================================
       ПОКАЗЫВАЕМ ЗАДАНИЯ
       ===================================================== */

    assignedTests.forEach(
        function (test) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "assignment-card";


            card.innerHTML = `

                <div
                    class="assignment-info"
                >

                    <div
                        class="subject-icon"
                    >

                        <i
                            class="bi ${getSubjectIcon(test.subject)}"
                        ></i>

                    </div>


                    <div>

                        <span
                            class="subject-label"
                        >
                            ${t(test.subject)}
                        </span>


                        <h4>
                            ${escapeTaskText(
                                test.name
                            )}
                        </h4>


                        <div
                            class="assignment-meta"
                        >

                            <span>

                                <i
                                    class="bi bi-calendar-event"
                                ></i>

                                ${t("deadline")}:

                                ${formatStudentDeadline(
                                    test.deadline
                                )}

                            </span>


                            <span>

                                <i
                                    class="bi bi-check-circle"
                                ></i>

                                ${t("threshold")}:

                                ${test.passingScore}/100

                            </span>


                            <span>

                                <i
                                    class="bi bi-question-circle"
                                ></i>

                                ${
                                    Array.isArray(
                                        test.questions
                                    )
                                        ? test.questions.length
                                        : 0
                                }

                                ${t("questions")}

                            </span>

                        </div>

                    </div>

                </div>


                <button
                    type="button"
                    class="btn btn-primary start-test-btn"
                    data-id="${test.id}"
                >

                    ${t("startTest")}

                </button>
            `;


            studentTasksContainer
                .appendChild(
                    card
                );

        }
    );


    addStartTestEvents();
}


/* =========================================================
   SAFE TEXT
   ========================================================= */

function escapeTaskText(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(value ?? "");


    return div.innerHTML;
}


/* =========================================================
   START TEST
   ========================================================= */

function addStartTestEvents() {

    document
        .querySelectorAll(
            ".start-test-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const testId =
                            button.dataset.id;


                        localStorage.setItem(
                            "currentStudentTestId",
                            testId
                        );


                        window.location.href =
                            "test.html";

                    }
                );

            }
        );
}


/* =========================================================
   LANGUAGE
   ========================================================= */

window.addEventListener(
    "languageChanged",
    function () {

        renderStudentTasks();

    }
);


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderStudentTasks();

    }
);