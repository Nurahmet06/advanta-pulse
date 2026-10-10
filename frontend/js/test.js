/* =========================================================
   ADVANTA PULSE
   STUDENT TEST
   ========================================================= */


/* =========================================================
   STORAGE HELPERS
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


    const texts = window.AdvantaI18n.scope("test");


    return (
        texts[language]?.[key]
        ||
        texts.ru[key]
        ||
        key
    );
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


if (!currentStudent) {

    window.location.href =
        "index.html";

    throw new Error(
        "Student session not found"
    );
}


/* =========================================================
   TEST ID
   ========================================================= */

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const currentTestId =
    urlParams.get("id")
    ||
    localStorage.getItem(
        "currentStudentTestId"
    );


/* =========================================================
   TEST
   ========================================================= */

const allTests =
    getStorageArray(
        "advantaTests"
    );


const currentTest =
    allTests.find(
        test =>
            String(test.id) ===
            String(currentTestId)
    );


if (!currentTest) {

    alert(
        uiText("testNotFound")
    );


    window.location.href =
        "student-tasks.html";


    throw new Error(
        "Test not found"
    );
}


/* =========================================================
   SECURITY — CLASS
   ========================================================= */

function testBelongsToStudentClass() {

    if (
        currentTest.classId
    ) {

        return (
            String(currentTest.classId) ===
            String(currentStudent.classId)
        );
    }


    if (
        currentTest.className &&
        currentStudent.className
    ) {

        return (
            currentTest.className ===
            currentStudent.className
        );
    }


    if (
        Array.isArray(
            currentTest.classIds
        )
    ) {

        return currentTest.classIds.some(
            classId =>
                String(classId) ===
                String(currentStudent.classId)
        );
    }


    return false;
}


if (
    !testBelongsToStudentClass()
) {

    alert(
        uiText("accessDenied")
    );


    window.location.href =
        "student-tasks.html";


    throw new Error(
        "Wrong class"
    );
}


/* =========================================================
   PUBLISHED
   ========================================================= */

if (
    currentTest.status !== "published"
) {

    alert(
        uiText("testUnavailable")
    );


    window.location.href =
        "student-tasks.html";


    throw new Error(
        "Test is not published"
    );
}


/* =========================================================
   QUESTIONS
   ========================================================= */

const questions =
    Array.isArray(
        currentTest.questions
    )
        ? currentTest.questions
        : [];


if (
    questions.length === 0
) {

    alert(
        uiText("noQuestions")
    );


    window.location.href =
        "student-tasks.html";


    throw new Error(
        "No questions"
    );
}


/* =========================================================
   RESULT CHECK
   ========================================================= */

function getStudentResults() {

    return getStorageArray(
        "advantaResults"
    );
}


function alreadyCompleted() {

    const results =
        getStudentResults();


    return results.some(
        result => {

            const sameTest =
                String(result.testId) ===
                String(currentTest.id);


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


/*
   Если тест уже реально пройден,
   повторно его не запускаем.
*/

if (
    alreadyCompleted()
) {

    alert(
        uiText("alreadyCompleted")
    );


    window.location.href =
        "student-results.html";


    throw new Error(
        "Test already completed"
    );
}


/* =========================================================
   STATE
   ========================================================= */

let currentQuestionIndex = 0;

let testSubmitted = false;

let timerInterval = null;


/*
   Ответы храним ещё и в localStorage,
   чтобы F5 не уничтожил ответы.
*/

const answersStorageKey =
    `advantaTestAnswers_${currentStudent.id}_${currentTest.id}`;


const savedAnswers =
    getStorageObject(
        answersStorageKey
    );


const studentAnswers =
    savedAnswers
        ? { ...savedAnswers }
        : {};


/* =========================================================
   ELEMENTS
   ========================================================= */

const testSubject =
    document.getElementById(
        "testSubject"
    );


const testTitle =
    document.getElementById(
        "testTitle"
    );


const testPassingScore =
    document.getElementById(
        "testPassingScore"
    );


const questionCounter =
    document.getElementById(
        "questionCounter"
    );


const questionNumber =
    document.getElementById(
        "questionNumber"
    );


const questionText =
    document.getElementById(
        "questionText"
    );


const answersContainer =
    document.getElementById(
        "answersContainer"
    );


const progressBar =
    document.getElementById(
        "progressBar"
    );


const prevBtn =
    document.getElementById(
        "prevBtn"
    );


const nextBtn =
    document.getElementById(
        "nextBtn"
    );


const finishBtn =
    document.getElementById(
        "finishBtn"
    );


const confirmFinishBtn =
    document.getElementById(
        "confirmFinishBtn"
    );


const timer =
    document.getElementById(
        "timer"
    );


const timerBox =
    document.getElementById(
        "timerBox"
    );


/* =========================================================
   SUBJECT
   ========================================================= */

function getSubjectName() {

    const subject =
        currentTest.subject
        ||
        currentTest.subjectId;


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
        currentTest.subjectName
        ||
        subject
        ||
        uiText("mathematics")
    );
}


/* =========================================================
   TEST INFO
   ========================================================= */

function renderTestInformation() {

    testSubject.textContent =
        getSubjectName();


    testTitle.textContent =
        currentTest.name
        ||
        currentTest.title
        ||
        "Test";


    testPassingScore.textContent =
        `${
            Number(
                currentTest.passingScore
                ??
                60
            )
        }/100`;
}


/* =========================================================
   SAFE HTML
   ========================================================= */

function escapeHtml(value) {

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
   QUESTION ID
   ========================================================= */

function getQuestionKey(
    question,
    index
) {

    if (
        question.id !== undefined &&
        question.id !== null
    ) {

        return String(
            question.id
        );
    }


    return String(index);
}


/* =========================================================
   RENDER QUESTION
   ========================================================= */

function renderQuestion() {

    const question =
        questions[
            currentQuestionIndex
        ];


    const questionKey =
        getQuestionKey(
            question,
            currentQuestionIndex
        );


    const displayNumber =
        currentQuestionIndex + 1;


    questionCounter.textContent =
        `${uiText("question")} ${displayNumber} ${uiText("of")} ${questions.length}`;


    questionNumber.textContent =
        displayNumber;


    questionText.textContent =
        question.text
        ||
        question.question
        ||
        "";


    const progress =
        (
            displayNumber /
            questions.length
        )
        * 100;


    progressBar.style.width =
        `${progress}%`;


    answersContainer.innerHTML =
        "";


    const options =
        Array.isArray(
            question.options
        )
            ? question.options
            : [];


    options.forEach(
        (optionText, optionIndex) => {

            const option =
                document.createElement(
                    "label"
                );


            option.className =
                "answer-option";


            const selectedAnswer =
                Number(
                    studentAnswers[
                        questionKey
                    ]
                );


            if (
                studentAnswers[
                    questionKey
                ] !== undefined &&
                selectedAnswer === optionIndex
            ) {

                option.classList.add(
                    "selected"
                );
            }


            option.innerHTML = `

                <input
                    type="radio"
                    name="studentAnswer"
                    value="${optionIndex}"
                    ${
                        studentAnswers[
                            questionKey
                        ] !== undefined &&
                        selectedAnswer === optionIndex
                            ? "checked"
                            : ""
                    }
                >

                <span class="answer-letter">

                    ${String.fromCharCode(
                        65 + optionIndex
                    )}

                </span>

                <span>

                    ${escapeHtml(
                        optionText
                    )}

                </span>
            `;


            option.addEventListener(
                "click",
                function () {

                    studentAnswers[
                        questionKey
                    ] =
                        optionIndex;


                    localStorage.setItem(
                        answersStorageKey,
                        JSON.stringify(
                            studentAnswers
                        )
                    );


                    renderQuestion();
                }
            );


            answersContainer.appendChild(
                option
            );
        }
    );


    prevBtn.disabled =
        currentQuestionIndex === 0;


    if (
        currentQuestionIndex ===
        questions.length - 1
    ) {

        nextBtn.classList.add(
            "d-none"
        );


        finishBtn.classList.remove(
            "d-none"
        );

    } else {

        nextBtn.classList.remove(
            "d-none"
        );


        finishBtn.classList.add(
            "d-none"
        );
    }
}


/* =========================================================
   NAVIGATION
   ========================================================= */

nextBtn.addEventListener(
    "click",
    function () {

        if (
            currentQuestionIndex <
            questions.length - 1
        ) {

            currentQuestionIndex++;

            renderQuestion();
        }
    }
);


prevBtn.addEventListener(
    "click",
    function () {

        if (
            currentQuestionIndex > 0
        ) {

            currentQuestionIndex--;

            renderQuestion();
        }
    }
);


/* =========================================================
   FINISH BUTTON
   ========================================================= */

finishBtn.addEventListener(
    "click",
    function () {

        const answeredCount =
            Object.keys(
                studentAnswers
            ).length;


        if (
            answeredCount <
            questions.length
        ) {

            alert(
                uiText("answerAll")
            );

            return;
        }


        const modal =
            new bootstrap.Modal(
                document.getElementById(
                    "finishModal"
                )
            );


        modal.show();
    }
);


/* =========================================================
   CORRECT ANSWER NORMALIZATION
   ========================================================= */

function getCorrectAnswerIndex(
    question
) {

    const value =
        question.correctAnswer;


    /*
      Normal current format:
      0,1,2,3
    */

    if (
        Number.isInteger(value)
    ) {

        return value;
    }


    /*
      Support numeric string.
    */

    if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        !Number.isNaN(Number(value))
    ) {

        return Number(value);
    }


    /*
      Support A/B/C/D.
    */

    if (
        typeof value === "string"
    ) {

        const letter =
            value
                .trim()
                .toUpperCase();


        const index =
            ["A", "B", "C", "D"]
                .indexOf(letter);


        if (
            index !== -1
        ) {

            return index;
        }
    }


    return -1;
}


/* =========================================================
   CALCULATE SCORE
   ========================================================= */

function calculateScore() {

    let correctCount = 0;


    questions.forEach(
        (question, index) => {

            const questionKey =
                getQuestionKey(
                    question,
                    index
                );


            const studentAnswer =
                Number(
                    studentAnswers[
                        questionKey
                    ]
                );


            const correctAnswer =
                getCorrectAnswerIndex(
                    question
                );


            if (
                studentAnswers[
                    questionKey
                ] !== undefined &&
                studentAnswer === correctAnswer
            ) {

                correctCount++;
            }
        }
    );


    const score =
        Math.round(
            (
                correctCount /
                questions.length
            )
            * 100
        );


    return {

        correctCount,

        totalQuestions:
            questions.length,

        score
    };
}


/* =========================================================
   SAVE RESULT
   ========================================================= */

function saveStudentResult(
    calculatedResult,
    autoSubmitted = false
) {

    const passingScore =
        Number(
            currentTest.passingScore
            ??
            60
        );


    const passed =
        calculatedResult.score >=
        passingScore;


    const resultData = {

        id:
            `result_${Date.now()}`,

        testId:
            currentTest.id,

        testName:
            currentTest.name
            ||
            currentTest.title
            ||
            "Test",

        subject:
            currentTest.subject
            ||
            currentTest.subjectId
            ||
            "math",

        classId:
            currentStudent.classId
            ||
            currentTest.classId
            ||
            null,

        className:
            currentStudent.className
            ||
            currentTest.className
            ||
            "",


        /* IMPORTANT */

        studentId:
            currentStudent.id,

        userId:
            currentStudent.id,

        studentFirstName:
            currentStudent.firstName
            ||
            "",

        studentLastName:
            currentStudent.lastName
            ||
            "",


        score:
            calculatedResult.score,

        correctCount:
            calculatedResult.correctCount,

        totalQuestions:
            calculatedResult.totalQuestions,

        passingScore,

        passed,

        autoSubmitted,

        completedAt:
            new Date().toISOString()
    };


    const savedResults =
        getStorageArray(
            "advantaResults"
        );


    /*
      One result per student + test.
    */

    const existingIndex =
        savedResults.findIndex(
            savedResult => {

                return (
                    String(
                        savedResult.testId
                    )
                    ===
                    String(
                        currentTest.id
                    )
                    &&
                    (
                        String(
                            savedResult.studentId
                            ||
                            savedResult.userId
                        )
                        ===
                        String(
                            currentStudent.id
                        )
                    )
                );
            }
        );


    if (
        existingIndex !== -1
    ) {

        savedResults[
            existingIndex
        ] =
            resultData;

    } else {

        savedResults.push(
            resultData
        );
    }


    localStorage.setItem(
        "advantaResults",
        JSON.stringify(
            savedResults
        )
    );


    /*
      Last result for completed page.
    */

    localStorage.setItem(
        "advantaLastResult",
        JSON.stringify(
            resultData
        )
    );


    /*
      Compatibility with old completed page.
    */

    localStorage.setItem(
        "demoLastScore",
        String(
            calculatedResult.score
        )
    );


    localStorage.setItem(
        "lastCompletedTestId",
        String(
            currentTest.id
        )
    );


    /*
      Clear temporary progress.
    */

    localStorage.removeItem(
        answersStorageKey
    );


    localStorage.removeItem(
        getTimerStorageKey()
    );


    localStorage.removeItem(
        "currentStudentTestId"
    );


    return resultData;
}


/* =========================================================
   SUBMIT
   ========================================================= */

function submitTest(
    autoSubmitted = false
) {

    if (
        testSubmitted
    ) {

        return;
    }


    testSubmitted = true;


    if (
        timerInterval
    ) {

        clearInterval(
            timerInterval
        );
    }


    const calculatedResult =
        calculateScore();


    saveStudentResult(
        calculatedResult,
        autoSubmitted
    );


    window.location.href =
        "test-completed.html";
}


/* =========================================================
   CONFIRM FINISH
   ========================================================= */

confirmFinishBtn.addEventListener(
    "click",
    function () {

        submitTest(false);
    }
);


/* =========================================================
   TIMER
   ========================================================= */

function getTimerStorageKey() {

    return (
        `advantaTestStarted_${currentStudent.id}_${currentTest.id}`
    );
}


/*
   IMPORTANT:
   We now use the time set by the teacher.
*/

function getTimeLimitMinutes() {

    const value =
        currentTest.timeLimit;


    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return null;
    }


    const minutes =
        Number(value);


    if (
        !Number.isFinite(minutes) ||
        minutes <= 0
    ) {

        return null;
    }


    return minutes;
}


function formatTimer(
    totalSeconds
) {

    const safeSeconds =
        Math.max(
            0,
            Math.floor(
                totalSeconds
            )
        );


    const minutes =
        Math.floor(
            safeSeconds / 60
        );


    const seconds =
        safeSeconds % 60;


    return (
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`
    );
}


function startTimer() {

    const timeLimitMinutes =
        getTimeLimitMinutes();


    /*
      Unlimited test.
    */

    if (
        timeLimitMinutes === null
    ) {

        timerBox.classList.add(
            "d-none"
        );

        return;
    }


    timerBox.classList.remove(
        "d-none"
    );


    const timerStorageKey =
        getTimerStorageKey();


    let startedAt =
        Number(
            localStorage.getItem(
                timerStorageKey
            )
        );


    /*
      First opening of this test.
    */

    if (
        !Number.isFinite(startedAt) ||
        startedAt <= 0
    ) {

        startedAt =
            Date.now();


        localStorage.setItem(
            timerStorageKey,
            String(startedAt)
        );
    }


    const totalMilliseconds =
        timeLimitMinutes
        *
        60
        *
        1000;


    function tick() {

        if (
            testSubmitted
        ) {

            return;
        }


        const elapsed =
            Date.now() -
            startedAt;


        const remainingMilliseconds =
            totalMilliseconds -
            elapsed;


        const remainingSeconds =
            Math.max(
                0,
                Math.ceil(
                    remainingMilliseconds /
                    1000
                )
            );


        timer.textContent =
            formatTimer(
                remainingSeconds
            );


        /*
          Last minute warning.
        */

        if (
            remainingSeconds <= 60
        ) {

            timerBox.style.background =
                "rgba(220, 53, 69, 0.95)";

            timerBox.style.color =
                "#ffffff";
        }


        /*
          Time expired.
        */

        if (
            remainingMilliseconds <= 0
        ) {

            if (
                timerInterval
            ) {

                clearInterval(
                    timerInterval
                );
            }


            timer.textContent =
                "00:00";


            submitTest(true);
        }
    }


    tick();


    timerInterval =
        setInterval(
            tick,
            250
        );
}


/* =========================================================
   LANGUAGE CHANGE
   ========================================================= */

window.addEventListener(
    "languageChanged",
    function () {

        renderTestInformation();

        renderQuestion();
    }
);


/* =========================================================
   START
   ========================================================= */

renderTestInformation();

renderQuestion();

startTimer();