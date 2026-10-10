(() => {
    "use strict";

    const words = window.AdvantaI18n.scope("vice-principal-classes");

    const DEMO_TEACHER = {
        id: "teacher_math_1",
        name: "Айгуль Сериковна",
        classIds: ["class_5a", "class_5b", "class_6a"]
    };

    function read(key) {
        try {
            const value = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(value) ? value : [];
        } catch {
            return [];
        }
    }

    function lang() {
        const value = localStorage.getItem("language") || "ru";
        return words[value] ? value : "ru";
    }

    function tr(key) {
        return words[lang()][key] || key;
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

    function studentIdOf(result) {
        return String(result.studentId ?? result.userId ?? "");
    }

    function testIdOf(result) {
        return String(
            result.testId ?? result.testID ?? result.test?.id ?? ""
        );
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
        const value = result.completedAt ??
            result.createdAt ?? result.date ?? 0;
        const time = new Date(value).getTime();
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

    function testBelongsToClass(test, cls) {
        if (String(test.classId ?? "") === String(cls.id)) {
            return true;
        }

        if (
            Array.isArray(test.classIds) &&
            test.classIds.some(id => String(id) === String(cls.id))
        ) {
            return true;
        }

        return Boolean(
            test.className &&
            test.className === (cls.name || cls.className)
        );
    }

    function resultBelongsToClass(result, cls, students, tests) {
        if (result.classId !== undefined && result.classId !== null) {
            return String(result.classId) === String(cls.id);
        }

        const studentId = studentIdOf(result);

        if (studentId && students.some(student =>
            String(student.id) === studentId
        )) {
            return true;
        }

        const testId = testIdOf(result);

        return Boolean(testId && tests.some(test =>
            String(test.id) === testId
        ));
    }

    function getTeachers(users, classes, tests) {
        const teachers = new Map();

        function add(item) {
            if (!item?.id) return;

            const id = String(item.id);
            const previous = teachers.get(id) || {};

            teachers.set(id, {
                ...previous,
                ...item,
                id,
                classIds: [...new Set([
                    ...(previous.classIds || []),
                    ...(item.classIds || [])
                ].map(String))]
            });
        }

        add(DEMO_TEACHER);

        users.filter(user =>
            String(user.role || "").toLowerCase() === "teacher"
        ).forEach(add);

        classes.forEach(cls => {
            if (!cls.teacherId) return;

            const previous = teachers.get(String(cls.teacherId)) || {
                id: String(cls.teacherId),
                classIds: []
            };

            add({
                ...previous,
                classIds: [...previous.classIds, cls.id]
            });
        });

        tests.forEach(test => {
            if (!test.teacherId) return;

            const previous = teachers.get(String(test.teacherId)) || {
                id: String(test.teacherId),
                classIds: []
            };

            add({
                ...previous,
                classIds: [
                    ...previous.classIds,
                    ...(test.classId ? [test.classId] : []),
                    ...(Array.isArray(test.classIds) ? test.classIds : [])
                ]
            });
        });

        return [...teachers.values()];
    }

    function getClassTeacher(cls, teachers, tests) {
        const matched = teachers.filter(teacher => {
            if (String(cls.teacherId ?? "") === teacher.id) return true;

            if ((teacher.classIds || []).some(id =>
                String(id) === String(cls.id)
            )) return true;

            return tests.some(test =>
                String(test.teacherId) === teacher.id &&
                testBelongsToClass(test, cls)
            );
        });

        return matched;
    }

    function statusBadge(avg) {
        if (avg === null) {
            return `<span class="badge bg-secondary">${escapeHTML(tr("noData"))}</span>`;
        }

        if (avg < 50) {
            return `<span class="badge bg-danger">${escapeHTML(tr("critical"))}</span>`;
        }

        if (avg < 70) {
            return `<span class="badge bg-warning text-dark">${escapeHTML(tr("attention"))}</span>`;
        }

        return `<span class="badge bg-success">${escapeHTML(tr("good"))}</span>`;
    }

    function loadData() {
        const classes = read("advantaClasses");
        const users = read("advantaUsers");
        const tests = read("advantaTests");
        const results = latestResults(read("advantaResults"));
        const teachers = getTeachers(users, classes, tests);

        const rows = classes.map(cls => {
            const students = users.filter(user =>
                user.role === "student" &&
                user.status === "active" &&
                String(user.classId) === String(cls.id)
            );

            const classTests = tests.filter(test =>
                testBelongsToClass(test, cls)
            );

            const classResults = results.filter(result =>
                resultBelongsToClass(
                    result, cls, students, classTests
                )
            );

            const scores = classResults
                .map(scoreOf)
                .filter(score => score !== null);

            const average = scores.length
                ? Math.round(
                    scores.reduce((sum, score) => sum + score, 0) /
                    scores.length
                )
                : null;

            return {
                id: String(cls.id),
                name: cls.name || cls.className || String(cls.id),
                students: students.length,
                teachers: getClassTeacher(cls, teachers, tests),
                average,
                results: classResults
            };
        });

        return { rows };
    }

    function render() {
        const language = lang();
        document.documentElement.lang =
            language === "kz" ? "kk" : language;

        document.getElementById("languageSelect").value = language;

        const labels = {
            navOverview: "navOverview",
            navClasses: "navClasses",
            navTeachers: "navTeachers",
            navTests: "navTests",
            navResults: "navResults",
            navAnalytics: "navAnalytics",
            pageTitle: "pageTitle",
            pageDescription: "pageDescription",
            totalClassesLabel: "totalClasses",
            totalStudentsLabel: "totalStudents",
            averageLabel: "average",
            searchLabel: "search",
            classesTitle: "classesTitle",
            classHeader: "class",
            studentsHeader: "students",
            teacherHeader: "teacher",
            scoreHeader: "score",
            statusHeader: "status",
            actionHeader: "action"
        };

        Object.entries(labels).forEach(([id, key]) => {
            setText(id, tr(key));
        });

        document.getElementById("classSearch").placeholder =
            tr("placeholder");

        const data = loadData();
        const allRows = data.rows;

        const search = document.getElementById("classSearch")
            .value.trim().toLowerCase();

        const filtered = allRows.filter(row =>
            row.name.toLowerCase().includes(search)
        );

        const totalStudents = allRows.reduce(
            (sum, row) => sum + row.students, 0
        );

        const allScores = allRows.flatMap(row =>
            row.results.map(scoreOf).filter(score => score !== null)
        );

        const average = allScores.length
            ? Math.round(
                allScores.reduce((sum, score) => sum + score, 0) /
                allScores.length
            )
            : null;

        setText("totalClasses", allRows.length);
        setText("totalStudents", totalStudents);
        setText(
            "averageScore",
            average === null ? "—" : `${average}/100`
        );

        const tbody = document.getElementById("classesTableBody");

        if (!filtered.length) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-muted py-4">
                        ${escapeHTML(tr("empty"))}
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = filtered.map(row => {
            const teacherNames = row.teachers.map(teacher =>
                teacher.name ||
                [teacher.firstName, teacher.lastName]
                    .filter(Boolean).join(" ") ||
                tr("noTeacher")
            ).join(", ");

            const teacherId = row.teachers[0]?.id || "";

            return `
                <tr>
                    <td class="fw-semibold">${escapeHTML(row.name)}</td>
                    <td>${row.students}</td>
                    <td>${escapeHTML(teacherNames || tr("noTeacher"))}</td>
                    <td>${row.average === null ? "—" : row.average + "/100"}</td>
                    <td>${statusBadge(row.average)}</td>
                    <td>
                        <button
                            type="button"
                            class="btn btn-sm btn-outline-primary"
                            data-class-id="${escapeHTML(row.id)}"
                            data-teacher-id="${escapeHTML(teacherId)}"
                        >
                            ${escapeHTML(tr("details"))}
                        </button>
                    </td>
                </tr>
            `;
        }).join("");
    }

    function initialize() {
        document.getElementById("classSearch")
            .addEventListener("input", render);

        document.getElementById("classesTableBody")
            .addEventListener("click", event => {
                const button = event.target.closest("[data-class-id]");
                if (!button) return;

                const classId = button.dataset.classId;
                const teacherId = button.dataset.teacherId;

                const params = new URLSearchParams({
                    class: classId,
                    teacher: teacherId
                });

                window.location.href =
                    `vice-principal-analytics.html?${params.toString()}`;
            });

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