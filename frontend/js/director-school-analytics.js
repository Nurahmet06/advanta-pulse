(() => {
    "use strict";

    // ADVANTA Pulse — Director School Analytics
    // Только чтение существующих данных.

    const TEXT = window.AdvantaI18n.scope("director-school-analytics");

    const el = id => document.getElementById(id);
    const idOf = value => String(value ?? "");

    const read = key => {
        try {
            const value = JSON.parse(
                localStorage.getItem(key) || "[]"
            );
            return Array.isArray(value) ? value : [];
        } catch (error) {
            console.warn("Storage error:", key, error);
            return [];
        }
    };

    const escapeHTML = value =>
        String(value ?? "").replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]);

    const setText = (id, value) => {
        if (el(id)) el(id).textContent = value;
    };

    function getLanguage() {
        const value = localStorage.getItem("language") ||
                      localStorage.getItem("advantaLanguage") ||
                      "ru";

        return value === "kz" || value === "kk"
            ? "kk"
            : value === "en" ? "en" : "ru";
    }

    function scoreOf(result) {
        const raw = result.score ??
                    result.percentage ??
                    result.percent ??
                    result.totalScore;

        if (raw === null || raw === undefined || raw === "") {
            return null;
        }

        const score = Number(
            typeof raw === "string"
                ? raw.replace("%", "")
                : raw
        );

        return Number.isFinite(score) &&
               score >= 0 && score <= 100
            ? score
            : null;
    }

    const studentIdOf = result =>
        idOf(result.studentId ??
             result.userId ??
             result.student?.id);

    const testIdOf = result =>
        idOf(result.testId ??
             result.testID ??
             result.test?.id);

    function latestResults(results) {
        const unique = new Map();

        for (const result of results) {
            const studentId = studentIdOf(result);
            const testId = testIdOf(result);

            if (!studentId || !testId ||
                scoreOf(result) === null) {
                continue;
            }

            const key = `${studentId}::${testId}`;

            const date = result.completedAt ??
                         result.submittedAt ??
                         result.createdAt ??
                         result.date;

            const timestamp = date
                ? Date.parse(date) || 0
                : 0;

            const previous = unique.get(key);

            if (!previous || timestamp >= previous.timestamp) {
                unique.set(key, { result, timestamp });
            }
        }

        return [...unique.values()].map(item => item.result);
    }

    function average(values) {
        if (!values.length) return null;

        return Math.round(
            values.reduce((sum, value) => sum + value, 0) /
            values.length
        );
    }

    function formatScore(score) {
        return score === null ? "—" : `${score}/100`;
    }

    function nameOf(user) {
        if (!user) return "";

        return user.name ||
               user.fullName ||
               [
                   user.firstName,
                   user.lastName
               ].filter(Boolean).join(" ");
    }

    function getData() {
        const classes = read("advantaClasses");
        const users = read("advantaUsers");
        const tests = read("advantaTests");
        const requests = read("advantaJoinRequests");
        const results = latestResults(read("advantaResults"));

        const classMap = new Map();
        for (const cls of classes) {
            classMap.set(idOf(cls.id), cls);
            if (cls.name) {
                classMap.set(idOf(cls.name), cls);
            }
        }

        const userMap = new Map(
            users.map(user => [
                idOf(user.id),
                user
            ])
        );

        const testMap = new Map(
            tests.map(test => [
                idOf(test.id),
                test
            ])
        );

        const approvedRequests = requests.filter(request =>
            ["approved", "accepted", "одобрено"].includes(
                String(request.status || "").toLowerCase()
            )
        );

        const rows = results.map(result => {
            const studentId = studentIdOf(result);
            const testId = testIdOf(result);

            const user = userMap.get(studentId);
            const test = testMap.get(testId);

            const request = approvedRequests.find(item =>
                idOf(item.studentId ?? item.userId) === studentId
            );

            const possibleIds = [
                result.classId,
                result.className,
                user?.classId,
                user?.approvedClassId,
                user?.className,
                user?.class?.id,
                request?.classId,
                test?.classId,
                ...(Array.isArray(test?.classIds) &&
                    test.classIds.length === 1
                    ? test.classIds : []),
                ...(Array.isArray(test?.assignedClassIds) &&
                    test.assignedClassIds.length === 1
                    ? test.assignedClassIds : [])
            ].filter(value => value != null && value !== "");

            const classReference = possibleIds.find(value =>
                classMap.has(idOf(value))
            );

            const cls = classMap.get(idOf(classReference));

            const classId = cls
                ? idOf(cls.id)
                : idOf(possibleIds[0]);

            const rawThreshold =
                test?.passingScore ??
                test?.passScore ??
                test?.threshold ??
                50;

            const thresholdNumber = Number(rawThreshold);

            const threshold = Number.isFinite(thresholdNumber)
                ? thresholdNumber : 50;

            const score = scoreOf(result);

            return {
                studentId,
                testId,
                classId,
                className: cls?.name ||
                           cls?.className ||
                           result.className ||
                           classId,
                studentName:
                    nameOf(user) ||
                    result.studentName ||
                    studentId,
                testName:
                    test?.title ||
                    test?.name ||
                    result.testName ||
                    testId,
                score,
                threshold,
                failed: score < threshold
            };
        });

        return { classes, rows };
    }

    let selectedClassId = null;

    function renderTranslations(t, language) {
        document.documentElement.lang =
            language === "kk" ? "kk" : language;

        el("languageSelect").value = language;

        const navIds = [
            "navOverview",
            "navClasses",
            "navTeachers",
            "navTests",
            "navResults",
            "navAnalytics"
        ];

        navIds.forEach((id, index) => {
            setText(id, t.nav[index]);
        });

        const labels = {
            pageTitle: t.title,
            pageDescription: t.description,
            classesLabel: t.classes,
            resultsLabel: t.results,
            averageLabel: t.average,
            riskLabel: t.risk,
            classesTitle: t.classesTitle,
            classHeader: t.class,
            completedHeader: t.completed,
            scoreHeader: t.score,
            belowHeader: t.below,
            actionHeader: t.action,
            detailsTitle: t.detailsTitle,
            detailStudentHeader: t.student,
            detailTestHeader: t.test,
            detailScoreHeader: t.score,
            detailThresholdHeader: t.threshold,
            detailStatusHeader: t.status,
            riskTitle: t.riskTitle,
            riskDescription: t.riskDescription,
            studentHeader: t.student,
            riskClassHeader: t.class,
            riskScoreHeader: t.score,
            riskTestHeader: t.test
        };

        Object.entries(labels).forEach(([id, value]) => {
            setText(id, value);
        });

        el("classSearch").placeholder = t.search;
    }

    function renderClasses(data, t) {
        const search = el("classSearch").value
            .trim()
            .toLowerCase();

        const tbody = el("classesTableBody");
        tbody.replaceChildren();

        const filtered = data.classes.filter(cls => {
            const name = String(
                cls.name || cls.className || cls.id || ""
            ).toLowerCase();

            return name.includes(search);
        });

        if (!filtered.length) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5"
                        class="text-center text-muted py-4">
                        ${escapeHTML(t.empty)}
                    </td>
                </tr>
            `;
            return;
        }

        for (const cls of filtered) {
            const classId = idOf(cls.id);

            const rows = data.rows.filter(row =>
                row.classId === classId
            );

            const scores = rows.map(row => row.score);
            const failed = rows.filter(row => row.failed);

            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td class="fw-semibold">
                    ${escapeHTML(cls.name || cls.className || classId)}
                </td>
                <td>${rows.length}</td>
                <td>${formatScore(average(scores))}</td>
                <td>
                    <span class="badge ${
                        failed.length ? "bg-danger" : "bg-success"
                    }">
                        ${failed.length}
                    </span>
                </td>
                <td>
                    <button type="button"
                            class="btn btn-outline-primary btn-sm">
                        ${escapeHTML(t.details)}
                    </button>
                </td>
            `;

            tr.querySelector("button").addEventListener(
                "click",
                () => showDetails(classId)
            );

            tbody.appendChild(tr);
        }
    }

    function showDetails(classId) {
        selectedClassId = classId;

        const data = getData();
        const t = TEXT[getLanguage()];

        const cls = data.classes.find(item =>
            idOf(item.id) === classId
        );

        const name = cls?.name || cls?.className || classId;

        const rows = data.rows.filter(row =>
            row.classId === classId
        );

        setText("detailsTitle", `${t.detailsTitle}: ${name}`);

        const tbody = el("detailsTableBody");
        tbody.replaceChildren();

        if (!rows.length) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5"
                        class="text-center text-muted py-4">
                        ${escapeHTML(t.empty)}
                    </td>
                </tr>
            `;
        }

        for (const row of rows) {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${escapeHTML(row.studentName || t.unknown)}</td>
                <td>${escapeHTML(row.testName || t.unknown)}</td>
                <td>${formatScore(row.score)}</td>
                <td>${formatScore(row.threshold)}</td>
                <td>
                    <span class="badge ${
                        row.failed ? "bg-danger" : "bg-success"
                    }">
                        ${escapeHTML(row.failed ? t.failed : t.passed)}
                    </span>
                </td>
            `;

            tbody.appendChild(tr);
        }

        el("classDetails").classList.remove("d-none");
        el("classDetails").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    function closeDetails() {
        selectedClassId = null;
        el("classDetails").classList.add("d-none");
    }

    function render() {
        const language = getLanguage();
        const t = TEXT[language];

        renderTranslations(t, language);

        const data = getData();
        const { classes, rows } = data;

        const scores = rows.map(row => row.score);
        const failed = rows.filter(row => row.failed);

        const riskStudentIds = new Set(
            failed.map(row => row.studentId).filter(Boolean)
        );

        setText("classesCount", classes.length);
        setText("resultsCount", rows.length);

        setText(
            "averageScore",
            formatScore(average(scores))
        );

        setText("riskCount", riskStudentIds.size);

        renderClasses(data, t);

        const riskBody = el("riskTableBody");
        riskBody.replaceChildren();

        if (!failed.length) {
            riskBody.innerHTML = `
                <tr>
                    <td colspan="4"
                        class="text-center text-muted py-4">
                        ${escapeHTML(t.empty)}
                    </td>
                </tr>
            `;
        }

        for (const row of failed) {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${escapeHTML(row.studentName || t.unknown)}</td>
                <td>${escapeHTML(row.className || t.unknown)}</td>
                <td>
                    <span class="badge bg-danger">
                        ${formatScore(row.score)}
                    </span>
                </td>
                <td>${escapeHTML(row.testName || t.unknown)}</td>
            `;

            riskBody.appendChild(tr);
        }

        if (selectedClassId !== null) {
            showDetails(selectedClassId);
        }
    }

    function initialize() {
        el("languageSelect").addEventListener(
            "change",
            event => {
                const language = event.target.value;

                localStorage.setItem("language", language);

                window.dispatchEvent(
                    new Event("languageChanged")
                );
            }
        );

        el("classSearch").addEventListener(
            "input",
            render
        );

        el("closeDetails").addEventListener(
            "click",
            closeDetails
        );

        window.addEventListener("languageChanged", render);

        window.addEventListener("storage", event => {
            if (!event.key ||
                [
                    "language",
                    "advantaClasses",
                    "advantaUsers",
                    "advantaTests",
                    "advantaResults",
                    "advantaJoinRequests"
                ].includes(event.key)) {
                render();
            }
        });

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