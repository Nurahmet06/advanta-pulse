/* =========================================================
   ADVANTA PULSE
   ОБЩАЯ АНАЛИТИКА УЧИТЕЛЯ
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


    const texts = window.AdvantaI18n.scope("staff-analytics");


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

    const number =
        Number(value);


    if (
        !Number.isFinite(number)
    ) {

        return null;
    }


    return Math.max(
        0,
        Math.min(
            100,
            Math.round(number)
        )
    );
}


function getScore(result) {

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
        item =>
            currentTeacher.classIds.some(
                id =>
                    String(id) ===
                    String(item.id)
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

function getStudentId(result) {

    return (
        result.studentId
        ??
        result.userId
        ??
        null
    );
}


function getTestId(result) {

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


function getClassId(result) {

    if (
        result.classId !== undefined
        &&
        result.classId !== null
    ) {

        return result.classId;
    }


    const studentId =
        getStudentId(result);


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
        getTestId(result);


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


    const test =
        getTeacherTests().find(
            item =>
                String(item.id) ===
                String(getTestId(result))
        );


    const testValue =
        Number(
            test?.passingScore
            ??
            test?.threshold
        );


    return Number.isFinite(testValue)
        ? testValue
        : 60;
}


function isPassed(result) {

    const score =
        getScore(result);


    if (
        score === null
    ) {

        return false;
    }


    if (
        typeof result.passed === "boolean"
    ) {

        return result.passed;
    }


    return (
        score >=
        getPassingScore(result)
    );
}


/* =========================================================
   RESULTS
   ========================================================= */

function getTeacherResults() {

    const results =
        getStorageArray(
            "advantaResults"
        );


    /*
       Один ученик + один тест = один итоговый результат.

       Если в хранилище остались старые дубли,
       используем самый свежий результат.
    */

    const uniqueResults =
        new Map();


    results.forEach(
        result => {

            const score =
                getScore(result);


            const studentId =
                getStudentId(result);


            const testId =
                getTestId(result);


            if (
                score === null
                ||
                !studentId
                ||
                !testId
            ) {

                return;
            }


            const resultClassId =
                getClassId(result);


            const belongsToTeacher =
                currentTeacher.classIds.some(
                    id =>
                        String(id) ===
                        String(resultClassId)
                );


            if (
                !belongsToTeacher
            ) {

                return;
            }


            const key =
                `${String(studentId)}__${String(testId)}`;


            const existing =
                uniqueResults.get(
                    key
                );


            if (
                !existing
            ) {

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
    );
}


/* =========================================================
   FILTER
   ========================================================= */

const classFilter =
    document.getElementById(
        "classFilter"
    );


function fillClassFilter() {

    const selected =
        classFilter.value;


    classFilter.innerHTML =
        `<option value="">${uiText("allClasses")}</option>`;


    getTeacherClasses().forEach(
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


    classFilter.value =
        selected;
}


function getFilteredResults() {

    const results =
        getTeacherResults();


    if (
        !classFilter.value
    ) {

        return results;
    }


    return results.filter(
        result =>
            String(getClassId(result))
            ===
            String(classFilter.value)
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
   KPI
   ========================================================= */

function renderKPI(results) {

    const scores =
        results
            .map(getScore)
            .filter(
                score =>
                    score !== null
            );


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


    const completedElement =
        document.getElementById(
            "completedValue"
        );


    const passedValue =
        document.getElementById(
            "passedValue"
        );


    const failedValue =
        document.getElementById(
            "failedValue"
        );


    const passedPercent =
        document.getElementById(
            "passedPercent"
        );


    const failedPercent =
        document.getElementById(
            "failedPercent"
        );


    completedElement.textContent =
        scores.length;


    if (
        scores.length === 0
    ) {

        averageElement.textContent =
            "—";

        bestElement.textContent =
            "—";

        passRateElement.textContent =
            "—";

        passedValue.textContent =
            "0";

        failedValue.textContent =
            "0";

        passedPercent.textContent =
            "0%";

        failedPercent.textContent =
            "0%";


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


    const passed =
        results.filter(
            result =>
                getScore(result) !== null
                &&
                isPassed(result)
        ).length;


    const failed =
        scores.length -
        passed;


    const passRate =
        Math.round(
            passed /
            scores.length *
            100
        );


    const failRate =
        100 -
        passRate;


    averageElement.textContent =
        `${average}/100`;


    bestElement.textContent =
        `${best}/100`;


    passRateElement.textContent =
        `${passRate}%`;


    passedValue.textContent =
        passed;


    failedValue.textContent =
        failed;


    passedPercent.textContent =
        `${passRate}%`;


    failedPercent.textContent =
        `${failRate}%`;


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
   CLASS COMPARISON
   ========================================================= */

function renderClassComparison(results) {

    const container =
        document.getElementById(
            "classComparisonContainer"
        );


    container.innerHTML =
        "";


    let classes =
        getTeacherClasses();


    /*
       Если выбран один класс,
       показываем только его.
    */

    if (
        classFilter.value
    ) {

        classes =
            classes.filter(
                classItem =>
                    String(classItem.id) ===
                    String(classFilter.value)
            );
    }


    classes.forEach(
        classItem => {

            const classResults =
                results.filter(
                    result =>
                        String(getClassId(result))
                        ===
                        String(classItem.id)
                );


            const scores =
                classResults
                    .map(getScore)
                    .filter(
                        score =>
                            score !== null
                    );


            const average =
                scores.length
                    ? Math.round(
                        scores.reduce(
                            (sum, score) =>
                                sum + score,
                            0
                        )
                        /
                        scores.length
                    )
                    : null;


            const passed =
                classResults.filter(
                    result =>
                        getScore(result) !== null
                        &&
                        isPassed(result)
                ).length;


            const passRate =
                scores.length
                    ? Math.round(
                        passed /
                        scores.length *
                        100
                    )
                    : 0;


            const block =
                document.createElement(
                    "div"
                );


            const scoreColor =
                average === null
                    ? "#6c757d"
                    : getScoreColor(average);


            block.innerHTML = `

                <div
                    class="d-flex justify-content-between align-items-center gap-3 mb-2"
                >

                    <div>

                        <strong class="fs-5">
                            ${classItem.name}
                        </strong>

                        <div class="small text-secondary">
                            ${scores.length} ${uiText("attempts").toLowerCase()}
                        </div>

                    </div>


                    <div class="text-end">

                        <strong
                            style="color:${scoreColor};"
                        >
                            ${
                                average === null
                                    ? "—"
                                    : `${average}/100`
                            }
                        </strong>

                        <div class="small text-secondary">
                            ${passRate}%
                        </div>

                    </div>

                </div>


                <div
                    class="progress"
                    style="height: 9px;"
                >

                    <div
                        class="progress-bar"
                        role="progressbar"
                        style="width:${average ?? 0}%;"
                        aria-valuenow="${average ?? 0}"
                        aria-valuemin="0"
                        aria-valuemax="100"
                    ></div>

                </div>
            `;


            container.appendChild(
                block
            );
        }
    );
}


/* =========================================================
   TEST ANALYTICS
   ========================================================= */

function getTestName(testId, fallbackResult) {

    if (
        fallbackResult?.testName
        ||
        fallbackResult?.testTitle
    ) {

        return (
            fallbackResult.testName
            ||
            fallbackResult.testTitle
        );
    }


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


function getClassName(classId) {

    const classItem =
        getTeacherClasses().find(
            item =>
                String(item.id) ===
                String(classId)
        );


    return (
        classItem?.name
        ||
        "—"
    );
}


function renderTestAnalytics(results) {

    const empty =
        document.getElementById(
            "testAnalyticsEmpty"
        );


    const wrapper =
        document.getElementById(
            "testAnalyticsTableWrapper"
        );


    const body =
        document.getElementById(
            "testAnalyticsTableBody"
        );


    body.innerHTML =
        "";


    const groups =
        new Map();


    results.forEach(
        result => {

            const score =
                getScore(result);


            const testId =
                getTestId(result);


            if (
                score === null
                ||
                !testId
            ) {

                return;
            }


            const key =
                String(testId);


            if (
                !groups.has(key)
            ) {

                groups.set(
                    key,
                    []
                );
            }


            groups.get(key).push(
                result
            );
        }
    );


    if (
        groups.size === 0
    ) {

        empty.textContent =
            uiText("noResults");


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


    groups.forEach(
        (testResults, testId) => {

            const scores =
                testResults.map(
                    getScore
                );


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


            const passed =
                testResults.filter(
                    isPassed
                ).length;


            const passRate =
                Math.round(
                    passed /
                    scores.length *
                    100
                );


            const firstResult =
                testResults[0];


            const resultClassId =
                getClassId(
                    firstResult
                );


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    <strong>
                        ${getTestName(testId, firstResult)}
                    </strong>
                </td>


                <td>
                    ${getClassName(resultClassId)}
                </td>


                <td>
                    ${scores.length}
                </td>


                <td>

                    <strong
                        style="color:${getScoreColor(average)};"
                    >
                        ${average}/100
                    </strong>

                </td>


                <td>

                    <span
                        class="badge ${
                            passRate >= 50
                                ? "text-bg-success"
                                : "text-bg-danger"
                        }"
                    >
                        ${passRate}%
                    </span>

                </td>
            `;


            body.appendChild(
                row
            );
        }
    );
}


/* =========================================================
   EMPTY STATE
   ========================================================= */

function renderEmptyState(results) {

    const empty =
        document.getElementById(
            "analyticsEmpty"
        );


    const content =
        document.getElementById(
            "analyticsContent"
        );


    const validResults =
        results.filter(
            result =>
                getScore(result) !== null
        );


    if (
        validResults.length === 0
    ) {

        empty.classList.remove(
            "d-none"
        );


        content.classList.add(
            "d-none"
        );


        return;
    }


    empty.classList.add(
        "d-none"
    );


    content.classList.remove(
        "d-none"
    );
}


/* =========================================================
   LANGUAGE
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
        "classFilterLabel",
        uiText("class")
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
        "completedLabel",
        uiText("completed")
    );


    setText(
        "passedLabel",
        uiText("passed")
    );


    setText(
        "failedLabel",
        uiText("failed")
    );


    setText(
        "analyticsEmptyTitle",
        uiText("noData")
    );


    setText(
        "analyticsEmptyText",
        uiText("noDataText")
    );


    setText(
        "classComparisonTitle",
        uiText("classComparison")
    );


    setText(
        "classComparisonDescription",
        uiText("classComparisonDescription")
    );


    setText(
        "testAnalyticsTitle",
        uiText("testAnalytics")
    );


    setText(
        "testAnalyticsDescription",
        uiText("testAnalyticsDescription")
    );


    setText(
        "testHeader",
        uiText("test")
    );


    setText(
        "classHeader",
        uiText("class")
    );


    setText(
        "attemptsHeader",
        uiText("attempts")
    );


    setText(
        "averageHeader",
        uiText("averageScore")
    );


    setText(
        "passRateHeader",
        uiText("completion")
    );
}


/* =========================================================
   RENDER
   ========================================================= */

function renderPage() {

    const results =
        getFilteredResults();


    renderKPI(
        results
    );


    renderEmptyState(
        results
    );


    renderClassComparison(
        results
    );


    renderTestAnalytics(
        results
    );
}


/* =========================================================
   EVENTS
   ========================================================= */

classFilter.addEventListener(
    "change",
    function () {

        renderPage();
    }
);


window.addEventListener(
    "languageChanged",
    function () {

        renderHeader();

        renderLanguage();

        fillClassFilter();

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

        fillClassFilter();

        renderPage();
    }
);