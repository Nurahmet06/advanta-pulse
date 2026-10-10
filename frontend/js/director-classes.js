"use strict";

// ADVANTA Pulse — Director Classes
// Данные читаются из существующего localStorage.
// Страница не изменяет роли и не перезаписывает данные.

(() => {
    const KEYS = {
        classes: "advantaClasses",
        users: "advantaUsers",
        tests: "advantaTests",
        results: "advantaResults"
    };

    const RISK_LIMIT = 70;

    const translations = window.AdvantaI18n.scope("director-classes");

    const $ = id => document.getElementById(id);

    function getLanguage() {
        const saved = localStorage.getItem("language") || "ru";

        if (saved === "kz" || saved === "kk") {
            return "kk";
        }

        if (saved === "en") {
            return "en";
        }

        return "ru";
    }

    let language = getLanguage();
    let selectedClassId = null;

    function tr(key) {
        return translations[language][key] || key;
    }

    function readArray(key) {
        try {
            const value = JSON.parse(localStorage.getItem(key) || "[]");

            if (Array.isArray(value)) return value;

            if (value && typeof value === "object") {
                if (Array.isArray(value.items)) return value.items;
                if (Array.isArray(value.data)) return value.data;
            }
        } catch (error) {
            console.warn("Invalid localStorage:", key, error);
        }
        return [];
    }

    function text(value) {
        return String(value ?? "").trim();
    }

    function escapeHTML(value) {
        return text(value).replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[character]));
    }

    function firstValue(...values) {
        return values.find(value =>
            value !== undefined &&
            value !== null &&
            text(value) !== ""
        );
    }

    function className(item) {
        return text(firstValue(
            item.name,
            item.className,
            item.title,
            item.label,
            item.classId,
            item.id
        ));
    }

    function classId(item) {
        return text(firstValue(item.id, item.classId, className(item)));
    }

    function refsMatch(a, b) {
        if (!text(a) || !text(b)) return false;
        return text(a).toLocaleLowerCase() ===
            text(b).toLocaleLowerCase();
    }

    function classMatches(value, cls) {
        return refsMatch(value, classId(cls)) ||
            refsMatch(value, className(cls));
    }

    function userClassValues(user) {
        const values = [
            user.classId,
            user.className,
            user.studentClass,
            user.class,
            ...(Array.isArray(user.classIds) ? user.classIds : [])
        ];

        return values.filter(value =>
            typeof value === "string" ||
            typeof value === "number"
        );
    }

    function isStudent(user) {
        const role = text(user.role || user.userRole).toLowerCase();

        return [
            "student",
            "ученик",
            "оқушы"
        ].includes(role);
    }

    function getStudentName(user) {
        const fullName = firstValue(
            user.fullName,
            user.name,
            user.displayName
        );

        if (fullName) return text(fullName);

        return [
            user.lastName || user.surname,
            user.firstName,
            user.middleName
        ].filter(Boolean).join(" ") || text(user.email || user.id);
    }

    function userId(user) {
        return text(firstValue(user.id, user.userId, user.email));
    }

    function resultStudentId(result) {
        return text(firstValue(
            result.studentId,
            result.userId,
            result.studentID
        ));
    }

    function resultTestId(result) {
        return text(firstValue(result.testId, result.testID));
    }

    function resultScore(result) {
        const raw = firstValue(
            result.score,
            result.percentage,
            result.percent,
            result.result
        );

        const value = Number(
            typeof raw === "string" ? raw.replace("%", "") : raw
        );

        return Number.isFinite(value) && value >= 0 && value <= 100
            ? value
            : null;
    }

    function average(numbers) {
        if (!numbers.length) return null;
        return numbers.reduce((sum, number) => sum + number, 0) /
            numbers.length;
    }

    function formatScore(value) {
        return value === null
            ? "—"
            : `${value.toFixed(1)}%`;
    }

    function testMatchesClass(test, cls) {
        const refs = [
            test.classId,
            test.className,
            test.class,
            ...(Array.isArray(test.classIds) ? test.classIds : []),
            ...(Array.isArray(test.classes) ? test.classes : [])
        ];

        return refs.some(ref => {
            if (ref && typeof ref === "object") {
                return classMatches(
                    firstValue(ref.id, ref.classId, ref.name),
                    cls
                );
            }
            return classMatches(ref, cls);
        });
    }

    function getTeacherName(cls, users) {
        const direct = firstValue(
            cls.teacherName,
            cls.teacherFullName
        );

        if (direct) return text(direct);

        const teacherId = firstValue(cls.teacherId, cls.ownerId);

        if (!teacherId) return "—";

        const teacher = users.find(user =>
            refsMatch(userId(user), teacherId)
        );

        return teacher ? getStudentName(teacher) : "—";
    }

    function loadData() {
        const classes = readArray(KEYS.classes);
        const users = readArray(KEYS.users);
        const tests = readArray(KEYS.tests);
        const results = readArray(KEYS.results);

        const rows = classes.map(cls => {
            const students = users.filter(user =>
                isStudent(user) &&
                userClassValues(user).some(value =>
                    classMatches(value, cls)
                )
            );

            const classTests = tests.filter(test =>
                testMatchesClass(test, cls)
            );

            const testIds = new Set(
                classTests.map(test => text(test.id))
            );

            const studentIds = new Set(
                students.map(userId).filter(Boolean)
            );

            const classResults = results.filter(result => {
                const linkedByStudent = studentIds.has(
                    resultStudentId(result)
                );

                const linkedByTest = testIds.has(
                    resultTestId(result)
                );

                return linkedByStudent || (
                    linkedByTest &&
                    (
                        classMatches(result.classId, cls) ||
                        (
                            !result.classId &&
                            !resultStudentId(result)
                        )
                    )
                );
            });

            const validScores = classResults
                .map(resultScore)
                .filter(score => score !== null);

            const studentStats = students.map(student => {
                const scores = classResults
                    .filter(result =>
                        refsMatch(
                            resultStudentId(result),
                            userId(student)
                        )
                    )
                    .map(resultScore)
                    .filter(score => score !== null);

                return {
                    student,
                    averageScore: average(scores)
                };
            });

            const riskCount = studentStats.filter(item =>
                item.averageScore !== null &&
                item.averageScore < RISK_LIMIT
            ).length;

            return {
                id: classId(cls),
                name: className(cls),
                grade: parseInt(className(cls), 10) || 0,
                teacher: getTeacherName(cls, users),
                students,
                tests: classTests,
                results: classResults,
                studentStats,
                averageScore: average(validScores),
                riskCount
            };
        });

        rows.sort((a, b) =>
            a.grade - b.grade ||
            a.name.localeCompare(b.name, "ru", { numeric: true })
        );

        return { rows, tests, results };
    }

    function updateSummary(data) {
        $("classesCount").textContent = data.rows.length;

        const uniqueStudents = new Set();
        data.rows.forEach(row =>
            row.students.forEach(student =>
                uniqueStudents.add(userId(student))
            )
        );

        $("studentsCount").textContent = uniqueStudents.size;
        $("testsCount").textContent = data.tests.length;

        const scores = data.results
            .map(resultScore)
            .filter(score => score !== null);

        $("averageScore").textContent = formatScore(average(scores));
    }

    function renderFilters(rows) {
        const select = $("gradeFilter");
        const current = select.value;

        const grades = [...new Set(
            rows.map(row => row.grade).filter(Boolean)
        )].sort((a, b) => a - b);

        select.replaceChildren();

        const all = new Option(tr("allGrades"), "");
        select.add(all);

        grades.forEach(grade => {
            select.add(new Option(
                `${grade} ${tr("grade")}`,
                String(grade)
            ));
        });

        select.value = grades.some(g => String(g) === current)
            ? current
            : "";
    }

    function renderTable(data) {
        const search = $("searchInput").value
            .trim()
            .toLocaleLowerCase();

        const selectedGrade = $("gradeFilter").value;

        const rows = data.rows.filter(row => {
            const matchesSearch =
                row.name.toLocaleLowerCase().includes(search) ||
                row.teacher.toLocaleLowerCase().includes(search);

            const matchesGrade =
                !selectedGrade ||
                String(row.grade) === selectedGrade;

            return matchesSearch && matchesGrade;
        });

        const tbody = $("classesTableBody");
        tbody.replaceChildren();

        $("emptyMessage").classList.toggle(
            "d-none",
            rows.length > 0
        );

        rows.forEach(row => {
            const trElement = document.createElement("tr");

            trElement.innerHTML = `
                <td><strong>${escapeHTML(row.name)}</strong></td>
                <td>${escapeHTML(row.teacher)}</td>
                <td>${row.students.length}</td>
                <td>${row.tests.length}</td>
                <td>${formatScore(row.averageScore)}</td>
                <td>
                    <span class="badge ${row.riskCount > 0
                    ? "bg-danger"
                    : "bg-success"
                }">
                        ${row.riskCount}
                    </span>
                </td>
                <td>
                    <button type="button"
                            class="btn btn-sm btn-outline-primary">
                        ${escapeHTML(tr("view"))}
                    </button>
                </td>
            `;

            trElement.querySelector("button").addEventListener(
                "click",
                () => showDetails(row)
            );

            tbody.appendChild(trElement);
        });
    }

    function showDetails(row) {
        selectedClassId = row.id;

        $("classDetails").classList.remove("d-none");

        $("detailsTitle").textContent =
            `${tr("detailsTitle")}: ${row.name}`;

        const studentRows = row.studentStats.map(item => `
            <tr>
                <td>${escapeHTML(getStudentName(item.student))}</td>
                <td>${formatScore(item.averageScore)}</td>
                <td>
                    ${item.averageScore === null
                ? escapeHTML(tr("noResults"))
                : item.averageScore < RISK_LIMIT
                    ? `<span class="badge bg-danger">
                                    ${escapeHTML(tr("risk"))}
                                   </span>`
                    : `<span class="badge bg-success">
                                    OK
                                   </span>`
            }
                </td>
            </tr>
        `).join("");

        $("detailsContent").innerHTML = `
            <div class="row g-3 mb-4">
                <div class="col-md-3">
                    <div class="p-3 bg-light rounded">
                        <div class="text-muted small">
                            ${escapeHTML(tr("studentsLabel"))}
                        </div>
                        <h4>${row.students.length}</h4>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="p-3 bg-light rounded">
                        <div class="text-muted small">
                            ${escapeHTML(tr("testsLabel"))}
                        </div>
                        <h4>${row.tests.length}</h4>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="p-3 bg-light rounded">
                        <div class="text-muted small">
                            ${escapeHTML(tr("averageLabel"))}
                        </div>
                        <h4>${formatScore(row.averageScore)}</h4>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="p-3 bg-light rounded">
                        <div class="text-muted small">
                            ${escapeHTML(tr("riskHeader"))}
                        </div>
                        <h4>${row.riskCount}</h4>
                    </div>
                </div>
            </div>

            <h6>${escapeHTML(tr("studentList"))}</h6>
            <p class="text-muted small">${escapeHTML(tr("riskInfo"))}</p>

            <div class="table-responsive">
                <table class="table table-sm table-hover">
                    <thead>
                        <tr>
                            <th>${escapeHTML(tr("student"))}</th>
                            <th>${escapeHTML(tr("score"))}</th>
                            <th>${escapeHTML(tr("risk"))}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${studentRows ||
            `<tr><td colspan="3" class="text-muted">
                                ${escapeHTML(tr("noStudents"))}
                            </td></tr>`
            }
                    </tbody>
                </table>
            </div>
        `;

        $("classDetails").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    function applyTranslations() {
        Object.keys(translations[language]).forEach(key => {
            const element = $(key);
            if (element) {
                element.textContent = tr(key);
            }
        });

        if ($("searchInput")) {
            $("searchInput").placeholder = tr("search");
        }

        document.documentElement.lang =
            language === "kk" ? "kk" : language;

        const select = $("languageSelect");

        if (select) {
            select.value = language === "kk" ? (Array.from(select.options).some(o => o.value === "kk") ? "kk" : "kz") : language;
        }
    }

    function render() {
        const data = loadData();

        applyTranslations();
        updateSummary(data);
        renderFilters(data.rows);
        renderTable(data);

        if (selectedClassId !== null) {
            const selected = data.rows.find(row =>
                row.id === selectedClassId
            );

            if (selected) {
                showDetails(selected);
            } else {
                closeDetails();
            }
        }
    }

    function closeDetails() {
        selectedClassId = null;
        $("classDetails").classList.add("d-none");
    }

    function changeLanguage(value) {
        language = value === "kz" ? "kk" : value;

        if (!translations[language]) language = "ru";

        if (typeof setLanguage === "function") {
            setLanguage(language);
        } else {
            localStorage.setItem("advantaLanguage", language);
        }

        render();
    }

    function init() {
        const searchInput = $("searchInput");
        const gradeFilter = $("gradeFilter");
        const closeBtn = $("closeDetailsBtn");

        if (searchInput) {
            searchInput.addEventListener("input", () => {
                renderTable(loadData());
            });
        }

        if (gradeFilter) {
            gradeFilter.addEventListener("change", () => {
                renderTable(loadData());
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener("click", closeDetails);
        }

        // Переключатель языка уже обслуживает language.js.
        // Здесь второй обработчик не нужен.

        window.addEventListener("languageChanged", () => {
            const next = getLanguage();

            if (next !== language) {
                language = next;
            }

            render();
        });

        window.addEventListener("storage", event => {
            if (
                !event.key ||
                Object.values(KEYS).includes(event.key) ||
                event.key === "language"
            ) {
                language = getLanguage();
                render();
            }
        });

        render();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();