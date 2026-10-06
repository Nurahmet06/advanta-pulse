/* =========================================================
   ADVANTA PULSE
   REAL STUDENT RESULTS
   ========================================================= */


/* =========================================================
   ТЕКУЩИЙ УЧЕНИК
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


/* =========================================================
   ELEMENTS
   ========================================================= */

const resultsList =
    document.getElementById(
        "resultsList"
    );


/*
   На странице у нас три карточки сверху:

   1. Средний результат
   2. Лучший результат
   3. Завершено срезов
*/

const summaryValues =
    document.querySelectorAll(
        ".overview-card h2"
    );


/* =========================================================
   ЦВЕТ КРУГА
   ========================================================= */

function getScoreClass(score) {

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
   ДАТА
   ========================================================= */

function formatResultDate(value) {

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


    return `${day}.${month}.${year}`;
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
        String(value ?? "");


    return div.innerHTML;
}


/* =========================================================
   ПОЛУЧИТЬ РЕЗУЛЬТАТЫ ЭТОГО УЧЕНИКА
   ========================================================= */

function getCurrentStudentResults() {

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
   SUMMARY
   ========================================================= */

function renderSummary(results) {

    if (
        results.length === 0
    ) {

        if (summaryValues[0]) {
            summaryValues[0].textContent =
                "0/100";
        }


        if (summaryValues[1]) {
            summaryValues[1].textContent =
                "0/100";
        }


        if (summaryValues[2]) {
            summaryValues[2].textContent =
                "0";
        }


        return;
    }


    /* AVERAGE */

    const total =
        results.reduce(
            function (sum, result) {

                return (
                    sum
                    +
                    Number(result.score || 0)
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
                result =>
                    Number(
                        result.score || 0
                    )
            )
        );


    if (summaryValues[0]) {

        summaryValues[0].textContent =
            `${average}/100`;
    }


    if (summaryValues[1]) {

        summaryValues[1].textContent =
            `${best}/100`;
    }


    if (summaryValues[2]) {

        summaryValues[2].textContent =
            results.length;
    }
}


/* =========================================================
   EMPTY STATE
   ========================================================= */

function renderEmptyResults() {

    const language =
        getCurrentLanguage();


    let title =
        "Результатов пока нет";


    let text =
        "Пройдите первый тест";


    if (language === "kz") {

        title =
            "Нәтижелер әзірге жоқ";

        text =
            "Алғашқы тестті өтіңіз";
    }


    else if (
        language === "en"
    ) {

        title =
            "No results yet";

        text =
            "Complete your first test";
    }


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
                ${title}
            </h5>

            <p
                class="text-secondary mb-0"
            >
                ${text}
            </p>

        </div>
    `;
}


/* =========================================================
   RENDER RESULTS
   ========================================================= */

function renderResults() {

    const results =
        getCurrentStudentResults();


    /* SUMMARY */

    renderSummary(
        results
    );


    /* CLEAR */

    resultsList.innerHTML =
        "";


    /* EMPTY */

    if (
        results.length === 0
    ) {

        renderEmptyResults();

        return;
    }


    /*
       Новые результаты сверху.
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


    sortedResults.forEach(
        function (result) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "result-card";


            const passed =
                Number(result.score)
                >=
                Number(
                    result.passingScore
                );


            card.innerHTML = `

                <div
                    class="score-circle ${getScoreClass(
                        Number(result.score)
                    )}"
                >

                    <span>
                        ${result.score}
                    </span>

                </div>


                <div
                    class="result-info"
                >

                    <span
                        class="result-subject"
                    >
                        ${t(result.subject)}
                    </span>


                    <h4>

                        ${escapeResultText(
                            result.testName
                        )}

                    </h4>


                    <div
                        class="result-bottom"
                    >

                        <span>

                            <i
                                class="bi bi-calendar3"
                            ></i>

                            ${formatResultDate(
                                result.completedAt
                            )}

                        </span>


                        <span>

                            ${t("threshold")}:

                            ${result.passingScore}/100

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
                                    ? t("passed")
                                    : t("failed")
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
   LANGUAGE
   ========================================================= */

window.addEventListener(
    "languageChanged",
    function () {

        renderResults();
    }
);


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderResults();
    }
);