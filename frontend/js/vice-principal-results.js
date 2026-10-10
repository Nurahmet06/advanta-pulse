(() => {
    "use strict";

    const translations = window.AdvantaI18n.scope("vice-principal-results");

    const $ = id => document.getElementById(id);

    function read(key) {
        try {
            const data = JSON.parse(
                localStorage.getItem(key) || "[]"
            );
            return Array.isArray(data) ? data : [];
        } catch {
            return [];
        }
    }

    function text(id, value) {
        const element = $(id);
        if (element) element.textContent = value;
    }

    function getLanguage() {
        const value = localStorage.getItem("language") || "ru";

        if (value === "kk" || value === "kz") return "kk";
        if (value === "en") return "en";
        return "ru";
    }

    let language = getLanguage();

    function t(key) {
        return translations[language]?.[key] ??
            translations.ru[key] ??
            key;
    }

    function nameOf(user) {
        if (!user) return "";

        return user.name ||
            user.fullName ||
            [user.firstName, user.lastName]
                .filter(Boolean)
                .join(" ") ||
            "";
    }

    function scoreOf(result) {
        const value = result.score ??
            result.percentage ??
            result.percent ??
            result.totalScore;

        if (value === null || value === undefined || value === "") {
            return null;
        }

        const number = Number(value);
        return Number.isFinite(number) ? number : null;
    }

    function studentIdOf(result) {
        return result.studentId ??
            result.userId ??
            result.student?.id;
    }

    function testIdOf(result) {
        return result.testId ??
            result.testID ??
            result.test?.id;
    }

    function resultDate(result) {
        const value = result.completedAt ??
            result.submittedAt ??
            result.createdAt ??
            result.date;

        const timestamp = value
            ? new Date(value).getTime()
            : 0;

        return Number.isFinite(timestamp) ? timestamp : 0;
    }

    function latestResults(results) {
        const unique = new Map();

        results.forEach(result => {
            const studentId = studentIdOf(result);
            const testId = testIdOf(result);
            const score = scoreOf(result);

            if (
                studentId == null ||
                testId == null ||
                score === null
            ) {
                return;
            }

            const key = `${studentId}__${testId}`;
            const existing = unique.get(key);

            if (
                !existing ||
                resultDate(result) >= resultDate(existing)
            ) {
                unique.set(key, result);
            }
        });

        return [...unique.values()];
    }

    function classIdsOf(test) {
        const ids = [
            ...(Array.isArray(test.classIds)
                ? test.classIds
                : []),

            ...(Array.isArray(test.assignedClassIds)
                ? test.assignedClassIds
                : [])
        ];

        if (test.classId != null) {
            ids.push(test.classId);
        }

        return ids.map(String);
    }

    function studentClassId(student) {
        return student?.classId ??
            student?.approvedClassId ??
            student?.class?.id ??
            null;
    }

    function getData() {
        const classes = read("advantaClasses");
        const tests = read("advantaTests");
        const users = read("advantaUsers");
        const requests = read("advantaJoinRequests");

        const results = latestResults(
            read("advantaResults")
        );

        const testMap = new Map(
            tests.map(test => [String(test.id), test])
        );

        const classMap = new Map(
            classes.map(cls => [String(cls.id), cls])
        );

        const userMap = new Map(
            users.map(user => [String(user.id), user])
        );

        const approvedRequests = requests.filter(request =>
            ["approved", "accepted", "одобрено"].includes(
                String(request.status || "").toLowerCase()
            )
        );

        const rows = results.map(result => {
            const testId = String(testIdOf(result));
            const studentId = String(studentIdOf(result));

            const test = testMap.get(testId);
            const student = userMap.get(studentId);

            const request = approvedRequests.find(item =>
                String(
                    item.studentId ??
                    item.userId ??
                    ""
                ) === studentId
            );

            const possibleClassIds = [
                result.classId,
                studentClassId(student),
                request?.classId,
                ...classIdsOf(test || {})
            ]
                .filter(value => value != null)
                .map(String);

            const classId =
                possibleClassIds.find(id => classMap.has(id)) ||
                possibleClassIds[0] ||
                "";

            const cls = classMap.get(classId);

            const teacherId =
                test?.teacherId ??
                cls?.teacherId;

            const teacher = teacherId != null
                ? userMap.get(String(teacherId))
                : null;

            const score = scoreOf(result);

            const threshold = Number(
                test?.passingScore ??
                test?.passScore ??
                test?.threshold ??
                50
            );

            const safeThreshold = Number.isFinite(threshold)
                ? threshold
                : 50;

            return {
                studentId,

                studentName:
                    nameOf(student) ||
                    result.studentName ||
                    nameOf(result.student) ||
                    studentId,

                classId,

                className:
                    cls?.name ||
                    cls?.className ||
                    classId ||
                    t("unknown"),

                testId,

                testName:
                    test?.title ||
                    test?.name ||
                    result.testName ||
                    testId,

                teacherName:
                    nameOf(teacher) ||
                    test?.teacherName ||
                    cls?.teacherName ||
                    (
                        String(teacherId || "") === "teacher_math_1"
                            ? "Айгуль Сериковна"
                            : t("unknown")
                    ),

                score,
                threshold: safeThreshold,
                passed: score >= safeThreshold
            };
        });

        return { classes, tests, rows };
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(
            /[&<>"']/g,
            character => ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            })[character]
        );
    }

    function fillSelect(id, firstLabel, options) {
        const select = $(id);
        if (!select) return;

        const selected = select.value;
        select.innerHTML = "";

        const first = document.createElement("option");
        first.value = "";
        first.textContent = firstLabel;
        select.appendChild(first);

        options.forEach(option => {
            const element = document.createElement("option");
            element.value = option.value;
            element.textContent = option.label;
            select.appendChild(element);
        });

        if (
            [...select.options].some(
                option => option.value === selected
            )
        ) {
            select.value = selected;
        }
    }

    function renderTranslations() {
        const navIds = [
            "navOverview",
            "navClasses",
            "navTeachers",
            "navTests",
            "navResults",
            "navAnalytics"
        ];

        navIds.forEach((id, index) => {
            const element = $(id);
            if (!element) return;

            const span = element.querySelector("span");

            if (span) {
                span.textContent = t("nav")[index];
            } else {
                element.textContent = t("nav")[index];
            }
        });

        const labels = {
            pageTitle: "title",
            pageDescription: "description",
            completedLabel: "completed",
            averageLabel: "average",
            passedLabel: "passed",
            failedLabel: "failed",
            searchLabel: "search",
            classFilterLabel: "class",
            testFilterLabel: "test",
            statusFilterLabel: "status",
            resultsTitle: "results",
            studentHeader: "student",
            classHeader: "class",
            testHeader: "test",
            teacherHeader: "teacher",
            scoreHeader: "score",
            thresholdHeader: "threshold",
            statusHeader: "status"
        };

        Object.entries(labels).forEach(([id, key]) => {
            text(id, t(key));
        });

        const search = $("studentSearch");
        if (search) {
            search.placeholder = t("searchPlaceholder");
        }

        const statusSelect = $("statusFilter");

        if (statusSelect) {
            const currentStatus = statusSelect.value;

            statusSelect.innerHTML = `
                <option value="">${t("allStatuses")}</option>
                <option value="passed">${t("passedStatus")}</option>
                <option value="failed">${t("failedStatus")}</option>
            `;

            statusSelect.value = currentStatus;
        }

        const languageSelect = $("languageSelect");

        if (languageSelect) {
            const kkOption = [...languageSelect.options]
                .find(option => option.value === "kk");

            if (!kkOption) {
                const kzOption = [...languageSelect.options]
                    .find(option => option.value === "kz");

                if (kzOption) {
                    kzOption.value = "kk";
                }
            }

            languageSelect.value = language;
        }

        document.documentElement.lang = language;
    }

    function render() {
        language = getLanguage();
        renderTranslations();

        const { classes, tests, rows } = getData();

        fillSelect(
            "classFilter",
            t("allClasses"),
            classes.map(cls => ({
                value: String(cls.id),
                label:
                    cls.name ||
                    cls.className ||
                    String(cls.id)
            }))
        );

        fillSelect(
            "testFilter",
            t("allTests"),
            tests.map(test => ({
                value: String(test.id),
                label:
                    test.title ||
                    test.name ||
                    String(test.id)
            }))
        );

        const query = (
            $("studentSearch")?.value || ""
        ).trim().toLowerCase();

        const classFilter =
            $("classFilter")?.value || "";

        const testFilter =
            $("testFilter")?.value || "";

        const statusFilter =
            $("statusFilter")?.value || "";

        const filtered = rows.filter(row => {
            if (
                query &&
                !row.studentName.toLowerCase().includes(query)
            ) {
                return false;
            }

            if (
                classFilter &&
                row.classId !== classFilter
            ) {
                return false;
            }

            if (
                testFilter &&
                row.testId !== testFilter
            ) {
                return false;
            }

            if (
                statusFilter === "passed" &&
                !row.passed
            ) {
                return false;
            }

            if (
                statusFilter === "failed" &&
                row.passed
            ) {
                return false;
            }

            return true;
        });

        const passed = filtered.filter(
            row => row.passed
        ).length;

        const failed = filtered.length - passed;

        const average = filtered.length
            ? Math.round(
                filtered.reduce(
                    (sum, row) => sum + row.score,
                    0
                ) / filtered.length
            )
            : null;

        text("completedCount", filtered.length);

        text(
            "averageScore",
            average === null ? "—" : `${average}/100`
        );

        text("passedCount", passed);
        text("failedCount", failed);

        const tbody = $("resultsTableBody");
        if (!tbody) return;

        if (!filtered.length) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7"
                        class="text-center text-muted py-4">
                        ${escapeHTML(t("empty"))}
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = filtered.map(row => `
            <tr>
                <td>${escapeHTML(row.studentName)}</td>
                <td>${escapeHTML(row.className)}</td>
                <td>${escapeHTML(row.testName)}</td>
                <td>${escapeHTML(row.teacherName)}</td>
                <td><strong>${row.score}/100</strong></td>
                <td>${row.threshold}/100</td>
                <td>
                    <span class="badge ${
                        row.passed
                            ? "bg-success"
                            : "bg-danger"
                    }">
                        ${
                            row.passed
                                ? t("passedStatus")
                                : t("failedStatus")
                        }
                    </span>
                </td>
            </tr>
        `).join("");
    }

    function initialize() {
        const languageSelect = $("languageSelect");

        if (languageSelect) {
            languageSelect.addEventListener(
                "change",
                () => {
                    language = languageSelect.value === "kz"
                        ? "kk"
                        : languageSelect.value;

                    localStorage.setItem(
                        "language",
                        language
                    );

                    render();
                }
            );
        }

        [
            "studentSearch",
            "classFilter",
            "testFilter",
            "statusFilter"
        ].forEach(id => {
            const element = $(id);
            if (!element) return;

            element.addEventListener(
                id === "studentSearch"
                    ? "input"
                    : "change",
                render
            );
        });

        window.addEventListener(
            "languageChanged",
            render
        );

        window.addEventListener(
            "storage",
            render
        );

        render();
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialize
        );
    } else {
        initialize();
    }
})();