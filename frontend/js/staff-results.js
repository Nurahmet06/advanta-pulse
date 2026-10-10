/* =========================================================
   ADVANTA PULSE
   ОБЩИЕ РЕЗУЛЬТАТЫ УЧЕНИКОВ
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

function uiText(key) {

    const language =
        typeof getCurrentLanguage === "function"
            ? getCurrentLanguage()
            : (
                localStorage.getItem("language")
                ||
                "ru"
            );


    const texts = window.AdvantaI18n.scope("staff-results");


    return (
        texts[language]?.[key]
        ||
        texts.ru[key]
        ||
        key
    );
}


/* =========================================================
   SCORE
   ========================================================= */

function normalizeScore(value) {

    const score =
        Number(value);


    if (
        !Number.isFinite(score)
    ) {

        return null;
    }


    return Math.max(
        0,
        Math.min(
            100,
            Math.round(score)
        )
    );
}


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


/* =========================================================
   TEACHER DATA
   ========================================================= */

function getTeacherClasses() {

    return getStorageArray(
        "advantaClasses"
    ).filter(
        classItem =>
            currentTeacher.classIds.some(
                id =>
                    String(id) ===
                    String(classItem.id)
            )
    );
}


function getTeacherStudents() {

    return getStorageArray(
        "advantaUsers"
    ).filter(
        user =>
            user.role === "student"
            &&
            user.status === "active"
            &&
            currentTeacher.classIds.some(
                id =>
                    String(id) ===
                    String(user.classId)
            )
    );
}


function getTeacherTests() {

    const classes =
        getTeacherClasses();


    return getStorageArray(
        "advantaTests"
    ).filter(
        test => {

            if (
                currentTeacher.classIds.some(
                    id =>
                        String(id) ===
                        String(test.classId)
                )
            ) {
                return true;
            }


            if (
                classes.some(
                    classItem =>
                        classItem.name ===
                        test.className
                )
            ) {
                return true;
            }


            if (
                Array.isArray(test.classIds)
                &&
                test.classIds.some(
                    id =>
                        currentTeacher.classIds.some(
                            teacherClassId =>
                                String(teacherClassId) ===
                                String(id)
                        )
                )
            ) {
                return true;
            }


            return false;
        }
    );
}


/* =========================================================
   RESULT HELPERS
   ========================================================= */

function getResultStudentId(result) {

    return (
        result.studentId
        ??
        result.userId
        ??
        null
    );
}


function getResultTestId(result) {

    return (
        result.testId
        ??
        result.testID
        ??
        result.test?.id
        ??
        null
    );
}


function getResultScore(result) {

    return normalizeScore(
        result.score
        ??
        result.percentage
        ??
        result.percent
        ??
        result.result
    );
}


function getResultClassId(result) {

    if (
        result.classId !== undefined
        &&
        result.classId !== null
    ) {

        return result.classId;
    }


    const studentId =
        getResultStudentId(result);


    const student =
        getTeacherStudents().find(
            item =>
                String(item.id) ===
                String(studentId)
        );


    if (student?.classId) {

        return student.classId;
    }


    const testId =
        getResultTestId(result);


    const test =
        getTeacherTests().find(
            item =>
                String(item.id) ===
                String(testId)
        );


    return (
        test?.classId
        ??
        null
    );
}


function getPassingScore(result) {

    const direct =
        Number(
            result.passingScore
            ??
            result.threshold
        );


    if (
        Number.isFinite(direct)
    ) {

        return direct;
    }


    const testId =
        getResultTestId(result);


    const test =
        getTeacherTests().find(
            item =>
                String(item.id) ===
                String(testId)
        );


    const testScore =
        Number(
            test?.passingScore
            ??
            test?.threshold
        );


    return Number.isFinite(testScore)
        ? testScore
        : 60;
}


/* =========================================================
   RESULTS
   ========================================================= */

function getAllResults() {

    const results =
        getStorageArray(
            "advantaResults"
        );


    /*
       Один ученик + один тест = один результат.

       Если по какой-либо причине в advantaResults
       появились дубли, оставляем самый свежий.
    */

    const uniqueResults =
        new Map();


    results.forEach(
        result => {

            const studentId =
                getResultStudentId(
                    result
                );


            const testId =
                getResultTestId(
                    result
                );


            if (
                !studentId
                ||
                !testId
            ) {

                return;
            }


            const key =
                `${String(studentId)}__${String(testId)}`;


            const existing =
                uniqueResults.get(
                    key
                );


            if (!existing) {

                uniqueResults.set(
                    key,
                    result
                );

                return;
            }


            const existingDate =
                new Date(
                    existing.completedAt
                    ??
                    existing.createdAt
                    ??
                    existing.date
                    ??
                    0
                ).getTime();


            const newDate =
                new Date(
                    result.completedAt
                    ??
                    result.createdAt
                    ??
                    result.date
                    ??
                    0
                ).getTime();


            if (
                newDate >= existingDate
            ) {

                uniqueResults.set(
                    key,
                    result
                );
            }
        }
    );


    return Array.from(
        uniqueResults.values()
    ).filter(
        result => {

            const resultClassId =
                getResultClassId(
                    result
                );


            return currentTeacher.classIds.some(
                id =>
                    String(id) ===
                    String(resultClassId)
            );
        }
    );
}


/* =========================================================
   DISPLAY DATA
   ========================================================= */

function getStudentName(result) {

    const firstName =
        result.studentFirstName
        ??
        result.firstName
        ??
        "";


    const lastName =
        result.studentLastName
        ??
        result.lastName
        ??
        "";


    if (
        firstName
        ||
        lastName
    ) {

        return `${lastName} ${firstName}`.trim();
    }


    const studentId =
        getResultStudentId(result);


    const student =
        getTeacherStudents().find(
            item =>
                String(item.id) ===
                String(studentId)
        );


    if (!student) {

        return uiText(
            "unknownStudent"
        );
    }


    return `${
        student.lastName || ""
    } ${
        student.firstName || ""
    }`.trim();
}


function getClassName(result) {

    if (result.className) {

        return result.className;
    }


    const resultClassId =
        getResultClassId(result);


    const classItem =
        getTeacherClasses().find(
            item =>
                String(item.id) ===
                String(resultClassId)
        );


    return (
        classItem?.name
        ||
        uiText("unknownClass")
    );
}


function getTestName(result) {

    if (
        result.testName
        ||
        result.testTitle
    ) {

        return (
            result.testName
            ||
            result.testTitle
        );
    }


    const testId =
        getResultTestId(result);


    const test =
        getTeacherTests().find(
            item =>
                String(item.id) ===
                String(testId)
        );


    return (
        test?.name
        ||
        test?.title
        ||
        uiText("testFallback")
    );
}


function getDate(result) {

    const value =
        result.completedAt
        ??
        result.createdAt
        ??
        result.date;


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

        return "—";
    }


    const language =
        typeof getCurrentLanguage === "function"
            ? getCurrentLanguage()
            : "ru";


    const locale =
        language === "kz"
            ? "kk-KZ"
            : language === "en"
                ? "en-GB"
                : "ru-RU";


    return date.toLocaleDateString(
        locale,
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );
}


/* =========================================================
   HEADER
   ========================================================= */

function renderHeader() {

    document.getElementById(
        "teacherName"
    ).textContent =
        currentTeacher.name;


    document.getElementById(
        "teacherSubject"
    ).textContent =
        `${
            typeof t === "function"
                ? t("teacher")
                : "Учитель"
        } • ${
            typeof t === "function"
                ? t(currentTeacher.subjectId)
                : currentTeacher.subjectName
        }`;
}


/* =========================================================
   FILTERS
   ========================================================= */

const classFilter =
    document.getElementById(
        "classFilter"
    );


const studentFilter =
    document.getElementById(
        "studentFilter"
    );


const testFilter =
    document.getElementById(
        "testFilter"
    );


function fillFilters() {

    const selectedClass =
        classFilter.value;


    const selectedStudent =
        studentFilter.value;


    const selectedTest =
        testFilter.value;


    const classes =
        getTeacherClasses();


    const students =
        getTeacherStudents();


    const tests =
        getTeacherTests();


    classFilter.innerHTML =
        `<option value="">${uiText("allClasses")}</option>`;


    classes.forEach(
        classItem => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                classItem.id;


            option.textContent =
                classItem.name;


            classFilter.appendChild(
                option
            );
        }
    );


    studentFilter.innerHTML =
        `<option value="">${uiText("allStudents")}</option>`;


    students.forEach(
        student => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                student.id;


            option.textContent =
                `${
                    student.lastName || ""
                } ${
                    student.firstName || ""
                }`.trim();


            studentFilter.appendChild(
                option
            );
        }
    );


    testFilter.innerHTML =
        `<option value="">${uiText("allTests")}</option>`;


    tests.forEach(
        test => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                test.id;


            option.textContent =
                test.name
                ||
                test.title
                ||
                uiText("testFallback");


            testFilter.appendChild(
                option
            );
        }
    );


    classFilter.value =
        selectedClass;


    studentFilter.value =
        selectedStudent;


    testFilter.value =
        selectedTest;
}


/* =========================================================
   FILTERED RESULTS
   ========================================================= */

function getFilteredResults() {

    return getAllResults().filter(
        result => {

            if (
                classFilter.value
                &&
                String(
                    getResultClassId(result)
                )
                !==
                String(classFilter.value)
            ) {

                return false;
            }


            if (
                studentFilter.value
                &&
                String(
                    getResultStudentId(result)
                )
                !==
                String(studentFilter.value)
            ) {

                return false;
            }


            if (
                testFilter.value
                &&
                String(
                    getResultTestId(result)
                )
                !==
                String(testFilter.value)
            ) {

                return false;
            }


            return true;
        }
    );
}


/* =========================================================
   SUMMARY
   ========================================================= */

function renderSummary(results) {

    const scores =
        results
            .map(getResultScore)
            .filter(
                score =>
                    score !== null
            );


    document.getElementById(
        "completedValue"
    ).textContent =
        scores.length;


    const averageElement =
        document.getElementById(
            "averageValue"
        );


    const bestElement =
        document.getElementById(
            "bestValue"
        );


    const passRateElement =
        document.getElementById(
            "passRateValue"
        );


    if (
        scores.length === 0
    ) {

        averageElement.textContent =
            "—";

        bestElement.textContent =
            "—";

        passRateElement.textContent =
            "—";


        averageElement.style.removeProperty(
            "color"
        );

        bestElement.style.removeProperty(
            "color"
        );


        return;
    }


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


    const best =
        Math.max(
            ...scores
        );


    const passedCount =
        results.filter(
            result => {

                const score =
                    getResultScore(result);


                if (
                    score === null
                ) {

                    return false;
                }


                if (
                    typeof result.passed ===
                    "boolean"
                ) {

                    return result.passed;
                }


                return (
                    score >=
                    getPassingScore(result)
                );
            }
        ).length;


    const passRate =
        Math.round(
            (
                passedCount
                /
                scores.length
            )
            *
            100
        );


    averageElement.textContent =
        `${average}/100`;


    bestElement.textContent =
        `${best}/100`;


    passRateElement.textContent =
        `${passRate}%`;


    averageElement.style.setProperty(
        "color",
        getScoreColor(average),
        "important"
    );


    bestElement.style.setProperty(
        "color",
        getScoreColor(best),
        "important"
    );
}


/* =========================================================
   TABLE
   ========================================================= */

function renderTable(results) {

    const empty =
        document.getElementById(
            "resultsEmpty"
        );


    const wrapper =
        document.getElementById(
            "resultsTableWrapper"
        );


    const body =
        document.getElementById(
            "resultsTableBody"
        );


    body.innerHTML =
        "";


    if (
        results.length === 0
    ) {

        empty.classList.remove(
            "d-none"
        );


        wrapper.classList.add(
            "d-none"
        );


        return;
    }


    empty.classList.add(
        "d-none"
    );


    wrapper.classList.remove(
        "d-none"
    );


    const sorted =
        [...results].sort(
            (a, b) => {

                const aDate =
                    new Date(
                        a.completedAt
                        ??
                        a.createdAt
                        ??
                        a.date
                        ??
                        0
                    ).getTime();


                const bDate =
                    new Date(
                        b.completedAt
                        ??
                        b.createdAt
                        ??
                        b.date
                        ??
                        0
                    ).getTime();


                return bDate - aDate;
            }
        );


    sorted.forEach(
        result => {

            const score =
                getResultScore(result);


            const passingScore =
                getPassingScore(result);


            const passed =
                typeof result.passed === "boolean"
                    ? result.passed
                    : (
                        score !== null
                        &&
                        score >= passingScore
                    );


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    <strong>
                        ${getStudentName(result)}
                    </strong>
                </td>


                <td>
                    ${getClassName(result)}
                </td>


                <td>
                    ${getTestName(result)}
                </td>


                <td>

                    <strong
                        ${
                            score !== null
                                ? `style="color:${getScoreColor(score)};"`
                                : ""
                        }
                    >
                        ${
                            score !== null
                                ? `${score}/100`
                                : "—"
                        }
                    </strong>

                </td>


                <td>
                    ${passingScore}/100
                </td>


                <td>

                    <span
                        class="badge ${
                            passed
                                ? "text-bg-success"
                                : "text-bg-danger"
                        }"
                    >
                        ${
                            passed
                                ? uiText("passed")
                                : uiText("failed")
                        }
                    </span>

                </td>


                <td>
                    ${getDate(result)}
                </td>
            `;


            body.appendChild(
                row
            );
        }
    );
}


/* =========================================================
   STATIC LANGUAGE
   ========================================================= */

function renderLanguage() {

    const setText =
        function (id, value) {

            const element =
                document.getElementById(id);


            if (element) {

                element.textContent =
                    value;
            }
        };


    setText(
        "pageDescription",
        uiText("description")
    );


    setText(
        "completedLabel",
        uiText("completed")
    );


    setText(
        "averageLabel",
        uiText("average")
    );


    setText(
        "bestLabel",
        uiText("best")
    );


    setText(
        "passRateLabel",
        uiText("passRate")
    );


    setText(
        "classFilterLabel",
        uiText("class")
    );


    setText(
        "studentFilterLabel",
        uiText("student")
    );


    setText(
        "testFilterLabel",
        uiText("test")
    );


    setText(
        "studentHeader",
        uiText("student")
    );


    setText(
        "classHeader",
        uiText("class")
    );


    setText(
        "testHeader",
        uiText("test")
    );


    setText(
        "scoreHeader",
        uiText("result")
    );


    setText(
        "passingHeader",
        uiText("passing")
    );


    setText(
        "statusHeader",
        uiText("status")
    );


    setText(
        "dateHeader",
        uiText("date")
    );


    setText(
        "resultsEmptyTitle",
        uiText("noResults")
    );


    setText(
        "resultsEmptyText",
        uiText("noResultsText")
    );
}


/* =========================================================
   RENDER
   ========================================================= */

function renderPage() {

    const results =
        getFilteredResults();


    renderSummary(
        results
    );


    renderTable(
        results
    );
}


/* =========================================================
   EVENTS
   ========================================================= */

classFilter.addEventListener(
    "change",
    renderPage
);


studentFilter.addEventListener(
    "change",
    renderPage
);


testFilter.addEventListener(
    "change",
    renderPage
);


window.addEventListener(
    "languageChanged",
    function () {

        renderHeader();

        renderLanguage();

        fillFilters();

        renderPage();
    }
);


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderHeader();

        renderLanguage();

        fillFilters();

        renderPage();
    }
);