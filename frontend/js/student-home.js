/* =========================================================
   ADVANTA PULSE
   STUDENT HOME — REAL DATA
   ========================================================= */


/* =========================================================
   CURRENT STUDENT
   ========================================================= */

const registeredStudent =
    JSON.parse(
        localStorage.getItem(
            "registeredStudent"
        )
    );


const currentStudentFirstName =
    registeredStudent?.firstName
    || "Ученик";


const currentStudentLastName =
    registeredStudent?.lastName
    || "";


const currentStudentClass =
    localStorage.getItem(
        "studentClass"
    ) || "5А";


/* =========================================================
   ELEMENTS
   ========================================================= */

const studentHomeName =
    document.getElementById(
        "studentHomeName"
    );


const studentHomeClass =
    document.getElementById(
        "studentHomeClass"
    );


const homeActiveTasks =
    document.getElementById(
        "homeActiveTasks"
    );


const homeAverageScore =
    document.getElementById(
        "homeAverageScore"
    );


const homeBestScore =
    document.getElementById(
        "homeBestScore"
    );


const homeUpcomingContent =
    document.getElementById(
        "homeUpcomingContent"
    );


const homeLastResultContent =
    document.getElementById(
        "homeLastResultContent"
    );


/* =========================================================
   STUDENT NAME
   ========================================================= */

function renderStudentInfo() {

    const fullName =
        `${currentStudentFirstName} ${currentStudentLastName}`
            .trim();


    studentHomeName.textContent =
        fullName || "Ученик";


    const language =
        getCurrentLanguage();


    if (language === "kz") {

        studentHomeClass.textContent =
            `${currentStudentClass} сынып`;

    }

    else if (language === "en") {

        studentHomeClass.textContent =
            `Class ${currentStudentClass}`;

    }

    else {

        studentHomeClass.textContent =
            `${currentStudentClass} класс`;

    }
}


/* =========================================================
   GET STUDENT RESULTS
   ========================================================= */

function getStudentResults() {

    const allResults =
        JSON.parse(
            localStorage.getItem(
                "advantaResults"
            )
        ) || [];


    return allResults.filter(
        function (result) {

            return (
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
   COMPLETED CHECK
   ========================================================= */

function hasCompletedTest(
    testId,
    results
) {

    return results.some(
        function (result) {

            return (
                String(result.testId)
                ===
                String(testId)
            );

        }
    );
}


/* =========================================================
   GET ACTIVE TESTS
   ========================================================= */

function getActiveTests(
    results
) {

    const allTests =
        JSON.parse(
            localStorage.getItem(
                "advantaTests"
            )
        ) || [];


    return allTests.filter(
        function (test) {

            return (
                test.status === "published"

                &&

                test.className
                ===
                currentStudentClass

                &&

                !hasCompletedTest(
                    test.id,
                    results
                )
            );

        }
    );
}


/* =========================================================
   SCORE COLOR
   ========================================================= */

function getHomeScoreClass(score) {

    if (score <= 50) {
        return "score-red";
    }

    if (score <= 69) {
        return "score-yellow";
    }

    if (score <= 89) {
        return "score-blue";
    }

    return "score-green";
}


/* =========================================================
   DATE
   ========================================================= */

function formatHomeDate(value) {

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
   SAFE TEXT
   ========================================================= */

function escapeHomeText(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(value ?? "");


    return div.innerHTML;
}


/* =========================================================
   SUMMARY
   ========================================================= */

function renderHomeSummary(
    results,
    activeTests
) {

    /* ACTIVE TASKS */

    homeActiveTasks.textContent =
        activeTests.length;


    /* NO RESULTS */

    if (
        results.length === 0
    ) {

        homeAverageScore.textContent =
            "0/100";


        homeBestScore.textContent =
            "0/100";


        return;
    }


    /* AVERAGE */

    const total =
        results.reduce(
            function (sum, result) {

                return (
                    sum
                    +
                    Number(
                        result.score || 0
                    )
                );

            },
            0
        );


    const average =
        Math.round(
            total
            /
            results.length
        );


    /* BEST */

    const best =
        Math.max(
            ...results.map(
                function (result) {

                    return Number(
                        result.score || 0
                    );

                }
            )
        );


    homeAverageScore.textContent =
        `${average}/100`;


    homeBestScore.textContent =
        `${best}/100`;
}


/* =========================================================
   UPCOMING TEST
   ========================================================= */

function renderUpcomingTest(
    activeTests
) {

    /*
       Если заданий нет
    */

    if (
        activeTests.length === 0
    ) {

        const language =
            getCurrentLanguage();


        let title =
            "Нет активных заданий";


        let description =
            "Новые тесты появятся здесь";


        if (language === "kz") {

            title =
                "Белсенді тапсырмалар жоқ";

            description =
                "Жаңа тесттер осы жерде пайда болады";

        }

        else if (
            language === "en"
        ) {

            title =
                "No active assignments";

            description =
                "New tests will appear here";
        }


        homeUpcomingContent.innerHTML = `

            <div class="text-center py-4">

                <i
                    class="bi bi-clipboard-check"
                    style="
                        font-size: 38px;
                        color: #9ca3af;
                    "
                ></i>

                <h5 class="fw-bold mt-3">
                    ${title}
                </h5>

                <p class="text-secondary mb-0">
                    ${description}
                </p>

            </div>
        `;


        return;
    }


    /*
       Сортируем по ближайшему дедлайну
    */

    const sortedTests =
        [...activeTests].sort(
            function (a, b) {

                const dateA =
                    a.deadline
                        ? new Date(
                            a.deadline
                        ).getTime()
                        : Infinity;


                const dateB =
                    b.deadline
                        ? new Date(
                            b.deadline
                        ).getTime()
                        : Infinity;


                return (
                    dateA - dateB
                );

            }
        );


    const test =
        sortedTests[0];


    homeUpcomingContent.innerHTML = `

        <div
            class="d-flex justify-content-between align-items-center"
        >

            <div>

                <span
                    class="subject-label"
                >
                    ${t("nearestTest")}
                </span>


                <h4 class="fw-bold mt-2">

                    ${escapeHomeText(
                        test.name
                    )}

                </h4>


                <p
                    class="text-secondary mb-2"
                >

                    ${t(test.subject)}

                </p>


                <span class="text-secondary">

                    <i
                        class="bi bi-calendar-event"
                    ></i>

                    ${t("deadline")}:

                    ${formatHomeDate(
                        test.deadline
                    )}

                </span>

            </div>


            <a
                href="student-tasks.html"
                class="btn btn-primary"
            >

                ${t("goToTask")}

            </a>

        </div>
    `;
}


/* =========================================================
   LAST RESULT
   ========================================================= */

function renderLastResult(
    results
) {

    /*
       Если ученик ещё ничего не проходил
    */

    if (
        results.length === 0
    ) {

        const language =
            getCurrentLanguage();


        let title =
            "Результатов пока нет";


        let description =
            "После прохождения теста результат появится здесь";


        if (language === "kz") {

            title =
                "Нәтижелер әзірге жоқ";

            description =
                "Тест аяқталғаннан кейін нәтиже осы жерде пайда болады";

        }

        else if (
            language === "en"
        ) {

            title =
                "No results yet";

            description =
                "Your latest result will appear here";
        }


        homeLastResultContent.innerHTML = `

            <div class="text-center py-4">

                <i
                    class="bi bi-bar-chart"
                    style="
                        font-size: 38px;
                        color: #9ca3af;
                    "
                ></i>

                <h5 class="fw-bold mt-3">
                    ${title}
                </h5>

                <p class="text-secondary mb-0">
                    ${description}
                </p>

            </div>
        `;


        return;
    }


    /*
       Последний результат
       по completedAt
    */

    const sortedResults =
        [...results].sort(
            function (a, b) {

                return (
                    new Date(
                        b.completedAt
                    )
                    -
                    new Date(
                        a.completedAt
                    )
                );

            }
        );


    const result =
        sortedResults[0];


    const score =
        Number(
            result.score || 0
        );


    const passed =
        score
        >=
        Number(
            result.passingScore
        );


    homeLastResultContent.innerHTML = `

        <span
            class="subject-label"
        >
            ${t("lastResult")}
        </span>


        <div
            class="d-flex align-items-center gap-4 mt-3"
        >

            <div
                class="score-circle ${getHomeScoreClass(
                    score
                )}"
            >

                <span>
                    ${score}
                </span>

            </div>


            <div>

                <h4
                    class="fw-bold mb-1"
                >

                    ${escapeHomeText(
                        result.testName
                    )}

                </h4>


                <p
                    class="text-secondary mb-1"
                >

                    ${t(result.subject)}

                </p>


                <span
                    class="${
                        passed
                            ? "passed-status"
                            : "failed-status"
                    }"
                >

                    ${
                        passed
                            ? t("passed")
                            : t("failed")
                    }

                </span>

            </div>

        </div>
    `;
}


/* =========================================================
   RENDER WHOLE HOME
   ========================================================= */

function renderStudentHome() {

    const results =
        getStudentResults();


    const activeTests =
        getActiveTests(
            results
        );


    renderStudentInfo();


    renderHomeSummary(
        results,
        activeTests
    );


    renderUpcomingTest(
        activeTests
    );


    renderLastResult(
        results
    );
}


/* =========================================================
   LANGUAGE CHANGE
   ========================================================= */

window.addEventListener(
    "languageChanged",
    function () {

        renderStudentHome();

    }
);


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderStudentHome();

    }
);