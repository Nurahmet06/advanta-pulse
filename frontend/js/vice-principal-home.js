/* =========================================================
   ADVANTA PULSE — VICE PRINCIPAL DASHBOARD
   School quality monitoring · MVP
   ========================================================= */

(function () {
    "use strict";

    const STORAGE = {
        classes: "advantaClasses",
        users: "advantaUsers",
        tests: "advantaTests",
        results: "advantaResults"
    };

    // Temporary demo teacher.
    // Later teachers will come from the staff database.
    const DEMO_TEACHER = {
        id: "teacher_math_1",
        name: "Айгуль Сериковна",
        subjectId: "math",
        subjectName: "Математика",
        classIds: ["class_5a", "class_5b", "class_6a"]
    };

    const translations = window.AdvantaI18n.scope("vice-principal-home");

    function readArray(key) {
        try {
            const data = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(data) ? data : [];
        } catch {
            return [];
        }
    }

    function getLanguage() {
        const value = typeof getCurrentLanguage === "function"
            ? getCurrentLanguage()
            : localStorage.getItem("language");

        return ["ru", "kz", "en"].includes(value) ? value : "ru";
    }

    function tr(key) {
        return translations[getLanguage()]?.[key]
            || translations.ru[key]
            || key;
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

    function normalizeScore(value) {
        if (value === null || value === undefined || value === "") {
            return null;
        }

        const score = Number(value);

        return Number.isFinite(score) && score >= 0 && score <= 100
            ? score
            : null;
    }

    function getResultTestId(result) {
        return result.testId ?? result.testID ?? result.test?.id ?? null;
    }

    function getResultStudentId(result) {
        return result.studentId ?? result.userId ?? null;
    }

    function getLatestResults(results) {
        const latest = new Map();

        results.forEach((result, index) => {
            const studentId = getResultStudentId(result);
            const testId = getResultTestId(result);

            if (studentId == null || testId == null ||
                normalizeScore(result.score) === null) {
                return;
            }

            const key = JSON.stringify([
                String(studentId),
                String(testId)
            ]);

            const timestamp = Date.parse(
                result.completedAt ?? result.createdAt ?? result.date ?? ""
            ) || 0;

            const previous = latest.get(key);

            if (!previous ||
                timestamp > previous.timestamp ||
                (timestamp === previous.timestamp && index > previous.index)) {
                latest.set(key, { result, timestamp, index });
            }
        });

        return [...latest.values()].map(item => item.result);
    }

    function getTeachers(users, classes, tests) {
        const teachers = new Map();

        function addTeacher(teacher) {
            if (!teacher?.id) return;

            const id = String(teacher.id);
            const previous = teachers.get(id) || {};

            teachers.set(id, {
                ...previous,
                ...teacher,
                id,
                classIds: [...new Set([
                    ...(previous.classIds || []),
                    ...(teacher.classIds || [])
                ].map(String))]
            });
        }

        // Demo teacher is available until real staff accounts exist.
        addTeacher(DEMO_TEACHER);

        users.filter(user =>
            ["teacher", "учитель"].includes(
                String(user.role || "").toLowerCase()
            )
        ).forEach(user => {
            addTeacher({
                ...user,
                name: user.name ||
                    [user.firstName, user.lastName].filter(Boolean).join(" ")
            });
        });

        classes.forEach(cls => {
            if (!cls.teacherId) return;

            const id = String(cls.teacherId);
            const teacher = teachers.get(id) || {
                id,
                name: "",
                classIds: []
            };

            addTeacher({
                ...teacher,
                classIds: [...teacher.classIds, cls.id],
                subjectId: cls.subjectId || teacher.subjectId,
                subjectName: cls.subjectName || teacher.subjectName
            });
        });

        tests.forEach(test => {
            if (!test.teacherId) return;

            const id = String(test.teacherId);
            const teacher = teachers.get(id) || {
                id,
                name: "",
                classIds: []
            };

            addTeacher({
                ...teacher,
                classIds: test.classId
                    ? [...teacher.classIds, test.classId]
                    : teacher.classIds,
                subjectId: teacher.subjectId || test.subjectId,
                subjectName: teacher.subjectName || test.subject
            });
        });

        return [...teachers.values()];
    }

    function getClassForResult(result, classes, users, tests) {
        const test = tests.find(item =>
            String(item.id) === String(getResultTestId(result))
        );

        const student = users.find(item =>
            String(item.id) === String(getResultStudentId(result))
        );

        const classId = result.classId ??
            test?.classId ??
            student?.classId;

        if (classId != null) {
            const found = classes.find(cls =>
                String(cls.id) === String(classId)
            );
            if (found) return found;
        }

        const className = result.className ??
            test?.className ??
            student?.className;

        return classes.find(cls =>
            String(cls.name || cls.className) === String(className)
        ) || null;
    }

    function getTestForResult(result, tests) {
        return tests.find(test =>
            String(test.id) === String(getResultTestId(result))
        ) || null;
    }

    function getSubjectDisplayName(subjectId, fallbackName) {
    const lang = getLanguage();

    const subjects = {
        math: {
            ru: "Математика",
            kz: "Математика",
            en: "Mathematics"
        },
        english: {
            ru: "Английский язык",
            kz: "Ағылшын тілі",
            en: "English"
        },
        physics: {
            ru: "Физика",
            kz: "Физика",
            en: "Physics"
        }
    };

    const id = String(subjectId || "").toLowerCase();

    if (subjects[id]) {
        return subjects[id][lang];
    }

    return fallbackName || tr("vpUnknownSubject");
}

    function getSubjectForResult(result, test, cls) {
        return {
            id: String(
                test?.subjectId ??
                result.subjectId ??
                cls?.subjectId ??
                test?.subject ??
                result.subject ??
                "unknown"
            ),
            name: getSubjectDisplayName(
                test?.subjectId ??
                result.subjectId ??
                cls?.subjectId ??
                test?.subject ??
                result.subject,
                test?.subjectName ??
                test?.subject ??
                result.subject ??
                cls?.subjectName
            )
        };
    }

    function average(scores) {
        if (!scores.length) return null;

        return Math.round(
            scores.reduce((sum, score) => sum + score, 0) /
            scores.length
        );
    }

    function getStatus(score) {
        if (score === null) {
            return {
                key: "vpInsufficient",
                color: "#6c757d",
                badge: "secondary"
            };
        }

        if (score < 50) {
            return {
                key: "vpCritical",
                color: "#dc3545",
                badge: "danger"
            };
        }

        if (score < 70) {
            return {
                key: "vpAttention",
                color: "#d39e00",
                badge: "warning"
            };
        }

        if (score < 90) {
            return {
                key: "vpGood",
                color: "#0d6efd",
                badge: "primary"
            };
        }

        return {
            key: "vpExcellent",
            color: "#198754",
            badge: "success"
        };
    }

    function badgeHTML(score) {
        const status = getStatus(score);

        return `<span class="badge text-bg-${status.badge}">
            ${escapeHTML(tr(status.key))}
        </span>`;
    }

    function buildAnalytics() {
        const classes = readArray(STORAGE.classes);
        const users = readArray(STORAGE.users);
        const tests = readArray(STORAGE.tests);
        const results = getLatestResults(readArray(STORAGE.results));
        const teachers = getTeachers(users, classes, tests);

        const students = users.filter(user =>
            String(user.role || "").toLowerCase() === "student"
        );

        const groups = new Map();

        results.forEach(result => {
            const cls = getClassForResult(result, classes, users, tests);
            if (!cls) return;

            const test = getTestForResult(result, tests);
            const subject = getSubjectForResult(result, test, cls);

            const teacherId = String(
                test?.teacherId ?? cls.teacherId ?? ""
            );

            const key = JSON.stringify([
                String(cls.id),
                subject.id,
                teacherId
            ]);

            if (!groups.has(key)) {
                groups.set(key, {
                    cls,
                    subject,
                    teacherId,
                    scores: [],
                    studentIds: new Set(),
                    testIds: new Set()
                });
            }

            const group = groups.get(key);
            group.scores.push(normalizeScore(result.score));
            group.studentIds.add(String(getResultStudentId(result)));
            group.testIds.add(String(getResultTestId(result)));
        });

        const classSubjects = [...groups.values()].map(group => ({
            ...group,
            average: average(group.scores),
            resultCount: group.scores.length,
            studentCount: group.studentIds.size,
            testCount: group.testIds.size,
            teacher: teachers.find(item =>
                String(item.id) === group.teacherId
            ) || null
        }));

        return {
            classes,
            users,
            tests,
            results,
            teachers,
            students,
            classSubjects
        };
    }

    function renderKPI(data) {
        document.getElementById("totalStudents").textContent =
            data.students.length;

        document.getElementById("totalTeachers").textContent =
            data.teachers.length;

        document.getElementById("totalClasses").textContent =
            data.classes.length;

        const schoolAverage = average(
            data.results
                .map(result => normalizeScore(result.score))
                .filter(score => score !== null)
        );

        const element = document.getElementById("averageScore");
        element.textContent = schoolAverage === null
            ? "—"
            : `${schoolAverage}/100`;

        element.style.color = getStatus(schoolAverage).color;
    }

    function renderCritical(data) {
        const container = document.getElementById("criticalClasses");

        const critical = data.classSubjects
            .filter(item => item.average !== null && item.average < 70)
            .sort((a, b) => a.average - b.average);

        if (!critical.length) {
            container.innerHTML = `
                <p class="text-muted mb-0">
                    ${escapeHTML(tr("vpNoCritical"))}
                </p>
            `;
            return;
        }

        container.innerHTML = critical.map(item => {
            const teacherName = item.teacher?.name ||
                tr("vpUnknownTeacher");

            return `
                <div class="border rounded p-3 mb-3">
                    <div class="d-flex justify-content-between
                                align-items-center flex-wrap gap-2">
                        <div>
                            <strong>
                                ${escapeHTML(item.cls.name || item.cls.className || item.cls.id)}
                                — ${escapeHTML(item.subject.name)}
                            </strong>
                            <div class="text-muted small">
                                ${escapeHTML(teacherName)}
                            </div>
                        </div>
                        <div class="text-end">
                            <strong style="color:${getStatus(item.average).color}">
                                ${item.average}/100
                            </strong>
                            <div>${badgeHTML(item.average)}</div>
                        </div>
                    </div>
                    <div class="text-muted small mt-2">
                        ${escapeHTML(tr("vpStudentsTested"))}: ${item.studentCount}
                        · ${escapeHTML(tr("vpCompleted"))}: ${item.resultCount}
                    </div>
                </div>
            `;
        }).join("");
    }

    function renderTeachers(data) {
        const tbody = document.getElementById("teachersTableBody");

        if (!data.teachers.length) {
            tbody.innerHTML = `
                <tr><td colspan="6" class="text-muted">
                    ${escapeHTML(tr("vpNoTeachers"))}
                </td></tr>
            `;
            return;
        }

        tbody.innerHTML = data.teachers.map(teacher => {
            const teacherTests = data.tests.filter(test =>
                String(test.teacherId) === String(teacher.id)
            );

            const teacherResults = data.results.filter(result => {
                const test = getTestForResult(result, data.tests);
                return test &&
                    String(test.teacherId) === String(teacher.id);
            });

            const scores = teacherResults.map(result =>
                normalizeScore(result.score)
            ).filter(score => score !== null);

            const avg = average(scores);
            const classNames = (teacher.classIds || []).map(id => {
                const cls = data.classes.find(item =>
                    String(item.id) === String(id)
                );

                return cls?.name || cls?.className || id;
            });

            return `
                <tr>
                    <td class="fw-semibold">
                        ${escapeHTML(teacher.name || tr("vpUnknownTeacher"))}
                    </td>
                    <td>
                        ${escapeHTML(getSubjectDisplayName(teacher.subjectId, teacher.subjectName))}
                    </td>
                    <td>
                        ${escapeHTML(classNames.join(", ") || tr("vpUnassigned"))}
                    </td>
                    <td>${teacherTests.length}</td>
                    <td style="color:${getStatus(avg).color};font-weight:600">
                        ${avg === null ? "—" : avg + "/100"}
                    </td>
                    <td>${badgeHTML(avg)}</td>
                </tr>
            `;
        }).join("");
    }

    function renderClassPerformance(data) {
        const container = document.getElementById("classPerformance");

        if (!data.classSubjects.length) {
            container.innerHTML = `
                <p class="text-muted">
                    ${escapeHTML(tr("vpNoData"))}
                </p>
            `;
            return;
        }

        const sorted = [...data.classSubjects]
            .sort((a, b) => a.average - b.average);

        container.innerHTML = sorted.map(item => {
            const teacherName = item.teacher?.name ||
                tr("vpUnknownTeacher");

            const status = getStatus(item.average);

            return `
                <div class="border-bottom py-3">
                    <div class="d-flex justify-content-between
                                align-items-center flex-wrap gap-2 mb-2">
                        <div>
                            <strong>
                                ${escapeHTML(item.cls.name || item.cls.className || item.cls.id)}
                                — ${escapeHTML(item.subject.name)}
                            </strong>
                            <div class="text-muted small">
                                ${escapeHTML(teacherName)}
                            </div>
                        </div>
                        <div class="text-end">
                            <strong style="color:${status.color}">
                                ${item.average}/100
                            </strong>
                            <div>${badgeHTML(item.average)}</div>
                        </div>
                    </div>

                    <div class="progress" style="height:10px">
                        <div class="progress-bar"
                             style="width:${item.average}%;
                                    background:${status.color}"
                             role="progressbar"
                             aria-valuenow="${item.average}"
                             aria-valuemin="0"
                             aria-valuemax="100">
                        </div>
                    </div>

                    <div class="text-muted small mt-2">
                        ${escapeHTML(tr("vpStudentsTested"))}: ${item.studentCount}
                        · ${escapeHTML(tr("vpCompleted"))}: ${item.resultCount}
                    </div>
                </div>
            `;
        }).join("");
    }

    function applyTranslations() {
        const lang = getLanguage();

        document.documentElement.lang = lang === "kz" ? "kk" : lang;

        document.querySelectorAll("[data-i18n]").forEach(element => {
            element.textContent = tr(element.dataset.i18n);
        });

        const select = document.getElementById("languageSelect");
        if (select) select.value = lang;
    }

    function render() {
        const data = buildAnalytics();

        applyTranslations();
        renderKPI(data);
        renderCritical(data);
        renderTeachers(data);
        renderClassPerformance(data);
    }

    function initialize() {
        const selector = document.getElementById("languageSelect");

        if (selector) {
            selector.addEventListener("change", event => {
                if (typeof setLanguage === "function") {
                    setLanguage(event.target.value);
                } else {
                    localStorage.setItem("language", event.target.value);
                }

                render();
            });
        }

        window.addEventListener("languageChanged", render);

        render();
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();