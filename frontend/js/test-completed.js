/* =========================================================
   ADVANTA PULSE
   TEST RESULT
   ========================================================= */


/* =========================================================
   ПОЛУЧАЕМ РЕЗУЛЬТАТ

   Пока берём demoLastScore.

   Позже результат будет приходить
   от backend после настоящей проверки.
   ========================================================= */

const savedScore =
    localStorage.getItem(
        "demoLastScore"
    );


let score =
    Number(savedScore);


/* Если результата почему-то нет */

if (
    Number.isNaN(score)
    ||
    score < 0
) {

    score = 0;

}


/* Максимум 100 */

if (score > 100) {

    score = 100;

}



/* =========================================================
   ПРОХОДНОЙ БАЛЛ
   ========================================================= */

const passingScore = 60;



/* =========================================================
   ELEMENTS
   ========================================================= */

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


const resultStatus =
    document.getElementById(
        "resultStatus"
    );



/* =========================================================
   ЦВЕТ КРУГА
   ========================================================= */

function getScoreClass(score) {

    /*
        0–50
        КРАСНЫЙ
    */

    if (score <= 50) {

        return "score-red";

    }


    /*
        51–69
        ЖЁЛТЫЙ
    */

    if (score <= 69) {

        return "score-yellow";

    }


    /*
        70–89
        СИНИЙ
    */

    if (score <= 89) {

        return "score-blue";

    }


    /*
        90–100
        ЗЕЛЁНЫЙ
    */

    return "score-green";

}



/* =========================================================
   ПОКАЗЫВАЕМ БАЛЛ
   ========================================================= */

scoreNumber.textContent =
    score;


scoreText.textContent =
    `${score}/100`;


scoreCircle.classList.add(
    getScoreClass(score)
);



/* =========================================================
   СТАТУС
   ========================================================= */

function renderStatus() {

    const passed =
        score >= passingScore;


    if (passed) {

        resultStatus.textContent =
            t("passed");


        resultStatus.className =
            "fw-bold mt-3 passed-status";

    }

    else {

        resultStatus.textContent =
            t("failed");


        resultStatus.className =
            "fw-bold mt-3 failed-status";

    }

}



/* =========================================================
   ПЕРЕКЛЮЧЕНИЕ ЯЗЫКА
   ========================================================= */

window.addEventListener(
    "languageChanged",
    function () {

        renderStatus();

    }
);



/* =========================================================
   START
   ========================================================= */

renderStatus();