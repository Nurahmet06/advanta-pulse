/* =========================================================
   ADVANTA PULSE
   TEST COMPLETED
   ========================================================= */


/* =========================================================
   STORAGE
   ========================================================= */

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


    const texts = window.AdvantaI18n.scope("test-completed");


    return (
        texts[language]?.[key]
        ||
        texts.ru[key]
        ||
        key
    );
}


/* =========================================================
   RESULT
   ========================================================= */

const lastResult =
    getStorageObject(
        "advantaLastResult"
    );


if (!lastResult) {

    alert(
        uiText("noResult")
    );


    window.location.href =
        "student-home.html";


    throw new Error(
        "Last result not found"
    );
}


/* =========================================================
   ELEMENTS
   ========================================================= */

const completedText =
    document.getElementById(
        "completedText"
    );


const completedTestName =
    document.getElementById(
        "completedTestName"
    );


const completedSubject =
    document.getElementById(
        "completedSubject"
    );


const scoreCircle =
    document.getElementById(
        "finalScore"
    );


const scoreNumber =
    document.getElementById(
        "scoreNumber"
    );


const scoreText =
    document.getElementById(
        "scoreText"
    );


const scoreLabel =
    document.getElementById(
        "scoreLabel"
    );


const correctAnswersLabel =
    document.getElementById(
        "correctAnswersLabel"
    );


const correctAnswersText =
    document.getElementById(
        "correctAnswersText"
    );


const passingScoreLabel =
    document.getElementById(
        "passingScoreLabel"
    );


const passingScoreText =
    document.getElementById(
        "passingScoreText"
    );


const resultStatus =
    document.getElementById(
        "resultStatus"
    );


const resultSavedText =
    document.getElementById(
        "resultSavedText"
    );


const answersHiddenText =
    document.getElementById(
        "answersHiddenText"
    );


const returnCabinetText =
    document.getElementById(
        "returnCabinetText"
    );


/* =========================================================
   SCORE
   ========================================================= */

function getScore() {

    const score =
        Number(
            lastResult.score
        );


    if (
        !Number.isFinite(score)
    ) {

        return 0;
    }


    return Math.max(
        0,
        Math.min(
            100,
            score
        )
    );
}


function getPassingScore() {

    const passing =
        Number(
            lastResult.passingScore
        );


    return Number.isFinite(passing)
        ? passing
        : 60;
}


/* =========================================================
   SCORE COLOR
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


function getScoreBackground(score) {

    if (score < 50) {
        return "rgba(220, 53, 69, 0.08)";
    }

    if (score < 70) {
        return "rgba(211, 158, 0, 0.08)";
    }

    if (score < 90) {
        return "rgba(13, 110, 253, 0.08)";
    }

    return "rgba(25, 135, 84, 0.08)";
}


/* =========================================================
   SUBJECT
   ========================================================= */

function getSubjectName() {

    const subject =
        lastResult.subject;


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
        lastResult.subjectName
        ||
        subject
        ||
        uiText("mathematics")
    );
}


/* =========================================================
   RENDER
   ========================================================= */

function renderResult() {

    const score =
        getScore();


    const passingScore =
        getPassingScore();


    const passed =
        score >= passingScore;


    completedText.textContent =
        uiText("completed");


    completedTestName.textContent =
        lastResult.testName
        ||
        "Test";


    completedSubject.textContent =
        getSubjectName();


    scoreLabel.textContent =
        uiText("score");


    scoreNumber.textContent =
        Math.round(score);


    scoreText.textContent =
        `${Math.round(score)}/100`;


    correctAnswersLabel.textContent =
        uiText("correct");


    correctAnswersText.textContent =
        `${
            Number(
                lastResult.correctCount
                ??
                0
            )
        } ${uiText("of")} ${
            Number(
                lastResult.totalQuestions
                ??
                0
            )
        }`;


    passingScoreLabel.textContent =
        uiText("passingScore");


    passingScoreText.textContent =
        `${passingScore}/100`;


    /*
  Unified score colors:
  0–49   red
  50–69  yellow
  70–89  blue
  90–100 green
*/

const scoreColor =
    getScoreColor(score);


scoreCircle.style.setProperty(
    "color",
    scoreColor,
    "important"
);


scoreCircle.style.setProperty(
    "border-color",
    scoreColor,
    "important"
);


scoreCircle.style.setProperty(
    "border-width",
    "3px",
    "important"
);


scoreCircle.style.setProperty(
    "border-style",
    "solid",
    "important"
);


scoreCircle.style.setProperty(
    "background-color",
    getScoreBackground(score),
    "important"
);


scoreNumber.style.setProperty(
    "color",
    scoreColor,
    "important"
);


    if (passed) {

        resultStatus.textContent =
            uiText("passed");


        resultStatus.className =
            "fw-bold mt-3 passed-status";

    } else {

        resultStatus.textContent =
            uiText("failed");


        resultStatus.className =
            "fw-bold mt-3 failed-status";
    }


    resultSavedText.textContent =
        uiText("saved");


    answersHiddenText.textContent =
        uiText("hidden");


    returnCabinetText.textContent =
        uiText("returnCabinet");
}


/* =========================================================
   LANGUAGE
   ========================================================= */

window.addEventListener(
    "languageChanged",
    function () {

        renderResult();
    }
);


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderResult();
    }
);