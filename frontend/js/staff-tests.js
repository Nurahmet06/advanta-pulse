/* =========================================================
   ADVANTA PULSE
   STAFF TESTS
   ПРОСМОТР / ИЗМЕНЕНИЕ / НАЗНАЧЕНИЕ /
   ОТМЕНА НАЗНАЧЕНИЯ / УДАЛЕНИЕ
   ========================================================= */


const testsTableBody =
    document.getElementById("testsTableBody");

const testsTableWrapper =
    document.getElementById("testsTableWrapper");

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

const testsDescription =
    document.getElementById("testsDescription");


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


function saveTests(tests) {

    localStorage.setItem(
        "advantaTests",
        JSON.stringify(tests)
    );
}


/* =========================================================
   LANGUAGE
   ========================================================= */

function uiText(key) {

    const language =
        typeof getCurrentLanguage === "function"
            ? getCurrentLanguage()
            : (
                localStorage.getItem("language")
                ||
                "ru"
            );


    const texts = window.AdvantaI18n.scope("staff-tests");


    return (
        texts[language]?.[key]
        ||
        texts.ru[key]
        ||
        key
    );
}


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
   CLASS
   ========================================================= */

function getClassId(test) {

    if (test.classId) {

        return test.classId;
    }


    const classes =
        getStorageArray(
            "advantaClasses"
        );


    const foundClass =
        classes.find(
            classItem =>
                classItem.name === test.className
        );


    return foundClass
        ? foundClass.id
        : null;
}


function getClassName(test) {

    if (test.className) {

        return test.className;
    }


    const classId =
        getClassId(test);


    if (!classId) {

        return "—";
    }


    const classes =
        getStorageArray(
            "advantaClasses"
        );


    const foundClass =
        classes.find(
            classItem =>
                classItem.id === classId
        );


    return foundClass
        ? foundClass.name
        : "—";
}


/* =========================================================
   SUBJECT
   ========================================================= */

function getSubjectName(test) {

    if (!test.subject) {

        return "—";
    }


    if (
        typeof t === "function"
    ) {

        return t(test.subject);
    }


    return test.subject;
}


/* =========================================================
   STATUS
   ========================================================= */

function getStatusHTML(status) {

    if (
        status === "published"
    ) {

        return `
            <span class="badge text-bg-primary">
                ${
                    typeof t === "function"
                        ? t("published")
                        : "Назначен"
                }
            </span>
        `;
    }


    if (
        status === "finished"
    ) {

        return `
            <span class="badge text-bg-success">
                ${
                    typeof t === "function"
                        ? t("finished")
                        : "Завершён"
                }
            </span>
        `;
    }


    return `
        <span class="badge text-bg-secondary">
            ${
                typeof t === "function"
                    ? t("draft")
                    : "Черновик"
            }
        </span>
    `;
}


/* =========================================================
   TEST RESULTS CHECK
   ========================================================= */

function testHasResults(testId) {

    /*
       advantaResults —
       единственный источник результатов.
    */

    const results =
        getStorageArray(
            "advantaResults"
        );


    return results.some(
        function (result) {

            const resultTestId =
                result.testId
                ??
                result.testID
                ??
                result.test?.id
                ??
                null;


            return (
                resultTestId !== null
                &&
                String(resultTestId) ===
                String(testId)
            );
        }
    );
}


/* =========================================================
   EMPTY STATE
   ========================================================= */

function renderStaticTexts() {

    emptyTestsTitle.textContent =
        uiText("noTests");


    emptyTestsText.textContent =
        uiText("noTestsDescription");


    testsDescription.textContent =
        uiText("testsDescription");
}


/* =========================================================
   ACTION BUTTONS
   ========================================================= */

function getActionButtons(test) {

    let buttons = "";


    const classId =
        getClassId(test);


    /* EDIT

   Редактировать можно только тест,
   по которому ещё нет результатов.
*/

if (
    !testHasResults(
        test.id
    )
) {

    buttons += `

        <button
            type="button"
            class="btn btn-sm btn-outline-primary edit-test-btn"
            data-id="${test.id}"
            data-class-id="${classId || ""}"
        >

            <i class="bi bi-pencil me-1"></i>

            ${uiText("edit")}

        </button>
    `;
}


    /* DRAFT → ASSIGN */

    if (
        test.status === "draft"
    ) {

        buttons += `

            <button
                type="button"
                class="btn btn-sm btn-primary assign-test-btn"
                data-id="${test.id}"
            >

                <i class="bi bi-send me-1"></i>

                ${uiText("assign")}

            </button>
        `;
    }


    /* PUBLISHED → UNASSIGN */

    if (
        test.status === "published"
    ) {

        buttons += `

            <button
                type="button"
                class="btn btn-sm btn-outline-warning unassign-test-btn"
                data-id="${test.id}"
            >

                <i class="bi bi-x-circle me-1"></i>

                ${uiText("unassign")}

            </button>
        `;
    }


    /* DELETE */

    buttons += `

        <button
            type="button"
            class="btn btn-sm btn-outline-danger delete-test-btn"
            data-id="${test.id}"
        >

            <i class="bi bi-trash me-1"></i>

            ${uiText("delete")}

        </button>
    `;


    return buttons;
}


/* =========================================================
   RENDER TESTS
   ========================================================= */

function renderTests() {

    const savedTests =
        getStorageArray(
            "advantaTests"
        );


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


    renderStaticTexts();


    /* EMPTY */

    if (
        savedTests.length === 0
    ) {

        testsTableWrapper.classList.add(
            "d-none"
        );


        emptyTests.classList.remove(
            "d-none"
        );


        return;
    }


    testsTableWrapper.classList.remove(
        "d-none"
    );


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


            const testName =
                test.name
                ||
                test.title
                ||
                uiText("testFallback");


            const passingScore =
                test.passingScore
                ?? test.threshold
                ?? "—";


            row.innerHTML = `

                <td>
                    <strong>
                        ${testName}
                    </strong>
                </td>


                <td>
                    ${getSubjectName(test)}
                </td>


                <td>
                    ${getClassName(test)}
                </td>


                <td>
                    ${formatDeadline(test.deadline)}
                </td>


                <td>
                    ${
                        passingScore === "—"
                            ? "—"
                            : `${passingScore}/100`
                    }
                </td>


                <td>
                    ${getStatusHTML(test.status)}
                </td>


                <td>

                    <div
                        class="d-flex gap-2 flex-wrap"
                    >
                        ${getActionButtons(test)}
                    </div>

                </td>
            `;


            testsTableBody.appendChild(
                row
            );
        }
    );


    addTableEvents();
}


/* =========================================================
   BUTTON EVENTS
   ========================================================= */

function addTableEvents() {


    /* EDIT */

    document
        .querySelectorAll(
            ".edit-test-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const id =
                            button.dataset.id;


                        const classId =
                            button.dataset.classId;


                        let url =
                            `create-test.html?id=${encodeURIComponent(id)}`;


                        if (classId) {

                            url +=
                                `&class=${encodeURIComponent(classId)}`;
                        }


                        window.location.href =
                            url;
                    }
                );
            }
        );


    /* ASSIGN */

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


    /* UNASSIGN */

    document
        .querySelectorAll(
            ".unassign-test-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        unassignTest(
                            button.dataset.id
                        );
                    }
                );
            }
        );


    /* DELETE */

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
        getStorageArray(
            "advantaTests"
        );


    const index =
        savedTests.findIndex(
            test =>
                String(test.id) ===
                String(id)
        );


    if (
        index === -1
    ) {

        return;
    }


    const test =
        savedTests[index];


    if (
        !test.deadline
    ) {

        alert(
            uiText(
                "deadlineRequired"
            )
        );


        const classId =
            getClassId(test);


        let url =
            `create-test.html?id=${encodeURIComponent(id)}`;


        if (classId) {

            url +=
                `&class=${encodeURIComponent(classId)}`;
        }


        window.location.href =
            url;


        return;
    }


    test.status =
        "published";


    test.publishedAt =
        new Date().toISOString();


    savedTests[index] =
        test;


    saveTests(
        savedTests
    );


    renderTests();
}


/* =========================================================
   CANCEL ASSIGNMENT
   ========================================================= */

function unassignTest(id) {

    const savedTests =
        getStorageArray(
            "advantaTests"
        );


    const index =
        savedTests.findIndex(
            test =>
                String(test.id) ===
                String(id)
        );


    if (
        index === -1
    ) {

        return;
    }


    const test =
        savedTests[index];


    if (
        test.status !== "published"
    ) {

        return;
    }


    const confirmed =
        confirm(
            uiText(
                "cancelAssignmentQuestion"
            )
        );


    if (
        !confirmed
    ) {

        return;
    }


    test.status =
        "draft";


    test.publishedAt =
        null;


    test.unassignedAt =
        new Date().toISOString();


    savedTests[index] =
        test;


    saveTests(
        savedTests
    );


    renderTests();
}


/* =========================================================
   DELETE TEST
   ========================================================= */

function deleteTest(id) {

    const savedTests =
        getStorageArray(
            "advantaTests"
        );


    const test =
        savedTests.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (
        !test
    ) {

        return;
    }


    /*
       ВАЖНО:
       если по тесту уже есть хотя бы один
       результат ученика, физически тест
       не удаляем.

       Иначе мы потеряем связь:
       результат → тест.
    */

    if (
        testHasResults(id)
    ) {

        alert(
            uiText(
                "deleteBlocked"
            )
        );


        return;
    }


    const confirmed =
        confirm(
            uiText(
                "deleteQuestion"
            )
        );


    if (
        !confirmed
    ) {

        return;
    }


    const updatedTests =
        savedTests.filter(
            item =>
                String(item.id) !==
                String(id)
        );


    saveTests(
        updatedTests
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