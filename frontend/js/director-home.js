(() => {
    "use strict";

    const TEXT = window.AdvantaI18n.scope("director-home");

    const el = id => document.getElementById(id);

    function read(key) {
        try {
            const value = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(value) ? value : [];
        } catch {
            return [];
        }
    }

    function getLanguage() {
        const value = localStorage.getItem("language") || "ru";
        return value === "kk" || value === "kz"
            ? "kk"
            : value === "en" ? "en" : "ru";
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);
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
        return result.studentId ?? result.userId ?? result.student?.id;
    }

    function testIdOf(result) {
        return result.testId ?? result.testID ?? result.test?.id;
    }

    function latestResults(results) {
        const unique = new Map();

        for (const result of results) {
            const studentId = studentIdOf(result);
            const testId = testIdOf(result);
            const score = scoreOf(result);

            if (studentId == null || testId == null || score === null) {
                continue;
            }

            const key = `${studentId}__${testId}`;

            const date = result.completedAt ??
                result.submittedAt ??
                result.createdAt ??
                result.date;

            const timestamp = date ? new Date(date).getTime() : 0;
            const previous = unique.get(key);

            if (!previous || timestamp >= previous.timestamp) {
                unique.set(key, {
                    result,
                    timestamp: Number.isFinite(timestamp) ? timestamp : 0
                });
            }
        }

        return [...unique.values()].map(item => item.result);
    }

    function average(scores) {
        if (!scores.length) return null;

        return Math.round(
            scores.reduce((sum, score) => sum + score, 0) /
            scores.length
        );
    }

    function nameOf(user) {
        if (!user) return "";

        return user.name ||
            user.fullName ||
            [user.firstName, user.lastName].filter(Boolean).join(" ") ||
            "";
    }

    function render() {
        const language = getLanguage();
        const t = TEXT[language];

        document.documentElement.lang = language;
        el("languageSelect").value = language;

        const navIds = [
            "navOverview", "navClasses", "navTeachers",
            "navTests", "navResults", "navAnalytics"
        ];

        navIds.forEach((id, index) => {
            el(id).textContent = t.nav[index];
        });

        const labels = {
            pageTitle: t.title,
            pageDescription: t.description,
            classesLabel: t.classes,
            studentsLabel: t.students,
            averageLabel: t.average,
            riskLabel: t.risk,
            classesTitle: t.classesTitle,
            classHeader: t.class,
            testsHeader: t.tests,
            scoreHeader: t.score,
            riskHeader: t.riskHeader,
            riskTitle: t.riskTitle,
            studentHeader: t.student,
            studentClassHeader: t.class,
            studentScoreHeader: t.score,
            studentTestHeader: t.test
        };

        Object.entries(labels).forEach(([id, value]) => {
            if (el(id)) {
                el(id).textContent = value;
            }
        });

        const classes = read("advantaClasses");
        const users = read("advantaUsers");
        const tests = read("advantaTests");
        const requests = read("advantaJoinRequests");
        const results = latestResults(read("advantaResults"));

        const classMap = new Map(
            classes.map(cls => [String(cls.id), cls])
        );

        const userMap = new Map(
            users.map(user => [String(user.id), user])
        );

        const testMap = new Map(
            tests.map(test => [String(test.id), test])
        );

        const approvedRequests = requests.filter(request =>
            ["approved", "accepted", "одобрено"].includes(
                String(request.status || "").toLowerCase()
            )
        );

        const studentUsers = users.filter(user =>
            String(user.role || "").toLowerCase() === "student"
        );

        const studentIds = new Set([
            ...studentUsers.map(user => String(user.id)),
            ...approvedRequests.map(request =>
                String(request.studentId ?? request.userId ?? "")
            ).filter(Boolean)
        ]);

        const rows = results.map(result => {
            const studentId = String(studentIdOf(result));
            const testId = String(testIdOf(result));

            const student = userMap.get(studentId);
            const test = testMap.get(testId);

            const request = approvedRequests.find(item =>
                String(item.studentId ?? item.userId ?? "") === studentId
            );

            const possibleClassIds = [
                result.classId,
                student?.classId,
                student?.approvedClassId,
                student?.class?.id,
                request?.classId,
                test?.classId,
                ...(Array.isArray(test?.classIds) ? test.classIds : []),
                ...(Array.isArray(test?.assignedClassIds)
                    ? test.assignedClassIds : [])
            ].filter(value => value != null).map(String);

            const classId = possibleClassIds.find(id =>
                classMap.has(id)
            ) || possibleClassIds[0] || "";

            const cls = classMap.get(classId);

            const threshold = Number(
                test?.passingScore ??
                test?.passScore ??
                test?.threshold ??
                50
            );

            const safeThreshold = Number.isFinite(threshold)
                ? threshold : 50;

            const score = scoreOf(result);

            return {
                studentId,
                studentName: nameOf(student) ||
                    result.studentName ||
                    studentId,
                classId,
                className: cls?.name ||
                    cls?.className ||
                    classId ||
                    t.unknown,
                testName: test?.title ||
                    test?.name ||
                    result.testName ||
                    testId,
                score,
                threshold: safeThreshold,
                failed: score < safeThreshold
            };
        });

        const failed = rows.filter(row => row.failed);

        const riskStudents = new Set(
            failed.map(row => row.studentId)
        );

        el("classesCount").textContent = classes.length;
        el("studentsCount").textContent = studentIds.size;
        el("riskCount").textContent = riskStudents.size;

        const overallAverage = average(
            rows.map(row => row.score)
        );

        el("averageScore").textContent =
            overallAverage === null ? "—" : `${overallAverage}/100`;

        const classesBody = el("classesTableBody");
        classesBody.innerHTML = "";

        for (const cls of classes) {
            const classId = String(cls.id);
            const classRows = rows.filter(row =>
                row.classId === classId
            );

            const classScores = classRows.map(row => row.score);
            const classAverage = average(classScores);

            const classRisk = new Set(
                classRows
                    .filter(row => row.failed)
                    .map(row => row.studentId)
            ).size;

            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td class="fw-semibold">
                    ${escapeHTML(cls.name || cls.className || classId)}
                </td>
                <td>${classRows.length}</td>
                <td>${classAverage === null ? "—" : `${classAverage}/100`}</td>
                <td>
                    <span class="badge ${classRisk ? "bg-danger" : "bg-success"}">
                        ${classRisk}
                    </span>
                </td>
            `;

            classesBody.appendChild(tr);
        }

        if (!classes.length) {
            classesBody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center text-muted py-4">
                        ${t.empty}
                    </td>
                </tr>
            `;
        }

        const riskBody = el("riskTableBody");
        riskBody.innerHTML = "";

        for (const row of failed) {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${escapeHTML(row.studentName)}</td>
                <td>${escapeHTML(row.className)}</td>
                <td>
                    <span class="badge bg-danger">${row.score}/100</span>
                </td>
                <td>${escapeHTML(row.testName)}</td>
            `;

            riskBody.appendChild(tr);
        }

        if (!failed.length) {
            riskBody.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center text-muted py-4">
                        ${t.empty}
                    </td>
                </tr>
            `;
        }
    }

    function initialize() {
        el("languageSelect").addEventListener("change", event => {
            const selected = event.target.value;
            localStorage.setItem("language", selected);
            render();
        });

        window.addEventListener("languageChanged", render);
        window.addEventListener("storage", render);

        render();
    }

    document.addEventListener("DOMContentLoaded", initialize);
})();