/* =========================================================
   ADVANTA PULSE
   STAFF TESTS
   ========================================================= */

const testsTableBody =
    document.getElementById("testsTableBody");

const emptyTests =
    document.getElementById("emptyTests");

const testsCount =
    document.getElementById("testsCount");

const activeTestsCount =
    document.getElementById("activeTestsCount");

const completedTestsCount =
    document.getElementById("completedTestsCount");

const emptyTestsTitle =
    document.getElementById("emptyTestsTitle");

const emptyTestsText =
    document.getElementById("emptyTestsText");


/* =========================================================
   DEADLINE FORMAT
   ========================================================= */

function formatDeadline(value) {

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

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}


/* =========================================================
   STATUS
   ========================================================= */

function getStatusHTML(status) {

    if (status === "published") {

        return `
            <span class="badge text-bg-primary">
                ${t("published")}
            </span>
        `;
    }

    if (status === "finished") {

        return `
            <span class="badge text-bg-success">
                ${t("finished")}
            </span>
        `;
    }

    return `
        <span class="badge text-bg-secondary">
            ${t("draft")}
        </span>
    `;
}


/* =========================================================
   EMPTY STATE
   ========================================================= */

function renderEmptyState() {

    const language =
        getCurrentLanguage();

    if (language === "kz") {

        emptyTestsTitle.textContent =
            "Тесттер әзірге жоқ";

        emptyTestsText.textContent =
            "Алғашқы тестті құрыңыз";

    }

    else if (language === "en") {

        emptyTestsTitle.textContent =
            "No tests yet";

        emptyTestsText.textContent =
            "Create your first test";

    }

    else {

        emptyTestsTitle.textContent =
            "Тестов пока нет";

        emptyTestsText.textContent =
            "Создайте первый тест";
    }
}


/* =========================================================
   RENDER TESTS
   ========================================================= */

function renderTests() {

    const savedTests =
        JSON.parse(
            localStorage.getItem(
                "advantaTests"
            )
        ) || [];


    /* COUNTERS */

    testsCount.textContent =
        savedTests.length;


    activeTestsCount.textContent =
        savedTests.filter(
            test =>
                test.status === "published"
        ).length;


    completedTestsCount.textContent =
        savedTests.filter(
            test =>
                test.status === "finished"
        ).length;


    testsTableBody.innerHTML =
        "";


    /* EMPTY */

    if (
        savedTests.length === 0
    ) {

        emptyTests.classList.remove(
            "d-none"
        );

        renderEmptyState();

        return;
    }


    emptyTests.classList.add(
        "d-none"
    );


    /* ROWS */

    savedTests.forEach(
        function (test) {

            const row =
                document.createElement(
                    "tr"
                );


            let actionButtons = `

                <button
                    class="btn btn-sm btn-outline-primary open-test-btn"
                    data-id="${test.id}"
                >
                    ${t("open")}
                </button>
            `;


            /*
               Если это черновик —
               показываем кнопку НАЗНАЧИТЬ.
            */

            if (
                test.status === "draft"
            ) {

                actionButtons += `

                    <button
                        class="btn btn-sm btn-primary assign-test-btn"
                        data-id="${test.id}"
                    >
                        <i class="bi bi-send me-1"></i>
                        ${t("assign")}
                    </button>
                `;
            }


            actionButtons += `

                <button
                    class="btn btn-sm btn-outline-danger delete-test-btn"
                    data-id="${test.id}"
                >
                    <i class="bi bi-trash"></i>
                </button>
            `;


            row.innerHTML = `

                <td>

                    <strong>
                        ${test.name}
                    </strong>

                </td>


                <td>

                    ${t(test.subject)}

                </td>


                <td>

                    ${test.className}

                </td>


                <td>

                    ${formatDeadline(
                        test.deadline
                    )}

                </td>


                <td>

                    ${test.passingScore}/100

                </td>


                <td>

                    ${getStatusHTML(
                        test.status
                    )}

                </td>


                <td>

                    <div
                        class="d-flex gap-2 flex-wrap"
                    >

                        ${actionButtons}

                    </div>

                </td>
            `;


            testsTableBody
                .appendChild(row);
        }
    );


    addTableEvents();
}


/* =========================================================
   BUTTON EVENTS
   ========================================================= */

function addTableEvents() {


    /* =====================================
       OPEN / EDIT
       ===================================== */

    document
        .querySelectorAll(
            ".open-test-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            button.dataset.id;


                        window.location.href =
                            `create-test.html?id=${encodeURIComponent(id)}`;
                    }
                );
            }
        );


    /* =====================================
       ASSIGN
       ===================================== */

    document
        .querySelectorAll(
            ".assign-test-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        assignTest(
                            button.dataset.id
                        );
                    }
                );
            }
        );


    /* =====================================
       DELETE
       ===================================== */

    document
        .querySelectorAll(
            ".delete-test-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        deleteTest(
                            button.dataset.id
                        );
                    }
                );
            }
        );
}


/* =========================================================
   ASSIGN TEST
   ========================================================= */

function assignTest(id) {

    const savedTests =
        JSON.parse(
            localStorage.getItem(
                "advantaTests"
            )
        ) || [];


    const index =
        savedTests.findIndex(
            test =>
                String(test.id)
                ===
                String(id)
        );


    if (index === -1) {
        return;
    }


    const test =
        savedTests[index];


    /*
       Без дедлайна назначить нельзя.
    */

    if (!test.deadline) {

        alert(
            t("deadlineRequired")
        );


        window.location.href =
            `create-test.html?id=${encodeURIComponent(id)}`;

        return;
    }


    /*
       Меняем статус.
    */

    test.status =
        "published";


    test.publishedAt =
        new Date().toISOString();


    savedTests[index] =
        test;


    localStorage.setItem(
        "advantaTests",
        JSON.stringify(
            savedTests
        )
    );


    renderTests();
}


/* =========================================================
   DELETE
   ========================================================= */

function deleteTest(id) {

    const language =
        getCurrentLanguage();


    let message =
        "Удалить этот тест?";


    if (
        language === "kz"
    ) {

        message =
            "Бұл тестті жою керек пе?";

    }

    else if (
        language === "en"
    ) {

        message =
            "Delete this test?";
    }


    if (
        !confirm(message)
    ) {
        return;
    }


    const savedTests =
        JSON.parse(
            localStorage.getItem(
                "advantaTests"
            )
        ) || [];


    const filteredTests =
        savedTests.filter(
            test =>
                String(test.id)
                !==
                String(id)
        );


    localStorage.setItem(
        "advantaTests",
        JSON.stringify(
            filteredTests
        )
    );


    renderTests();
}


/* =========================================================
   LANGUAGE
   ========================================================= */

window.addEventListener(
    "languageChanged",
    function () {

        renderTests();

    }
);


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderTests();

    }
);