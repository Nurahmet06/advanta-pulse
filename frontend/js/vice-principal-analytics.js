(() => {
    "use strict";

    const translations = {
        ru: {
            title: "Анализ класса",
            back: "← Назад",
            loading: "Загрузка данных...",
            average: "Средний балл",
            completed: "Завершено тестов",
            risk: "Результаты ниже порога",
            results: "Результаты учеников",
            student: "Ученик",
            test: "Тест",
            score: "Балл",
            threshold: "Порог",
            status: "Статус",
            passed: "Сдан",
            failed: "Не сдан",
            noData: "Пока нет результатов",
            riskStudentsTitle: "Ученики группы риска",
            riskStudentsDescription: "Ученики, не достигшие проходного порога хотя бы в одном тесте.",
            riskStudentsEmpty: "Учеников группы риска нет",
            riskFailedTests: "Тестов ниже порога",
            unknown: "Не указан",
            teacher: "Учитель",
            subject: "Предмет",
            noClass: "Класс не найден",
            noTeacher: "Учитель не найден",
            subjects: {
                math: "Математика",
                mathematics: "Математика",
                english: "Английский язык",
                russian: "Русский язык",
                kazakh: "Казахский язык"
            }
        },
        kz: {
            title: "Сынып талдауы",
            back: "← Артқа",
            loading: "Деректер жүктелуде...",
            average: "Орташа балл",
            completed: "Аяқталған тесттер",
            risk: "Шекті балдан төмен нәтижелер",
            results: "Оқушылардың нәтижелері",
            student: "Оқушы",
            test: "Тест",
            score: "Балл",
            threshold: "Шекті балл",
            status: "Мәртебе",
            passed: "Өтті",
            failed: "Өтпеді",
            noData: "Әзірге нәтиже жоқ",
            riskStudentsTitle: "Тәуекел тобындағы оқушылар",
            riskStudentsDescription: "Кемінде бір тестте шекті балға жетпеген оқушылар.",
            riskStudentsEmpty: "Тәуекел тобындағы оқушылар жоқ",
            riskFailedTests: "Шектен төмен тесттер",
            unknown: "Көрсетілмеген",
            teacher: "Мұғалім",
            subject: "Пән",
            noClass: "Сынып табылмады",
            noTeacher: "Мұғалім табылмады",
            subjects: {
                math: "Математика",
                mathematics: "Математика",
                english: "Ағылшын тілі",
                russian: "Орыс тілі",
                kazakh: "Қазақ тілі"
            }
        },
        en: {
            title: "Class Analysis",
            back: "← Back",
            loading: "Loading data...",
            average: "Average score",
            completed: "Completed tests",
            risk: "Results below threshold",
            results: "Student Results",
            student: "Student",
            test: "Test",
            score: "Score",
            threshold: "Threshold",
            status: "Status",
            passed: "Passed",
            failed: "Failed",
            noData: "No results yet",
            riskStudentsTitle: "Students at Risk",
            riskStudentsDescription: "Students who scored below the passing threshold in at least one test.",
            riskStudentsEmpty: "No students at risk",
            riskFailedTests: "Tests below threshold",
            unknown: "Not specified",
            teacher: "Teacher",
            subject: "Subject",
            noClass: "Class not found",
            noTeacher: "Teacher not found",
            subjects: {
                math: "Mathematics",
                mathematics: "Mathematics",
                english: "English",
                russian: "Russian",
                kazakh: "Kazakh"
            }
        }
    };

    function read(key) {
        try {
            const value = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(value) ? value : [];
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
        if (element) element.textContent = value;
    }

    function scoreOf(result) {
        const raw = result.score ?? result.percentage ??
            result.percent ?? result.totalScore;
        if (raw === null || raw === undefined || raw === "") return null;
        const value = Number(raw);
        return Number.isFinite(value) ? value : null;
    }

    function testIdOf(result) {
        return String(
            result.testId ?? result.testID ?? result.test?.id ?? ""
        );
    }

    function studentIdOf(result) {
        return String(result.studentId ?? result.userId ?? "");
    }

    function latestResults(results) {
        const map = new Map();

        results.forEach(result => {
            const studentId = studentIdOf(result);
            const testId = testIdOf(result);
            if (!studentId || !testId) return;

            const key = `${studentId}:${testId}`;
            const previous = map.get(key);

            const time = item => {
                const value = item.completedAt ?? item.submittedAt ??
                    item.createdAt ?? item.date;
                const parsed = new Date(value || 0).getTime();
                return Number.isFinite(parsed) ? parsed : 0;
            };

            if (!previous || time(result) >= time(previous)) {
                map.set(key, result);
            }
        });

        return [...map.values()];
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

    function studentName(user) {
        if (!user) return tr("unknown");
        return user.name ||
            [user.firstName, user.lastName].filter(Boolean).join(" ") ||
            tr("unknown");
    }

    function renderRiskStudents(classResults, classTestMap, users) {
        const container = document.getElementById("riskStudentsContent");
        if (!container) return;

        setText("riskStudentsTitle", tr("riskStudentsTitle"));
        setText("riskStudentsDescription", tr("riskStudentsDescription"));

        const studentsAtRisk = new Map();

        classResults.forEach(result => {
            const score = scoreOf(result);
            const test = classTestMap.get(testIdOf(result));

            if (score === null || !test) return;

            const threshold = Number(
                test.passingScore ?? test.passScore ??
                test.threshold ?? 50
            );

            if (score >= threshold) return;

            const studentId = studentIdOf(result);
            if (!studentId) return;

            if (!studentsAtRisk.has(studentId)) {
                studentsAtRisk.set(studentId, []);
            }

            studentsAtRisk.get(studentId).push({
                testName: test.title || test.name || tr("unknown"),
                score,
                threshold
            });
        });

        if (studentsAtRisk.size === 0) {
            container.innerHTML = `
            <p class="text-muted mb-0">
                ${escapeHTML(tr("riskStudentsEmpty"))}
            </p>
        `;
            return;
        }

        container.innerHTML = [...studentsAtRisk.entries()]
            .map(([studentId, failedTests]) => {
                const student = users.find(user =>
                    String(user.id) === studentId
                );

                const testsHTML = failedTests.map(test => `
                <li>
                    ${escapeHTML(test.testName)}:
                    <strong>${escapeHTML(test.score)}/100</strong>
                    (${escapeHTML(tr("threshold"))}:
                    ${escapeHTML(test.threshold)}/100)
                </li>
            `).join("");

                return `
                <div class="border rounded p-3 mb-3">
                    <div class="d-flex justify-content-between
                                align-items-center gap-2">
                        <strong>${escapeHTML(studentName(student))}</strong>
                        <span class="badge bg-danger">
                            ${failedTests.length}
                            ${escapeHTML(tr("riskFailedTests"))}
                        </span>
                    </div>
                    <ul class="mt-2 mb-0">
                        ${testsHTML}
                    </ul>
                </div>
            `;
            }).join("");
    }

    function render() {
        const lang = language();
        document.documentElement.lang = lang === "kz" ? "kk" : lang;

        const selector = document.getElementById("languageSelect");
        selector.value = lang;

        const labels = {
            pageTitle: "title",
            backButton: "back",
            averageLabel: "average",
            completedLabel: "completed",
            riskLabel: "risk",
            resultsTitle: "results",
            studentHeader: "student",
            testHeader: "test",
            scoreHeader: "score",
            thresholdHeader: "threshold",
            statusHeader: "status"
        };

        Object.entries(labels).forEach(([id, key]) => {
            setText(id, tr(key));
        });

        const params = new URLSearchParams(window.location.search);
        const classId = params.get("class");
        const teacherId = params.get("teacher");

        const classes = read("advantaClasses");
        const users = read("advantaUsers");
        const tests = read("advantaTests");
        const results = latestResults(read("advantaResults"));

        const cls = classes.find(item =>
            String(item.id) === String(classId)
        );

        const teacher = users.find(item =>
            String(item.id) === String(teacherId)
        );

        const demoTeacher = {
            id: "teacher_math_1",
            name: "Айгуль Сериковна",
            subjectId: "math"
        };

        const selectedTeacher =
            teacher || (
                teacherId === demoTeacher.id ? demoTeacher : null
            );

        const teacherName = selectedTeacher
            ? studentName(selectedTeacher)
            : tr("noTeacher");

        const subjectId = String(
            selectedTeacher?.subjectId || cls?.subjectId || ""
        ).toLowerCase();

        const subject = translations[lang].subjects[subjectId] ||
            selectedTeacher?.subjectName ||
            cls?.subjectName ||
            subjectId ||
            tr("unknown");

        const className = cls
            ? (cls.name || cls.className || classId)
            : tr("noClass");

        setText(
            "classDescription",
            `${className} · ${tr("teacher")}: ${teacherName} · ${tr("subject")}: ${subject}`
        );

        const classTests = tests.filter(test =>
            String(test.teacherId) === String(teacherId) &&
            String(test.classId) === String(classId)
        );

        const classTestMap = new Map(
            classTests.map(test => [String(test.id), test])
        );

        const classResults = results.filter(result =>
            classTestMap.has(testIdOf(result))
        );

        const scored = classResults
            .map(scoreOf)
            .filter(value => value !== null);

        const average = scored.length
            ? Math.round(
                scored.reduce((sum, value) => sum + value, 0) /
                scored.length
            )
            : null;

        const failed = classResults.filter(result => {
            const score = scoreOf(result);
            const test = classTestMap.get(testIdOf(result));
            const threshold = Number(
                test?.passingScore ?? test?.passScore ??
                test?.threshold ?? 50
            );
            return score !== null && score < threshold;
        });

        setText(
            "averageScore",
            average === null ? "—" : `${average}/100`
        );
        setText("completedCount", classResults.length);
        setText("riskCount", failed.length);
        renderRiskStudents(classResults, classTestMap, users);

        const tbody = document.getElementById("analyticsTableBody");

        if (!classResults.length) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-muted text-center py-4">
                        ${escapeHTML(tr("noData"))}
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = classResults.map(result => {
            const test = classTestMap.get(testIdOf(result));
            const student = users.find(user =>
                String(user.id) === studentIdOf(result)
            );

            const score = scoreOf(result);
            const threshold = Number(
                test?.passingScore ?? test?.passScore ??
                test?.threshold ?? 50
            );

            const passed = score !== null && score >= threshold;
            const status = score === null
                ? "—"
                : passed ? tr("passed") : tr("failed");

            const badgeClass = score === null
                ? "bg-secondary"
                : passed ? "bg-success" : "bg-danger";

            return `
                <tr>
                    <td>${escapeHTML(studentName(student))}</td>
                    <td>${escapeHTML(test?.title || test?.name || tr("unknown"))}</td>
                    <td>${score === null ? "—" : escapeHTML(score + "/100")}</td>
                    <td>${escapeHTML(threshold + "/100")}</td>
                    <td>
                        <span class="badge ${badgeClass}">
                            ${escapeHTML(status)}
                        </span>
                    </td>
                </tr>
            `;
        }).join("");
    }

    document.addEventListener("DOMContentLoaded", () => {
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
    });
})();