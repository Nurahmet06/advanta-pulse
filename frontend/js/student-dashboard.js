const savedStudent = JSON.parse(
    localStorage.getItem("registeredStudent")
);

const studentName = document.getElementById("studentName");

if (savedStudent) {
    studentName.textContent =
        `${savedStudent.firstName} ${savedStudent.lastName}`;
}


const results = [
    {
        subject: "Математика",
        title: "Линейные уравнения",
        date: "02.10.2026",
        score: 47
    },
    {
        subject: "Казахский язык",
        title: "Септік жалғаулары",
        date: "25.09.2026",
        score: 64
    },
    {
        subject: "Математика",
        title: "Проценты",
        date: "18.09.2026",
        score: 82
    },
    {
        subject: "Английский язык",
        title: "Present Simple",
        date: "10.09.2026",
        score: 93
    }
];


function getScoreClass(score) {

    if (score <= 50) {
        return "score-red";
    }

    if (score <= 69) {
        return "score-yellow";
    }

    if (score <= 89) {
        return "score-blue";
    }

    return "score-green";
}


function getStatus(score) {

    if (score >= 60) {
        return "Пройден";
    }

    return "Не пройден";
}


const resultsList = document.getElementById("resultsList");


results.forEach(result => {

    const resultCard = document.createElement("div");

    resultCard.className = "result-card";

    resultCard.innerHTML = `

        <div
            class="score-circle ${getScoreClass(result.score)}"
        >
            <span>
                ${result.score}
            </span>
        </div>


        <div class="result-info">

            <span class="result-subject">
                ${result.subject}
            </span>

            <h4>
                ${result.title}
            </h4>

            <div class="result-bottom">

                <span>
                    ${result.date}
                </span>

                <span class="${
                    result.score >= 60
                        ? "passed-status"
                        : "failed-status"
                }">
                    ${getStatus(result.score)}
                </span>

            </div>

        </div>

    `;

    resultsList.appendChild(resultCard);

});


function startTest() {

    window.location.href = "test.html";

}