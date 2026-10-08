/* =========================================================
   ADVANTA PULSE
   CREATE / EDIT TEST
   ========================================================= */


const currentTeacher = {

    id: "teacher_math_1",

    name: "Айгуль Сериковна",

    subjectId: "math",

    subjectName: "Математика"

};


/* =========================================================
   ELEMENTS
   ========================================================= */

const createTestForm =
    document.getElementById("createTestForm");

const testNameInput =
    document.getElementById("testName");

const subjectDisplay =
    document.getElementById("subjectDisplay");

const classDisplay =
    document.getElementById("classDisplay");

const deadlineInput =
    document.getElementById("deadline");

const passingScoreInput =
    document.getElementById("passingScore");

const questionsContainer =
    document.getElementById("questionsContainer");

const addQuestionBtn =
    document.getElementById("addQuestionBtn");

const saveTestBtn =
    document.getElementById("saveTestBtn");

const backToClass =
    document.getElementById("backToClass");

const cancelButton =
    document.getElementById("cancelButton");

const timeUnlimited =
    document.getElementById("timeUnlimited");

const timeLimited =
    document.getElementById("timeLimited");

const timeLimitWrapper =
    document.getElementById("timeLimitWrapper");

const timeLimitMinutes =
    document.getElementById("timeLimitMinutes");


/* =========================================================
   URL
   ========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );


const testId =
    params.get("id");


let classId =
    params.get("class");


let editingTest =
    null;


let currentClass =
    null;


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
   TEST RESULTS CHECK
   ========================================================= */

function testHasResults(id) {

    if (!id) {
        return false;
    }

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
                String(id)
            );
        }
    );
}


/* =========================================================
   TRANSLATIONS FOR DYNAMIC CONTENT
   ========================================================= */

function text(key) {

    const language =
        typeof getCurrentLanguage === "function"
            ? getCurrentLanguage()
            : "ru";


    const texts = {

        ru: {

            createTitle:
                "Создать тест",

            editTitle:
                "Изменить тест",

            classSubtitle:
                "Класс",

            settings:
                "Настройки теста",

            timeSettings:
                "Время прохождения",

            unlimited:
                "Без ограничения по времени",

            limited:
                "Ограничить время",

            timeLimit:
                "Время на прохождение",

            minutes:
                "мин.",

            timeHint:
                "От 1 до 300 минут",

            questions:
                "Вопросы",

            questionsHint:
                "Добавьте вопросы и отметьте правильный ответ",

            addQuestion:
                "Добавить вопрос",

            question:
                "Вопрос",

            answerA:
                "Вариант A",

            answerB:
                "Вариант B",

            answerC:
                "Вариант C",

            answerD:
                "Вариант D",

            correctAnswer:
                "Правильный ответ",

            deleteQuestion:
                "Удалить вопрос",

            saveTest:
                "Сохранить тест",

            saveChanges:
                "Сохранить изменения",

            back:
                "Назад в класс",

            classError:
                "Класс не найден. Откройте создание теста из кабинета нужного класса.",

            lastQuestion:
                "В тесте должен остаться хотя бы один вопрос.",

            fillQuestions:
                "Заполните все вопросы и варианты ответов.",

            chooseCorrect:
                "Для каждого вопроса отметьте правильный ответ.",

            invalidTime:
                "Укажите время от 1 до 300 минут.",
            invalidPassingScore:
                "Укажите проходной балл от 0 до 100.",

            editBlocked:
                "Этот тест уже проходили ученики. Изменять его нельзя, чтобы сохранить историю результатов. Создайте новый тест.",

            saved:
                "Тест сохранён."

        },


        kz: {

            createTitle:
                "Тест құру",

            editTitle:
                "Тестті өзгерту",

            classSubtitle:
                "Сынып",

            settings:
                "Тест параметрлері",

            timeSettings:
                "Орындау уақыты",

            unlimited:
                "Уақыт шектеусіз",

            limited:
                "Уақытты шектеу",

            timeLimit:
                "Тестті орындау уақыты",

            minutes:
                "мин.",

            timeHint:
                "1-ден 300 минутқа дейін",

            questions:
                "Сұрақтар",

            questionsHint:
                "Сұрақтарды қосып, дұрыс жауапты белгілеңіз",

            addQuestion:
                "Сұрақ қосу",

            question:
                "Сұрақ",

            answerA:
                "A нұсқасы",

            answerB:
                "B нұсқасы",

            answerC:
                "C нұсқасы",

            answerD:
                "D нұсқасы",

            correctAnswer:
                "Дұрыс жауап",

            deleteQuestion:
                "Сұрақты жою",

            saveTest:
                "Тестті сақтау",

            saveChanges:
                "Өзгерістерді сақтау",

            back:
                "Сыныпқа қайту",

            classError:
                "Сынып табылмады. Тестті қажетті сыныптың кабинетінен ашыңыз.",

            lastQuestion:
                "Тестте кемінде бір сұрақ қалуы керек.",

            fillQuestions:
                "Барлық сұрақтар мен жауап нұсқаларын толтырыңыз.",

            chooseCorrect:
                "Әр сұрақ үшін дұрыс жауапты белгілеңіз.",

            invalidTime:
                "1-ден 300 минутқа дейінгі уақытты көрсетіңіз.",
            invalidPassingScore:
                "0-ден 100-ге дейінгі өту балын көрсетіңіз.",

            editBlocked:
                "Бұл тестті оқушылар өтіп қойған. Нәтижелер тарихын сақтау үшін оны өзгертуге болмайды. Жаңа тест құрыңыз.",
            saved:
                "Тест сақталды."

        },


        en: {

            createTitle:
                "Create Test",

            editTitle:
                "Edit Test",

            classSubtitle:
                "Class",

            settings:
                "Test settings",

            timeSettings:
                "Time limit",

            unlimited:
                "No time limit",

            limited:
                "Limit test time",

            timeLimit:
                "Time allowed",

            minutes:
                "min.",

            timeHint:
                "From 1 to 300 minutes",

            questions:
                "Questions",

            questionsHint:
                "Add questions and select the correct answer",

            addQuestion:
                "Add question",

            question:
                "Question",

            answerA:
                "Option A",

            answerB:
                "Option B",

            answerC:
                "Option C",

            answerD:
                "Option D",

            correctAnswer:
                "Correct answer",

            deleteQuestion:
                "Delete question",

            saveTest:
                "Save test",

            saveChanges:
                "Save changes",

            back:
                "Back to class",

            classError:
                "Class not found. Open test creation from the required class dashboard.",

            lastQuestion:
                "A test must contain at least one question.",

            fillQuestions:
                "Complete all questions and answer options.",

            chooseCorrect:
                "Select the correct answer for every question.",

            invalidTime:
                "Enter a time from 1 to 300 minutes.",
            invalidPassingScore:
                "Enter a passing score from 0 to 100.",

            editBlocked:
                "Students have already completed this test. It cannot be edited because the result history must be preserved. Create a new test instead.",

            saved:
                "Test saved."
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
   IDS
   ========================================================= */

function createId(prefix) {

    return `${prefix}_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 8)}`;
}


/* =========================================================
   CLASS
   ========================================================= */

function resolveClass() {

    const classes =
        getStorageArray(
            "advantaClasses"
        );


    /*
      EDIT:
      если class в URL отсутствует,
      пробуем взять его из самого теста.
    */

    if (
        testId
        &&
        !classId
    ) {

        const tests =
            getStorageArray(
                "advantaTests"
            );


        editingTest =
            tests.find(
                test =>
                    String(test.id) ===
                    String(testId)
            );


        if (
            editingTest
        ) {

            if (
                editingTest.classId
            ) {

                classId =
                    editingTest.classId;
            }

            else if (
                editingTest.className
            ) {

                const found =
                    classes.find(
                        classItem =>
                            classItem.name ===
                            editingTest.className
                    );


                if (
                    found
                ) {

                    classId =
                        found.id;
                }
            }
        }
    }


    currentClass =
        classes.find(
            classItem =>
                classItem.id === classId
        );


    if (
        !currentClass
    ) {

        alert(
            text("classError")
        );


        window.location.href =
            "staff-classes.html";


        return false;
    }


    return true;
}


/* =========================================================
   TIME
   ========================================================= */

function updateTimeLimitVisibility() {

    if (
        timeLimited.checked
    ) {

        timeLimitWrapper.classList.remove(
            "d-none"
        );

    } else {

        timeLimitWrapper.classList.add(
            "d-none"
        );
    }
}


timeUnlimited.addEventListener(
    "change",
    updateTimeLimitVisibility
);


timeLimited.addEventListener(
    "change",
    updateTimeLimitVisibility
);


/* =========================================================
   QUESTION HTML
   ========================================================= */

function createQuestionCard(
    questionData = null
) {

    const questionId =
        questionData?.id
        ||
        createId("question");


    const card =
        document.createElement(
            "div"
        );


    card.className =
        "border rounded-4 p-4 mb-4 question-card";


    card.dataset.questionId =
        questionId;


    const options =
        Array.isArray(
            questionData?.options
        )
            ? questionData.options
            : ["", "", "", ""];


    const correctAnswer =
        questionData?.correctAnswer
        ?? null;


    card.innerHTML = `

        <div
            class="d-flex justify-content-between align-items-center mb-3"
        >

            <h5
                class="fw-bold mb-0 question-number"
            >
            </h5>


            <button
                type="button"
                class="btn btn-sm btn-outline-danger delete-question-btn"
            >
                <i class="bi bi-trash me-1"></i>

                <span class="delete-question-text">
                    ${text("deleteQuestion")}
                </span>
            </button>

        </div>


        <div class="mb-4">

            <label class="form-label question-label">
                ${text("question")}
            </label>

            <input
                type="text"
                class="form-control question-text"
                value="${escapeHTML(questionData?.text || "")}"
                required
            >

        </div>


        <div class="row g-3">


            ${createOptionHTML(
                questionId,
                0,
                "A",
                options[0] || "",
                correctAnswer
            )}


            ${createOptionHTML(
                questionId,
                1,
                "B",
                options[1] || "",
                correctAnswer
            )}


            ${createOptionHTML(
                questionId,
                2,
                "C",
                options[2] || "",
                correctAnswer
            )}


            ${createOptionHTML(
                questionId,
                3,
                "D",
                options[3] || "",
                correctAnswer
            )}

        </div>


        <div
            class="form-text mt-3 correct-answer-hint"
        >
            ${text("correctAnswer")}
        </div>
    `;


    card
        .querySelector(
            ".delete-question-btn"
        )
        .addEventListener(
            "click",
            function () {

                deleteQuestion(
                    card
                );
            }
        );


    questionsContainer.appendChild(
        card
    );


    renumberQuestions();
}


/* =========================================================
   OPTION HTML
   ========================================================= */

function createOptionHTML(
    questionId,
    optionIndex,
    letter,
    value,
    correctAnswer
) {

    const checked =
        Number(correctAnswer) ===
        optionIndex
            ? "checked"
            : "";


    return `

        <div class="col-md-6">

            <div
                class="input-group"
            >

                <span
                    class="input-group-text fw-bold"
                >
                    ${letter}
                </span>


                <input
                    type="text"
                    class="form-control option-text"
                    data-option-index="${optionIndex}"
                    value="${escapeHTML(value)}"
                    placeholder="${escapeHTML(
                        text(`answer${letter}`)
                    )}"
                    required
                >


                <span class="input-group-text">

                    <input
                        class="form-check-input mt-0 correct-answer-radio"
                        type="radio"
                        name="correct_${questionId}"
                        value="${optionIndex}"
                        ${checked}
                    >

                </span>

            </div>

        </div>
    `;
}


/* =========================================================
   SAFE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   QUESTION NUMBERING
   ========================================================= */

function renumberQuestions() {

    const cards =
        questionsContainer.querySelectorAll(
            ".question-card"
        );


    cards.forEach(
        function (card, index) {

            card
                .querySelector(
                    ".question-number"
                )
                .textContent =
                    `${text("question")} ${index + 1}`;
        }
    );
}


/* =========================================================
   DELETE QUESTION
   ========================================================= */

function deleteQuestion(card) {

    const cards =
        questionsContainer.querySelectorAll(
            ".question-card"
        );


    if (
        cards.length <= 1
    ) {

        alert(
            text("lastQuestion")
        );

        return;
    }


    card.remove();


    renumberQuestions();
}


/* =========================================================
   ADD QUESTION
   ========================================================= */

addQuestionBtn.addEventListener(
    "click",
    function () {

        createQuestionCard();
    }
);


/* =========================================================
   GET QUESTIONS
   ========================================================= */

function collectQuestions() {

    const cards =
        questionsContainer.querySelectorAll(
            ".question-card"
        );


    const questions =
        [];


    for (
        let i = 0;
        i < cards.length;
        i++
    ) {

        const card =
            cards[i];


        const questionText =
            card
                .querySelector(
                    ".question-text"
                )
                .value
                .trim();


        const optionInputs =
            Array.from(
                card.querySelectorAll(
                    ".option-text"
                )
            );


        const options =
            optionInputs.map(
                input =>
                    input.value.trim()
            );


        if (
            !questionText
            ||
            options.some(
                option => !option
            )
        ) {

            alert(
                text("fillQuestions")
            );

            return null;
        }


        const correctInput =
            card.querySelector(
                ".correct-answer-radio:checked"
            );


        if (
            !correctInput
        ) {

            alert(
                `${text("chooseCorrect")} (${i + 1})`
            );

            return null;
        }


        questions.push({

            id:
                card.dataset.questionId,

            text:
                questionText,

            options:
                options,

            correctAnswer:
                Number(
                    correctInput.value
                )

        });
    }


    return questions;
}


/* =========================================================
   DATETIME INPUT FORMAT
   ========================================================= */

function toDateTimeLocal(value) {

    if (
        !value
    ) {

        return "";
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


    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    const hours =
        String(
            date.getHours()
        ).padStart(2, "0");


    const minutes =
        String(
            date.getMinutes()
        ).padStart(2, "0");


    return `${year}-${month}-${day}T${hours}:${minutes}`;
}


/* =========================================================
   LOAD EXISTING TEST
   ========================================================= */

function loadExistingTest() {

    if (
        !testId
    ) {

        createQuestionCard();

        return;
    }


    const tests =
        getStorageArray(
            "advantaTests"
        );


    editingTest =
        tests.find(
            test =>
                String(test.id) ===
                String(testId)
        );


    if (
    !editingTest
) {

    createQuestionCard();

    return;
}


if (
    testHasResults(
        editingTest.id
    )
) {

    alert(
        text("editBlocked")
    );

    window.location.href =
        `staff-class.html?class=${encodeURIComponent(currentClass.id)}`;

    return;
}

    testNameInput.value =
        editingTest.name
        ||
        editingTest.title
        ||
        "";


    deadlineInput.value =
        toDateTimeLocal(
            editingTest.deadline
        );


    passingScoreInput.value =
        editingTest.passingScore
        ??
        editingTest.threshold
        ??
        60;


    /*
      TIME LIMIT
    */

    if (
        editingTest.timeLimit
        !== null
        &&
        editingTest.timeLimit
        !== undefined
    ) {

        timeLimited.checked =
            true;


        timeUnlimited.checked =
            false;


        timeLimitMinutes.value =
            editingTest.timeLimit;

    } else {

        timeUnlimited.checked =
            true;


        timeLimited.checked =
            false;
    }


    updateTimeLimitVisibility();


    questionsContainer.innerHTML =
        "";


    if (
        Array.isArray(
            editingTest.questions
        )
        &&
        editingTest.questions.length > 0
    ) {

        editingTest.questions.forEach(
            question => {

                createQuestionCard(
                    question
                );
            }
        );

    } else {

        createQuestionCard();
    }
}


/* =========================================================
   SAVE
   ========================================================= */

createTestForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const questions =
            collectQuestions();


        if (
            !questions
        ) {

            return;
        }


        let timeLimit =
            null;


        if (
            timeLimited.checked
        ) {

            timeLimit =
                Number(
                    timeLimitMinutes.value
                );


            if (
                !Number.isInteger(
                    timeLimit
                )
                ||
                timeLimit < 1
                ||
                timeLimit > 300
            ) {

                alert(
                    text("invalidTime")
                );

                return;
            }
        }


        const passingScore =
    Number(
        passingScoreInput.value
    );


if (
    passingScoreInput.value.trim() === ""
    ||
    !Number.isFinite(passingScore)
    ||
    passingScore < 0
    ||
    passingScore > 100
) {

    alert(
        text("invalidPassingScore")
    );

    return;
}


        const tests =
            getStorageArray(
                "advantaTests"
            );


        /*
          EDIT EXISTING
        */

        if (
            editingTest
        ) {

            const index =
                tests.findIndex(
                    test =>
                        String(test.id) ===
                        String(editingTest.id)
                );


            if (
                index !== -1
            ) {

                tests[index] = {

                    ...editingTest,

                    name:
                        testNameInput.value.trim(),

                    subject:
                        currentTeacher.subjectId,

                    /*
                      КЛАСС НЕ МЕНЯЕМ.
                    */

                    classId:
                        currentClass.id,

                    className:
                        currentClass.name,

                    deadline:
                        deadlineInput.value
                        ||
                        null,

                    passingScore:
                        passingScore,

                    timeLimit:
                        timeLimit,

                    questions:
                        questions,

                    updatedAt:
                        new Date().toISOString()

                };
            }

        }

        /*
          CREATE NEW
        */

        else {

            const newTest = {

                id:
                    createId("test"),

                name:
                    testNameInput.value.trim(),

                subject:
                    currentTeacher.subjectId,

                /*
                  КЛАСС АВТОМАТИЧЕСКИ
                  БЕРЁТСЯ ИЗ КАБИНЕТА.
                */

                classId:
                    currentClass.id,

                className:
                    currentClass.name,

                deadline:
                    deadlineInput.value
                    ||
                    null,

                passingScore:
                    passingScore,

                /*
                  null = без ограничения.
                */

                timeLimit:
                    timeLimit,

                questions:
                    questions,

                status:
                    "draft",

                teacherId:
                    currentTeacher.id,

                createdAt:
                    new Date().toISOString()

            };


            tests.push(
                newTest
            );
        }


        saveStorageArray(
            "advantaTests",
            tests
        );


        /*
          После сохранения возвращаемся
          именно в тот класс,
          где был создан тест.
        */

        window.location.href =
            `staff-class.html?class=${encodeURIComponent(currentClass.id)}`;
    }
);


/* =========================================================
   DYNAMIC LANGUAGE
   ========================================================= */

function applyDynamicLanguage() {

    document.getElementById(
        "pageTitle"
    ).textContent =
        editingTest
            ? text("editTitle")
            : text("createTitle");


    document.getElementById(
        "pageSubtitle"
    ).textContent =
        currentClass
            ? `${currentClass.name} • ${getSubjectName()}`
            : "ADVANTA Pulse";


    document.getElementById(
        "settingsTitle"
    ).textContent =
        text("settings");


    document.getElementById(
        "timeSettingsTitle"
    ).textContent =
        text("timeSettings");


    document.getElementById(
        "timeUnlimitedLabel"
    ).textContent =
        text("unlimited");


    document.getElementById(
        "timeLimitedLabel"
    ).textContent =
        text("limited");


    document.getElementById(
        "timeLimitLabel"
    ).textContent =
        text("timeLimit");


    document.getElementById(
        "minutesSuffix"
    ).textContent =
        text("minutes");


    document.getElementById(
        "timeLimitHint"
    ).textContent =
        text("timeHint");


    document.getElementById(
        "questionsTitle"
    ).textContent =
        text("questions");


    document.getElementById(
        "questionsHint"
    ).textContent =
        text("questionsHint");


    document.getElementById(
        "addQuestionText"
    ).textContent =
        text("addQuestion");


    document.getElementById(
        "saveButtonText"
    ).textContent =
        editingTest
            ? text("saveChanges")
            : text("saveTest");


    document.getElementById(
        "backText"
    ).textContent =
        text("back");


    /*
      Обновляем динамические карточки вопросов.
    */

    questionsContainer
        .querySelectorAll(
            ".question-card"
        )
        .forEach(
            function (card) {

                card
                    .querySelector(
                        ".question-label"
                    )
                    .textContent =
                        text("question");


                card
                    .querySelector(
                        ".delete-question-text"
                    )
                    .textContent =
                        text("deleteQuestion");


                card
                    .querySelector(
                        ".correct-answer-hint"
                    )
                    .textContent =
                        text("correctAnswer");
            }
        );


    renumberQuestions();


    /*
      Переводим предмет.
    */

    if (
        currentClass
    ) {

        subjectDisplay.value =
            getSubjectName();


        classDisplay.value =
            currentClass.name;
    }
}


/* =========================================================
   SUBJECT
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


/* =========================================================
   LANGUAGE EVENT
   ========================================================= */

window.addEventListener(
    "languageChanged",
    function () {

        applyDynamicLanguage();
    }
);


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (
            !resolveClass()
        ) {

            return;
        }


        subjectDisplay.value =
            getSubjectName();


        classDisplay.value =
            currentClass.name;


        const classUrl =
            `staff-class.html?class=${encodeURIComponent(currentClass.id)}`;


        backToClass.href =
            classUrl;


        cancelButton.href =
            classUrl;


        loadExistingTest();


        applyDynamicLanguage();


        updateTimeLimitVisibility();
    }
);