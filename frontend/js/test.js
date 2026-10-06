/* =========================================================
   ADVANTA PULSE
   REAL STUDENT TEST
   ========================================================= */


/* =========================================================
   НАХОДИМ ВЫБРАННЫЙ ТЕСТ
   ========================================================= */

const currentTestId =
    localStorage.getItem(
        "currentStudentTestId"
    );


const allTests =
    JSON.parse(
        localStorage.getItem(
            "advantaTests"
        )
    ) || [];


const currentTest =
    allTests.find(
        function (test) {

            return (
                String(test.id)
                ===
                String(currentTestId)
            );

        }
    );


/*
   Если ученик каким-то образом
   открыл test.html без выбранного теста.
*/

if (!currentTest) {

    alert(
        getCurrentLanguage() === "kz"
            ? "Тест табылмады"
            : getCurrentLanguage() === "en"
                ? "Test not found"
                : "Тест не найден"
    );


    window.location.href =
        "student-tasks.html";


    throw new Error(
        "Test not found"
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
        getCurrentLanguage() === "kz"
            ? "Бұл тестте сұрақтар жоқ"
            : getCurrentLanguage() === "en"
                ? "This test has no questions"
                : "В этом тесте нет вопросов"
    );


    window.location.href =
        "student-tasks.html";


    throw new Error(
        "Test has no questions"
    );
}


/* =========================================================
   STATE
   ========================================================= */

let currentQuestionIndex = 0;


/*
   Ответы ученика.

   Пример:

   {
       1: 0,
       2: 3
   }

   где:
   1 = номер вопроса
   0 = выбран вариант A
*/

const studentAnswers = {};


let testSubmitted = false;


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


/* =========================================================
   TEST INFORMATION
   ========================================================= */

function renderTestInformation() {

    /*
       Название предмета переводится
       через общий language.js.
    */

    testSubject.textContent =
        t(currentTest.subject);


    /*
       Название самого теста
       НЕ переводим автоматически.

       Оно остаётся именно таким,
       каким его написал учитель.
    */

    testTitle.textContent =
        currentTest.name;


    testPassingScore.textContent =
        `${currentTest.passingScore}/100`;
}


/* =========================================================
   RENDER QUESTION
   ========================================================= */

function renderQuestion() {

    const question =
        questions[
            currentQuestionIndex
        ];


    const displayNumber =
        currentQuestionIndex + 1;


    /* COUNTER */

    questionCounter.textContent =
        `${t("question")} ${displayNumber} ${t("of")} ${questions.length}`;


    questionNumber.textContent =
        displayNumber;


    /* QUESTION TEXT */

    questionText.textContent =
        question.text;


    /* PROGRESS */

    const progress =
        (
            displayNumber
            /
            questions.length
        )
        * 100;


    progressBar.style.width =
        `${progress}%`;


    /* CLEAR OPTIONS */

    answersContainer.innerHTML =
        "";


    /* OPTIONS */

    question.options.forEach(
        function (optionText, optionIndex) {

            const option =
                document.createElement(
                    "label"
                );


            option.className =
                "answer-option";


            /*
               Если ученик уже отвечал,
               подсвечиваем его выбор.
            */

            if (
                studentAnswers[
                    question.id
                ]
                ===
                optionIndex
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
                        studentAnswers[question.id]
                        ===
                        optionIndex
                            ? "checked"
                            : ""
                    }
                >

                <span
                    class="answer-letter"
                >
                    ${String.fromCharCode(
                        65 + optionIndex
                    )}
                </span>

                <span>
                    ${escapeHtml(optionText)}
                </span>

            `;


            option.addEventListener(
                "click",
                function () {

                    studentAnswers[
                        question.id
                    ] =
                        optionIndex;


                    renderQuestion();

                }
            );


            answersContainer
                .appendChild(
                    option
                );

        }
    );


    /* BACK */

    prevBtn.disabled =
        currentQuestionIndex === 0;


    /* LAST QUESTION */

    if (
        currentQuestionIndex
        ===
        questions.length - 1
    ) {

        nextBtn.classList.add(
            "d-none"
        );


        finishBtn.classList.remove(
            "d-none"
        );

    }

    else {

        nextBtn.classList.remove(
            "d-none"
        );


        finishBtn.classList.add(
            "d-none"
        );

    }
}


/* =========================================================
   SAFE TEXT
   ========================================================= */

function escapeHtml(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        String(value ?? "");


    return div.innerHTML;
}


/* =========================================================
   NEXT
   ========================================================= */

nextBtn.addEventListener(
    "click",
    function () {

        if (
            currentQuestionIndex
            <
            questions.length - 1
        ) {

            currentQuestionIndex++;


            renderQuestion();

        }

    }
);


/* =========================================================
   PREVIOUS
   ========================================================= */

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
   FINISH
   ========================================================= */

finishBtn.addEventListener(
    "click",
    function () {

        const answeredCount =
            Object.keys(
                studentAnswers
            ).length;


        /*
           Пока требуем ответить
           на каждый вопрос.
        */

        if (
            answeredCount
            <
            questions.length
        ) {

            alert(
                t(
                    "testNotAnswered"
                )
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
   CALCULATE RESULT
   ========================================================= */

function calculateScore() {

    let correctCount = 0;


    questions.forEach(
        function (question) {

            const studentAnswer =
                studentAnswers[
                    question.id
                ];


            if (
                studentAnswer
                ===
                question.correctAnswer
            ) {

                correctCount++;

            }

        }
    );


    /*
       Переводим в шкалу 100.
    */

    const score =
        Math.round(
            (
                correctCount
                /
                questions.length
            )
            * 100
        );


    return {
        correctCount:
            correctCount,

        totalQuestions:
            questions.length,

        score:
            score
    };
}


/* =========================================================
   SAVE RESULT
   ========================================================= */

function saveStudentResult(
    result
) {

    const registeredStudent =
        JSON.parse(
            localStorage.getItem(
                "registeredStudent"
            )
        );


    const studentClass =
        localStorage.getItem(
            "studentClass"
        ) || "5А";


    const passingScore =
        Number(
            currentTest.passingScore
        );


    const passed =
        result.score
        >=
        passingScore;


    const resultData = {

        id:
            Date.now(),

        testId:
            currentTest.id,

        testName:
            currentTest.name,

        subject:
            currentTest.subject,

        className:
            studentClass,

        studentFirstName:
            registeredStudent?.firstName
            || "Ученик",

        studentLastName:
            registeredStudent?.lastName
            || "",

        score:
            result.score,

        passingScore:
            passingScore,

        passed:
            passed,

        completedAt:
            new Date().toISOString()

    };


    /*
       Сохраняем результаты отдельно.

       Позже вместо этого
       будет настоящая база данных.
    */

    const savedResults =
        JSON.parse(
            localStorage.getItem(
                "advantaResults"
            )
        ) || [];


    /*
       Пока один ученик
       не должен создавать
       бесконечные копии результата
       одного и того же теста.

       Если уже проходил —
       обновим результат.
    */

    const existingIndex =
        savedResults.findIndex(
            function (savedResult) {

                return (
                    String(
                        savedResult.testId
                    )
                    ===
                    String(
                        currentTest.id
                    )
                    &&
                    savedResult.studentFirstName
                    ===
                    resultData.studentFirstName
                    &&
                    savedResult.studentLastName
                    ===
                    resultData.studentLastName
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

    }

    else {

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
       Пока оставляем и это,
       чтобы текущая страница
       test-completed.html
       уже могла показать балл.
    */

    localStorage.setItem(
        "demoLastScore",
        result.score
    );


    localStorage.setItem(
        "lastCompletedTestId",
        currentTest.id
    );
}


/* =========================================================
   SUBMIT
   ========================================================= */

function submitTest() {

    if (testSubmitted) {
        return;
    }


    testSubmitted = true;


    const result =
        calculateScore();


    saveStudentResult(
        result
    );


    window.location.href =
        "test-completed.html";
}


/* =========================================================
   CONFIRM SUBMIT
   ========================================================= */

confirmFinishBtn.addEventListener(
    "click",
    function () {

        submitTest();

    }
);


/* =========================================================
   TIMER
   ========================================================= */


/*
   Пока фиксировано 20 минут.

   Потом добавим учителю отдельное поле:
   "Время на тест".
*/

let remainingSeconds =
    20 * 60;


function updateTimer() {

    const minutes =
        Math.floor(
            remainingSeconds
            /
            60
        );


    const seconds =
        remainingSeconds
        %
        60;


    document
        .getElementById(
            "timer"
        )
        .textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


    /*
       Если время вышло —
       тест отправляется автоматически.

       Неотвеченные вопросы
       считаются неправильными.
    */

    if (
        remainingSeconds <= 0
    ) {

        clearInterval(
            timerInterval
        );


        submitTest();


        return;
    }


    remainingSeconds--;
}


const timerInterval =
    setInterval(
        updateTimer,
        1000
    );


updateTimer();


/* =========================================================
   LANGUAGE CHANGE
   ========================================================= */

window.addEventListener(
    "languageChanged",
    function () {

        /*
           Переводим только интерфейс
           и название предмета.

           Вопросы учителя
           НЕ переводим автоматически.
        */

        renderTestInformation();

        renderQuestion();

    }
);


/* =========================================================
   START
   ========================================================= */

renderTestInformation();

renderQuestion();