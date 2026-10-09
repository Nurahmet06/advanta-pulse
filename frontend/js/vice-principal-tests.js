(() => {
    "use strict";

    const translations = {
        ru: {
            navOverview: "Обзор",
            navClasses: "Все классы",
            navTeachers: "Учителя",
            navTests: "Все тесты",
            navResults: "Результаты",
            navAnalytics: "Аналитика",
            pageTitle: "Все тесты",
            pageDescription: "Мониторинг тестов всех учителей",
            totalTestsLabel: "Всего тестов",
            publishedTestsLabel: "Опубликовано",
            completedResultsLabel: "Выполнений",
            averageScoreLabel: "Средний балл",
            searchLabel: "Поиск теста",
            searchPlaceholder: "Название теста",
            statusFilterLabel: "Статус",
            teacherFilterLabel: "Учитель",
            testsTitle: "Список тестов",
            testHeader: "Тест",
            teacherHeader: "Учитель",
            classesHeader: "Классы",
            statusHeader: "Статус",
            resultsHeader: "Выполнений",
            scoreHeader: "Средний балл",
            actionHeader: "Действие",
            allStatuses: "Все статусы",
            allTeachers: "Все учителя",
            draft: "Черновик",
            published: "Опубликован",
            finished: "Завершён",
            details: "Анализ",
            noTeacher: "Не указан",
            noClasses: "Не назначены",
            noData: "Нет данных",
            empty: "Тесты не найдены",
            unknown: "Неизвестный статус"
        },

        kz: {
            navOverview: "Шолу",
            navClasses: "Барлық сыныптар",
            navTeachers: "Мұғалімдер",
            navTests: "Барлық тесттер",
            navResults: "Нәтижелер",
            navAnalytics: "Талдау",
            pageTitle: "Барлық тесттер",
            pageDescription: "Барлық мұғалімдердің тесттерін бақылау",
            totalTestsLabel: "Тесттер саны",
            publishedTestsLabel: "Жарияланған",
            completedResultsLabel: "Орындалған тесттер",
            averageScoreLabel: "Орташа балл",
            searchLabel: "Тестті іздеу",
            searchPlaceholder: "Тест атауы",
            statusFilterLabel: "Мәртебе",
            teacherFilterLabel: "Мұғалім",
            testsTitle: "Тесттер тізімі",
            testHeader: "Тест",
            teacherHeader: "Мұғалім",
            classesHeader: "Сыныптар",
            statusHeader: "Мәртебе",
            resultsHeader: "Орындалған",
            scoreHeader: "Орташа балл",
            actionHeader: "Әрекет",
            allStatuses: "Барлық мәртебелер",
            allTeachers: "Барлық мұғалімдер",
            draft: "Жоба",
            published: "Жарияланған",
            finished: "Аяқталған",
            details: "Талдау",
            noTeacher: "Көрсетілмеген",
            noClasses: "Тағайындалмаған",
            noData: "Дерек жоқ",
            empty: "Тесттер табылмады",
            unknown: "Белгісіз мәртебе"
        },

        en: {
            navOverview: "Overview",
            navClasses: "All Classes",
            navTeachers: "Teachers",
            navTests: "All Tests",
            navResults: "Results",
            navAnalytics: "Analytics",
            pageTitle: "All Tests",
            pageDescription: "Monitoring tests from all teachers",
            totalTestsLabel: "Total tests",
            publishedTestsLabel: "Published",
            completedResultsLabel: "Completions",
            averageScoreLabel: "Average score",
            searchLabel: "Search tests",
            searchPlaceholder: "Test name",
            statusFilterLabel: "Status",
            teacherFilterLabel: "Teacher",
            testsTitle: "Test list",
            testHeader: "Test",
            teacherHeader: "Teacher",
            classesHeader: "Classes",
            statusHeader: "Status",
            resultsHeader: "Completions",
            scoreHeader: "Average score",
            actionHeader: "Action",
            allStatuses: "All statuses",
            allTeachers: "All teachers",
            draft: "Draft",
            published: "Published",
            finished: "Finished",
            details: "Analysis",
            noTeacher: "Not specified",
            noClasses: "Not assigned",
            noData: "No data",
            empty: "No tests found",
            unknown: "Unknown status"
        }
    };

    const DEMO_TEACHER = {
        id: "teacher_math_1",
        name: "Айгуль Сериковна"
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
        const selected = localStorage.getItem("language") || "ru";
        return translations[selected] ? selected : "ru";
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
        return String(value ?? "").replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[character]));
    }

    function testIdOf(result) {
        return String(
            result.testId ?? result.testID ?? result.test?.id ?? ""
        );
    }

    function studentIdOf(result) {
        return String(result.studentId ?? result.userId ?? "");
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

    function resultTime(result) {
        const date = result.completedAt ??
            result.createdAt ?? result.date ?? 0;

        const timestamp = new Date(date).getTime();

        return Number.isFinite(timestamp) ? timestamp : 0;
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
            const existing = unique.get(key);

            if (!existing || resultTime(result) >= resultTime(existing)) {
                unique.set(key, result);
            }
        });

        return [...unique.values()];
    }

    function normalizeStatus(status) {
        const value = String(status || "").toLowerCase();

        if (["draft", "черновик"].includes(value)) return "draft";

        if (["published", "active", "опубликован"].includes(value)) {
            return "published";
        }

        if (["finished", "completed", "завершён", "завершен"].includes(value)) {
            return "finished";
        }

        return "unknown";
    }

    function statusBadge(status) {
        const normalized = normalizeStatus(status);

        const colors = {
            draft: "secondary",
            published: "primary",
            finished: "success",
            unknown: "secondary"
        };

        return `
            <span class="badge bg-${colors[normalized]}">
                ${escapeHTML(tr(normalized))}
            </span>
        `;
    }

    function teacherName(teacherId, users) {
        const teacher = users.find(user =>
            String(user.id) === String(teacherId)
        );

        if (teacher) {
            return teacher.name ||
                [teacher.firstName, teacher.lastName]
                    .filter(Boolean).join(" ") ||
                tr("noTeacher");
        }

        if (String(teacherId) === DEMO_TEACHER.id) {
            return DEMO_TEACHER.name;
        }

        return tr("noTeacher");
    }

    function classNames(test, classes) {
        const ids = [
            ...(test.classId ? [test.classId] : []),
            ...(Array.isArray(test.classIds) ? test.classIds : [])
        ].map(String);

        const names = [...new Set(ids)].map(id => {
            const cls = classes.find(item => String(item.id) === id);
            return cls?.name || cls?.className || id;
        });

        if (!names.length && test.className) {
            names.push(test.className);
        }

        return names.length ? names.join(", ") : tr("noClasses");
    }

    function loadData() {
        const tests = read("advantaTests");
        const users = read("advantaUsers");
        const classes = read("advantaClasses");
        const results = latestResults(read("advantaResults"));

        const rows = tests.map(test => {
            const testResults = results.filter(result =>
                testIdOf(result) === String(test.id)
            );

            const scores = testResults.map(scoreOf)
                .filter(score => score !== null);

            const average = scores.length
                ? Math.round(
                    scores.reduce((sum, score) => sum + score, 0) /
                    scores.length
                )
                : null;

            return {
                id: String(test.id),
                title: test.title || test.name || String(test.id),
                teacherId: String(test.teacherId ?? ""),
                teacher: teacherName(test.teacherId, users),
                classes: classNames(test, classes),
                status: normalizeStatus(test.status),
                completions: testResults.length,
                average
            };
        });

        return { rows, results };
    }

    function render() {
        const currentLanguage = language();

        document.documentElement.lang =
            currentLanguage === "kz" ? "kk" : currentLanguage;

        const languageSelect = document.getElementById("languageSelect");
        languageSelect.value = currentLanguage;

        [
            "navOverview", "navClasses", "navTeachers",
            "navTests", "navResults", "navAnalytics",
            "pageTitle", "pageDescription",
            "totalTestsLabel", "publishedTestsLabel",
            "completedResultsLabel", "averageScoreLabel",
            "searchLabel", "statusFilterLabel",
            "teacherFilterLabel", "testsTitle",
            "testHeader", "teacherHeader", "classesHeader",
            "statusHeader", "resultsHeader", "scoreHeader",
            "actionHeader"
        ].forEach(id => setText(id, tr(id)));

        document.getElementById("testSearch").placeholder =
            tr("searchPlaceholder");

        const statusFilter = document.getElementById("statusFilter");
        const selectedStatus = statusFilter.value;

        statusFilter.innerHTML = `
            <option value="all">${escapeHTML(tr("allStatuses"))}</option>
            <option value="draft">${escapeHTML(tr("draft"))}</option>
            <option value="published">${escapeHTML(tr("published"))}</option>
            <option value="finished">${escapeHTML(tr("finished"))}</option>
        `;

        statusFilter.value = selectedStatus;

        const { rows, results } = loadData();

        const teacherFilter = document.getElementById("teacherFilter");
        const selectedTeacher = teacherFilter.value;

        const teacherOptions = new Map();

        rows.forEach(row => {
            if (row.teacherId) {
                teacherOptions.set(row.teacherId, row.teacher);
            }
        });

        teacherFilter.innerHTML = `
            <option value="all">${escapeHTML(tr("allTeachers"))}</option>
            ${[...teacherOptions.entries()].map(([id, name]) => `
                <option value="${escapeHTML(id)}">
                    ${escapeHTML(name)}
                </option>
            `).join("")}
        `;

        teacherFilter.value = [...teacherOptions.keys()]
            .includes(selectedTeacher) ? selectedTeacher : "all";

        const search = document.getElementById("testSearch")
            .value.trim().toLowerCase();

        const filtered = rows.filter(row => {
            const matchesSearch =
                row.title.toLowerCase().includes(search);

            const matchesStatus =
                statusFilter.value === "all" ||
                row.status === statusFilter.value;

            const matchesTeacher =
                teacherFilter.value === "all" ||
                row.teacherId === teacherFilter.value;

            return matchesSearch && matchesStatus && matchesTeacher;
        });

        const validResults = results.filter(result =>
            rows.some(row => row.id === testIdOf(result))
        );

        const scores = validResults.map(scoreOf)
            .filter(score => score !== null);

        const average = scores.length
            ? Math.round(
                scores.reduce((sum, score) => sum + score, 0) /
                scores.length
            )
            : null;

        setText("totalTests", rows.length);

        setText(
            "publishedTests",
            rows.filter(row => row.status === "published").length
        );

        setText("completedResults", validResults.length);

        setText(
            "averageScore",
            average === null ? "—" : `${average}/100`
        );

        const tbody = document.getElementById("testsTableBody");

        if (!filtered.length) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-muted py-4">
                        ${escapeHTML(tr("empty"))}
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = filtered.map(row => `
            <tr>
                <td class="fw-semibold">${escapeHTML(row.title)}</td>
                <td>${escapeHTML(row.teacher)}</td>
                <td>${escapeHTML(row.classes)}</td>
                <td>${statusBadge(row.status)}</td>
                <td>${row.completions}</td>
                <td>
                    ${row.average === null ? "—" : row.average + "/100"}
                </td>
                <td>
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-primary"
                        data-test-id="${escapeHTML(row.id)}"
                    >
                        ${escapeHTML(tr("details"))}
                    </button>
                </td>
            </tr>
        `).join("");
    }

    function initialize() {
        document.getElementById("testSearch")
            .addEventListener("input", render);

        document.getElementById("statusFilter")
            .addEventListener("change", render);

        document.getElementById("teacherFilter")
            .addEventListener("change", render);

        document.getElementById("languageSelect")
            .addEventListener("change", event => {
                if (typeof setLanguage === "function") {
                    setLanguage(event.target.value);
                } else {
                    localStorage.setItem("language", event.target.value);
                }

                render();
            });

        document.getElementById("testsTableBody")
            .addEventListener("click", event => {
                const button = event.target.closest("[data-test-id]");
                if (!button) return;

                const testId = button.dataset.testId;

                // Детальная аналитика отдельного теста
                // будет добавлена следующим этапом.
                alert(
                    `${tr("details")}: ${testId}`
                );
            });

        window.addEventListener("languageChanged", render);

        render();
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();