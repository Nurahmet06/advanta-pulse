(() => {
    "use strict";

    const translations = {
        ru: {
            navOverview: "Обзор",
            navClasses: "Все классы",
            navTeachers: "Учителя",
            navTests: "Тесты",
            navResults: "Результаты",
            navAnalytics: "Аналитика",
            backLabel: "Назад к тестам",
            pageTitle: "Анализ теста",
            completedLabel: "Выполнений",
            averageLabel: "Средний балл",
            passedLabel: "Прошли порог",
            failedLabel: "Ниже порога",
            riskTitle: "Ученики группы риска",
            riskDescription: "Ученики, не набравшие проходной балл",
            resultsTitle: "Результаты учеников",
            studentHeader: "Ученик",
            classHeader: "Класс",
            scoreHeader: "Балл",
            thresholdHeader: "Порог",
            statusHeader: "Статус",
            passed: "Пройден",
            failed: "Не пройден",
            noRisk: "Учеников группы риска нет",
            noResults: "Результатов пока нет",
            testNotFound: "Тест не найден",
            teacher: "Учитель",
            classes: "Классы",
            noTeacher: "Не указан",
            noClass: "Не указан",
            unknownStudent: "Неизвестный ученик"
        },
        kz: {
            navOverview: "Шолу",
            navClasses: "Барлық сыныптар",
            navTeachers: "Мұғалімдер",
            navTests: "Тесттер",
            navResults: "Нәтижелер",
            navAnalytics: "Талдау",
            backLabel: "Тесттерге оралу",
            pageTitle: "Тестті талдау",
            completedLabel: "Орындалған тесттер",
            averageLabel: "Орташа балл",
            passedLabel: "Шекті балдан өтті",
            failedLabel: "Шекті балдан төмен",
            riskTitle: "Тәуекел тобындағы оқушылар",
            riskDescription: "Өту балын жинамаған оқушылар",
            resultsTitle: "Оқушылардың нәтижелері",
            studentHeader: "Оқушы",
            classHeader: "Сынып",
            scoreHeader: "Балл",
            thresholdHeader: "Шекті балл",
            statusHeader: "Мәртебе",
            passed: "Өтті",
            failed: "Өтпеді",
            noRisk: "Тәуекел тобындағы оқушылар жоқ",
            noResults: "Әзірге нәтижелер жоқ",
            testNotFound: "Тест табылмады",
            teacher: "Мұғалім",
            classes: "Сыныптар",
            noTeacher: "Көрсетілмеген",
            noClass: "Көрсетілмеген",
            unknownStudent: "Белгісіз оқушы"
        },
        en: {
            navOverview: "Overview",
            navClasses: "All Classes",
            navTeachers: "Teachers",
            navTests: "Tests",
            navResults: "Results",
            navAnalytics: "Analytics",
            backLabel: "Back to tests",
            pageTitle: "Test Analysis",
            completedLabel: "Completions",
            averageLabel: "Average score",
            passedLabel: "Passed threshold",
            failedLabel: "Below threshold",
            riskTitle: "Students at Risk",
            riskDescription: "Students who scored below the passing threshold",
            resultsTitle: "Student Results",
            studentHeader: "Student",
            classHeader: "Class",
            scoreHeader: "Score",
            thresholdHeader: "Threshold",
            statusHeader: "Status",
            passed: "Passed",
            failed: "Failed",
            noRisk: "No students at risk",
            noResults: "No results yet",
            testNotFound: "Test not found",
            teacher: "Teacher",
            classes: "Classes",
            noTeacher: "Not specified",
            noClass: "Not specified",
            unknownStudent: "Unknown student"
        }
    };

    function read(key) {
        try {
            const data = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(data) ? data : [];
        } catch {
            return [];
        }
    }

    function language() {
        const value = localStorage.getItem("language") || "ru";
        return translations[value] ? value : "ru";
    }

    function tr(key) {
        return translations[language()][key] || key;
    }

    function setText(id, value) {
        const element = document.getElementById(id);
        if (!element) return;

        if (id.startsWith("nav")) {
            const label = element.querySelector("span");
            if (label) {
                label.textContent = value;
                return;
            }
        }

        element.textContent = value;
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char]));
    }

    function scoreOf(result) {
        const raw = result.score ?? result.percentage ??
            result.percent ?? result.totalScore;

        if (raw === null || raw === undefined || raw === "") {
            return null;
        }

        const score = Number(raw);
        return Number.isFinite(score) ? score : null;
    }

    function testIdOf(result) {
        return String(
            result.testId ?? result.testID ?? result.test?.id ?? ""
        );
    }

    function studentIdOf(result) {
        return String(result.studentId ?? result.userId ?? "");
    }

    function resultTime(result) {
        const date = result.completedAt ??
            result.submittedAt ?? result.createdAt ??
            result.date ?? 0;

        const time = new Date(date).getTime();
        return Number.isFinite(time) ? time : 0;
    }

    function latestResults(results) {
        const unique = new Map();

        results.forEach(result => {
            const studentId = studentIdOf(result);
            const testId = testIdOf(result);

            if (!studentId || !testId || scoreOf(result) === null) {
                return;
            }

            const key = `${studentId}__${testId}`;
            const previous = unique.get(key);

            if (!previous || resultTime(result) >= resultTime(previous)) {
                unique.set(key, result);
            }
        });

        return [...unique.values()];
    }

    function studentName(student) {
        if (!student) return tr("unknownStudent");

        return student.name ||
            [student.firstName, student.lastName]
                .filter(Boolean).join(" ") ||
            tr("unknownStudent");
    }

    function className(id, classes) {
        const cls = classes.find(item =>
            String(item.id) === String(id)
        );

        return cls?.name || cls?.className || tr("noClass");
    }

    function testClassNames(test, classes) {
        const ids = [
            ...(test.classId ? [test.classId] : []),
            ...(Array.isArray(test.classIds) ? test.classIds : [])
        ];

        const names = [...new Set(ids.map(String))].map(id =>
            className(id, classes)
        );

        if (!names.length && test.className) {
            names.push(test.className);
        }

        return names.length ? names.join(", ") : tr("noClass");
    }

    function teacherName(test, users) {
        const teacher = users.find(user =>
            String(user.id) === String(test.teacherId)
        );

        if (teacher) {
            return teacher.name ||
                [teacher.firstName, teacher.lastName]
                    .filter(Boolean).join(" ") ||
                tr("noTeacher");
        }

        if (String(test.teacherId) === "teacher_math_1") {
            return "Айгуль Сериковна";
        }

        return tr("noTeacher");
    }

    function thresholdOf(test) {
        const raw = test.passingScore ??
            test.passScore ?? test.threshold ?? 50;

        const value = Number(raw);
        return Number.isFinite(value) ? value : 50;
    }

    function render() {
        const currentLanguage = language();

        document.documentElement.lang =
            currentLanguage === "kz" ? "kk" : currentLanguage;

        document.getElementById("languageSelect").value =
            currentLanguage;

        [
            "navOverview", "navClasses", "navTeachers",
            "navTests", "navResults", "navAnalytics",
            "backLabel", "pageTitle",
            "completedLabel", "averageLabel",
            "passedLabel", "failedLabel",
            "riskTitle", "riskDescription",
            "resultsTitle", "studentHeader",
            "classHeader", "scoreHeader",
            "thresholdHeader", "statusHeader"
        ].forEach(id => setText(id, tr(id)));

        const params = new URLSearchParams(window.location.search);
        const testId = params.get("test");

        const tests = read("advantaTests");
        const users = read("advantaUsers");
        const classes = read("advantaClasses");

        const test = tests.find(item =>
            String(item.id) === String(testId)
        );

        const tbody = document.getElementById("resultsTableBody");
        const riskList = document.getElementById("riskStudentsList");

        if (!test || !testId) {
            setText("testInfo", tr("testNotFound"));
            setText("completedCount", "0");
            setText("averageScore", "—");
            setText("passedCount", "0");
            setText("failedCount", "0");

            riskList.textContent = tr("noResults");
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center text-muted py-4">
                        ${escapeHTML(tr("testNotFound"))}
                    </td>
                </tr>
            `;
            return;
        }

        const title = test.title || test.name || String(test.id);

        const info = [
            title,
            `${tr("teacher")}: ${teacherName(test, users)}`,
            `${tr("classes")}: ${testClassNames(test, classes)}`
        ];

        setText("testInfo", info.join(" | "));

        const threshold = thresholdOf(test);

        const results = latestResults(
            read("advantaResults")
        ).filter(result =>
            testIdOf(result) === String(test.id)
        );

        const rows = results.map(result => {
            const studentId = studentIdOf(result);

            const student = users.find(user =>
                String(user.id) === studentId
            );

            const score = scoreOf(result);
            const passed = score >= threshold;

            const classId = result.classId ??
                student?.classId ?? test.classId;

            return {
                studentName: studentName(student),
                className: className(classId, classes),
                score,
                passed
            };
        });

        const average = rows.length
            ? Math.round(
                rows.reduce((sum, row) => sum + row.score, 0) /
                rows.length
            )
            : null;

        const passedRows = rows.filter(row => row.passed);
        const failedRows = rows.filter(row => !row.passed);

        setText("completedCount", rows.length);
        setText(
            "averageScore",
            average === null ? "—" : `${average}/100`
        );
        setText("passedCount", passedRows.length);
        setText("failedCount", failedRows.length);

        if (!failedRows.length) {
            riskList.innerHTML = `
                <p class="text-muted mb-0">
                    ${escapeHTML(tr("noRisk"))}
                </p>
            `;
        } else {
            riskList.innerHTML = `
                <ul class="list-group list-group-flush">
                    ${failedRows.map(row => `
                        <li class="list-group-item d-flex justify-content-between">
                            <span>${escapeHTML(row.studentName)}</span>
                            <span class="badge bg-danger">
                                ${row.score}/100
                            </span>
                        </li>
                    `).join("")}
                </ul>
            `;
        }

        if (!rows.length) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center text-muted py-4">
                        ${escapeHTML(tr("noResults"))}
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = rows.map(row => `
            <tr>
                <td>${escapeHTML(row.studentName)}</td>
                <td>${escapeHTML(row.className)}</td>
                <td class="fw-semibold">${row.score}/100</td>
                <td>${threshold}/100</td>
                <td>
                    <span class="badge bg-${row.passed ? "success" : "danger"}">
                        ${escapeHTML(tr(row.passed ? "passed" : "failed"))}
                    </span>
                </td>
            </tr>
        `).join("");
    }

    function initialize() {
        document.getElementById("languageSelect")
            .addEventListener("change", event => {
                if (typeof setLanguage === "function") {
                    setLanguage(event.target.value);
                } else {
                    localStorage.setItem("language", event.target.value);
                }

                render();
            });

        window.addEventListener("languageChanged", render);

        render();
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();