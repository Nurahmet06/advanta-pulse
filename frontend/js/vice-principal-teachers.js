/* ADVANTA Pulse — Vice Principal / Teachers */
(function () {
    "use strict";

    const DEMO_TEACHER = {
        id: "teacher_math_1",
        name: "Айгуль Сериковна",
        subjectId: "math",
        subjectName: "Математика",
        classIds: ["class_5a", "class_5b", "class_6a"]
    };

    const words = {
        ru: {
            vpOverview: "Обзор", vpClasses: "Все классы",
            vpTeachers: "Учителя", vpTests: "Тесты",
            vpResults: "Результаты", vpAnalytics: "Аналитика",
            vpRole: "Завуч · ADVANTA Pulse",
            vpTeachersTitle: "Учителя школы",
            vpTeachersDescription: "Предметы, классы и результаты обучения.",
            vpTotalTeachers: "Всего учителей",
            vpActiveTeachers: "Учителя с тестами",
            vpTeachersNeedAttention: "Требуют внимания",
            vpSearchTeacher: "Поиск учителя",
            vpFilterSubject: "Предмет",
            vpTeacherList: "Список учителей",
            vpTeacher: "Учитель", vpSubject: "Предмет",
            vpAverage: "Средний балл", vpStatus: "Статус",
            vpAction: "Действие", vpClose: "Закрыть",
            vpView: "Подробнее", vpAllSubjects: "Все предметы",
            vpSearchPlaceholder: "Имя или фамилия",
            vpNoTeachers: "Учителя не найдены",
            vpNoResults: "Недостаточно данных",
            vpCritical: "Критический",
            vpAttention: "Требует внимания",
            vpGood: "Хороший", vpExcellent: "Высокий",
            vpClass: "Класс", vpCompleted: "Завершённых тестов",
            vpStudentsTested: "Учеников с результатами",
            vpNoClasses: "Нет закреплённых классов",
            vpUnassigned: "Не назначен",
            vpAnalyzeClass: "Анализ класса",
        },
        kz: {
            vpOverview: "Шолу", vpClasses: "Барлық сыныптар",
            vpTeachers: "Мұғалімдер", vpTests: "Тесттер",
            vpResults: "Нәтижелер", vpAnalytics: "Талдау",
            vpRole: "Оқу ісінің меңгерушісі · ADVANTA Pulse",
            vpTeachersTitle: "Мектеп мұғалімдері",
            vpTeachersDescription: "Пәндер, сыныптар және оқу нәтижелері.",
            vpTotalTeachers: "Мұғалімдер саны",
            vpActiveTeachers: "Тесттері бар мұғалімдер",
            vpTeachersNeedAttention: "Назар аудару қажет",
            vpSearchTeacher: "Мұғалімді іздеу",
            vpFilterSubject: "Пән",
            vpTeacherList: "Мұғалімдер тізімі",
            vpTeacher: "Мұғалім", vpSubject: "Пән",
            vpAverage: "Орташа балл", vpStatus: "Мәртебе",
            vpAction: "Әрекет", vpClose: "Жабу",
            vpView: "Толығырақ", vpAllSubjects: "Барлық пәндер",
            vpSearchPlaceholder: "Аты немесе тегі",
            vpNoTeachers: "Мұғалімдер табылмады",
            vpNoResults: "Деректер жеткіліксіз",
            vpCritical: "Күрделі",
            vpAttention: "Назар аудару қажет",
            vpGood: "Жақсы", vpExcellent: "Жоғары",
            vpClass: "Сынып", vpCompleted: "Аяқталған тесттер",
            vpStudentsTested: "Нәтижесі бар оқушылар",
            vpNoClasses: "Бекітілген сыныптар жоқ",
            vpUnassigned: "Тағайындалмаған",
            vpAnalyzeClass: "Сыныпты талдау",
        },
        en: {
            vpOverview: "Overview", vpClasses: "All Classes",
            vpTeachers: "Teachers", vpTests: "Tests",
            vpResults: "Results", vpAnalytics: "Analytics",
            vpRole: "Vice Principal · ADVANTA Pulse",
            vpTeachersTitle: "School Teachers",
            vpTeachersDescription: "Subjects, classes and learning outcomes.",
            vpTotalTeachers: "Total Teachers",
            vpActiveTeachers: "Teachers With Tests",
            vpTeachersNeedAttention: "Need Attention",
            vpSearchTeacher: "Search Teachers",
            vpFilterSubject: "Subject",
            vpTeacherList: "Teacher List",
            vpTeacher: "Teacher", vpSubject: "Subject",
            vpAverage: "Average Score", vpStatus: "Status",
            vpAction: "Action", vpClose: "Close",
            vpView: "Details", vpAllSubjects: "All Subjects",
            vpSearchPlaceholder: "First or last name",
            vpNoTeachers: "No teachers found",
            vpNoResults: "Insufficient data",
            vpCritical: "Critical",
            vpAttention: "Needs attention",
            vpGood: "Good", vpExcellent: "High",
            vpClass: "Class", vpCompleted: "Completed tests",
            vpStudentsTested: "Students with results",
            vpNoClasses: "No assigned classes",
            vpUnassigned: "Unassigned",
            vpAnalyzeClass: "Class Analysis",
        }
    };

    const subjectNames = {
        math: { ru: "Математика", kz: "Математика", en: "Mathematics" },
        english: { ru: "Английский язык", kz: "Ағылшын тілі", en: "English" },
        physics: { ru: "Физика", kz: "Физика", en: "Physics" }
    };

    let selectedTeacherId = null;

    function read(key) {
        try {
            const value = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(value) ? value : [];
        } catch {
            return [];
        }
    }

    function lang() {
        const value = typeof getCurrentLanguage === "function"
            ? getCurrentLanguage()
            : localStorage.getItem("language");
        return ["ru", "kz", "en"].includes(value) ? value : "ru";
    }

    function tr(key) {
        return words[lang()]?.[key] || words.ru[key] || key;
    }

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;",
            '"': "&quot;", "'": "&#39;"
        }[char]));
    }

    function subjectName(id, fallback) {
        return subjectNames[String(id || "").toLowerCase()]?.[lang()]
            || fallback || tr("vpUnassigned");
    }

    function scoreOf(result) {
        if (result.score === "" || result.score == null) return null;
        const score = Number(result.score);
        return Number.isFinite(score) && score >= 0 && score <= 100
            ? score : null;
    }

    function average(values) {
        return values.length
            ? Math.round(values.reduce((a, b) => a + b, 0) / values.length)
            : null;
    }

    function status(score) {
        if (score == null) return ["vpNoResults", "secondary"];
        if (score < 50) return ["vpCritical", "danger"];
        if (score < 70) return ["vpAttention", "warning"];
        if (score < 90) return ["vpGood", "primary"];
        return ["vpExcellent", "success"];
    }

    function badge(score) {
        const [key, color] = status(score);
        return `<span class="badge text-bg-${color}">${escapeHTML(tr(key))}</span>`;
    }

    function latestResults(results) {
        const map = new Map();

        results.forEach((result, index) => {
            const studentId = result.studentId ?? result.userId;
            const testId = result.testId ?? result.testID ?? result.test?.id;
            if (studentId == null || testId == null || scoreOf(result) == null) {
                return;
            }

            const key = JSON.stringify([String(studentId), String(testId)]);
            const time = Date.parse(
                result.completedAt ?? result.createdAt ?? result.date ?? ""
            ) || 0;
            const old = map.get(key);

            if (!old || time > old.time ||
                (time === old.time && index > old.index)) {
                map.set(key, { result, time, index });
            }
        });

        return [...map.values()].map(item => item.result);
    }

    function loadData() {
        const classes = read("advantaClasses");
        const users = read("advantaUsers");
        const tests = read("advantaTests");
        const results = latestResults(read("advantaResults"));
        const teachers = new Map();

        function addTeacher(item) {
            if (!item?.id) return;
            const id = String(item.id);
            const previous = teachers.get(id) || {};
            teachers.set(id, {
                ...previous, ...item, id,
                classIds: [...new Set([
                    ...(previous.classIds || []),
                    ...(item.classIds || [])
                ].map(String))]
            });
        }

        addTeacher(DEMO_TEACHER);

        users.filter(user =>
            ["teacher", "учитель"].includes(
                String(user.role || "").toLowerCase()
            )
        ).forEach(user => addTeacher({
            ...user,
            name: user.name ||
                [user.firstName, user.lastName].filter(Boolean).join(" ")
        }));

        classes.forEach(cls => {
            if (!cls.teacherId) return;
            const previous = teachers.get(String(cls.teacherId)) || {
                id: String(cls.teacherId), classIds: []
            };
            addTeacher({
                ...previous,
                classIds: [...previous.classIds, cls.id],
                subjectId: previous.subjectId || cls.subjectId,
                subjectName: previous.subjectName || cls.subjectName
            });
        });

        tests.forEach(test => {
            if (!test.teacherId) return;
            const previous = teachers.get(String(test.teacherId)) || {
                id: String(test.teacherId), classIds: []
            };
            addTeacher({
                ...previous,
                classIds: test.classId
                    ? [...previous.classIds, test.classId]
                    : previous.classIds,
                subjectId: previous.subjectId || test.subjectId,
                subjectName: previous.subjectName || test.subject
            });
        });

        const teacherList = [...teachers.values()].map(teacher => {
            const teacherTests = tests.filter(test =>
                String(test.teacherId) === teacher.id
            );
            const teacherTestIds = new Set(
                teacherTests.map(test => String(test.id))
            );
            const teacherResults = results.filter(result =>
                teacherTestIds.has(String(
                    result.testId ?? result.testID ?? result.test?.id
                ))
            );
            const avg = average(
                teacherResults.map(scoreOf).filter(score => score !== null)
            );

            return {
                ...teacher,
                tests: teacherTests,
                results: teacherResults,
                average: avg
            };
        });

        return { classes, users, tests, results, teachers: teacherList };
    }

    function getClassName(data, id) {
        const cls = data.classes.find(item => String(item.id) === String(id));
        return cls?.name || cls?.className || String(id);
    }

    function renderFilters(data) {
        const select = document.getElementById("subjectFilter");
        const previous = select.value;
        const subjects = new Map();

        data.teachers.forEach(teacher => {
            if (teacher.subjectId) {
                subjects.set(String(teacher.subjectId), teacher.subjectName);
            }
        });

        select.innerHTML = `<option value="all">${escapeHTML(tr("vpAllSubjects"))}</option>` +
            [...subjects].map(([id, name]) =>
                `<option value="${escapeHTML(id)}">${escapeHTML(subjectName(id, name))}</option>`
            ).join("");

        select.value = [...select.options].some(o => o.value === previous)
            ? previous : "all";
    }

    function renderTable(data) {
        const search = document.getElementById("teacherSearch")
            .value.trim().toLowerCase();
        const filter = document.getElementById("subjectFilter").value;

        const filtered = data.teachers.filter(teacher =>
            String(teacher.name || "").toLowerCase().includes(search) &&
            (filter === "all" || String(teacher.subjectId) === filter)
        );

        const body = document.getElementById("teachersTableBody");

        if (!filtered.length) {
            body.innerHTML = `<tr><td colspan="7" class="text-muted">${escapeHTML(tr("vpNoTeachers"))}</td></tr>`;
            return;
        }

        body.innerHTML = filtered.map(teacher => {
            const classes = (teacher.classIds || [])
                .map(id => getClassName(data, id)).join(", ");

            return `<tr>
                <td class="fw-semibold">${escapeHTML(teacher.name || tr("vpUnassigned"))}</td>
                <td>${escapeHTML(subjectName(teacher.subjectId, teacher.subjectName))}</td>
                <td>${escapeHTML(classes || tr("vpNoClasses"))}</td>
                <td>${teacher.tests.length}</td>
                <td>${teacher.average == null ? "—" : teacher.average + "/100"}</td>
                <td>${badge(teacher.average)}</td>
                <td><button type="button" class="btn btn-sm btn-outline-primary"
                    data-teacher-id="${escapeHTML(teacher.id)}">${escapeHTML(tr("vpView"))}</button></td>
            </tr>`;
        }).join("");
    }

    function renderDetails(data) {
        const teacher = data.teachers.find(item =>
            item.id === selectedTeacherId
        );
        const section = document.getElementById("teacherDetails");

        if (!teacher) {
            section.classList.add("d-none");
            return;
        }

        section.classList.remove("d-none");
        document.getElementById("selectedTeacherName").textContent =
            teacher.name || tr("vpUnassigned");

        const rows = (teacher.classIds || []).map(classId => {
            const classTestIds = new Set(
                teacher.tests.filter(test =>
                    String(test.classId) === String(classId)
                ).map(test => String(test.id))
            );

            const results = teacher.results.filter(result =>
                classTestIds.has(String(
                    result.testId ?? result.testID ?? result.test?.id
                ))
            );

            const scores = results.map(scoreOf)
                .filter(score => score !== null);
            const avg = average(scores);
            const students = new Set(results.map(result =>
                String(result.studentId ?? result.userId)
            ));

            return `<tr>
    <td>${escapeHTML(getClassName(data, classId))}</td>
    <td>${results.length}</td>
    <td>${students.size}</td>
    <td>${avg == null ? "—" : avg + "/100"}</td>
    <td>${badge(avg)}</td>
    <td>
        <button
            type="button"
            class="btn btn-sm btn-outline-primary"
            data-analyze-class="${escapeHTML(classId)}"
            data-analyze-teacher="${escapeHTML(teacher.id)}"
        >
            ${escapeHTML(tr("vpAnalyzeClass"))}
        </button>
    </td>
</tr>`;
        }).join("");

        document.getElementById("teacherDetailsContent").innerHTML = `
            <p class="text-muted">${escapeHTML(subjectName(teacher.subjectId, teacher.subjectName))}</p>
            <div class="table-responsive">
                <table class="table align-middle">
                    <thead><tr>
                        <th>${escapeHTML(tr("vpClass"))}</th>
                        <th>${escapeHTML(tr("vpCompleted"))}</th>
                        <th>${escapeHTML(tr("vpStudentsTested"))}</th>
                        <th>${escapeHTML(tr("vpAverage"))}</th>
                        <th>${escapeHTML(tr("vpStatus"))}</th>
                        <th>${escapeHTML(tr("vpAction"))}</th>
                    </tr></thead>
                    <tbody>${rows || `<tr><td colspan="6">${escapeHTML(tr("vpNoClasses"))}</td></tr>`}</tbody>
                </table>
            </div>`;
    }

    function render() {
        const data = loadData();
        document.documentElement.lang = lang() === "kz" ? "kk" : lang();

        document.querySelectorAll("[data-i18n]").forEach(element => {
            element.textContent = tr(element.dataset.i18n);
        });

        const languageSelect = document.getElementById("languageSelect");
        languageSelect.value = lang();

        document.getElementById("teacherSearch").placeholder =
            tr("vpSearchPlaceholder");

        document.getElementById("totalTeachers").textContent =
            data.teachers.length;
        document.getElementById("activeTeachers").textContent =
            data.teachers.filter(teacher => teacher.tests.length > 0).length;
        document.getElementById("teachersNeedAttention").textContent =
            data.teachers.filter(teacher =>
                teacher.average !== null && teacher.average < 70
            ).length;

        renderFilters(data);
        renderTable(data);
        renderDetails(data);
    }

    function initialize() {
        document.getElementById("teacherSearch")
            .addEventListener("input", render);

        document.getElementById("subjectFilter")
            .addEventListener("change", render);

        document.getElementById("teachersTableBody")
            .addEventListener("click", event => {
                const button = event.target.closest("[data-teacher-id]");
                if (!button) return;
                selectedTeacherId = button.dataset.teacherId;
                render();
                document.getElementById("teacherDetails")
                    .scrollIntoView({ behavior: "smooth", block: "start" });
            });

            document.getElementById("teacherDetails")
    .addEventListener("click", event => {

        const button = event.target.closest(
            "[data-analyze-class]"
        );

        if (!button) return;

        const classId = button.dataset.analyzeClass;
        const teacherId = button.dataset.analyzeTeacher;

        if (!classId || !teacherId) return;

        window.location.href =
            `vice-principal-analytics.html?class=${encodeURIComponent(classId)}&teacher=${encodeURIComponent(teacherId)}`;
    });

        document.getElementById("closeTeacherDetails")
            .addEventListener("click", () => {
                selectedTeacherId = null;
                render();
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