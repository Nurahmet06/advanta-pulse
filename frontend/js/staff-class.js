/* =========================================================
   ADVANTA PULSE
   КАБИНЕТ КОНКРЕТНОГО КЛАССА
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


function saveStorageArray(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );
}


/* =========================================================
   CLASS FROM URL
   ========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );


const classId =
    params.get("class");


const classes =
    getStorageArray(
        "advantaClasses"
    );


const currentClass =
    classes.find(
        classItem =>
            String(classItem.id) ===
            String(classId)
    );


/* =========================================================
   HELPERS
   ========================================================= */

function getSubjectName() {

    if (
        typeof t === "function"
    ) {

        return t(
            currentTeacher.subjectId
        );
    }

    return currentTeacher.subjectName;
}


function getStudents() {

    return getStorageArray(
        "advantaUsers"
    ).filter(
        user =>
            user.role === "student"
            &&
            user.status === "active"
            &&
            String(user.classId) ===
            String(classId)
    );
}


function getRequests() {

    return getStorageArray(
        "advantaJoinRequests"
    ).filter(
        request =>
            request.status === "pending"
            &&
            String(request.classId) ===
            String(classId)
    );
}


function getTests() {

    return getStorageArray(
        "advantaTests"
    ).filter(
        test => {

            if (
                String(test.classId) ===
                String(classId)
            ) {
                return true;
            }


            if (
                currentClass
                &&
                test.className === currentClass.name
            ) {
                return true;
            }


            if (
                Array.isArray(test.classIds)
                &&
                test.classIds.some(
                    id =>
                        String(id) ===
                        String(classId)
                )
            ) {
                return true;
            }


            return false;
        }
    );
}


/* =========================================================
   LANGUAGE
   ========================================================= */

function dynamicText(key) {

    const language =
        typeof getCurrentLanguage === "function"
            ? getCurrentLanguage()
            : (
                localStorage.getItem("language")
                ||
                "ru"
            );


    const texts = {

        ru: {

            overview:
                "Обзор",

            overviewTitle:
                "Обзор класса",

            overviewText:
                "Здесь собрана основная информация по этому классу.",

            noTests:
                "Тестов пока нет",

            testFallback:
                "Тест",

            resultsDescription:
                "Результаты тестов этого класса",

            resultsEmptyTitle:
                "Результатов пока нет",

            resultsEmptyText:
                "После прохождения тестов результаты учеников появятся здесь.",

            student:
                "Ученик",

            test:
                "Тест",

            result:
                "Результат",

            passingScore:
                "Порог",

            status:
                "Статус",

            date:
                "Дата",

            passed:
                "Пройден",

            failed:
                "Не пройден",

            analyticsTitle:
                "Аналитика класса",

            analyticsDescription:
                "Общие показатели по результатам учеников этого класса",

            average:
                "Средний результат",

            best:
                "Лучший результат",

            passRate:
                "Успешно пройдено",

            completed:
                "Завершено тестов",

            passedCount:
                "Пройдено",

            failedCount:
                "Не пройдено",

            analyticsEmptyTitle:
                "Недостаточно данных",

            analyticsEmptyText:
                "Аналитика появится после прохождения тестов учениками.",

            unknownStudent:
                "Ученик",

            approved:
                "Подтверждён",

            approve:
                "Подтвердить",

            reject:
                "Отклонить",

            rejectQuestion:
                "Отклонить заявку?",

            noAccess:
                "У вас нет доступа к этому классу.",

            published:
                "Назначен",

            finished:
                "Завершён",

            draft:
                "Черновик"
        },


        kz: {

            overview:
                "Шолу",

            overviewTitle:
                "Сыныпқа шолу",

            overviewText:
                "Мұнда осы сынып бойынша негізгі ақпарат жинақталған.",

            noTests:
                "Тесттер әзірге жоқ",

            testFallback:
                "Тест",

            resultsDescription:
                "Осы сыныптың тест нәтижелері",

            resultsEmptyTitle:
                "Нәтижелер әзірге жоқ",

            resultsEmptyText:
                "Оқушылар тесттерді тапсырғаннан кейін нәтижелер осында көрсетіледі.",

            student:
                "Оқушы",

            test:
                "Тест",

            result:
                "Нәтиже",

            passingScore:
                "Шекті балл",

            status:
                "Күйі",

            date:
                "Күні",

            passed:
                "Өтті",

            failed:
                "Өтпеді",

            analyticsTitle:
                "Сынып аналитикасы",

            analyticsDescription:
                "Осы сынып оқушыларының нәтижелері бойынша жалпы көрсеткіштер",

            average:
                "Орташа нәтиже",

            best:
                "Үздік нәтиже",

            passRate:
                "Сәтті тапсырылды",

            completed:
                "Аяқталған тесттер",

            passedCount:
                "Өткен",

            failedCount:
                "Өтпеген",

            analyticsEmptyTitle:
                "Деректер жеткіліксіз",

            analyticsEmptyText:
                "Оқушылар тесттерді тапсырғаннан кейін аналитика пайда болады.",

            unknownStudent:
                "Оқушы",

            approved:
                "Расталды",

            approve:
                "Растау",

            reject:
                "Қабылдамау",

            rejectQuestion:
                "Өтінімді қабылдамау керек пе?",

            noAccess:
                "Бұл сыныпқа кіруге рұқсатыңыз жоқ.",

            published:
                "Тағайындалды",

            finished:
                "Аяқталды",

            draft:
                "Жоба"
        },


        en: {

            overview:
                "Overview",

            overviewTitle:
                "Class overview",

            overviewText:
                "Key information for this class is shown here.",

            noTests:
                "No tests yet",

            testFallback:
                "Test",

            resultsDescription:
                "Test results for this class",

            resultsEmptyTitle:
                "No results yet",

            resultsEmptyText:
                "Student results will appear here after they complete tests.",

            student:
                "Student",

            test:
                "Test",

            result:
                "Result",

            passingScore:
                "Passing score",

            status:
                "Status",

            date:
                "Date",

            passed:
                "Passed",

            failed:
                "Not passed",

            analyticsTitle:
                "Class analytics",

            analyticsDescription:
                "Overall performance indicators for students in this class",

            average:
                "Average result",

            best:
                "Best result",

            passRate:
                "Pass rate",

            completed:
                "Completed tests",

            passedCount:
                "Passed",

            failedCount:
                "Not passed",

            analyticsEmptyTitle:
                "Not enough data",

            analyticsEmptyText:
                "Analytics will appear after students complete tests.",

            unknownStudent:
                "Student",

            approved:
                "Approved",

            approve:
                "Approve",

            reject:
                "Reject",

            rejectQuestion:
                "Reject this request?",

            noAccess:
                "You do not have access to this class.",

            published:
                "Assigned",

            finished:
                "Finished",

            draft:
                "Draft"
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
   SCORE COLORS
   0–49   RED
   50–69  YELLOW
   70–89  BLUE
   90–100 GREEN
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


/* =========================================================
   RESULTS HELPERS
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


function getResultPassingScore(result) {

    const directValue =
        Number(
            result.passingScore
            ??
            result.threshold
        );


    if (
        Number.isFinite(directValue)
    ) {

        return directValue;
    }


    const resultTestId =
        getResultTestId(result);


    const test =
        getStorageArray(
            "advantaTests"
        ).find(
            item =>
                String(item.id) ===
                String(resultTestId)
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


function resultBelongsToCurrentClass(result) {

    if (
        result.classId !== undefined
        &&
        result.classId !== null
    ) {

        return (
            String(result.classId) ===
            String(classId)
        );
    }


    const resultStudentId =
        getResultStudentId(result);


    if (resultStudentId) {

        const belongsByStudent =
            getStudents().some(
                student =>
                    String(student.id) ===
                    String(resultStudentId)
            );


        if (belongsByStudent) {

            return true;
        }
    }


    const resultTestId =
        getResultTestId(result);


    if (resultTestId) {

        return getTests().some(
            test =>
                String(test.id) ===
                String(resultTestId)
        );
    }


    return false;
}


/* =========================================================
   CLASS RESULTS

   ЕДИНСТВЕННЫЙ ИСТОЧНИК:
   advantaResults

   ПРАВИЛО:
   1 ученик + 1 тест = 1 итоговый результат
   ========================================================= */

function getClassResults() {

    const results =
        getStorageArray(
            "advantaResults"
        );


    const uniqueResults =
        new Map();


    results.forEach(
        result => {

            const score =
                getResultScore(
                    result
                );


            const studentId =
                getResultStudentId(
                    result
                );


            const testId =
                getResultTestId(
                    result
                );


            if (
                score === null
                ||
                !studentId
                ||
                !testId
            ) {

                return;
            }


            if (
                !resultBelongsToCurrentClass(
                    result
                )
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
    );
}


/* =========================================================
   RESULT DISPLAY HELPERS
   ========================================================= */

function getStudentNameFromResult(result) {

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
        getStudents().find(
            item =>
                String(item.id) ===
                String(studentId)
        );


    if (student) {

        return `${
            student.lastName || ""
        } ${
            student.firstName || ""
        }`.trim();
    }


    return dynamicText(
        "unknownStudent"
    );
}


function getTestNameFromResult(result) {

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


    const resultTestId =
        getResultTestId(result);


    const test =
        getStorageArray(
            "advantaTests"
        ).find(
            item =>
                String(item.id) ===
                String(resultTestId)
        );


    return (
        test?.name
        ||
        test?.title
        ||
        dynamicText("testFallback")
    );
}


function getResultDate(result) {

    const value =
        result.completedAt
        ??
        result.createdAt
        ??
        result.date
        ??
        null;


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
        } • ${getSubjectName()}`;


    document.getElementById(
        "classTitle"
    ).textContent =
        currentClass.name;


    document.getElementById(
        "classSubject"
    ).textContent =
        getSubjectName();


    document.title =
        `ADVANTA Pulse — ${currentClass.name}`;


    const createUrl =
        `create-test.html?class=${encodeURIComponent(classId)}`;


    document.getElementById(
        "createTestButton"
    ).href =
        createUrl;


    document.getElementById(
        "createTestButtonInside"
    ).href =
        createUrl;
}


/* =========================================================
   COUNTERS
   ========================================================= */

function renderCounters() {

    document.getElementById(
        "studentsCount"
    ).textContent =
        getStudents().length;


    document.getElementById(
        "requestsCount"
    ).textContent =
        getRequests().length;


    document.getElementById(
        "testsCount"
    ).textContent =
        getTests().length;


    const results =
        getClassResults();


    const scores =
        results
            .map(getResultScore)
            .filter(
                score =>
                    score !== null
            );


    const averageElement =
        document.getElementById(
            "averageResult"
        );


    if (
        scores.length === 0
    ) {

        averageElement.textContent =
            "—";

        averageElement.style.removeProperty(
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


    averageElement.textContent =
        `${average}/100`;


    averageElement.style.setProperty(
        "color",
        getScoreColor(average),
        "important"
    );
}


/* =========================================================
   STUDENTS
   ========================================================= */

function renderStudents() {

    const students =
        getStudents();


    const empty =
        document.getElementById(
            "studentsEmpty"
        );


    const wrapper =
        document.getElementById(
            "studentsTableWrapper"
        );


    const body =
        document.getElementById(
            "studentsTableBody"
        );


    body.innerHTML =
        "";


    if (
        students.length === 0
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


    students.forEach(
        student => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    <strong>
                        ${student.lastName || ""}
                        ${student.firstName || ""}
                    </strong>
                </td>

                <td>
                    ${student.email || "—"}
                </td>

                <td>
                    ${student.phone || "—"}
                </td>

                <td>
                    <span class="badge text-bg-success">
                        ${dynamicText("approved")}
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
   REQUESTS
   ========================================================= */

function renderRequests() {

    const requests =
        getRequests();


    const empty =
        document.getElementById(
            "requestsEmpty"
        );


    const container =
        document.getElementById(
            "requestsContainer"
        );


    container.innerHTML =
        "";


    if (
        requests.length === 0
    ) {

        empty.classList.remove(
            "d-none"
        );

        return;
    }


    empty.classList.add(
        "d-none"
    );


    requests.forEach(
        request => {

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

                        <h5 class="fw-bold mb-1">
                            ${request.lastName || ""}
                            ${request.firstName || ""}
                        </h5>

                        <div class="text-secondary">
                            ${request.email || "—"}
                        </div>

                        <div class="text-secondary">
                            ${request.phone || "—"}
                        </div>

                    </div>


                    <div class="d-flex gap-2">

                        <button
                            type="button"
                            class="btn btn-success approve-request"
                            data-id="${request.id}"
                        >
                            ${dynamicText("approve")}
                        </button>


                        <button
                            type="button"
                            class="btn btn-outline-danger reject-request"
                            data-id="${request.id}"
                        >
                            ${dynamicText("reject")}
                        </button>

                    </div>

                </div>
            `;


            container.appendChild(
                card
            );
        }
    );


    document
        .querySelectorAll(
            ".approve-request"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        approveRequest(
                            this.dataset.id
                        );
                    }
                );
            }
        );


    document
        .querySelectorAll(
            ".reject-request"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        rejectRequest(
                            this.dataset.id
                        );
                    }
                );
            }
        );
}


/* =========================================================
   APPROVE REQUEST
   ========================================================= */

function approveRequest(requestId) {

    let requests =
        getStorageArray(
            "advantaJoinRequests"
        );


    const request =
        requests.find(
            item =>
                String(item.id) ===
                String(requestId)
        );


    if (
        !request
        ||
        String(request.classId) !==
        String(classId)
    ) {

        return;
    }


    let users =
        getStorageArray(
            "advantaUsers"
        );


    const exists =
        users.some(
            user =>
                (
                    user.email || ""
                ).toLowerCase()
                ===
                (
                    request.email || ""
                ).toLowerCase()
        );


    if (!exists) {

        users.push({

            id:
                request.studentId,

            firstName:
                request.firstName,

            lastName:
                request.lastName,

            email:
                request.email,

            phone:
                request.phone,

            passwordHash:
                request.passwordHash,

            role:
                "student",

            status:
                "active",

            classId:
                classId,

            className:
                currentClass.name,

            approvedBy:
                currentTeacher.id,

            approvedAt:
                new Date().toISOString()

        });


        saveStorageArray(
            "advantaUsers",
            users
        );
    }


    requests =
        requests.map(
            item => {

                if (
                    String(item.id) !==
                    String(requestId)
                ) {

                    return item;
                }


                return {

                    ...item,

                    status:
                        "approved",

                    approvedBy:
                        currentTeacher.id,

                    approvedAt:
                        new Date().toISOString()
                };
            }
        );


    saveStorageArray(
        "advantaJoinRequests",
        requests
    );


    refreshData();
}


/* =========================================================
   REJECT REQUEST
   ========================================================= */

function rejectRequest(requestId) {

    let requests =
        getStorageArray(
            "advantaJoinRequests"
        );


    const request =
        requests.find(
            item =>
                String(item.id) ===
                String(requestId)
        );


    if (
        !request
        ||
        String(request.classId) !==
        String(classId)
    ) {

        return;
    }


    if (
        !confirm(
            dynamicText(
                "rejectQuestion"
            )
        )
    ) {

        return;
    }


    requests =
        requests.map(
            item => {

                if (
                    String(item.id) !==
                    String(requestId)
                ) {

                    return item;
                }


                return {

                    ...item,

                    status:
                        "rejected",

                    rejectedAt:
                        new Date().toISOString()
                };
            }
        );


    saveStorageArray(
        "advantaJoinRequests",
        requests
    );


    refreshData();
}


/* =========================================================
   TESTS
   ========================================================= */

function renderTests() {

    const tests =
        getTests();


    const empty =
        document.getElementById(
            "testsEmpty"
        );


    const container =
        document.getElementById(
            "testsContainer"
        );


    container.innerHTML =
        "";


    if (
        tests.length === 0
    ) {

        empty.textContent =
            dynamicText("noTests");

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

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "border rounded-4 p-3";


            const name =
                test.name
                ||
                test.title
                ||
                dynamicText("testFallback");


            let statusText =
                dynamicText("draft");


            let statusClass =
                "text-bg-secondary";


            if (
                test.status === "published"
            ) {

                statusText =
                    dynamicText("published");

                statusClass =
                    "text-bg-primary";
            }


            if (
                test.status === "finished"
            ) {

                statusText =
                    dynamicText("finished");

                statusClass =
                    "text-bg-success";
            }


            card.innerHTML = `

                <div
                    class="d-flex justify-content-between align-items-center gap-3"
                >

                    <div>

                        <strong>
                            ${name}
                        </strong>

                        <div class="small text-secondary">
                            ${currentClass.name} • ${getSubjectName()}
                        </div>

                    </div>


                    <span class="badge ${statusClass}">
                        ${statusText}
                    </span>

                </div>
            `;


            container.appendChild(
                card
            );
        }
    );
}


/* =========================================================
   RESULTS TABLE
   ========================================================= */

function renderResults() {

    const results =
        getClassResults();


    const empty =
        document.getElementById(
            "classResultsEmpty"
        );


    const wrapper =
        document.getElementById(
            "classResultsTableWrapper"
        );


    const body =
        document.getElementById(
            "classResultsTableBody"
        );


    if (
        !empty
        ||
        !wrapper
        ||
        !body
    ) {

        return;
    }


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


    const sortedResults =
        [...results].sort(
            (a, b) => {

                const dateA =
                    new Date(
                        a.completedAt
                        ??
                        a.createdAt
                        ??
                        a.date
                        ??
                        0
                    ).getTime();


                const dateB =
                    new Date(
                        b.completedAt
                        ??
                        b.createdAt
                        ??
                        b.date
                        ??
                        0
                    ).getTime();


                return dateB - dateA;
            }
        );


    sortedResults.forEach(
        result => {

            const score =
                getResultScore(result);


            const passingScore =
                getResultPassingScore(result);


            const passed =
                typeof result.passed === "boolean"
                    ? result.passed
                    : (
                        score !== null
                        &&
                        score >= passingScore
                    );


            const scoreText =
                score === null
                    ? "—"
                    : `${score}/100`;


            const scoreColor =
                score === null
                    ? ""
                    : getScoreColor(score);


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    <strong>
                        ${getStudentNameFromResult(result)}
                    </strong>
                </td>


                <td>
                    ${getTestNameFromResult(result)}
                </td>


                <td>

                    <strong
                        ${
                            scoreColor
                                ? `style="color:${scoreColor};"`
                                : ""
                        }
                    >
                        ${scoreText}
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
                                ? dynamicText("passed")
                                : dynamicText("failed")
                        }
                    </span>

                </td>


                <td>
                    ${getResultDate(result)}
                </td>
            `;


            body.appendChild(
                row
            );
        }
    );
}


/* =========================================================
   ANALYTICS
   ========================================================= */

function renderAnalytics() {

    const results =
        getClassResults();


    const scores =
        results
            .map(getResultScore)
            .filter(
                score =>
                    score !== null
            );


    const empty =
        document.getElementById(
            "analyticsEmpty"
        );


    const content =
        document.getElementById(
            "analyticsContent"
        );


    const averageElement =
        document.getElementById(
            "analyticsAverage"
        );


    const bestElement =
        document.getElementById(
            "analyticsBest"
        );


    const passRateElement =
        document.getElementById(
            "analyticsPassRate"
        );


    const completedElement =
        document.getElementById(
            "analyticsCompleted"
        );


    const passedElement =
        document.getElementById(
            "analyticsPassed"
        );


    const failedElement =
        document.getElementById(
            "analyticsFailed"
        );


    if (
        !empty
        ||
        !content
        ||
        !averageElement
        ||
        !bestElement
        ||
        !passRateElement
        ||
        !completedElement
        ||
        !passedElement
        ||
        !failedElement
    ) {

        return;
    }


    completedElement.textContent =
        results.length;


    if (
        scores.length === 0
    ) {

        averageElement.textContent =
            "—";

        bestElement.textContent =
            "—";

        passRateElement.textContent =
            "—";

        passedElement.textContent =
            "0";

        failedElement.textContent =
            "0";


        averageElement.style.removeProperty(
            "color"
        );

        bestElement.style.removeProperty(
            "color"
        );


        empty.classList.remove(
            "d-none"
        );

        content.classList.add(
            "d-none"
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


    let passedCount =
        0;


    results.forEach(
        result => {

            const score =
                getResultScore(result);


            if (
                score === null
            ) {

                return;
            }


            const passingScore =
                getResultPassingScore(
                    result
                );


            const passed =
                typeof result.passed === "boolean"
                    ? result.passed
                    : score >= passingScore;


            if (passed) {

                passedCount++;
            }
        }
    );


    const failedCount =
        scores.length -
        passedCount;


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


    completedElement.textContent =
        scores.length;


    passedElement.textContent =
        passedCount;


    failedElement.textContent =
        failedCount;


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


    empty.classList.add(
        "d-none"
    );

    content.classList.remove(
        "d-none"
    );
}


/* =========================================================
   DYNAMIC TEXTS FOR RESULTS / ANALYTICS
   ========================================================= */

function renderResultsLanguage() {

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
        "resultsDescription",
        dynamicText("resultsDescription")
    );


    setText(
        "classResultsEmptyTitle",
        dynamicText("resultsEmptyTitle")
    );


    setText(
        "classResultsEmptyText",
        dynamicText("resultsEmptyText")
    );


    setText(
        "resultStudentHeader",
        dynamicText("student")
    );


    setText(
        "resultTestHeader",
        dynamicText("test")
    );


    setText(
        "resultScoreHeader",
        dynamicText("result")
    );


    setText(
        "resultPassingHeader",
        dynamicText("passingScore")
    );


    setText(
        "resultStatusHeader",
        dynamicText("status")
    );


    setText(
        "resultDateHeader",
        dynamicText("date")
    );


    setText(
        "analyticsAverageLabel",
        dynamicText("average")
    );


    setText(
        "analyticsBestLabel",
        dynamicText("best")
    );


    setText(
        "analyticsPassRateLabel",
        dynamicText("passRate")
    );


    setText(
        "analyticsCompletedLabel",
        dynamicText("completed")
    );


    setText(
        "analyticsTitle",
        dynamicText("analyticsTitle")
    );


    setText(
        "analyticsDescription",
        dynamicText("analyticsDescription")
    );


    setText(
        "analyticsEmptyTitle",
        dynamicText("analyticsEmptyTitle")
    );


    setText(
        "analyticsEmptyText",
        dynamicText("analyticsEmptyText")
    );


    setText(
        "analyticsPassedLabel",
        dynamicText("passedCount")
    );


    setText(
        "analyticsFailedLabel",
        dynamicText("failedCount")
    );
}


/* =========================================================
   TABS
   ========================================================= */

const tabButtons =
    document.querySelectorAll(
        ".class-tab"
    );


const sections =
    document.querySelectorAll(
        ".class-section"
    );


function openSection(sectionName) {

    sections.forEach(
        section => {

            section.classList.add(
                "d-none"
            );
        }
    );


    const selectedSection =
        document.getElementById(
            `section-${sectionName}`
        );


    if (
        selectedSection
    ) {

        selectedSection.classList.remove(
            "d-none"
        );
    }


    tabButtons.forEach(
        button => {

            button.classList.remove(
                "btn-primary"
            );

            button.classList.add(
                "btn-outline-primary"
            );


            if (
                button.dataset.section ===
                sectionName
            ) {

                button.classList.remove(
                    "btn-outline-primary"
                );

                button.classList.add(
                    "btn-primary"
                );
            }
        }
);
}


/* TAB CLICKS */

tabButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            function () {

                const sectionName =
                    button.dataset.section;

                if (
                    sectionName
                ) {

                    openSection(
                        sectionName
                    );
                }
            }
        );
    }
);


/* =========================================================
   DYNAMIC LANGUAGE
   ========================================================= */

function renderDynamicLanguage() {

    const overviewTabButton =
        document.getElementById(
            "overviewTabButton"
        );


    const overviewTitle =
        document.getElementById(
            "overviewTitle"
        );


    const overviewText =
        document.getElementById(
            "overviewText"
        );


    if (overviewTabButton) {

        overviewTabButton.textContent =
            dynamicText("overview");
    }


    if (overviewTitle) {

        overviewTitle.textContent =
            dynamicText("overviewTitle");
    }


    if (overviewText) {

        overviewText.textContent =
            dynamicText("overviewText");
    }


    renderResultsLanguage();

    renderHeader();

    renderStudents();

    renderRequests();

    renderTests();

    renderResults();

    renderAnalytics();

    renderCounters();
}


/* =========================================================
   REFRESH
   ========================================================= */

function refreshData() {

    renderCounters();

    renderStudents();

    renderRequests();

    renderTests();

    renderResults();

    renderAnalytics();

    renderResultsLanguage();
}


/* =========================================================
   START
   ========================================================= */

function initializePage() {

    if (
        !currentClass
        ||
        !currentTeacher.classIds.includes(
            classId
        )
    ) {

        alert(
            dynamicText(
                "noAccess"
            )
        );


        window.location.href =
            "staff-classes.html";

        return;
    }


    renderHeader();

    renderCounters();

    renderStudents();

    renderRequests();

    renderTests();

    renderResultsLanguage();

    renderResults();

    renderAnalytics();


    openSection(
        "overview"
    );
}


window.addEventListener(
    "languageChanged",
    function () {

        renderDynamicLanguage();
    }
);


document.addEventListener(
    "DOMContentLoaded",
    initializePage
);