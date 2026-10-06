/* =========================================================
   ADVANTA PULSE
   CREATE / EDIT TEST
   ========================================================= */

const questionsContainer =
    document.getElementById("questionsContainer");

const addQuestionBtn =
    document.getElementById("addQuestionBtn");

const saveTestBtn =
    document.getElementById("saveTestBtn");


/* =========================================================
   РЕЖИМ РЕДАКТИРОВАНИЯ
   ========================================================= */

/*
   Если адрес:

   create-test.html?id=123

   значит редактируем существующий тест.

   Если просто:

   create-test.html

   значит создаём новый.
*/

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const editingTestId =
    urlParams.get("id");

let editingTest = null;


/*
   UID используется только для radio.
   Это НЕ номер вопроса.
*/

let nextQuestionUid = 1;


/* =========================================================
   LANGUAGE HELP
   ========================================================= */

function getCorrectAnswerHelp() {

    const language =
        getCurrentLanguage();

    if (language === "kz") {

        return "Дұрыс жауапты белгілеңіз";
    }

    if (language === "en") {

        return "Select the correct answer";
    }

    return "Отметьте правильный ответ";
}


/* =========================================================
   OPTION HTML
   ========================================================= */

function createOptionHTML(
    questionUid,
    optionIndex,
    letter,
    value = "",
    checked = false
) {

    return `

        <div class="col-md-6">

            <div class="input-group input-group-lg">

                <span
                    class="input-group-text fw-bold"
                    style="
                        width:48px;
                        justify-content:center;
                    "
                >
                    ${letter}
                </span>

                <input
                    type="text"
                    class="form-control option-text"
                    data-option-index="${optionIndex}"
                    value="${escapeHtmlAttribute(value)}"
                    placeholder="${letter}"
                >

                <div
                    class="input-group-text"
                    style="background:white;"
                >

                    <input
                        class="form-check-input mt-0 correct-answer"
                        type="radio"
                        name="correct-${questionUid}"
                        value="${optionIndex}"
                        ${checked ? "checked" : ""}
                    >

                </div>

            </div>

        </div>
    `;
}


/* =========================================================
   SAFE ATTRIBUTE TEXT
   ========================================================= */

function escapeHtmlAttribute(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}


/* =========================================================
   ADD QUESTION
   ========================================================= */

function addQuestion(data = null) {

    const questionUid =
        nextQuestionUid++;


    const card =
        document.createElement("div");


    card.className =
        "card border-0 shadow-sm rounded-4 mb-4 question-builder-card";


    card.dataset.uid =
        questionUid;


    const questionText =
        data?.text || "";


    const options =
        data?.options || [
            "",
            "",
            "",
            ""
        ];


    const correctAnswer =
        data?.correctAnswer ?? null;


    card.innerHTML = `

        <div class="card-body p-4">


            <div
                class="d-flex justify-content-between align-items-center mb-4"
            >

                <h5
                    class="fw-bold mb-0 question-builder-title"
                >
                </h5>


                <button
                    type="button"
                    class="btn btn-sm btn-outline-danger delete-question-btn"
                >
                    <i class="bi bi-trash"></i>
                </button>

            </div>



            <div class="mb-4">

                <label
                    class="form-label fw-semibold question-label"
                >
                </label>


                <textarea
                    class="form-control question-text"
                    rows="2"
                >${questionText}</textarea>

            </div>



            <div class="row g-3">

                ${createOptionHTML(
                    questionUid,
                    0,
                    "A",
                    options[0] || "",
                    correctAnswer === 0
                )}

                ${createOptionHTML(
                    questionUid,
                    1,
                    "B",
                    options[1] || "",
                    correctAnswer === 1
                )}

                ${createOptionHTML(
                    questionUid,
                    2,
                    "C",
                    options[2] || "",
                    correctAnswer === 2
                )}

                ${createOptionHTML(
                    questionUid,
                    3,
                    "D",
                    options[3] || "",
                    correctAnswer === 3
                )}

            </div>



            <div class="mt-3">

                <small
                    class="text-secondary correct-answer-help"
                >
                    ✓ ${getCorrectAnswerHelp()}
                </small>

            </div>


        </div>
    `;


    questionsContainer.appendChild(
        card
    );


    /* DELETE */

    card
        .querySelector(
            ".delete-question-btn"
        )
        .addEventListener(
            "click",
            function () {

                card.remove();

                renumberQuestions();
            }
        );


    renumberQuestions();
}


/* =========================================================
   RENUMBER
   ========================================================= */

function renumberQuestions() {

    const cards =
        questionsContainer
            .querySelectorAll(
                ".question-builder-card"
            );


    cards.forEach(
        function (card, index) {

            const number =
                index + 1;


            card
                .querySelector(
                    ".question-builder-title"
                )
                .textContent =
                `${t("question")} ${number}`;


            card
                .querySelector(
                    ".question-label"
                )
                .textContent =
                `${t("question")} ${number}`;


            card
                .querySelector(
                    ".question-text"
                )
                .placeholder =
                `${t("question")} ${number}`;
        }
    );
}


/* =========================================================
   BUTTON +
   ========================================================= */

addQuestionBtn.addEventListener(
    "click",
    function () {

        addQuestion();
    }
);


/* =========================================================
   COLLECT QUESTIONS
   ========================================================= */

function collectQuestions() {

    const cards =
        questionsContainer
            .querySelectorAll(
                ".question-builder-card"
            );


    const questions = [];


    cards.forEach(
        function (card, index) {

            const text =
                card
                    .querySelector(
                        ".question-text"
                    )
                    .value
                    .trim();


            const options = [];


            card
                .querySelectorAll(
                    ".option-text"
                )
                .forEach(
                    function (input) {

                        options.push(
                            input.value.trim()
                        );
                    }
                );


            const correct =
                card.querySelector(
                    ".correct-answer:checked"
                );


            questions.push({

                id:
                    index + 1,

                text:
                    text,

                options:
                    options,

                correctAnswer:
                    correct
                        ? Number(correct.value)
                        : null
            });
        }
    );


    return questions;
}


/* =========================================================
   VALIDATE
   ========================================================= */

function validateTest(test) {

    const language =
        getCurrentLanguage();


    if (!test.name) {

        alert(
            language === "kz"
                ? "Тест атауын енгізіңіз"
                : language === "en"
                    ? "Enter the test name"
                    : "Введите название теста"
        );

        return false;
    }


    if (
        test.questions.length === 0
    ) {

        alert(
            language === "kz"
                ? "Кемінде бір сұрақ қосыңыз"
                : language === "en"
                    ? "Add at least one question"
                    : "Добавьте хотя бы один вопрос"
        );

        return false;
    }


    for (
        let i = 0;
        i < test.questions.length;
        i++
    ) {

        const q =
            test.questions[i];


        if (!q.text) {

            alert(
                language === "kz"
                    ? `${i + 1}-сұрақтың мәтінін енгізіңіз`
                    : language === "en"
                        ? `Enter the text for question ${i + 1}`
                        : `Введите текст вопроса ${i + 1}`
            );

            return false;
        }


        if (
            q.options.some(
                option => !option
            )
        ) {

            alert(
                language === "kz"
                    ? `${i + 1}-сұрақтың барлық жауап нұсқаларын толтырыңыз`
                    : language === "en"
                        ? `Fill in all answer options for question ${i + 1}`
                        : `Заполните все варианты ответа в вопросе ${i + 1}`
            );

            return false;
        }


        if (
            q.correctAnswer === null
        ) {

            alert(
                language === "kz"
                    ? `${i + 1}-сұрақтың дұрыс жауабын таңдаңыз`
                    : language === "en"
                        ? `Select the correct answer for question ${i + 1}`
                        : `Выберите правильный ответ в вопросе ${i + 1}`
            );

            return false;
        }
    }


    return true;
}


/* =========================================================
   LOAD EXISTING TEST
   ========================================================= */

function loadTestForEditing() {

    if (!editingTestId) {

        /*
           Новый тест.
        */

        addQuestion();

        return;
    }


    const savedTests =
        JSON.parse(
            localStorage.getItem(
                "advantaTests"
            )
        ) || [];


    editingTest =
        savedTests.find(
            test =>
                String(test.id)
                ===
                String(editingTestId)
        );


    /*
       Если ID неправильный —
       просто создаём новый.
    */

    if (!editingTest) {

        addQuestion();

        return;
    }


    /* TEST NAME */

    document
        .getElementById(
            "testName"
        )
        .value =
        editingTest.name || "";


    /* SUBJECT */

    document
        .getElementById(
            "subject"
        )
        .value =
        editingTest.subject || "math";


    /* CLASS */

    document
        .getElementById(
            "classSelect"
        )
        .value =
        editingTest.className || "5А";


    /* DEADLINE */

    document
        .getElementById(
            "deadline"
        )
        .value =
        editingTest.deadline || "";


    /* PASSING SCORE */

    document
        .getElementById(
            "passingScore"
        )
        .value =
        editingTest.passingScore ?? 60;


    /* QUESTIONS */

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
            function (question) {

                addQuestion(question);
            }
        );

    } else {

        addQuestion();
    }
}


/* =========================================================
   SAVE
   ========================================================= */

saveTestBtn.addEventListener(
    "click",
    function () {

        const name =
            document
                .getElementById(
                    "testName"
                )
                .value
                .trim();


        const subject =
            document
                .getElementById(
                    "subject"
                )
                .value;


        const className =
            document
                .getElementById(
                    "classSelect"
                )
                .value;


        const deadline =
            document
                .getElementById(
                    "deadline"
                )
                .value;


        let passingScore =
            Number(
                document
                    .getElementById(
                        "passingScore"
                    )
                    .value
            );


        if (
            Number.isNaN(passingScore)
            ||
            passingScore < 0
            ||
            passingScore > 100
        ) {

            passingScore = 60;
        }


        const testData = {

            id:
                editingTest
                    ? editingTest.id
                    : Date.now(),

            name:
                name,

            subject:
                subject,

            className:
                className,

            deadline:
                deadline,

            passingScore:
                passingScore,

            questions:
                collectQuestions(),

            status:
                editingTest
                    ? editingTest.status
                    : "draft",

            createdAt:
                editingTest
                    ? editingTest.createdAt
                    : new Date().toISOString(),

            updatedAt:
                new Date().toISOString()
        };


        if (
            !validateTest(testData)
        ) {

            return;
        }


        const savedTests =
            JSON.parse(
                localStorage.getItem(
                    "advantaTests"
                )
            ) || [];


        /*
           РЕДАКТИРОВАНИЕ
        */

        if (editingTest) {

            const index =
                savedTests.findIndex(
                    test =>
                        String(test.id)
                        ===
                        String(editingTest.id)
                );


            if (index !== -1) {

                savedTests[index] =
                    testData;
            }

        }

        /*
           НОВЫЙ ТЕСТ
        */

        else {

            savedTests.push(
                testData
            );
        }


        localStorage.setItem(
            "advantaTests",
            JSON.stringify(savedTests)
        );


        window.location.href =
            "staff-tests.html";
    }
);


/* =========================================================
   LANGUAGE
   ========================================================= */

window.addEventListener(
    "languageChanged",
    function () {

        renumberQuestions();


        document
            .querySelectorAll(
                ".correct-answer-help"
            )
            .forEach(
                function (element) {

                    element.textContent =
                        "✓ "
                        +
                        getCorrectAnswerHelp();
                }
            );
    }
);


/* =========================================================
   START
   ========================================================= */

loadTestForEditing();