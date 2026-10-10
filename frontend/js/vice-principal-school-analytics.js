(() => {
    "use strict";

    const TEXT = window.AdvantaI18n.scope("vice-principal-school-analytics");

    const read = key => {
        try {
            const value = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(value) ? value : [];
        } catch {
            return [];
        }
    };

    const el = id => document.getElementById(id);

    const setText = (id, value) => {
        if (el(id)) el(id).textContent = value;
    };

    const idOf = value => String(value ?? "");

    const scoreOf = result => {
        const raw = result.score ?? result.percentage ??
            result.percent ?? result.totalScore;

        if (raw === null || raw === undefined || raw === "") return null;

        const score = Number(raw);
        return Number.isFinite(score) ? score : null;
    };

    const testIdOf = result =>
        idOf(result.testId ?? result.testID ?? result.test?.id);

    const studentIdOf = result =>
        idOf(result.studentId ?? result.userId);

    const classIdOf = result =>
        idOf(result.classId ?? result.class?.id);

    const average = values =>
        values.length
            ? Math.round(values.reduce((sum, n) => sum + n, 0) / values.length)
            : null;

    const escapeHTML = value =>
        String(value ?? "").replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[character]);

    const latestResults = results => {
        const unique = new Map();

        for (const result of results) {
            const studentId = studentIdOf(result);
            const testId = testIdOf(result);

            if (!studentId || !testId) continue;

            const key = `${studentId}::${testId}`;
            const time = Date.parse(
                result.completedAt ??
                result.submittedAt ??
                result.createdAt ??
                result.date ??
                ""
            ) || 0;

            const previous = unique.get(key);

            if (!previous || time >= previous.time) {
                unique.set(key, { result, time });
            }
        }

        return [...unique.values()].map(item => item.result);
    };

    function getLanguage() {
        return localStorage.getItem("language") || "ru";
    }

    function getData() {
        const classes = read("advantaClasses");
        const tests = read("advantaTests");
        const users = read("advantaUsers");
        const results = latestResults(read("advantaResults"));

        const testMap = new Map(tests.map(test => [idOf(test.id), test]));
        const classMap = new Map(classes.map(cls => [idOf(cls.id), cls]));
        const userMap = new Map(users.map(user => [idOf(user.id), user]));

        const rows = results.map(result => {
            const test = testMap.get(testIdOf(result));
            const user = userMap.get(studentIdOf(result));

            const classId = idOf(
                result.classId ??
                user?.classId ??
                test?.classId ??
                (Array.isArray(test?.classIds) && test.classIds.length === 1
                    ? test.classIds[0]
                    : "")
            );

            const cls = classMap.get(classId);
            const score = scoreOf(result);

            const rawThreshold =
                test?.passingScore ??
                test?.passScore ??
                test?.threshold ??
                50;

            const threshold = Number(rawThreshold);

            const studentName =
                result.studentName ||
                user?.name ||
                [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
                studentIdOf(result);

            return {
                classId,
                className: cls?.name || cls?.title || classId,
                studentName,
                testName: test?.title || test?.name || testIdOf(result),
                score,
                threshold: Number.isFinite(threshold) ? threshold : 50
            };
        }).filter(row => row.score !== null);

        return { classes, rows };
    }

    function render() {
        const lang = getLanguage();
        const t = TEXT[lang] || TEXT.ru;

        document.documentElement.lang =
            lang === "kz" ? "kk" : lang;

        const select = document.getElementById("languageSelect");

        if (select) {
            select.value = lang;
        }

        const navIds = [
            "navOverview", "navClasses", "navTeachers",
            "navTests", "navResults", "navAnalytics"
        ];

        navIds.forEach((id, index) => setText(id, t.nav[index]));

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
            riskTitle: t.riskTitle,
            studentHeader: t.student,
            riskClassHeader: t.class,
            riskScoreHeader: t.score,
            riskTestHeader: t.test
        };

        Object.entries(labels).forEach(([id, value]) => setText(id, value));

        const { classes, rows } = getData();
        const scores = rows.map(row => row.score);
        const failed = rows.filter(row => row.score < row.threshold);

        setText("classesCount", classes.length);
        setText("resultsCount", rows.length);
        setText("averageScore", scores.length ? `${average(scores)}/100` : "—");
        setText("riskCount", failed.length);

        const classesBody = el("classesTableBody");
        classesBody.innerHTML = "";

        if (!classes.length) {
            classesBody.innerHTML =
                `<tr><td colspan="5" class="text-center text-muted py-4">${t.empty}</td></tr>`;
        }

        for (const cls of classes) {
            const classId = idOf(cls.id);
            const classRows = rows.filter(row => row.classId === classId);
            const classScores = classRows.map(row => row.score);
            const classFailed = classRows.filter(row => row.score < row.threshold);

            const tr = document.createElement("tr");

            const className = escapeHTML(cls.name || cls.title || classId);
            const score = average(classScores);

            tr.innerHTML = `
                <td class="fw-semibold">${className}</td>
                <td>${classRows.length}</td>
                <td>${score === null ? "—" : `${score}/100`}</td>
                <td>
                    <span class="badge ${classFailed.length ? "bg-danger" : "bg-success"}">
                        ${classFailed.length}
                    </span>
                </td>
                <td>
                    <a class="btn btn-outline-primary btn-sm"
                       href="vice-principal-analytics.html?class=${encodeURIComponent(classId)}&teacher=${encodeURIComponent(cls.teacherId || '')}">
                        ${t.details}
                    </a>
                </td>
            `;

            classesBody.appendChild(tr);
        }

        const riskBody = el("riskTableBody");
        riskBody.innerHTML = "";

        if (!failed.length) {
            riskBody.innerHTML =
                `<tr><td colspan="4" class="text-center text-muted py-4">${t.empty}</td></tr>`;
        }

        for (const row of failed) {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${escapeHTML(row.studentName || t.unknown)}</td>
                <td>${escapeHTML(row.className || t.unknown)}</td>
                <td><span class="badge bg-danger">${row.score}/100</span></td>
                <td>${escapeHTML(row.testName)}</td>
            `;

            riskBody.appendChild(tr);
        }
    }

    function initialize() {
        const select = document.getElementById("languageSelect");

        if (select) {
            select.value = getLanguage();

            select.addEventListener("change", function () {
                localStorage.setItem("language", this.value);
                render();
            });
        }

        window.addEventListener("languageChanged", render);

        render();
    }

    document.addEventListener("DOMContentLoaded", initialize);

})();