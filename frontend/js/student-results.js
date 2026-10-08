/* =========================================================
   ADVANTA PULSE
   STUDENT RESULTS
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


/* =========================================================
   ACCESS
   ========================================================= */

if (
    !currentStudent
) {

    window.location.href =
        "index.html";
}


/* =========================================================
   ELEMENTS
   ========================================================= */

const resultsList =
    document.getElementById(
        "resultsList"
    );


const averageResultValue =
    document.getElementById(
        "averageResultValue"
    );


const bestResultValue =
    document.getElementById(
        "bestResultValue"
    );


const completedTestsValue =
    document.getElementById(
        "completedTestsValue"
    );


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

            noResults:
                "Результатов пока нет",

            noResultsText:
                "После прохождения первого теста результат появится здесь.",

            threshold:
                "Порог",

            passed:
                "Пройден",

            failed:
                "Не пройден",

            mathematics:
                "Математика",

            class:
                "класс"

        },


        kz: {

            noResults:
                "Нәтижелер әзірге жоқ",

            noResultsText:
                "Алғашқы тестті аяқтағаннан кейін нәтиже осында шығады.",

            threshold:
                "Шекті балл",

            passed:
                "Өтті",

            failed:
                "Өтпеді",

            mathematics:
                "Математика",

            class:
                "сынып"

        },


        en: {

            noResults:
                "No results yet",

            noResultsText:
                "Your result will appear here after you complete your first test.",

            threshold:
                "Passing score",

            passed:
                "Passed",

            failed:
                "Not passed",

            mathematics:
                "Mathematics",

            class:
                "class"
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

function renderStudentInfo() {

    if (
        !currentStudent
    ) {

        return;
    }


    const fullName = [

        currentStudent.firstName,

        currentStudent.lastName

    ]
        .filter(Boolean)
        .join(" ")
        .trim();


    document.getElementById(
        "studentName"
    ).textContent =
        fullName || "—";


    document.getElementById(
        "studentClass"
    ).textContent =
        currentStudent.className
            ? `${currentStudent.className} ${uiText("class")}`
            : "—";
}


/* =========================================================
   SCORE
   ========================================================= */

function getScore(result) {

    const values = [

        result.score,

        result.percentage,

        result.percent,

        result.result

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
   RESULT OWNER
   ========================================================= */

function resultBelongsToCurrentStudent(
    result
) {

    if (
        !result ||
        !currentStudent
    ) {

        return false;
    }


    /*
      НОВЫЙ И ПРАВИЛЬНЫЙ СПОСОБ:
      по уникальному ID ученика.
    */

    if (
        result.studentId
    ) {

        return (
            String(result.studentId) ===
            String(currentStudent.id)
        );
    }


    /*
      Поддержка возможного старого поля userId.
    */

    if (
        result.userId
    ) {

        return (
            String(result.userId) ===
            String(currentStudent.id)
        );
    }


    /*
      Старые результаты без studentId
      специально НЕ подключаем по имени.

      Иначе новый ученик может увидеть
      старые или чужие демонстрационные данные.
    */

    return false;
}


/* =========================================================
   RESULTS
   ========================================================= */

function getCurrentStudentResults() {

    const possibleKeys = [

        "advantaResults",

        "advantaTestResults",

        "studentResults"

    ];


    const allResults =
        [];


    possibleKeys.forEach(
        key => {

            const results =
                getStorageArray(key);


            results.forEach(
                result => {

                    if (
                        resultBelongsToCurrentStudent(
                            result
                        )
                    ) {

                        /*
                          Защита от дублирования,
                          если один результат вдруг
                          оказался в двух старых хранилищах.
                        */

                        const duplicate =
                            allResults.some(
                                existing => {

                                    if (
                                        existing.id &&
                                        result.id
                                    ) {

                                        return (
                                            String(existing.id) ===
                                            String(result.id)
                                        );
                                    }


                                    return false;
                                }
                            );


                        if (
                            !duplicate
                        ) {

                            allResults.push(
                                result
                            );
                        }
                    }
                }
            );
        }
    );


    return allResults;
}


/* =========================================================
   SCORE COLOR
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


function getScoreBackground(score) {

    if (score < 50) {
        return "rgba(220, 53, 69, 0.08)";
    }

    if (score < 70) {
        return "rgba(211, 158, 0, 0.08)";
    }

    if (score < 90) {
        return "rgba(13, 110, 253, 0.08)";
    }

    return "rgba(25, 135, 84, 0.08)";
}


/* =========================================================
   DATE
   ========================================================= */

function formatResultDate(value) {

    if (
        !value
    ) {

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


    return date.toLocaleDateString(
        getLanguage() === "kz"
            ? "kk-KZ"
            : getLanguage() === "en"
                ? "en-US"
                : "ru-RU",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );
}


/* =========================================================
   SAFE TEXT
   ========================================================= */

function escapeResultText(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(
            value ?? ""
        );


    return div.innerHTML;
}


/* =========================================================
   SUBJECT
   ========================================================= */

function getSubjectName(result) {

    const subject =
        result.subject
        ||
        result.subjectId;


    if (
        subject === "math"
    ) {

        return uiText(
            "mathematics"
        );
    }


    if (
        subject &&
        typeof t === "function"
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
        result.subjectName
        ||
        subject
        ||
        uiText("mathematics")
    );
}


/* =========================================================
   SUMMARY
   ========================================================= */

function renderSummary(results) {

    const scores =
        results
            .map(getScore)
            .filter(
                score =>
                    score !== null
            );


    if (
        scores.length === 0
    ) {

        averageResultValue.textContent =
            "—";


        bestResultValue.textContent =
            "—";


        completedTestsValue.textContent =
            "0";


        return;
    }


    const total =
        scores.reduce(
            (sum, score) =>
                sum + score,
            0
        );


    const average =
        Math.round(
            total /
            scores.length
        );


    const best =
        Math.max(
            ...scores
        );


    averageResultValue.textContent =
        `${average}/100`;


    bestResultValue.textContent =
        `${Math.round(best)}/100`;


    completedTestsValue.textContent =
        results.length;
}


/* =========================================================
   EMPTY
   ========================================================= */

function renderEmptyResults() {

    resultsList.innerHTML = `

        <div
            class="content-card text-center py-5"
        >

            <i
                class="bi bi-bar-chart"
                style="
                    font-size: 45px;
                    color: #9ca3af;
                "
            ></i>


            <h5
                class="fw-bold mt-3"
            >
                ${escapeResultText(
                    uiText("noResults")
                )}
            </h5>


            <p
                class="text-secondary mb-0"
            >
                ${escapeResultText(
                    uiText("noResultsText")
                )}
            </p>

        </div>
    `;
}


/* =========================================================
   RENDER RESULTS
   ========================================================= */

function renderResults() {

    if (
        !currentStudent
    ) {

        return;
    }


    const results =
        getCurrentStudentResults();


    renderSummary(
        results
    );


    resultsList.innerHTML =
        "";


    if (
        results.length === 0
    ) {

        renderEmptyResults();

        return;
    }


    const sortedResults =
        [...results]
            .sort(
                (a, b) => {

                    const dateA =
                        new Date(
                            a.completedAt
                            ||
                            a.createdAt
                            ||
                            0
                        ).getTime();


                    const dateB =
                        new Date(
                            b.completedAt
                            ||
                            b.createdAt
                            ||
                            0
                        ).getTime();


                    return dateB - dateA;
                }
            );


    sortedResults.forEach(
        result => {

            const score =
                getScore(
                    result
                );


            if (
                score === null
            ) {

                return;
            }


            const passingScore =
                Number(
                    result.passingScore
                    ??
                    60
                );


            const passed =
                score >= passingScore;


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "result-card";


            card.innerHTML = `

                <div
    class="score-circle"
    style="
        color: ${getScoreColor(score)};
        border: 3px solid ${getScoreColor(score)};
        background-color: ${getScoreBackground(score)};
    "
>
    <span
        style="
            color: ${getScoreColor(score)};
            font-weight: 700;
        "
    >
        ${Math.round(score)}
    </span>
</div>


                <div class="result-info">

                    <span class="result-subject">

                        ${escapeResultText(
                            getSubjectName(result)
                        )}

                    </span>


                    <h4>

                        ${escapeResultText(
                            result.testName
                            ||
                            result.title
                            ||
                            "Test"
                        )}

                    </h4>


                    <div class="result-bottom">

                        <span>

                            <i class="bi bi-calendar3"></i>

                            ${escapeResultText(
                                formatResultDate(
                                    result.completedAt
                                    ||
                                    result.createdAt
                                )
                            )}

                        </span>


                        <span>

                            ${escapeResultText(
                                uiText("threshold")
                            )}:

                            ${passingScore}/100

                        </span>


                        <span
                            class="${
                                passed
                                    ? "passed-status"
                                    : "failed-status"
                            }"
                        >

                            ${
                                passed
                                    ? escapeResultText(
                                        uiText("passed")
                                    )
                                    : escapeResultText(
                                        uiText("failed")
                                    )
                            }

                        </span>

                    </div>

                </div>
            `;


            resultsList.appendChild(
                card
            );
        }
    );
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
                "advantaCurrentStudent"
            );


            localStorage.removeItem(
                "advantaCurrentUser"
            );


            window.location.href =
                "index.html";
        }
    );


/* =========================================================
   LANGUAGE
   ========================================================= */

window.addEventListener(
    "languageChanged",
    function () {

        renderStudentInfo();

        renderResults();
    }
);


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderStudentInfo();

        renderResults();
    }
);