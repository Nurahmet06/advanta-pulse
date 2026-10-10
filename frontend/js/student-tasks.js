/* =========================================================
   ADVANTA PULSE
   STUDENT ASSIGNMENTS
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

if (!currentStudent) {

    window.location.href =
        "index.html";
}


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


    const texts = window.AdvantaI18n.scope("student-tasks");


    return (
        texts[language]?.[key]
        ||
        texts.ru[key]
        ||
        key
    );
}


/* =========================================================
   STUDENT INFO
   ========================================================= */

function renderStudentInfo() {

    if (!currentStudent) {
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


    document.getElementById(
        "assignedTestsText"
    ).textContent =
        uiText("assigned");
}


/* =========================================================
   CLASS FILTER
   ========================================================= */

function testBelongsToCurrentClass(test) {

    if (
        !test ||
        !currentStudent
    ) {

        return false;
    }


    /*
      NEW TESTS:
      exact classId.
    */

    if (test.classId) {

        return (
            String(test.classId) ===
            String(currentStudent.classId)
        );
    }


    /*
      LEGACY TEST SUPPORT:
      old tests may only contain className.
    */

    if (
        test.className &&
        currentStudent.className
    ) {

        return (
            test.className ===
            currentStudent.className
        );
    }


    /*
      Support older classIds array.
    */

    if (
        Array.isArray(test.classIds)
    ) {

        return test.classIds.some(
            id =>
                String(id) ===
                String(currentStudent.classId)
        );
    }


    return false;
}


/* =========================================================
   COMPLETED TEST
   ========================================================= */

function hasStudentCompletedTest(
    testId
) {

    const storageKeys = [

        "advantaResults",

        "advantaTestResults",

        "studentResults"

    ];


    return storageKeys.some(
        key => {

            const results =
                getStorageArray(key);


            return results.some(
                result => {

                    const sameTest =
                        String(result.testId) ===
                        String(testId);


                    const sameStudent =
                        (
                            result.studentId &&
                            String(result.studentId) ===
                            String(currentStudent.id)
                        )
                        ||
                        (
                            result.userId &&
                            String(result.userId) ===
                            String(currentStudent.id)
                        );


                    return (
                        sameTest &&
                        sameStudent
                    );
                }
            );
        }
    );
}


/* =========================================================
   DEADLINE
   ========================================================= */

function isExpired(test) {

    if (!test.deadline) {

        return false;
    }


    const deadline =
        new Date(
            test.deadline
        );


    if (
        Number.isNaN(
            deadline.getTime()
        )
    ) {

        return false;
    }


    return (
        deadline.getTime() <
        Date.now()
    );
}


function formatStudentDeadline(value) {

    if (!value) {

        return uiText(
            "noDeadline"
        );
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


    return date.toLocaleString(
        getLanguage() === "kz"
            ? "kk-KZ"
            : getLanguage() === "en"
                ? "en-US"
                : "ru-RU",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


/* =========================================================
   SUBJECT
   ========================================================= */

function getSubjectName(test) {

    const subject =
        test.subject
        ||
        test.subjectId;


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
        test.subjectName
        ||
        subject
        ||
        uiText("mathematics")
    );
}


function getSubjectIcon(subject) {

    if (subject === "math") {
        return "bi-calculator";
    }

    if (
        subject === "english" ||
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
   SAFE TEXT
   ========================================================= */

function escapeTaskText(value) {

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
   GET ASSIGNED TESTS
   ========================================================= */

function getAssignedTests() {

    const allTests =
        getStorageArray(
            "advantaTests"
        );


    return allTests.filter(
        test => {

            /*
              1. Must be published.
            */

            if (
                test.status !== "published"
            ) {

                return false;
            }


            /*
              2. Must belong to THIS student's class.
            */

            if (
                !testBelongsToCurrentClass(test)
            ) {

                return false;
            }


            /*
              3. Expired tests are not active.
            */

            if (
                isExpired(test)
            ) {

                return false;
            }


            /*
              4. Already completed test disappears
              from active assignments.
            */

            if (
                hasStudentCompletedTest(
                    test.id
                )
            ) {

                return false;
            }


            return true;
        }
    );
}


/* =========================================================
   EMPTY
   ========================================================= */

function renderNoTasksText() {

    noTasksTitle.textContent =
        uiText("noTasks");


    noTasksText.textContent =
        uiText("noTasksText");
}


/* =========================================================
   RENDER TASKS
   ========================================================= */

function renderStudentTasks() {

    if (!currentStudent) {

        return;
    }


    const assignedTests =
        getAssignedTests();


    studentTasksContainer.innerHTML =
        "";


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


    assignedTests.forEach(
        test => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "assignment-card";


            const subject =
                test.subject
                ||
                test.subjectId
                ||
                "math";


            const testName =
                test.name
                ||
                test.title
                ||
                "Test";


            const questionCount =
                Array.isArray(
                    test.questions
                )
                    ? test.questions.length
                    : 0;


            const passingScore =
                Number(
                    test.passingScore
                    ??
                    test.threshold
                    ??
                    60
                );


            const timeText =
                test.timeLimit
                    ? `${test.timeLimit} ${uiText("minutes")}`
                    : uiText("unlimited");


            card.innerHTML = `

                <div class="assignment-info">

                    <div class="subject-icon">

                        <i
                            class="bi ${getSubjectIcon(subject)}"
                        ></i>

                    </div>


                    <div>

                        <span class="subject-label">

                            ${escapeTaskText(
                                getSubjectName(test)
                            )}

                        </span>


                        <h4>

                            ${escapeTaskText(
                                testName
                            )}

                        </h4>


                        <div class="assignment-meta">

                            <span>

                                <i class="bi bi-calendar-event"></i>

                                ${escapeTaskText(
                                    uiText("deadline")
                                )}:

                                ${escapeTaskText(
                                    formatStudentDeadline(
                                        test.deadline
                                    )
                                )}

                            </span>


                            <span>

                                <i class="bi bi-check-circle"></i>

                                ${escapeTaskText(
                                    uiText("threshold")
                                )}:

                                ${passingScore}/100

                            </span>


                            <span>

                                <i class="bi bi-question-circle"></i>

                                ${questionCount}

                                ${escapeTaskText(
                                    uiText("questions")
                                )}

                            </span>


                            <span>

                                <i class="bi bi-clock"></i>

                                ${escapeTaskText(
                                    uiText("time")
                                )}:

                                ${escapeTaskText(
                                    timeText
                                )}

                            </span>

                        </div>

                    </div>

                </div>


                <button
                    type="button"
                    class="btn btn-primary start-test-btn"
                    data-id="${escapeTaskText(test.id)}"
                >

                    ${escapeTaskText(
                        uiText("start")
                    )}

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
   START TEST
   ========================================================= */

function addStartTestEvents() {

    document
        .querySelectorAll(
            ".start-test-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        const testId =
                            this.dataset.id;


                        /*
                          Keep old key for compatibility
                          with the current test page.
                        */

                        localStorage.setItem(
                            "currentStudentTestId",
                            testId
                        );


                        /*
                          Also pass test ID in URL.
                          This is cleaner for the new version.
                        */

                        window.location.href =
                            `test.html?id=${encodeURIComponent(testId)}`;
                    }
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

        renderStudentTasks();
    }
);


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderStudentInfo();

        renderStudentTasks();
    }
);