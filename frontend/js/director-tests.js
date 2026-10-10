(() => {
    "use strict";

    // ADVANTA Pulse — Тесты директора

    const $ = id => document.getElementById(id);
    const D = window.DirectorData;

    function translate(key) {
        return typeof window.t === "function"
            ? window.t(key)
            : key;
    }

    function displayStatus(status) {
        const values = {
            draft: "draft",
            published: "published",
            assigned: "published",
            finished: "finished",
            completed: "finished"
        };

        if (!status) return "—";

        return translate(values[status] || status);
    }

    function displaySubject(subject) {
        if (!subject) return "—";
        return translate(subject);
    }

    function averageScore(numbers) {
        if (numbers.length === 0) return "—";
        return D.average(numbers).toFixed(1) + "/100";
    }

    function getTeacherName(test, data) {
        const teacherId =
            test.teacherId ||
            test.createdBy ||
            test.authorId;

        if (!teacherId) return "—";

        const teacher = data.sm.get(String(teacherId));

        if (!teacher) return String(teacherId);

        return (
            teacher.fullName ||
            teacher.name ||
            [teacher.firstName, teacher.lastName]
                .filter(Boolean)
                .join(" ") ||
            String(teacherId)
        );
    }

    function getTestClasses(test, classes) {
        const ids = [
            test.classId,
            ...(test.classIds || []),
            ...(test.assignedClassIds || [])
        ]
            .filter(id => id !== undefined && id !== null)
            .map(String);

        const names = classes
            .filter(cls => ids.includes(String(cls.id)))
            .map(cls => cls.name || cls.className || cls.id);

        return {
            ids,
            names: names.join(", ") || "—"
        };
    }

    function updateSummary(data) {
        const results = data.results;
        const scores = results
            .map(result => result.score)
            .filter(score => Number.isFinite(score));

        $("totalTests").textContent = data.tests.length;
        $("totalResults").textContent = results.length;
        $("average").textContent = averageScore(scores);

        $("risk").textContent = results.filter(
            result => result.failed
        ).length;
    }

    function updateFilters(data) {
        const classFilter = $("classFilter");
        const subjectFilter = $("subjectFilter");

        const previousClass = classFilter.value;
        const previousSubject = subjectFilter.value;

        classFilter.replaceChildren(
            new Option(translate("filterClass"), "")
        );

        data.classes.forEach(cls => {
            classFilter.add(
                new Option(
                    cls.name || cls.className || cls.id,
                    String(cls.id)
                )
            );
        });

        classFilter.value = previousClass;

        const subjects = [...new Set(
            data.tests
                .map(test => test.subjectName || test.subject)
                .filter(Boolean)
        )].sort();

        subjectFilter.replaceChildren(
            new Option(translate("filterSubject"), "")
        );

        subjects.forEach(subject => {
            subjectFilter.add(
                new Option(
                    displaySubject(subject),
                    subject
                )
            );
        });

        subjectFilter.value = previousSubject;
    }

    function addTableRow(values) {
        const row = document.createElement("tr");

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = String(value ?? "—");
            row.appendChild(cell);
        });

        $("dataRows").appendChild(row);
    }

    function renderTests(data) {
        const search = $("search").value
            .trim()
            .toLowerCase();

        const selectedClass = $("classFilter").value;
        const selectedSubject = $("subjectFilter").value;

        const body = $("dataRows");
        body.replaceChildren();

        let visible = 0;

        data.tests.forEach(test => {
            const subject =
                test.subjectName || test.subject || "";

            const teacherName = getTeacherName(test, data);
            const testClasses = getTestClasses(
                test,
                data.classes
            );

            const testName =
                test.title || test.name || String(test.id);

            const searchable = [
                testName,
                subject,
                displaySubject(subject),
                teacherName,
                testClasses.names
            ].join(" ").toLowerCase();

            if (search && !searchable.includes(search)) {
                return;
            }

            if (
                selectedClass &&
                !testClasses.ids.includes(selectedClass)
            ) {
                return;
            }

            if (
                selectedSubject &&
                subject !== selectedSubject
            ) {
                return;
            }

            const results = data.results.filter(result =>
                String(result.test?.id) === String(test.id)
            );

            const scores = results
                .map(result => result.score)
                .filter(score => Number.isFinite(score));

            addTableRow([
                testName,
                displaySubject(subject),
                teacherName,
                testClasses.names,
                results.length,
                averageScore(scores),
                displayStatus(test.status)
            ]);

            visible++;
        });

        if (visible === 0) {
            const row = document.createElement("tr");
            const cell = document.createElement("td");

            cell.colSpan = 7;
            cell.className = "text-center text-muted p-4";
            cell.textContent = translate("emptyData");

            row.appendChild(cell);
            body.appendChild(row);
        }
    }

    function render() {
        if (!D || typeof D.load !== "function") {
            console.error("DirectorData is not loaded");
            return;
        }

        const data = D.load();

        updateSummary(data);
        updateFilters(data);
        renderTests(data);
    }

    function initialize() {
        $("search").addEventListener("input", render);
        $("classFilter").addEventListener("change", render);
        $("subjectFilter").addEventListener("change", render);

        window.addEventListener("languageChanged", render);
        window.addEventListener("storage", render);

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