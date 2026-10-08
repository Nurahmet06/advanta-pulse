/* =========================================================
   ADVANTA PULSE
   STAFF HOME
   Главная страница учителя
   ========================================================= */


/* =========================================================
   CURRENT TEACHER
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

function homeText(key) {

    const language =
        typeof getCurrentLanguage === "function"
            ? getCurrentLanguage()
            : "ru";


    const texts = {

        ru: {
            teacher: "Учитель",
            testFallback: "Тест",
            edit: "Изменить",
            noTests: "Тестов пока нет",
            draft: "Черновик",
            published: "Назначен",
            finished: "Завершён",
            students: "уч.",
            requests: "заявок"
        },

        kz: {
            teacher: "Мұғалім",
            testFallback: "Тест",
            edit: "Өзгерту",
            noTests: "Тесттер әзірге жоқ",
            draft: "Жоба",
            published: "Тағайындалды",
            finished: "Аяқталды",
            students: "оқушы",
            requests: "өтінім"
        },

        en: {
            teacher: "Teacher",
            testFallback: "Test",
            edit: "Edit",
            noTests: "No tests yet",
            draft: "Draft",
            published: "Assigned",
            finished: "Finished",
            students: "students",
            requests: "requests"
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
   DATA
   ========================================================= */

function getTeacherClasses() {

    return getStorageArray(
        "advantaClasses"
    ).filter(
        classItem =>
            currentTeacher.classIds.includes(
                classItem.id
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
            currentTeacher.classIds.includes(
                user.classId
            )
    );
}


function getTeacherRequests() {

    return getStorageArray(
        "advantaJoinRequests"
    ).filter(
        request =>
            request.status === "pending"
            &&
            currentTeacher.classIds.includes(
                request.classId
            )
    );
}


function testBelongsToTeacher(test) {

    if (
        test.classId
        &&
        currentTeacher.classIds.includes(
            test.classId
        )
    ) {

        return true;
    }


    if (
        Array.isArray(test.classIds)
        &&
        test.classIds.some(
            id =>
                currentTeacher.classIds.includes(id)
        )
    ) {

        return true;
    }


    /*
       Совместимость со старыми тестами,
       где мог сохраниться только className.
    */

    if (test.className) {

        const teacherClasses =
            getTeacherClasses();


        return teacherClasses.some(
            classItem =>
                classItem.name ===
                test.className
        );
    }


    return false;
}


function getTeacherTests() {

    return getStorageArray(
        "advantaTests"
    ).filter(
        testBelongsToTeacher
    );
}


/* =========================================================
   RESULTS
   ========================================================= */

function resultBelongsToTeacher(result) {

    /*
       Новые результаты уже содержат classId.
    */

    if (
        result.classId
        &&
        currentTeacher.classIds.includes(
            result.classId
        )
    ) {

        return true;
    }


    /*
       Для старых результатов проверяем ученика.
    */

    const resultStudentId =
        result.studentId
        ||
        result.userId;


    if (resultStudentId) {

        const student =
            getTeacherStudents().find(
                user =>
                    String(user.id) ===
                    String(resultStudentId)
            );


        if (student) {

            return true;
        }
    }


    /*
       Ещё один legacy-вариант:
       определяем класс через testId.
    */

    if (result.testId) {

        const test =
            getTeacherTests().find(
                item =>
                    String(item.id) ===
                    String(result.testId)
            );


        if (test) {

            return true;
        }
    }


    return false;
}


function getTeacherResults() {

    const results =
        getStorageArray(
            "advantaResults"
        ).filter(
            resultBelongsToTeacher
        );


    /*
       Один ученик + один тест = один итоговый результат.

       Если остались старые дубли,
       используем самый свежий результат.
    */

    const uniqueResults =
        new Map();


    results.forEach(
        result => {

            const studentId =
                result.studentId
                ??
                result.userId
                ??
                null;


            const testId =
                result.testId
                ??
                result.testID
                ??
                result.test?.id
                ??
                null;


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
    );
}


function getResultScore(result) {

    const value =
        result.score
        ??
        result.percentage
        ??
        result.percent
        ??
        result.result;


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


/* =========================================================
   HEADER
   ========================================================= */

function renderHeader() {

    const teacherName =
        document.getElementById(
            "teacherName"
        );


    const teacherSubject =
        document.getElementById(
            "teacherSubject"
        );


    if (teacherName) {

        teacherName.textContent =
            currentTeacher.name;
    }


    if (teacherSubject) {

        const subject =
            typeof t === "function"
                ? t(currentTeacher.subjectId)
                : currentTeacher.subjectName;


        teacherSubject.textContent =
            `${homeText("teacher")} • ${subject}`;
    }
}


/* =========================================================
   OVERVIEW COUNTERS
   ========================================================= */

function renderOverview() {

    const tests =
        getTeacherTests();


    const students =
        getTeacherStudents();


    const results =
        getTeacherResults();


    const testsCreatedCount =
        document.getElementById(
            "testsCreatedCount"
        );


    const activeTestsCount =
        document.getElementById(
            "activeTestsCount"
        );


    const studentsCount =
        document.getElementById(
            "studentsCount"
        );


    const averageScore =
        document.getElementById(
            "averageScore"
        );


    if (testsCreatedCount) {

        testsCreatedCount.textContent =
            tests.length;
    }


    if (activeTestsCount) {

        activeTestsCount.textContent =
            tests.filter(
                test =>
                    test.status ===
                    "published"
            ).length;
    }


    if (studentsCount) {

        studentsCount.textContent =
            students.length;
    }


    const scores =
        results
            .map(getResultScore)
            .filter(
                score =>
                    score !== null
            );


    if (!averageScore) {

        return;
    }


    if (scores.length === 0) {

        averageScore.textContent =
            "—";

        averageScore.style.removeProperty(
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


    averageScore.textContent =
        `${average}/100`;


    averageScore.style.setProperty(
        "color",
        getScoreColor(average),
        "important"
    );
}


/* =========================================================
   CLASSES
   ========================================================= */

function renderClasses() {

    const container =
        document.getElementById(
            "homeClassesContainer"
        );


    if (!container) {

        return;
    }


    const classes =
        getTeacherClasses();


    const students =
        getTeacherStudents();


    const requests =
        getTeacherRequests();


    const subjectName =
        typeof t === "function"
            ? t(currentTeacher.subjectId)
            : currentTeacher.subjectName;


    container.innerHTML =
        "";


    classes.forEach(
        classItem => {

            const studentsCount =
                students.filter(
                    student =>
                        student.classId ===
                        classItem.id
                ).length;


            const requestsCount =
                requests.filter(
                    request =>
                        request.classId ===
                        classItem.id
                ).length;


            const column =
                document.createElement(
                    "div"
                );


            column.className =
                "col-md-4";


            column.innerHTML = `

                <a
                    href="staff-class.html?class=${encodeURIComponent(classItem.id)}"
                    class="text-decoration-none text-dark"
                >

                    <div
                        class="border rounded-4 p-4 h-100"
                        style="cursor:pointer;"
                    >

                        <div
                            class="d-flex justify-content-between align-items-start gap-3"
                        >

                            <div>

                                <div
                                    class="overview-icon mb-3"
                                >
                                    <i class="bi bi-people"></i>
                                </div>


                                <h4 class="fw-bold mb-1">
                                    ${classItem.name}
                                </h4>


                                <p class="text-secondary mb-2">
                                    ${subjectName}
                                </p>


                                <div class="small text-secondary">

                                    ${studentsCount}
                                    ${homeText("students")}

                                    •
                                    
                                    ${requestsCount}
                                    ${homeText("requests")}

                                </div>

                            </div>


                            <i
                                class="bi bi-chevron-right text-secondary"
                            ></i>

                        </div>

                    </div>

                </a>
            `;


            container.appendChild(
                column
            );
        }
    );
}


/* =========================================================
   DEADLINE
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
   TEST CLASS
   ========================================================= */

function getTestClassName(test) {

    if (test.className) {

        return test.className;
    }


    if (test.classId) {

        const foundClass =
            getTeacherClasses().find(
                classItem =>
                    classItem.id ===
                    test.classId
            );


        if (foundClass) {

            return foundClass.name;
        }
    }


    return "—";
}


/* =========================================================
   TEST SUBJECT
   ========================================================= */

function getTestSubject(test) {

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
                ${homeText("published")}
            </span>
        `;
    }


    if (
        status === "finished"
    ) {

        return `
            <span class="badge text-bg-success">
                ${homeText("finished")}
            </span>
        `;
    }


    return `
        <span class="badge text-bg-secondary">
            ${homeText("draft")}
        </span>
    `;
}


/* =========================================================
   SORT TESTS
   ========================================================= */

function getTestTimestamp(test) {

    const possibleDates = [
        test.updatedAt,
        test.createdAt,
        test.publishedAt,
        test.deadline
    ];


    for (
        const value
        of possibleDates
    ) {

        if (!value) {

            continue;
        }


        const time =
            new Date(value).getTime();


        if (
            Number.isFinite(time)
        ) {

            return time;
        }
    }


    /*
       У старых тестов ID иногда является timestamp.
    */

    const numericId =
        Number(test.id);


    if (
        Number.isFinite(numericId)
    ) {

        return numericId;
    }


    return 0;
}


/* =========================================================
   RECENT TESTS
   ========================================================= */

function renderRecentTests() {

    const body =
        document.getElementById(
            "recentTestsBody"
        );


    if (!body) {

        return;
    }


    const tests =
        [...getTeacherTests()]
            .sort(
                (a, b) =>
                    getTestTimestamp(b)
                    -
                    getTestTimestamp(a)
            )
            .slice(
                0,
                5
            );


    body.innerHTML =
        "";


    if (
        tests.length === 0
    ) {

        body.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="text-center text-secondary py-4"
                >
                    ${homeText("noTests")}
                </td>

            </tr>
        `;


        return;
    }


    tests.forEach(
        test => {

            const row =
                document.createElement(
                    "tr"
                );


            const testName =
                test.name
                ||
                test.title
                ||
                homeText("testFallback");


            const classId =
                test.classId
                ||
                "";


            let editUrl =
                `create-test.html?id=${encodeURIComponent(test.id)}`;


            if (classId) {

                editUrl +=
                    `&class=${encodeURIComponent(classId)}`;
            }


            row.innerHTML = `

                <td>
                    <strong>
                        ${testName}
                    </strong>
                </td>


                <td>
                    ${getTestSubject(test)}
                </td>


                <td>
                    ${getTestClassName(test)}
                </td>


                <td>
                    ${formatDeadline(test.deadline)}
                </td>


                <td>
                    ${getStatusHTML(test.status)}
                </td>


                <td>

                    <a
                        href="${editUrl}"
                        class="btn btn-sm btn-outline-primary"
                    >

                        <i class="bi bi-pencil me-1"></i>

                        ${homeText("edit")}

                    </a>

                </td>
            `;


            body.appendChild(
                row
            );
        }
    );
}


/* =========================================================
   RENDER EVERYTHING
   ========================================================= */

function renderStaffHome() {

    renderHeader();

    renderOverview();

    renderClasses();

    renderRecentTests();
}


/* =========================================================
   LANGUAGE CHANGE
   ========================================================= */

window.addEventListener(
    "languageChanged",
    function () {

        renderStaffHome();

    }
);


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderStaffHome();

    }
);