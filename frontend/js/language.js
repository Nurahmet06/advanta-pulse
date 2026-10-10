/* ADVANTA Pulse — единая система языков RU / KZ / EN. */
(() => {
  "use strict";
  const dictionary = {
  "home": [
    "Главная",
    "Басты бет",
    "Home"
  ],
  "tasks": [
    "Задания",
    "Тапсырмалар",
    "Assignments"
  ],
  "results": [
    "Мои результаты",
    "Менің нәтижелерім",
    "My Results"
  ],
  "logout": [
    "Выйти",
    "Шығу",
    "Log out"
  ],
  "welcome": [
    "Добро пожаловать",
    "Қош келдіңіз",
    "Welcome"
  ],
  "student": [
    "Ученик",
    "Оқушы",
    "Student"
  ],
  "save": [
    "Сохранить",
    "Сақтау",
    "Save"
  ],
  "cancel": [
    "Отмена",
    "Бас тарту",
    "Cancel"
  ],
  "back": [
    "Назад",
    "Артқа",
    "Back"
  ],
  "next": [
    "Далее",
    "Келесі",
    "Next"
  ],
  "view": [
    "Посмотреть",
    "Көру",
    "View"
  ],
  "submit": [
    "Отправить",
    "Жіберу",
    "Submit"
  ],
  "return": [
    "Вернуться",
    "Қайту",
    "Go back"
  ],
  "email": [
    "Email",
    "Email",
    "Email"
  ],
  "password": [
    "Пароль",
    "Құпиясөз",
    "Password"
  ],
  "phone": [
    "Номер телефона",
    "Телефон нөмірі",
    "Phone number"
  ],
  "status": [
    "Статус",
    "Мәртебе",
    "Status"
  ],
  "actions": [
    "Действия",
    "Әрекеттер",
    "Actions"
  ],
  "approve": [
    "Подтвердить",
    "Растау",
    "Approve"
  ],
  "reject": [
    "Отклонить",
    "Қабылдамау",
    "Reject"
  ],
  "approved": [
    "Подтверждён",
    "Расталды",
    "Approved"
  ],
  "rejected": [
    "Отклонён",
    "Қабылданбады",
    "Rejected"
  ],
  "pending": [
    "Ожидает подтверждения",
    "Растауды күтуде",
    "Pending approval"
  ],
  "loginTitle": [
    "Вход в систему",
    "Жүйеге кіру",
    "Sign in"
  ],
  "enterEmail": [
    "Введите email",
    "Email енгізіңіз",
    "Enter email"
  ],
  "enterPassword": [
    "Введите пароль",
    "Құпиясөзді енгізіңіз",
    "Enter password"
  ],
  "login": [
    "Войти",
    "Кіру",
    "Sign in"
  ],
  "register": [
    "Зарегистрироваться",
    "Тіркелу",
    "Register"
  ],
  "studentRegistration": [
    "Регистрация ученика",
    "Оқушыны тіркеу",
    "Student Registration"
  ],
  "firstName": [
    "Имя",
    "Аты",
    "First name"
  ],
  "lastName": [
    "Фамилия",
    "Тегі",
    "Last name"
  ],
  "repeatPassword": [
    "Повторите пароль",
    "Құпиясөзді қайталаңыз",
    "Repeat password"
  ],
  "selectClass": [
    "Класс",
    "Сынып",
    "Class"
  ],
  "chooseClass": [
    "Выберите свой класс",
    "Өз сыныбыңызды таңдаңыз",
    "Select your class"
  ],
  "activeTasks": [
    "Активные задания",
    "Белсенді тапсырмалар",
    "Active assignments"
  ],
  "averageResult": [
    "Средний результат",
    "Орташа нәтиже",
    "Average score"
  ],
  "bestResult": [
    "Лучший результат",
    "Үздік нәтиже",
    "Best score"
  ],
  "allResults": [
    "Все результаты",
    "Барлық нәтижелер",
    "All results"
  ],
  "math": [
    "Математика",
    "Математика",
    "Mathematics"
  ],
  "english": [
    "Английский язык",
    "Ағылшын тілі",
    "English"
  ],
  "kazakh": [
    "Казахский язык",
    "Қазақ тілі",
    "Kazakh Language"
  ],
  "physics": [
    "Физика",
    "Физика",
    "Physics"
  ],
  "chemistry": [
    "Химия",
    "Химия",
    "Chemistry"
  ],
  "biology": [
    "Биология",
    "Биология",
    "Biology"
  ],
  "history": [
    "История",
    "Тарих",
    "History"
  ],
  "geography": [
    "География",
    "География",
    "Geography"
  ],
  "informatics": [
    "Информатика",
    "Информатика",
    "Computer Science"
  ],
  "fractions": [
    "Обыкновенные дроби",
    "Жай бөлшектер",
    "Common Fractions"
  ],
  "percentages": [
    "Проценты",
    "Пайыздар",
    "Percentages"
  ],
  "linearEquations": [
    "Линейные уравнения",
    "Сызықтық теңдеулер",
    "Linear Equations"
  ],
  "pastSimple": [
    "Past Simple",
    "Past Simple",
    "Past Simple"
  ],
  "presentSimple": [
    "Present Simple",
    "Present Simple",
    "Present Simple"
  ],
  "cases": [
    "Септік жалғаулары",
    "Септік жалғаулары",
    "Cases"
  ],
  "assignedTests": [
    "Назначенные вам срезы",
    "Сізге тағайындалған тапсырмалар",
    "Your assigned assessments"
  ],
  "deadline": [
    "Дедлайн",
    "Соңғы мерзім",
    "Deadline"
  ],
  "threshold": [
    "Порог",
    "Өту балы",
    "Passing score"
  ],
  "questions": [
    "вопросов",
    "сұрақ",
    "questions"
  ],
  "startTest": [
    "Начать тест",
    "Тестті бастау",
    "Start test"
  ],
  "active": [
    "Активен",
    "Белсенді",
    "Active"
  ],
  "completed": [
    "Завершён",
    "Аяқталды",
    "Completed"
  ],
  "overdue": [
    "Просрочен",
    "Мерзімі өтті",
    "Overdue"
  ],
  "passed": [
    "Пройден",
    "Өтті",
    "Passed"
  ],
  "failed": [
    "Не пройден",
    "Өтпеді",
    "Not passed"
  ],
  "score": [
    "Результат",
    "Нәтиже",
    "Score"
  ],
  "passingScore": [
    "Проходной балл",
    "Өту балы",
    "Passing score"
  ],
  "question": [
    "Вопрос",
    "Сұрақ",
    "Question"
  ],
  "of": [
    "из",
    "/",
    "of"
  ],
  "finishTest": [
    "Завершить тест",
    "Тестті аяқтау",
    "Finish test"
  ],
  "timeLeft": [
    "Осталось времени",
    "Қалған уақыт",
    "Time remaining"
  ],
  "answerHidden": [
    "Правильные ответы не отображаются.",
    "Дұрыс жауаптар көрсетілмейді.",
    "Correct answers are not displayed."
  ],
  "staffHome": [
    "Главная",
    "Басты бет",
    "Home"
  ],
  "myTests": [
    "Мои тесты",
    "Менің тесттерім",
    "My Tests"
  ],
  "createTest": [
    "Создать тест",
    "Тест құру",
    "Create Test"
  ],
  "classes": [
    "Классы",
    "Сыныптар",
    "Classes"
  ],
  "analytics": [
    "Аналитика",
    "Талдау",
    "Analytics"
  ],
  "studentResults": [
    "Результаты учеников",
    "Оқушылардың нәтижелері",
    "Student Results"
  ],
  "teacher": [
    "Учитель",
    "Мұғалім",
    "Teacher"
  ],
  "deputy": [
    "Завуч",
    "Оқу ісі меңгерушісі",
    "Deputy Principal"
  ],
  "director": [
    "Директор",
    "Директор",
    "Director"
  ],
  "testsCreated": [
    "Создано тестов",
    "Құрылған тесттер",
    "Tests created"
  ],
  "activeTests": [
    "Активные тесты",
    "Белсенді тесттер",
    "Active tests"
  ],
  "students": [
    "Ученики",
    "Оқушылар",
    "Students"
  ],
  "classAverage": [
    "Средний результат",
    "Орташа нәтиже",
    "Average score"
  ],
  "recentTests": [
    "Последние тесты",
    "Соңғы тесттер",
    "Recent tests"
  ],
  "testName": [
    "Название теста",
    "Тест атауы",
    "Test name"
  ],
  "subject": [
    "Предмет",
    "Пән",
    "Subject"
  ],
  "class": [
    "Класс",
    "Сынып",
    "Class"
  ],
  "draft": [
    "Черновик",
    "Жоба",
    "Draft"
  ],
  "published": [
    "Назначен",
    "Тағайындалды",
    "Assigned"
  ],
  "finished": [
    "Завершён",
    "Аяқталды",
    "Completed"
  ],
  "open": [
    "Открыть",
    "Ашу",
    "Open"
  ],
  "assign": [
    "Назначить",
    "Тағайындау",
    "Assign"
  ],
  "myClasses": [
    "Мои классы",
    "Менің сыныптарым",
    "My Classes"
  ],
  "requests": [
    "Заявки",
    "Өтінімдер",
    "Requests"
  ],
  "noStudents": [
    "В классе пока нет учеников",
    "Сыныпта әзірге оқушылар жоқ",
    "There are no students in this class yet"
  ],
  "administrator": [
    "Администратор",
    "Әкімші",
    "Administrator"
  ],
  "directorOverview": [
    "Панель директора",
    "Директор панелі",
    "Director dashboard"
  ],
  "directorClassesTitle": [
    "Классы школы",
    "Мектеп сыныптары",
    "School classes"
  ],
  "q1": [
    "Чему равно 1/2 + 1/4?",
    "1/2 + 1/4 нешеге тең?",
    "What is 1/2 + 1/4?"
  ],
  "q2": [
    "Какая дробь является правильной?",
    "Қай бөлшек дұрыс бөлшек?",
    "Which fraction is a proper fraction?"
  ],
  "q3": [
    "Чему равно 3/5 − 1/5?",
    "3/5 − 1/5 нешеге тең?",
    "What is 3/5 − 1/5?"
  ],
  "q4": [
    "Какая дробь равна 0,5?",
    "Қай бөлшек 0,5 санына тең?",
    "Which fraction is equal to 0.5?"
  ],
  "q5": [
    "Чему равно 2/3 + 1/3?",
    "2/3 + 1/3 нешеге тең?",
    "What is 2/3 + 1/3?"
  ],
  "q1a": [
    "2/6",
    "2/6",
    "2/6"
  ],
  "q1b": [
    "3/4",
    "3/4",
    "3/4"
  ],
  "q1c": [
    "1/6",
    "1/6",
    "1/6"
  ],
  "q1d": [
    "2/4",
    "2/4",
    "2/4"
  ],
  "q2a": [
    "7/4",
    "7/4",
    "7/4"
  ],
  "q2b": [
    "9/5",
    "9/5",
    "9/5"
  ],
  "q2c": [
    "3/8",
    "3/8",
    "3/8"
  ],
  "q2d": [
    "12/7",
    "12/7",
    "12/7"
  ],
  "q3a": [
    "2/5",
    "2/5",
    "2/5"
  ],
  "q3b": [
    "2/10",
    "2/10",
    "2/10"
  ],
  "q3c": [
    "4/5",
    "4/5",
    "4/5"
  ],
  "q3d": [
    "3/10",
    "3/10",
    "3/10"
  ],
  "q4a": [
    "1/3",
    "1/3",
    "1/3"
  ],
  "q4b": [
    "1/2",
    "1/2",
    "1/2"
  ],
  "q4c": [
    "2/3",
    "2/3",
    "2/3"
  ],
  "q4d": [
    "3/4",
    "3/4",
    "3/4"
  ],
  "q5a": [
    "3/6",
    "3/6",
    "3/6"
  ],
  "q5b": [
    "1",
    "1",
    "1"
  ],
  "q5c": [
    "2/6",
    "2/6",
    "2/6"
  ],
  "q5d": [
    "3/9",
    "3/9",
    "3/9"
  ]
};
  const pageDictionaries = {
  "director-home": {
    "ru": {
      "nav": [
        "Обзор",
        "Классы",
        "Учителя",
        "Тесты",
        "Результаты",
        "Аналитика"
      ],
      "title": "Панель директора",
      "description": "Общая картина успеваемости школы",
      "classes": "Всего классов",
      "students": "Учеников",
      "average": "Средний балл",
      "risk": "Учеников группы риска",
      "classesTitle": "Успеваемость по классам",
      "class": "Класс",
      "tests": "Результатов",
      "score": "Средний балл",
      "riskHeader": "Группа риска",
      "riskTitle": "Ученики группы риска",
      "student": "Ученик",
      "test": "Тест",
      "empty": "Данных пока нет",
      "unknown": "Не указан"
    },
    "kk": {
      "nav": [
        "Шолу",
        "Сыныптар",
        "Мұғалімдер",
        "Тесттер",
        "Нәтижелер",
        "Талдау"
      ],
      "title": "Директор панелі",
      "description": "Мектеп үлгерімінің жалпы көрінісі",
      "classes": "Сыныптар саны",
      "students": "Оқушылар саны",
      "average": "Орташа балл",
      "risk": "Тәуекел тобындағы оқушылар",
      "classesTitle": "Сыныптар бойынша үлгерім",
      "class": "Сынып",
      "tests": "Нәтижелер саны",
      "score": "Орташа балл",
      "riskHeader": "Тәуекел тобы",
      "riskTitle": "Тәуекел тобындағы оқушылар",
      "student": "Оқушы",
      "test": "Тест",
      "empty": "Әзірге деректер жоқ",
      "unknown": "Көрсетілмеген"
    },
    "en": {
      "nav": [
        "Overview",
        "Classes",
        "Teachers",
        "Tests",
        "Results",
        "Analytics"
      ],
      "title": "Director Dashboard",
      "description": "School-wide academic performance",
      "classes": "Total classes",
      "students": "Students",
      "average": "Average score",
      "risk": "At-risk students",
      "classesTitle": "Performance by class",
      "class": "Class",
      "tests": "Results",
      "score": "Average score",
      "riskHeader": "At-risk students",
      "riskTitle": "At-risk students",
      "student": "Student",
      "test": "Test",
      "empty": "No data yet",
      "unknown": "Not specified"
    },
    "kz": {
      "nav": [
        "Шолу",
        "Сыныптар",
        "Мұғалімдер",
        "Тесттер",
        "Нәтижелер",
        "Талдау"
      ],
      "title": "Директор панелі",
      "description": "Мектеп үлгерімінің жалпы көрінісі",
      "classes": "Сыныптар саны",
      "students": "Оқушылар саны",
      "average": "Орташа балл",
      "risk": "Тәуекел тобындағы оқушылар",
      "classesTitle": "Сыныптар бойынша үлгерім",
      "class": "Сынып",
      "tests": "Нәтижелер саны",
      "score": "Орташа балл",
      "riskHeader": "Тәуекел тобы",
      "riskTitle": "Тәуекел тобындағы оқушылар",
      "student": "Оқушы",
      "test": "Тест",
      "empty": "Әзірге деректер жоқ",
      "unknown": "Көрсетілмеген"
    }
  },
  "staff-home": {
    "ru": {
      "teacher": "Учитель",
      "testFallback": "Тест",
      "edit": "Изменить",
      "noTests": "Тестов пока нет",
      "draft": "Черновик",
      "published": "Назначен",
      "finished": "Завершён",
      "students": "уч.",
      "requests": "заявок"
    },
    "kz": {
      "teacher": "Мұғалім",
      "testFallback": "Тест",
      "edit": "Өзгерту",
      "noTests": "Тесттер әзірге жоқ",
      "draft": "Жоба",
      "published": "Тағайындалды",
      "finished": "Аяқталды",
      "students": "оқушы",
      "requests": "өтінім"
    },
    "en": {
      "teacher": "Teacher",
      "testFallback": "Test",
      "edit": "Edit",
      "noTests": "No tests yet",
      "draft": "Draft",
      "published": "Assigned",
      "finished": "Finished",
      "students": "students",
      "requests": "requests"
    },
    "kk": {
      "teacher": "Мұғалім",
      "testFallback": "Тест",
      "edit": "Өзгерту",
      "noTests": "Тесттер әзірге жоқ",
      "draft": "Жоба",
      "published": "Тағайындалды",
      "finished": "Аяқталды",
      "students": "оқушы",
      "requests": "өтінім"
    }
  },
  "director-classes": {
    "ru": {
      "navOverview": "Обзор",
      "navClasses": "Классы",
      "navTeachers": "Учителя",
      "navTests": "Тесты",
      "navResults": "Результаты",
      "navAnalytics": "Аналитика",
      "pageTitle": "Классы школы",
      "pageDescription": "Мониторинг классов, учеников и результатов",
      "classesLabel": "Всего классов",
      "studentsLabel": "Всего учеников",
      "testsLabel": "Всего тестов",
      "averageLabel": "Средний балл",
      "tableTitle": "Список классов",
      "classHeader": "Класс",
      "teacherHeader": "Учитель",
      "studentsHeader": "Ученики",
      "testsHeader": "Тесты",
      "scoreHeader": "Средний балл",
      "riskHeader": "Группа риска",
      "actionsHeader": "Действие",
      "emptyMessage": "Классы пока не найдены",
      "detailsTitle": "Информация о классе",
      "search": "Поиск класса",
      "allGrades": "Все параллели",
      "view": "Подробнее",
      "noData": "Нет данных",
      "studentList": "Ученики класса",
      "student": "Ученик",
      "score": "Средний результат",
      "risk": "Группа риска",
      "noStudents": "Ученики пока не добавлены",
      "noResults": "Нет результатов",
      "riskInfo": "Группа риска: средний балл ученика ниже 70",
      "loadingError": "Не удалось прочитать данные",
      "grade": "Параллель"
    },
    "kk": {
      "navOverview": "Шолу",
      "navClasses": "Сыныптар",
      "navTeachers": "Мұғалімдер",
      "navTests": "Тесттер",
      "navResults": "Нәтижелер",
      "navAnalytics": "Талдау",
      "pageTitle": "Мектеп сыныптары",
      "pageDescription": "Сыныптарды, оқушыларды және нәтижелерді бақылау",
      "classesLabel": "Сыныптар саны",
      "studentsLabel": "Оқушылар саны",
      "testsLabel": "Тесттер саны",
      "averageLabel": "Орташа балл",
      "tableTitle": "Сыныптар тізімі",
      "classHeader": "Сынып",
      "teacherHeader": "Мұғалім",
      "studentsHeader": "Оқушылар",
      "testsHeader": "Тесттер",
      "scoreHeader": "Орташа балл",
      "riskHeader": "Тәуекел тобы",
      "actionsHeader": "Әрекет",
      "emptyMessage": "Сыныптар табылмады",
      "detailsTitle": "Сынып туралы ақпарат",
      "search": "Сыныпты іздеу",
      "allGrades": "Барлық параллельдер",
      "view": "Толығырақ",
      "noData": "Деректер жоқ",
      "studentList": "Сынып оқушылары",
      "student": "Оқушы",
      "score": "Орташа нәтиже",
      "risk": "Тәуекел тобы",
      "noStudents": "Оқушылар әлі қосылмаған",
      "noResults": "Нәтижелер жоқ",
      "riskInfo": "Тәуекел тобы: оқушының орташа балы 70-тен төмен",
      "loadingError": "Деректерді оқу мүмкін болмады",
      "grade": "Параллель"
    },
    "en": {
      "navOverview": "Overview",
      "navClasses": "Classes",
      "navTeachers": "Teachers",
      "navTests": "Tests",
      "navResults": "Results",
      "navAnalytics": "Analytics",
      "pageTitle": "School Classes",
      "pageDescription": "Monitoring classes, students and results",
      "classesLabel": "Total Classes",
      "studentsLabel": "Total Students",
      "testsLabel": "Total Tests",
      "averageLabel": "Average Score",
      "tableTitle": "Class List",
      "classHeader": "Class",
      "teacherHeader": "Teacher",
      "studentsHeader": "Students",
      "testsHeader": "Tests",
      "scoreHeader": "Average Score",
      "riskHeader": "At-Risk Students",
      "actionsHeader": "Action",
      "emptyMessage": "No classes found",
      "detailsTitle": "Class Information",
      "search": "Search class",
      "allGrades": "All Grades",
      "view": "Details",
      "noData": "No data",
      "studentList": "Class Students",
      "student": "Student",
      "score": "Average Result",
      "risk": "At Risk",
      "noStudents": "No students added yet",
      "noResults": "No results",
      "riskInfo": "At risk: student's average score is below 70",
      "loadingError": "Unable to read data",
      "grade": "Grade"
    },
    "kz": {
      "navOverview": "Шолу",
      "navClasses": "Сыныптар",
      "navTeachers": "Мұғалімдер",
      "navTests": "Тесттер",
      "navResults": "Нәтижелер",
      "navAnalytics": "Талдау",
      "pageTitle": "Мектеп сыныптары",
      "pageDescription": "Сыныптарды, оқушыларды және нәтижелерді бақылау",
      "classesLabel": "Сыныптар саны",
      "studentsLabel": "Оқушылар саны",
      "testsLabel": "Тесттер саны",
      "averageLabel": "Орташа балл",
      "tableTitle": "Сыныптар тізімі",
      "classHeader": "Сынып",
      "teacherHeader": "Мұғалім",
      "studentsHeader": "Оқушылар",
      "testsHeader": "Тесттер",
      "scoreHeader": "Орташа балл",
      "riskHeader": "Тәуекел тобы",
      "actionsHeader": "Әрекет",
      "emptyMessage": "Сыныптар табылмады",
      "detailsTitle": "Сынып туралы ақпарат",
      "search": "Сыныпты іздеу",
      "allGrades": "Барлық параллельдер",
      "view": "Толығырақ",
      "noData": "Деректер жоқ",
      "studentList": "Сынып оқушылары",
      "student": "Оқушы",
      "score": "Орташа нәтиже",
      "risk": "Тәуекел тобы",
      "noStudents": "Оқушылар әлі қосылмаған",
      "noResults": "Нәтижелер жоқ",
      "riskInfo": "Тәуекел тобы: оқушының орташа балы 70-тен төмен",
      "loadingError": "Деректерді оқу мүмкін болмады",
      "grade": "Параллель"
    }
  },
  "create-test": {
    "ru": {
      "createTitle": "Создать тест",
      "editTitle": "Изменить тест",
      "classSubtitle": "Класс",
      "settings": "Настройки теста",
      "timeSettings": "Время прохождения",
      "unlimited": "Без ограничения по времени",
      "limited": "Ограничить время",
      "timeLimit": "Время на прохождение",
      "minutes": "мин.",
      "timeHint": "От 1 до 300 минут",
      "questions": "Вопросы",
      "questionsHint": "Добавьте вопросы и отметьте правильный ответ",
      "addQuestion": "Добавить вопрос",
      "question": "Вопрос",
      "answerA": "Вариант A",
      "answerB": "Вариант B",
      "answerC": "Вариант C",
      "answerD": "Вариант D",
      "correctAnswer": "Правильный ответ",
      "deleteQuestion": "Удалить вопрос",
      "saveTest": "Сохранить тест",
      "saveChanges": "Сохранить изменения",
      "back": "Назад в класс",
      "classError": "Класс не найден. Откройте создание теста из кабинета нужного класса.",
      "lastQuestion": "В тесте должен остаться хотя бы один вопрос.",
      "fillQuestions": "Заполните все вопросы и варианты ответов.",
      "chooseCorrect": "Для каждого вопроса отметьте правильный ответ.",
      "invalidTime": "Укажите время от 1 до 300 минут.",
      "invalidPassingScore": "Укажите проходной балл от 0 до 100.",
      "editBlocked": "Этот тест уже проходили ученики. Изменять его нельзя, чтобы сохранить историю результатов. Создайте новый тест.",
      "saved": "Тест сохранён."
    },
    "kz": {
      "createTitle": "Тест құру",
      "editTitle": "Тестті өзгерту",
      "classSubtitle": "Сынып",
      "settings": "Тест параметрлері",
      "timeSettings": "Орындау уақыты",
      "unlimited": "Уақыт шектеусіз",
      "limited": "Уақытты шектеу",
      "timeLimit": "Тестті орындау уақыты",
      "minutes": "мин.",
      "timeHint": "1-ден 300 минутқа дейін",
      "questions": "Сұрақтар",
      "questionsHint": "Сұрақтарды қосып, дұрыс жауапты белгілеңіз",
      "addQuestion": "Сұрақ қосу",
      "question": "Сұрақ",
      "answerA": "A нұсқасы",
      "answerB": "B нұсқасы",
      "answerC": "C нұсқасы",
      "answerD": "D нұсқасы",
      "correctAnswer": "Дұрыс жауап",
      "deleteQuestion": "Сұрақты жою",
      "saveTest": "Тестті сақтау",
      "saveChanges": "Өзгерістерді сақтау",
      "back": "Сыныпқа қайту",
      "classError": "Сынып табылмады. Тестті қажетті сыныптың кабинетінен ашыңыз.",
      "lastQuestion": "Тестте кемінде бір сұрақ қалуы керек.",
      "fillQuestions": "Барлық сұрақтар мен жауап нұсқаларын толтырыңыз.",
      "chooseCorrect": "Әр сұрақ үшін дұрыс жауапты белгілеңіз.",
      "invalidTime": "1-ден 300 минутқа дейінгі уақытты көрсетіңіз.",
      "invalidPassingScore": "0-ден 100-ге дейінгі өту балын көрсетіңіз.",
      "editBlocked": "Бұл тестті оқушылар өтіп қойған. Нәтижелер тарихын сақтау үшін оны өзгертуге болмайды. Жаңа тест құрыңыз.",
      "saved": "Тест сақталды."
    },
    "en": {
      "createTitle": "Create Test",
      "editTitle": "Edit Test",
      "classSubtitle": "Class",
      "settings": "Test settings",
      "timeSettings": "Time limit",
      "unlimited": "No time limit",
      "limited": "Limit test time",
      "timeLimit": "Time allowed",
      "minutes": "min.",
      "timeHint": "From 1 to 300 minutes",
      "questions": "Questions",
      "questionsHint": "Add questions and select the correct answer",
      "addQuestion": "Add question",
      "question": "Question",
      "answerA": "Option A",
      "answerB": "Option B",
      "answerC": "Option C",
      "answerD": "Option D",
      "correctAnswer": "Correct answer",
      "deleteQuestion": "Delete question",
      "saveTest": "Save test",
      "saveChanges": "Save changes",
      "back": "Back to class",
      "classError": "Class not found. Open test creation from the required class dashboard.",
      "lastQuestion": "A test must contain at least one question.",
      "fillQuestions": "Complete all questions and answer options.",
      "chooseCorrect": "Select the correct answer for every question.",
      "invalidTime": "Enter a time from 1 to 300 minutes.",
      "invalidPassingScore": "Enter a passing score from 0 to 100.",
      "editBlocked": "Students have already completed this test. It cannot be edited because the result history must be preserved. Create a new test instead.",
      "saved": "Test saved."
    },
    "kk": {
      "createTitle": "Тест құру",
      "editTitle": "Тестті өзгерту",
      "classSubtitle": "Сынып",
      "settings": "Тест параметрлері",
      "timeSettings": "Орындау уақыты",
      "unlimited": "Уақыт шектеусіз",
      "limited": "Уақытты шектеу",
      "timeLimit": "Тестті орындау уақыты",
      "minutes": "мин.",
      "timeHint": "1-ден 300 минутқа дейін",
      "questions": "Сұрақтар",
      "questionsHint": "Сұрақтарды қосып, дұрыс жауапты белгілеңіз",
      "addQuestion": "Сұрақ қосу",
      "question": "Сұрақ",
      "answerA": "A нұсқасы",
      "answerB": "B нұсқасы",
      "answerC": "C нұсқасы",
      "answerD": "D нұсқасы",
      "correctAnswer": "Дұрыс жауап",
      "deleteQuestion": "Сұрақты жою",
      "saveTest": "Тестті сақтау",
      "saveChanges": "Өзгерістерді сақтау",
      "back": "Сыныпқа қайту",
      "classError": "Сынып табылмады. Тестті қажетті сыныптың кабинетінен ашыңыз.",
      "lastQuestion": "Тестте кемінде бір сұрақ қалуы керек.",
      "fillQuestions": "Барлық сұрақтар мен жауап нұсқаларын толтырыңыз.",
      "chooseCorrect": "Әр сұрақ үшін дұрыс жауапты белгілеңіз.",
      "invalidTime": "1-ден 300 минутқа дейінгі уақытты көрсетіңіз.",
      "invalidPassingScore": "0-ден 100-ге дейінгі өту балын көрсетіңіз.",
      "editBlocked": "Бұл тестті оқушылар өтіп қойған. Нәтижелер тарихын сақтау үшін оны өзгертуге болмайды. Жаңа тест құрыңыз.",
      "saved": "Тест сақталды."
    }
  },
  "staff-analytics": {
    "ru": {
      "description": "Общая аналитика по вашим классам",
      "class": "Класс",
      "allClasses": "Все классы",
      "average": "Средний результат",
      "best": "Лучший результат",
      "passRate": "Успешно пройдено",
      "completed": "Завершено тестов",
      "passed": "Пройдено",
      "failed": "Не пройдено",
      "noData": "Недостаточно данных",
      "noDataText": "Аналитика появится после прохождения тестов учениками.",
      "classComparison": "Сравнение классов",
      "classComparisonDescription": "Средний результат и процент успешного прохождения",
      "testAnalytics": "Результаты по тестам",
      "testAnalyticsDescription": "Средний результат по каждому тесту",
      "test": "Тест",
      "attempts": "Попытки",
      "averageScore": "Средний балл",
      "completion": "Прохождение",
      "noResults": "Нет данных",
      "testFallback": "Тест"
    },
    "kz": {
      "description": "Сыныптарыңыз бойынша жалпы аналитика",
      "class": "Сынып",
      "allClasses": "Барлық сыныптар",
      "average": "Орташа нәтиже",
      "best": "Үздік нәтиже",
      "passRate": "Сәтті тапсырылды",
      "completed": "Аяқталған тесттер",
      "passed": "Өткен",
      "failed": "Өтпеген",
      "noData": "Деректер жеткіліксіз",
      "noDataText": "Оқушылар тесттерді тапсырғаннан кейін аналитика пайда болады.",
      "classComparison": "Сыныптарды салыстыру",
      "classComparisonDescription": "Орташа нәтиже және сәтті өту пайызы",
      "testAnalytics": "Тесттер бойынша нәтижелер",
      "testAnalyticsDescription": "Әр тест бойынша орташа нәтиже",
      "test": "Тест",
      "attempts": "Әрекеттер",
      "averageScore": "Орташа балл",
      "completion": "Өту пайызы",
      "noResults": "Деректер жоқ",
      "testFallback": "Тест"
    },
    "en": {
      "description": "Overall analytics across your classes",
      "class": "Class",
      "allClasses": "All classes",
      "average": "Average result",
      "best": "Best result",
      "passRate": "Pass rate",
      "completed": "Completed tests",
      "passed": "Passed",
      "failed": "Not passed",
      "noData": "Not enough data",
      "noDataText": "Analytics will appear after students complete tests.",
      "classComparison": "Class comparison",
      "classComparisonDescription": "Average result and pass rate",
      "testAnalytics": "Results by test",
      "testAnalyticsDescription": "Average result for each test",
      "test": "Test",
      "attempts": "Attempts",
      "averageScore": "Average score",
      "completion": "Pass rate",
      "noResults": "No data",
      "testFallback": "Test"
    },
    "kk": {
      "description": "Сыныптарыңыз бойынша жалпы аналитика",
      "class": "Сынып",
      "allClasses": "Барлық сыныптар",
      "average": "Орташа нәтиже",
      "best": "Үздік нәтиже",
      "passRate": "Сәтті тапсырылды",
      "completed": "Аяқталған тесттер",
      "passed": "Өткен",
      "failed": "Өтпеген",
      "noData": "Деректер жеткіліксіз",
      "noDataText": "Оқушылар тесттерді тапсырғаннан кейін аналитика пайда болады.",
      "classComparison": "Сыныптарды салыстыру",
      "classComparisonDescription": "Орташа нәтиже және сәтті өту пайызы",
      "testAnalytics": "Тесттер бойынша нәтижелер",
      "testAnalyticsDescription": "Әр тест бойынша орташа нәтиже",
      "test": "Тест",
      "attempts": "Әрекеттер",
      "averageScore": "Орташа балл",
      "completion": "Өту пайызы",
      "noResults": "Деректер жоқ",
      "testFallback": "Тест"
    }
  },
  "student-results": {
    "ru": {
      "noResults": "Результатов пока нет",
      "noResultsText": "После прохождения первого теста результат появится здесь.",
      "threshold": "Порог",
      "passed": "Пройден",
      "failed": "Не пройден",
      "mathematics": "Математика",
      "class": "класс"
    },
    "kz": {
      "noResults": "Нәтижелер әзірге жоқ",
      "noResultsText": "Алғашқы тестті аяқтағаннан кейін нәтиже осында шығады.",
      "threshold": "Шекті балл",
      "passed": "Өтті",
      "failed": "Өтпеді",
      "mathematics": "Математика",
      "class": "сынып"
    },
    "en": {
      "noResults": "No results yet",
      "noResultsText": "Your result will appear here after you complete your first test.",
      "threshold": "Passing score",
      "passed": "Passed",
      "failed": "Not passed",
      "mathematics": "Mathematics",
      "class": "class"
    },
    "kk": {
      "noResults": "Нәтижелер әзірге жоқ",
      "noResultsText": "Алғашқы тестті аяқтағаннан кейін нәтиже осында шығады.",
      "threshold": "Шекті балл",
      "passed": "Өтті",
      "failed": "Өтпеді",
      "mathematics": "Математика",
      "class": "сынып"
    }
  },
  "director-school-analytics": {
    "ru": {
      "nav": [
        "Обзор",
        "Классы",
        "Учителя",
        "Тесты",
        "Результаты",
        "Аналитика"
      ],
      "title": "Аналитика школы",
      "description": "Результаты тестирования по всем классам",
      "classes": "Классов",
      "results": "Выполнений",
      "average": "Средний балл",
      "risk": "Ученики группы риска",
      "classesTitle": "Успеваемость по классам",
      "class": "Класс",
      "completed": "Выполнений",
      "score": "Средний балл",
      "below": "Ниже порога",
      "action": "Действие",
      "details": "Подробнее",
      "detailsTitle": "Аналитика класса",
      "threshold": "Порог",
      "status": "Статус",
      "passed": "Сдан",
      "failed": "Ниже порога",
      "riskTitle": "Ученики группы риска",
      "riskDescription": "Результаты ниже проходного балла теста",
      "student": "Ученик",
      "test": "Тест",
      "empty": "Нет данных",
      "unknown": "Не указан",
      "search": "Поиск класса"
    },
    "kk": {
      "nav": [
        "Шолу",
        "Сыныптар",
        "Мұғалімдер",
        "Тесттер",
        "Нәтижелер",
        "Талдау"
      ],
      "title": "Мектеп аналитикасы",
      "description": "Барлық сыныптардың тестілеу нәтижелері",
      "classes": "Сыныптар",
      "results": "Орындалған тесттер",
      "average": "Орташа балл",
      "risk": "Тәуекел тобындағы оқушылар",
      "classesTitle": "Сыныптар бойынша үлгерім",
      "class": "Сынып",
      "completed": "Орындалған тесттер",
      "score": "Орташа балл",
      "below": "Шекті балдан төмен",
      "action": "Әрекет",
      "details": "Толығырақ",
      "detailsTitle": "Сынып аналитикасы",
      "threshold": "Шекті балл",
      "status": "Мәртебе",
      "passed": "Тапсырылды",
      "failed": "Шекті балдан төмен",
      "riskTitle": "Тәуекел тобындағы оқушылар",
      "riskDescription": "Тесттің өту балынан төмен нәтижелер",
      "student": "Оқушы",
      "test": "Тест",
      "empty": "Деректер жоқ",
      "unknown": "Көрсетілмеген",
      "search": "Сыныпты іздеу"
    },
    "en": {
      "nav": [
        "Overview",
        "Classes",
        "Teachers",
        "Tests",
        "Results",
        "Analytics"
      ],
      "title": "School Analytics",
      "description": "Test performance across all classes",
      "classes": "Classes",
      "results": "Completions",
      "average": "Average score",
      "risk": "At-risk students",
      "classesTitle": "Performance by class",
      "class": "Class",
      "completed": "Completions",
      "score": "Average score",
      "below": "Below threshold",
      "action": "Action",
      "details": "Details",
      "detailsTitle": "Class Analytics",
      "threshold": "Threshold",
      "status": "Status",
      "passed": "Passed",
      "failed": "Below threshold",
      "riskTitle": "Students at risk",
      "riskDescription": "Results below the test passing score",
      "student": "Student",
      "test": "Test",
      "empty": "No data",
      "unknown": "Not specified",
      "search": "Search class"
    },
    "kz": {
      "nav": [
        "Шолу",
        "Сыныптар",
        "Мұғалімдер",
        "Тесттер",
        "Нәтижелер",
        "Талдау"
      ],
      "title": "Мектеп аналитикасы",
      "description": "Барлық сыныптардың тестілеу нәтижелері",
      "classes": "Сыныптар",
      "results": "Орындалған тесттер",
      "average": "Орташа балл",
      "risk": "Тәуекел тобындағы оқушылар",
      "classesTitle": "Сыныптар бойынша үлгерім",
      "class": "Сынып",
      "completed": "Орындалған тесттер",
      "score": "Орташа балл",
      "below": "Шекті балдан төмен",
      "action": "Әрекет",
      "details": "Толығырақ",
      "detailsTitle": "Сынып аналитикасы",
      "threshold": "Шекті балл",
      "status": "Мәртебе",
      "passed": "Тапсырылды",
      "failed": "Шекті балдан төмен",
      "riskTitle": "Тәуекел тобындағы оқушылар",
      "riskDescription": "Тесттің өту балынан төмен нәтижелер",
      "student": "Оқушы",
      "test": "Тест",
      "empty": "Деректер жоқ",
      "unknown": "Көрсетілмеген",
      "search": "Сыныпты іздеу"
    }
  },
  "vice-principal-results": {
    "ru": {
      "nav": [
        "Обзор",
        "Все классы",
        "Учителя",
        "Все тесты",
        "Результаты",
        "Аналитика"
      ],
      "title": "Результаты учеников",
      "description": "Мониторинг результатов тестирования",
      "completed": "Выполнено тестов",
      "average": "Средний балл",
      "passed": "Прошли порог",
      "failed": "Не прошли порог",
      "search": "Поиск ученика",
      "searchPlaceholder": "Имя ученика",
      "class": "Класс",
      "test": "Тест",
      "status": "Статус",
      "allClasses": "Все классы",
      "allTests": "Все тесты",
      "allStatuses": "Все",
      "passedStatus": "Прошёл",
      "failedStatus": "Не прошёл",
      "results": "Список результатов",
      "student": "Ученик",
      "teacher": "Учитель",
      "score": "Балл",
      "threshold": "Порог",
      "unknown": "Не указан",
      "empty": "Результаты не найдены"
    },
    "kk": {
      "nav": [
        "Шолу",
        "Барлық сыныптар",
        "Мұғалімдер",
        "Барлық тесттер",
        "Нәтижелер",
        "Талдау"
      ],
      "title": "Оқушылардың нәтижелері",
      "description": "Тестілеу нәтижелерін бақылау",
      "completed": "Орындалған тесттер",
      "average": "Орташа балл",
      "passed": "Шекті балдан өткендер",
      "failed": "Шекті балдан өтпегендер",
      "search": "Оқушыны іздеу",
      "searchPlaceholder": "Оқушының аты",
      "class": "Сынып",
      "test": "Тест",
      "status": "Мәртебе",
      "allClasses": "Барлық сыныптар",
      "allTests": "Барлық тесттер",
      "allStatuses": "Барлығы",
      "passedStatus": "Өтті",
      "failedStatus": "Өтпеді",
      "results": "Нәтижелер тізімі",
      "student": "Оқушы",
      "teacher": "Мұғалім",
      "score": "Балл",
      "threshold": "Шекті балл",
      "unknown": "Көрсетілмеген",
      "empty": "Нәтижелер табылмады"
    },
    "en": {
      "nav": [
        "Overview",
        "All Classes",
        "Teachers",
        "All Tests",
        "Results",
        "Analytics"
      ],
      "title": "Student Results",
      "description": "Monitoring test results",
      "completed": "Completed tests",
      "average": "Average score",
      "passed": "Passed threshold",
      "failed": "Below threshold",
      "search": "Search student",
      "searchPlaceholder": "Student name",
      "class": "Class",
      "test": "Test",
      "status": "Status",
      "allClasses": "All classes",
      "allTests": "All tests",
      "allStatuses": "All",
      "passedStatus": "Passed",
      "failedStatus": "Failed",
      "results": "Results list",
      "student": "Student",
      "teacher": "Teacher",
      "score": "Score",
      "threshold": "Threshold",
      "unknown": "Not specified",
      "empty": "No results found"
    },
    "kz": {
      "nav": [
        "Шолу",
        "Барлық сыныптар",
        "Мұғалімдер",
        "Барлық тесттер",
        "Нәтижелер",
        "Талдау"
      ],
      "title": "Оқушылардың нәтижелері",
      "description": "Тестілеу нәтижелерін бақылау",
      "completed": "Орындалған тесттер",
      "average": "Орташа балл",
      "passed": "Шекті балдан өткендер",
      "failed": "Шекті балдан өтпегендер",
      "search": "Оқушыны іздеу",
      "searchPlaceholder": "Оқушының аты",
      "class": "Сынып",
      "test": "Тест",
      "status": "Мәртебе",
      "allClasses": "Барлық сыныптар",
      "allTests": "Барлық тесттер",
      "allStatuses": "Барлығы",
      "passedStatus": "Өтті",
      "failedStatus": "Өтпеді",
      "results": "Нәтижелер тізімі",
      "student": "Оқушы",
      "teacher": "Мұғалім",
      "score": "Балл",
      "threshold": "Шекті балл",
      "unknown": "Көрсетілмеген",
      "empty": "Нәтижелер табылмады"
    }
  },
  "vice-principal-teachers": {
    "ru": {
      "vpOverview": "Обзор",
      "vpClasses": "Все классы",
      "vpTeachers": "Учителя",
      "vpTests": "Тесты",
      "vpResults": "Результаты",
      "vpAnalytics": "Аналитика",
      "vpRole": "Завуч · ADVANTA Pulse",
      "vpTeachersTitle": "Учителя школы",
      "vpTeachersDescription": "Предметы, классы и результаты обучения.",
      "vpTotalTeachers": "Всего учителей",
      "vpActiveTeachers": "Учителя с тестами",
      "vpTeachersNeedAttention": "Требуют внимания",
      "vpSearchTeacher": "Поиск учителя",
      "vpFilterSubject": "Предмет",
      "vpTeacherList": "Список учителей",
      "vpTeacher": "Учитель",
      "vpSubject": "Предмет",
      "vpAverage": "Средний балл",
      "vpStatus": "Статус",
      "vpAction": "Действие",
      "vpClose": "Закрыть",
      "vpView": "Подробнее",
      "vpAllSubjects": "Все предметы",
      "vpSearchPlaceholder": "Имя или фамилия",
      "vpNoTeachers": "Учителя не найдены",
      "vpNoResults": "Недостаточно данных",
      "vpCritical": "Критический",
      "vpAttention": "Требует внимания",
      "vpGood": "Хороший",
      "vpExcellent": "Высокий",
      "vpClass": "Класс",
      "vpCompleted": "Завершённых тестов",
      "vpStudentsTested": "Учеников с результатами",
      "vpNoClasses": "Нет закреплённых классов",
      "vpUnassigned": "Не назначен",
      "vpAnalyzeClass": "Анализ класса"
    },
    "kz": {
      "vpOverview": "Шолу",
      "vpClasses": "Барлық сыныптар",
      "vpTeachers": "Мұғалімдер",
      "vpTests": "Тесттер",
      "vpResults": "Нәтижелер",
      "vpAnalytics": "Талдау",
      "vpRole": "Оқу ісінің меңгерушісі · ADVANTA Pulse",
      "vpTeachersTitle": "Мектеп мұғалімдері",
      "vpTeachersDescription": "Пәндер, сыныптар және оқу нәтижелері.",
      "vpTotalTeachers": "Мұғалімдер саны",
      "vpActiveTeachers": "Тесттері бар мұғалімдер",
      "vpTeachersNeedAttention": "Назар аудару қажет",
      "vpSearchTeacher": "Мұғалімді іздеу",
      "vpFilterSubject": "Пән",
      "vpTeacherList": "Мұғалімдер тізімі",
      "vpTeacher": "Мұғалім",
      "vpSubject": "Пән",
      "vpAverage": "Орташа балл",
      "vpStatus": "Мәртебе",
      "vpAction": "Әрекет",
      "vpClose": "Жабу",
      "vpView": "Толығырақ",
      "vpAllSubjects": "Барлық пәндер",
      "vpSearchPlaceholder": "Аты немесе тегі",
      "vpNoTeachers": "Мұғалімдер табылмады",
      "vpNoResults": "Деректер жеткіліксіз",
      "vpCritical": "Күрделі",
      "vpAttention": "Назар аудару қажет",
      "vpGood": "Жақсы",
      "vpExcellent": "Жоғары",
      "vpClass": "Сынып",
      "vpCompleted": "Аяқталған тесттер",
      "vpStudentsTested": "Нәтижесі бар оқушылар",
      "vpNoClasses": "Бекітілген сыныптар жоқ",
      "vpUnassigned": "Тағайындалмаған",
      "vpAnalyzeClass": "Сыныпты талдау"
    },
    "en": {
      "vpOverview": "Overview",
      "vpClasses": "All Classes",
      "vpTeachers": "Teachers",
      "vpTests": "Tests",
      "vpResults": "Results",
      "vpAnalytics": "Analytics",
      "vpRole": "Vice Principal · ADVANTA Pulse",
      "vpTeachersTitle": "School Teachers",
      "vpTeachersDescription": "Subjects, classes and learning outcomes.",
      "vpTotalTeachers": "Total Teachers",
      "vpActiveTeachers": "Teachers With Tests",
      "vpTeachersNeedAttention": "Need Attention",
      "vpSearchTeacher": "Search Teachers",
      "vpFilterSubject": "Subject",
      "vpTeacherList": "Teacher List",
      "vpTeacher": "Teacher",
      "vpSubject": "Subject",
      "vpAverage": "Average Score",
      "vpStatus": "Status",
      "vpAction": "Action",
      "vpClose": "Close",
      "vpView": "Details",
      "vpAllSubjects": "All Subjects",
      "vpSearchPlaceholder": "First or last name",
      "vpNoTeachers": "No teachers found",
      "vpNoResults": "Insufficient data",
      "vpCritical": "Critical",
      "vpAttention": "Needs attention",
      "vpGood": "Good",
      "vpExcellent": "High",
      "vpClass": "Class",
      "vpCompleted": "Completed tests",
      "vpStudentsTested": "Students with results",
      "vpNoClasses": "No assigned classes",
      "vpUnassigned": "Unassigned",
      "vpAnalyzeClass": "Class Analysis"
    },
    "kk": {
      "vpOverview": "Шолу",
      "vpClasses": "Барлық сыныптар",
      "vpTeachers": "Мұғалімдер",
      "vpTests": "Тесттер",
      "vpResults": "Нәтижелер",
      "vpAnalytics": "Талдау",
      "vpRole": "Оқу ісінің меңгерушісі · ADVANTA Pulse",
      "vpTeachersTitle": "Мектеп мұғалімдері",
      "vpTeachersDescription": "Пәндер, сыныптар және оқу нәтижелері.",
      "vpTotalTeachers": "Мұғалімдер саны",
      "vpActiveTeachers": "Тесттері бар мұғалімдер",
      "vpTeachersNeedAttention": "Назар аудару қажет",
      "vpSearchTeacher": "Мұғалімді іздеу",
      "vpFilterSubject": "Пән",
      "vpTeacherList": "Мұғалімдер тізімі",
      "vpTeacher": "Мұғалім",
      "vpSubject": "Пән",
      "vpAverage": "Орташа балл",
      "vpStatus": "Мәртебе",
      "vpAction": "Әрекет",
      "vpClose": "Жабу",
      "vpView": "Толығырақ",
      "vpAllSubjects": "Барлық пәндер",
      "vpSearchPlaceholder": "Аты немесе тегі",
      "vpNoTeachers": "Мұғалімдер табылмады",
      "vpNoResults": "Деректер жеткіліксіз",
      "vpCritical": "Күрделі",
      "vpAttention": "Назар аудару қажет",
      "vpGood": "Жақсы",
      "vpExcellent": "Жоғары",
      "vpClass": "Сынып",
      "vpCompleted": "Аяқталған тесттер",
      "vpStudentsTested": "Нәтижесі бар оқушылар",
      "vpNoClasses": "Бекітілген сыныптар жоқ",
      "vpUnassigned": "Тағайындалмаған",
      "vpAnalyzeClass": "Сыныпты талдау"
    }
  },
  "staff-tests": {
    "ru": {
      "edit": "Изменить",
      "assign": "Назначить",
      "unassign": "Отменить назначение",
      "delete": "Удалить",
      "noTests": "Тестов пока нет",
      "noTestsDescription": "Создайте тест из кабинета нужного класса",
      "testsDescription": "Просмотр и управление тестами всех ваших классов",
      "cancelAssignmentQuestion": "Отменить назначение этого теста?",
      "deadlineRequired": "Перед назначением теста укажите дедлайн",
      "deleteQuestion": "Удалить этот тест? Это действие нельзя отменить.",
      "deleteBlocked": "Этот тест уже проходили ученики. Удалить его нельзя, чтобы сохранить историю результатов. Можно отменить назначение теста.",
      "testDeleted": "Тест удалён.",
      "testFallback": "Тест"
    },
    "kz": {
      "edit": "Өзгерту",
      "assign": "Тағайындау",
      "unassign": "Тағайындауды болдырмау",
      "delete": "Жою",
      "noTests": "Тесттер әзірге жоқ",
      "noTestsDescription": "Тестті қажетті сыныптың кабинетінен құрыңыз",
      "testsDescription": "Барлық сыныптарыңыздың тесттерін көру және басқару",
      "cancelAssignmentQuestion": "Бұл тесттің тағайындалуын болдырмау керек пе?",
      "deadlineRequired": "Тестті тағайындамас бұрын соңғы мерзімді көрсетіңіз",
      "deleteQuestion": "Бұл тестті жою керек пе? Бұл әрекетті қайтару мүмкін емес.",
      "deleteBlocked": "Бұл тестті оқушылар өтіп қойған. Нәтижелер тарихын сақтау үшін тестті жоюға болмайды. Тесттің тағайындалуын болдырмауға болады.",
      "testDeleted": "Тест жойылды.",
      "testFallback": "Тест"
    },
    "en": {
      "edit": "Edit",
      "assign": "Assign",
      "unassign": "Cancel assignment",
      "delete": "Delete",
      "noTests": "No tests yet",
      "noTestsDescription": "Create a test from the dashboard of the required class",
      "testsDescription": "View and manage tests from all of your classes",
      "cancelAssignmentQuestion": "Cancel this test assignment?",
      "deadlineRequired": "Set a deadline before assigning the test",
      "deleteQuestion": "Delete this test? This action cannot be undone.",
      "deleteBlocked": "Students have already completed this test. It cannot be deleted because the result history must be preserved. You can cancel the assignment instead.",
      "testDeleted": "Test deleted.",
      "testFallback": "Test"
    },
    "kk": {
      "edit": "Өзгерту",
      "assign": "Тағайындау",
      "unassign": "Тағайындауды болдырмау",
      "delete": "Жою",
      "noTests": "Тесттер әзірге жоқ",
      "noTestsDescription": "Тестті қажетті сыныптың кабинетінен құрыңыз",
      "testsDescription": "Барлық сыныптарыңыздың тесттерін көру және басқару",
      "cancelAssignmentQuestion": "Бұл тесттің тағайындалуын болдырмау керек пе?",
      "deadlineRequired": "Тестті тағайындамас бұрын соңғы мерзімді көрсетіңіз",
      "deleteQuestion": "Бұл тестті жою керек пе? Бұл әрекетті қайтару мүмкін емес.",
      "deleteBlocked": "Бұл тестті оқушылар өтіп қойған. Нәтижелер тарихын сақтау үшін тестті жоюға болмайды. Тесттің тағайындалуын болдырмауға болады.",
      "testDeleted": "Тест жойылды.",
      "testFallback": "Тест"
    }
  },
  "staff-results": {
    "ru": {
      "description": "Результаты учеников по всем вашим классам",
      "completed": "Завершено тестов",
      "average": "Средний результат",
      "best": "Лучший результат",
      "passRate": "Успешно пройдено",
      "class": "Класс",
      "student": "Ученик",
      "test": "Тест",
      "result": "Результат",
      "passing": "Порог",
      "status": "Статус",
      "date": "Дата",
      "allClasses": "Все классы",
      "allStudents": "Все ученики",
      "allTests": "Все тесты",
      "passed": "Пройден",
      "failed": "Не пройден",
      "noResults": "Результатов пока нет",
      "noResultsText": "Результаты появятся после прохождения тестов учениками.",
      "unknownStudent": "Ученик",
      "unknownClass": "—",
      "testFallback": "Тест"
    },
    "kz": {
      "description": "Барлық сыныптарыңыздағы оқушылардың нәтижелері",
      "completed": "Аяқталған тесттер",
      "average": "Орташа нәтиже",
      "best": "Үздік нәтиже",
      "passRate": "Сәтті тапсырылды",
      "class": "Сынып",
      "student": "Оқушы",
      "test": "Тест",
      "result": "Нәтиже",
      "passing": "Шекті балл",
      "status": "Күйі",
      "date": "Күні",
      "allClasses": "Барлық сыныптар",
      "allStudents": "Барлық оқушылар",
      "allTests": "Барлық тесттер",
      "passed": "Өтті",
      "failed": "Өтпеді",
      "noResults": "Нәтижелер әзірге жоқ",
      "noResultsText": "Оқушылар тесттерді тапсырғаннан кейін нәтижелер осында көрсетіледі.",
      "unknownStudent": "Оқушы",
      "unknownClass": "—",
      "testFallback": "Тест"
    },
    "en": {
      "description": "Student results across all of your classes",
      "completed": "Completed tests",
      "average": "Average result",
      "best": "Best result",
      "passRate": "Pass rate",
      "class": "Class",
      "student": "Student",
      "test": "Test",
      "result": "Result",
      "passing": "Passing score",
      "status": "Status",
      "date": "Date",
      "allClasses": "All classes",
      "allStudents": "All students",
      "allTests": "All tests",
      "passed": "Passed",
      "failed": "Not passed",
      "noResults": "No results yet",
      "noResultsText": "Results will appear after students complete tests.",
      "unknownStudent": "Student",
      "unknownClass": "—",
      "testFallback": "Test"
    },
    "kk": {
      "description": "Барлық сыныптарыңыздағы оқушылардың нәтижелері",
      "completed": "Аяқталған тесттер",
      "average": "Орташа нәтиже",
      "best": "Үздік нәтиже",
      "passRate": "Сәтті тапсырылды",
      "class": "Сынып",
      "student": "Оқушы",
      "test": "Тест",
      "result": "Нәтиже",
      "passing": "Шекті балл",
      "status": "Күйі",
      "date": "Күні",
      "allClasses": "Барлық сыныптар",
      "allStudents": "Барлық оқушылар",
      "allTests": "Барлық тесттер",
      "passed": "Өтті",
      "failed": "Өтпеді",
      "noResults": "Нәтижелер әзірге жоқ",
      "noResultsText": "Оқушылар тесттерді тапсырғаннан кейін нәтижелер осында көрсетіледі.",
      "unknownStudent": "Оқушы",
      "unknownClass": "—",
      "testFallback": "Тест"
    }
  },
  "student-home": {
    "ru": {
      "welcome": "Добро пожаловать",
      "class": "класс",
      "home": "Главная",
      "tasks": "Задания",
      "results": "Мои результаты",
      "logout": "Выйти",
      "activeTasks": "Активные задания",
      "goToTasks": "Перейти к заданиям",
      "average": "Средний результат",
      "allResults": "Все результаты",
      "best": "Лучший результат",
      "view": "Посмотреть",
      "activeTestsTitle": "Активные задания",
      "activeTestsDescription": "Тесты, назначенные вашему классу",
      "noTests": "Нет активных заданий",
      "noTestsText": "Новые тесты появятся здесь",
      "deadline": "Дедлайн",
      "noDeadline": "Без дедлайна",
      "minutes": "мин.",
      "noTimeLimit": "Без ограничения времени",
      "questions": "вопросов",
      "start": "Начать тест",
      "lastResult": "Последний результат",
      "mathematics": "Математика",
      "passed": "Пройден",
      "failed": "Не пройден"
    },
    "kz": {
      "welcome": "Қош келдіңіз",
      "class": "сынып",
      "home": "Басты бет",
      "tasks": "Тапсырмалар",
      "results": "Менің нәтижелерім",
      "logout": "Шығу",
      "activeTasks": "Белсенді тапсырмалар",
      "goToTasks": "Тапсырмаларға өту",
      "average": "Орташа нәтиже",
      "allResults": "Барлық нәтижелер",
      "best": "Үздік нәтиже",
      "view": "Көру",
      "activeTestsTitle": "Белсенді тапсырмалар",
      "activeTestsDescription": "Сіздің сыныбыңызға тағайындалған тесттер",
      "noTests": "Белсенді тапсырмалар жоқ",
      "noTestsText": "Жаңа тесттер осында пайда болады",
      "deadline": "Соңғы мерзім",
      "noDeadline": "Мерзімсіз",
      "minutes": "мин.",
      "noTimeLimit": "Уақыт шектеусіз",
      "questions": "сұрақ",
      "start": "Тестті бастау",
      "lastResult": "Соңғы нәтиже",
      "mathematics": "Математика",
      "passed": "Өтті",
      "failed": "Өтпеді"
    },
    "en": {
      "welcome": "Welcome",
      "class": "class",
      "home": "Home",
      "tasks": "Tasks",
      "results": "My results",
      "logout": "Log out",
      "activeTasks": "Active tasks",
      "goToTasks": "Go to tasks",
      "average": "Average result",
      "allResults": "All results",
      "best": "Best result",
      "view": "View",
      "activeTestsTitle": "Active tasks",
      "activeTestsDescription": "Tests assigned to your class",
      "noTests": "No active tasks",
      "noTestsText": "New tests will appear here",
      "deadline": "Deadline",
      "noDeadline": "No deadline",
      "minutes": "min.",
      "noTimeLimit": "No time limit",
      "questions": "questions",
      "start": "Start test",
      "lastResult": "Latest result",
      "mathematics": "Mathematics",
      "passed": "Passed",
      "failed": "Not passed"
    },
    "kk": {
      "welcome": "Қош келдіңіз",
      "class": "сынып",
      "home": "Басты бет",
      "tasks": "Тапсырмалар",
      "results": "Менің нәтижелерім",
      "logout": "Шығу",
      "activeTasks": "Белсенді тапсырмалар",
      "goToTasks": "Тапсырмаларға өту",
      "average": "Орташа нәтиже",
      "allResults": "Барлық нәтижелер",
      "best": "Үздік нәтиже",
      "view": "Көру",
      "activeTestsTitle": "Белсенді тапсырмалар",
      "activeTestsDescription": "Сіздің сыныбыңызға тағайындалған тесттер",
      "noTests": "Белсенді тапсырмалар жоқ",
      "noTestsText": "Жаңа тесттер осында пайда болады",
      "deadline": "Соңғы мерзім",
      "noDeadline": "Мерзімсіз",
      "minutes": "мин.",
      "noTimeLimit": "Уақыт шектеусіз",
      "questions": "сұрақ",
      "start": "Тестті бастау",
      "lastResult": "Соңғы нәтиже",
      "mathematics": "Математика",
      "passed": "Өтті",
      "failed": "Өтпеді"
    }
  },
  "student-tasks": {
    "ru": {
      "assigned": "Назначенные вашему классу срезы",
      "noTasks": "Нет активных заданий",
      "noTasksText": "Новые тесты появятся здесь",
      "deadline": "Дедлайн",
      "noDeadline": "Без дедлайна",
      "threshold": "Порог",
      "questions": "вопросов",
      "time": "Время",
      "minutes": "мин.",
      "unlimited": "Без ограничения",
      "start": "Начать тест",
      "mathematics": "Математика",
      "class": "класс"
    },
    "kz": {
      "assigned": "Сіздің сыныбыңызға тағайындалған тесттер",
      "noTasks": "Белсенді тапсырмалар жоқ",
      "noTasksText": "Жаңа тесттер осы жерде пайда болады",
      "deadline": "Соңғы мерзім",
      "noDeadline": "Мерзімсіз",
      "threshold": "Шекті балл",
      "questions": "сұрақ",
      "time": "Уақыт",
      "minutes": "мин.",
      "unlimited": "Шектеусіз",
      "start": "Тестті бастау",
      "mathematics": "Математика",
      "class": "сынып"
    },
    "en": {
      "assigned": "Tests assigned to your class",
      "noTasks": "No active assignments",
      "noTasksText": "New tests will appear here",
      "deadline": "Deadline",
      "noDeadline": "No deadline",
      "threshold": "Passing score",
      "questions": "questions",
      "time": "Time",
      "minutes": "min.",
      "unlimited": "No limit",
      "start": "Start test",
      "mathematics": "Mathematics",
      "class": "class"
    },
    "kk": {
      "assigned": "Сіздің сыныбыңызға тағайындалған тесттер",
      "noTasks": "Белсенді тапсырмалар жоқ",
      "noTasksText": "Жаңа тесттер осы жерде пайда болады",
      "deadline": "Соңғы мерзім",
      "noDeadline": "Мерзімсіз",
      "threshold": "Шекті балл",
      "questions": "сұрақ",
      "time": "Уақыт",
      "minutes": "мин.",
      "unlimited": "Шектеусіз",
      "start": "Тестті бастау",
      "mathematics": "Математика",
      "class": "сынып"
    }
  },
  "vice-principal-analytics": {
    "ru": {
      "title": "Анализ класса",
      "back": "← Назад",
      "loading": "Загрузка данных...",
      "average": "Средний балл",
      "completed": "Завершено тестов",
      "risk": "Результаты ниже порога",
      "results": "Результаты учеников",
      "student": "Ученик",
      "test": "Тест",
      "score": "Балл",
      "threshold": "Порог",
      "status": "Статус",
      "passed": "Сдан",
      "failed": "Не сдан",
      "noData": "Пока нет результатов",
      "riskStudentsTitle": "Ученики группы риска",
      "riskStudentsDescription": "Ученики, не достигшие проходного порога хотя бы в одном тесте.",
      "riskStudentsEmpty": "Учеников группы риска нет",
      "riskFailedTests": "Тестов ниже порога",
      "unknown": "Не указан",
      "teacher": "Учитель",
      "subject": "Предмет",
      "noClass": "Класс не найден",
      "noTeacher": "Учитель не найден",
      "subjects": {
        "math": "Математика",
        "mathematics": "Математика",
        "english": "Английский язык",
        "russian": "Русский язык",
        "kazakh": "Казахский язык"
      }
    },
    "kz": {
      "title": "Сынып талдауы",
      "back": "← Артқа",
      "loading": "Деректер жүктелуде...",
      "average": "Орташа балл",
      "completed": "Аяқталған тесттер",
      "risk": "Шекті балдан төмен нәтижелер",
      "results": "Оқушылардың нәтижелері",
      "student": "Оқушы",
      "test": "Тест",
      "score": "Балл",
      "threshold": "Шекті балл",
      "status": "Мәртебе",
      "passed": "Өтті",
      "failed": "Өтпеді",
      "noData": "Әзірге нәтиже жоқ",
      "riskStudentsTitle": "Тәуекел тобындағы оқушылар",
      "riskStudentsDescription": "Кемінде бір тестте шекті балға жетпеген оқушылар.",
      "riskStudentsEmpty": "Тәуекел тобындағы оқушылар жоқ",
      "riskFailedTests": "Шектен төмен тесттер",
      "unknown": "Көрсетілмеген",
      "teacher": "Мұғалім",
      "subject": "Пән",
      "noClass": "Сынып табылмады",
      "noTeacher": "Мұғалім табылмады",
      "subjects": {
        "math": "Математика",
        "mathematics": "Математика",
        "english": "Ағылшын тілі",
        "russian": "Орыс тілі",
        "kazakh": "Қазақ тілі"
      }
    },
    "en": {
      "title": "Class Analysis",
      "back": "← Back",
      "loading": "Loading data...",
      "average": "Average score",
      "completed": "Completed tests",
      "risk": "Results below threshold",
      "results": "Student Results",
      "student": "Student",
      "test": "Test",
      "score": "Score",
      "threshold": "Threshold",
      "status": "Status",
      "passed": "Passed",
      "failed": "Failed",
      "noData": "No results yet",
      "riskStudentsTitle": "Students at Risk",
      "riskStudentsDescription": "Students who scored below the passing threshold in at least one test.",
      "riskStudentsEmpty": "No students at risk",
      "riskFailedTests": "Tests below threshold",
      "unknown": "Not specified",
      "teacher": "Teacher",
      "subject": "Subject",
      "noClass": "Class not found",
      "noTeacher": "Teacher not found",
      "subjects": {
        "math": "Mathematics",
        "mathematics": "Mathematics",
        "english": "English",
        "russian": "Russian",
        "kazakh": "Kazakh"
      }
    },
    "kk": {
      "title": "Сынып талдауы",
      "back": "← Артқа",
      "loading": "Деректер жүктелуде...",
      "average": "Орташа балл",
      "completed": "Аяқталған тесттер",
      "risk": "Шекті балдан төмен нәтижелер",
      "results": "Оқушылардың нәтижелері",
      "student": "Оқушы",
      "test": "Тест",
      "score": "Балл",
      "threshold": "Шекті балл",
      "status": "Мәртебе",
      "passed": "Өтті",
      "failed": "Өтпеді",
      "noData": "Әзірге нәтиже жоқ",
      "riskStudentsTitle": "Тәуекел тобындағы оқушылар",
      "riskStudentsDescription": "Кемінде бір тестте шекті балға жетпеген оқушылар.",
      "riskStudentsEmpty": "Тәуекел тобындағы оқушылар жоқ",
      "riskFailedTests": "Шектен төмен тесттер",
      "unknown": "Көрсетілмеген",
      "teacher": "Мұғалім",
      "subject": "Пән",
      "noClass": "Сынып табылмады",
      "noTeacher": "Мұғалім табылмады",
      "subjects": {
        "math": "Математика",
        "mathematics": "Математика",
        "english": "Ағылшын тілі",
        "russian": "Орыс тілі",
        "kazakh": "Қазақ тілі"
      }
    }
  },
  "test-completed": {
    "ru": {
      "completed": "Срез завершён",
      "score": "Результат",
      "correct": "Правильных ответов",
      "of": "из",
      "passingScore": "Проходной балл",
      "passed": "Тест пройден",
      "failed": "Тест не пройден",
      "saved": "Результат сохранён.",
      "hidden": "Правильные ответы не отображаются.",
      "returnCabinet": "Вернуться в кабинет",
      "mathematics": "Математика",
      "noResult": "Результат не найден"
    },
    "kz": {
      "completed": "Тест аяқталды",
      "score": "Нәтиже",
      "correct": "Дұрыс жауаптар",
      "of": "/",
      "passingScore": "Өту балы",
      "passed": "Тесттен өтті",
      "failed": "Тесттен өтпеді",
      "saved": "Нәтиже сақталды.",
      "hidden": "Дұрыс жауаптар көрсетілмейді.",
      "returnCabinet": "Кабинетке оралу",
      "mathematics": "Математика",
      "noResult": "Нәтиже табылмады"
    },
    "en": {
      "completed": "Test completed",
      "score": "Result",
      "correct": "Correct answers",
      "of": "of",
      "passingScore": "Passing score",
      "passed": "Test passed",
      "failed": "Test not passed",
      "saved": "Result saved.",
      "hidden": "Correct answers are not displayed.",
      "returnCabinet": "Return to dashboard",
      "mathematics": "Mathematics",
      "noResult": "Result not found"
    },
    "kk": {
      "completed": "Тест аяқталды",
      "score": "Нәтиже",
      "correct": "Дұрыс жауаптар",
      "of": "/",
      "passingScore": "Өту балы",
      "passed": "Тесттен өтті",
      "failed": "Тесттен өтпеді",
      "saved": "Нәтиже сақталды.",
      "hidden": "Дұрыс жауаптар көрсетілмейді.",
      "returnCabinet": "Кабинетке оралу",
      "mathematics": "Математика",
      "noResult": "Нәтиже табылмады"
    }
  },
  "vice-principal-tests": {
    "ru": {
      "navOverview": "Обзор",
      "navClasses": "Все классы",
      "navTeachers": "Учителя",
      "navTests": "Все тесты",
      "navResults": "Результаты",
      "navAnalytics": "Аналитика",
      "pageTitle": "Все тесты",
      "pageDescription": "Мониторинг тестов всех учителей",
      "totalTestsLabel": "Всего тестов",
      "publishedTestsLabel": "Опубликовано",
      "completedResultsLabel": "Выполнений",
      "averageScoreLabel": "Средний балл",
      "searchLabel": "Поиск теста",
      "searchPlaceholder": "Название теста",
      "statusFilterLabel": "Статус",
      "teacherFilterLabel": "Учитель",
      "testsTitle": "Список тестов",
      "testHeader": "Тест",
      "teacherHeader": "Учитель",
      "classesHeader": "Классы",
      "statusHeader": "Статус",
      "resultsHeader": "Выполнений",
      "scoreHeader": "Средний балл",
      "actionHeader": "Действие",
      "allStatuses": "Все статусы",
      "allTeachers": "Все учителя",
      "draft": "Черновик",
      "published": "Опубликован",
      "finished": "Завершён",
      "details": "Анализ",
      "noTeacher": "Не указан",
      "noClasses": "Не назначены",
      "noData": "Нет данных",
      "empty": "Тесты не найдены",
      "unknown": "Неизвестный статус"
    },
    "kz": {
      "navOverview": "Шолу",
      "navClasses": "Барлық сыныптар",
      "navTeachers": "Мұғалімдер",
      "navTests": "Барлық тесттер",
      "navResults": "Нәтижелер",
      "navAnalytics": "Талдау",
      "pageTitle": "Барлық тесттер",
      "pageDescription": "Барлық мұғалімдердің тесттерін бақылау",
      "totalTestsLabel": "Тесттер саны",
      "publishedTestsLabel": "Жарияланған",
      "completedResultsLabel": "Орындалған тесттер",
      "averageScoreLabel": "Орташа балл",
      "searchLabel": "Тестті іздеу",
      "searchPlaceholder": "Тест атауы",
      "statusFilterLabel": "Мәртебе",
      "teacherFilterLabel": "Мұғалім",
      "testsTitle": "Тесттер тізімі",
      "testHeader": "Тест",
      "teacherHeader": "Мұғалім",
      "classesHeader": "Сыныптар",
      "statusHeader": "Мәртебе",
      "resultsHeader": "Орындалған",
      "scoreHeader": "Орташа балл",
      "actionHeader": "Әрекет",
      "allStatuses": "Барлық мәртебелер",
      "allTeachers": "Барлық мұғалімдер",
      "draft": "Жоба",
      "published": "Жарияланған",
      "finished": "Аяқталған",
      "details": "Талдау",
      "noTeacher": "Көрсетілмеген",
      "noClasses": "Тағайындалмаған",
      "noData": "Дерек жоқ",
      "empty": "Тесттер табылмады",
      "unknown": "Белгісіз мәртебе"
    },
    "en": {
      "navOverview": "Overview",
      "navClasses": "All Classes",
      "navTeachers": "Teachers",
      "navTests": "All Tests",
      "navResults": "Results",
      "navAnalytics": "Analytics",
      "pageTitle": "All Tests",
      "pageDescription": "Monitoring tests from all teachers",
      "totalTestsLabel": "Total tests",
      "publishedTestsLabel": "Published",
      "completedResultsLabel": "Completions",
      "averageScoreLabel": "Average score",
      "searchLabel": "Search tests",
      "searchPlaceholder": "Test name",
      "statusFilterLabel": "Status",
      "teacherFilterLabel": "Teacher",
      "testsTitle": "Test list",
      "testHeader": "Test",
      "teacherHeader": "Teacher",
      "classesHeader": "Classes",
      "statusHeader": "Status",
      "resultsHeader": "Completions",
      "scoreHeader": "Average score",
      "actionHeader": "Action",
      "allStatuses": "All statuses",
      "allTeachers": "All teachers",
      "draft": "Draft",
      "published": "Published",
      "finished": "Finished",
      "details": "Analysis",
      "noTeacher": "Not specified",
      "noClasses": "Not assigned",
      "noData": "No data",
      "empty": "No tests found",
      "unknown": "Unknown status"
    },
    "kk": {
      "navOverview": "Шолу",
      "navClasses": "Барлық сыныптар",
      "navTeachers": "Мұғалімдер",
      "navTests": "Барлық тесттер",
      "navResults": "Нәтижелер",
      "navAnalytics": "Талдау",
      "pageTitle": "Барлық тесттер",
      "pageDescription": "Барлық мұғалімдердің тесттерін бақылау",
      "totalTestsLabel": "Тесттер саны",
      "publishedTestsLabel": "Жарияланған",
      "completedResultsLabel": "Орындалған тесттер",
      "averageScoreLabel": "Орташа балл",
      "searchLabel": "Тестті іздеу",
      "searchPlaceholder": "Тест атауы",
      "statusFilterLabel": "Мәртебе",
      "teacherFilterLabel": "Мұғалім",
      "testsTitle": "Тесттер тізімі",
      "testHeader": "Тест",
      "teacherHeader": "Мұғалім",
      "classesHeader": "Сыныптар",
      "statusHeader": "Мәртебе",
      "resultsHeader": "Орындалған",
      "scoreHeader": "Орташа балл",
      "actionHeader": "Әрекет",
      "allStatuses": "Барлық мәртебелер",
      "allTeachers": "Барлық мұғалімдер",
      "draft": "Жоба",
      "published": "Жарияланған",
      "finished": "Аяқталған",
      "details": "Талдау",
      "noTeacher": "Көрсетілмеген",
      "noClasses": "Тағайындалмаған",
      "noData": "Дерек жоқ",
      "empty": "Тесттер табылмады",
      "unknown": "Белгісіз мәртебе"
    }
  },
  "vice-principal-school-analytics": {
    "ru": {
      "nav": [
        "Обзор",
        "Все классы",
        "Учителя",
        "Тесты",
        "Результаты",
        "Аналитика"
      ],
      "title": "Аналитика школы",
      "description": "Результаты тестирования по классам",
      "classes": "Классов",
      "results": "Выполнений",
      "average": "Средний балл",
      "risk": "Ниже порога",
      "classesTitle": "Успеваемость по классам",
      "class": "Класс",
      "completed": "Выполнений",
      "score": "Средний балл",
      "below": "Ниже порога",
      "action": "Действие",
      "details": "Подробнее",
      "riskTitle": "Ученики группы риска",
      "student": "Ученик",
      "test": "Тест",
      "empty": "Нет данных",
      "unknown": "Не указан"
    },
    "kz": {
      "nav": [
        "Шолу",
        "Барлық сыныптар",
        "Мұғалімдер",
        "Тесттер",
        "Нәтижелер",
        "Талдау"
      ],
      "title": "Мектеп аналитикасы",
      "description": "Сыныптар бойынша тестілеу нәтижелері",
      "classes": "Сыныптар",
      "results": "Орындалған тесттер",
      "average": "Орташа балл",
      "risk": "Шекті балдан төмен",
      "classesTitle": "Сыныптар бойынша үлгерім",
      "class": "Сынып",
      "completed": "Орындалған тесттер",
      "score": "Орташа балл",
      "below": "Шекті балдан төмен",
      "action": "Әрекет",
      "details": "Толығырақ",
      "riskTitle": "Тәуекел тобындағы оқушылар",
      "student": "Оқушы",
      "test": "Тест",
      "empty": "Деректер жоқ",
      "unknown": "Көрсетілмеген"
    },
    "en": {
      "nav": [
        "Overview",
        "All Classes",
        "Teachers",
        "Tests",
        "Results",
        "Analytics"
      ],
      "title": "School Analytics",
      "description": "Test performance across classes",
      "classes": "Classes",
      "results": "Completions",
      "average": "Average score",
      "risk": "Below threshold",
      "classesTitle": "Performance by class",
      "class": "Class",
      "completed": "Completions",
      "score": "Average score",
      "below": "Below threshold",
      "action": "Action",
      "details": "Details",
      "riskTitle": "Students at risk",
      "student": "Student",
      "test": "Test",
      "empty": "No data",
      "unknown": "Not specified"
    },
    "kk": {
      "nav": [
        "Шолу",
        "Барлық сыныптар",
        "Мұғалімдер",
        "Тесттер",
        "Нәтижелер",
        "Талдау"
      ],
      "title": "Мектеп аналитикасы",
      "description": "Сыныптар бойынша тестілеу нәтижелері",
      "classes": "Сыныптар",
      "results": "Орындалған тесттер",
      "average": "Орташа балл",
      "risk": "Шекті балдан төмен",
      "classesTitle": "Сыныптар бойынша үлгерім",
      "class": "Сынып",
      "completed": "Орындалған тесттер",
      "score": "Орташа балл",
      "below": "Шекті балдан төмен",
      "action": "Әрекет",
      "details": "Толығырақ",
      "riskTitle": "Тәуекел тобындағы оқушылар",
      "student": "Оқушы",
      "test": "Тест",
      "empty": "Деректер жоқ",
      "unknown": "Көрсетілмеген"
    }
  },
  "staff-class": {
    "ru": {
      "overview": "Обзор",
      "overviewTitle": "Обзор класса",
      "overviewText": "Здесь собрана основная информация по этому классу.",
      "noTests": "Тестов пока нет",
      "testFallback": "Тест",
      "resultsDescription": "Результаты тестов этого класса",
      "resultsEmptyTitle": "Результатов пока нет",
      "resultsEmptyText": "После прохождения тестов результаты учеников появятся здесь.",
      "student": "Ученик",
      "test": "Тест",
      "result": "Результат",
      "passingScore": "Порог",
      "status": "Статус",
      "date": "Дата",
      "passed": "Пройден",
      "failed": "Не пройден",
      "analyticsTitle": "Аналитика класса",
      "analyticsDescription": "Общие показатели по результатам учеников этого класса",
      "average": "Средний результат",
      "best": "Лучший результат",
      "passRate": "Успешно пройдено",
      "completed": "Завершено тестов",
      "passedCount": "Пройдено",
      "failedCount": "Не пройдено",
      "analyticsEmptyTitle": "Недостаточно данных",
      "analyticsEmptyText": "Аналитика появится после прохождения тестов учениками.",
      "unknownStudent": "Ученик",
      "approved": "Подтверждён",
      "approve": "Подтвердить",
      "reject": "Отклонить",
      "rejectQuestion": "Отклонить заявку?",
      "noAccess": "У вас нет доступа к этому классу.",
      "published": "Назначен",
      "finished": "Завершён",
      "draft": "Черновик"
    },
    "kz": {
      "overview": "Шолу",
      "overviewTitle": "Сыныпқа шолу",
      "overviewText": "Мұнда осы сынып бойынша негізгі ақпарат жинақталған.",
      "noTests": "Тесттер әзірге жоқ",
      "testFallback": "Тест",
      "resultsDescription": "Осы сыныптың тест нәтижелері",
      "resultsEmptyTitle": "Нәтижелер әзірге жоқ",
      "resultsEmptyText": "Оқушылар тесттерді тапсырғаннан кейін нәтижелер осында көрсетіледі.",
      "student": "Оқушы",
      "test": "Тест",
      "result": "Нәтиже",
      "passingScore": "Шекті балл",
      "status": "Күйі",
      "date": "Күні",
      "passed": "Өтті",
      "failed": "Өтпеді",
      "analyticsTitle": "Сынып аналитикасы",
      "analyticsDescription": "Осы сынып оқушыларының нәтижелері бойынша жалпы көрсеткіштер",
      "average": "Орташа нәтиже",
      "best": "Үздік нәтиже",
      "passRate": "Сәтті тапсырылды",
      "completed": "Аяқталған тесттер",
      "passedCount": "Өткен",
      "failedCount": "Өтпеген",
      "analyticsEmptyTitle": "Деректер жеткіліксіз",
      "analyticsEmptyText": "Оқушылар тесттерді тапсырғаннан кейін аналитика пайда болады.",
      "unknownStudent": "Оқушы",
      "approved": "Расталды",
      "approve": "Растау",
      "reject": "Қабылдамау",
      "rejectQuestion": "Өтінімді қабылдамау керек пе?",
      "noAccess": "Бұл сыныпқа кіруге рұқсатыңыз жоқ.",
      "published": "Тағайындалды",
      "finished": "Аяқталды",
      "draft": "Жоба"
    },
    "en": {
      "overview": "Overview",
      "overviewTitle": "Class overview",
      "overviewText": "Key information for this class is shown here.",
      "noTests": "No tests yet",
      "testFallback": "Test",
      "resultsDescription": "Test results for this class",
      "resultsEmptyTitle": "No results yet",
      "resultsEmptyText": "Student results will appear here after they complete tests.",
      "student": "Student",
      "test": "Test",
      "result": "Result",
      "passingScore": "Passing score",
      "status": "Status",
      "date": "Date",
      "passed": "Passed",
      "failed": "Not passed",
      "analyticsTitle": "Class analytics",
      "analyticsDescription": "Overall performance indicators for students in this class",
      "average": "Average result",
      "best": "Best result",
      "passRate": "Pass rate",
      "completed": "Completed tests",
      "passedCount": "Passed",
      "failedCount": "Not passed",
      "analyticsEmptyTitle": "Not enough data",
      "analyticsEmptyText": "Analytics will appear after students complete tests.",
      "unknownStudent": "Student",
      "approved": "Approved",
      "approve": "Approve",
      "reject": "Reject",
      "rejectQuestion": "Reject this request?",
      "noAccess": "You do not have access to this class.",
      "published": "Assigned",
      "finished": "Finished",
      "draft": "Draft"
    },
    "kk": {
      "overview": "Шолу",
      "overviewTitle": "Сыныпқа шолу",
      "overviewText": "Мұнда осы сынып бойынша негізгі ақпарат жинақталған.",
      "noTests": "Тесттер әзірге жоқ",
      "testFallback": "Тест",
      "resultsDescription": "Осы сыныптың тест нәтижелері",
      "resultsEmptyTitle": "Нәтижелер әзірге жоқ",
      "resultsEmptyText": "Оқушылар тесттерді тапсырғаннан кейін нәтижелер осында көрсетіледі.",
      "student": "Оқушы",
      "test": "Тест",
      "result": "Нәтиже",
      "passingScore": "Шекті балл",
      "status": "Күйі",
      "date": "Күні",
      "passed": "Өтті",
      "failed": "Өтпеді",
      "analyticsTitle": "Сынып аналитикасы",
      "analyticsDescription": "Осы сынып оқушыларының нәтижелері бойынша жалпы көрсеткіштер",
      "average": "Орташа нәтиже",
      "best": "Үздік нәтиже",
      "passRate": "Сәтті тапсырылды",
      "completed": "Аяқталған тесттер",
      "passedCount": "Өткен",
      "failedCount": "Өтпеген",
      "analyticsEmptyTitle": "Деректер жеткіліксіз",
      "analyticsEmptyText": "Оқушылар тесттерді тапсырғаннан кейін аналитика пайда болады.",
      "unknownStudent": "Оқушы",
      "approved": "Расталды",
      "approve": "Растау",
      "reject": "Қабылдамау",
      "rejectQuestion": "Өтінімді қабылдамау керек пе?",
      "noAccess": "Бұл сыныпқа кіруге рұқсатыңыз жоқ.",
      "published": "Тағайындалды",
      "finished": "Аяқталды",
      "draft": "Жоба"
    }
  },
  "vice-principal-test-analysis": {
    "ru": {
      "navOverview": "Обзор",
      "navClasses": "Все классы",
      "navTeachers": "Учителя",
      "navTests": "Тесты",
      "navResults": "Результаты",
      "navAnalytics": "Аналитика",
      "backLabel": "Назад к тестам",
      "pageTitle": "Анализ теста",
      "completedLabel": "Выполнений",
      "averageLabel": "Средний балл",
      "passedLabel": "Прошли порог",
      "failedLabel": "Ниже порога",
      "riskTitle": "Ученики группы риска",
      "riskDescription": "Ученики, не набравшие проходной балл",
      "resultsTitle": "Результаты учеников",
      "studentHeader": "Ученик",
      "classHeader": "Класс",
      "scoreHeader": "Балл",
      "thresholdHeader": "Порог",
      "statusHeader": "Статус",
      "passed": "Пройден",
      "failed": "Не пройден",
      "noRisk": "Учеников группы риска нет",
      "noResults": "Результатов пока нет",
      "testNotFound": "Тест не найден",
      "teacher": "Учитель",
      "classes": "Классы",
      "noTeacher": "Не указан",
      "noClass": "Не указан",
      "unknownStudent": "Неизвестный ученик"
    },
    "kz": {
      "navOverview": "Шолу",
      "navClasses": "Барлық сыныптар",
      "navTeachers": "Мұғалімдер",
      "navTests": "Тесттер",
      "navResults": "Нәтижелер",
      "navAnalytics": "Талдау",
      "backLabel": "Тесттерге оралу",
      "pageTitle": "Тестті талдау",
      "completedLabel": "Орындалған тесттер",
      "averageLabel": "Орташа балл",
      "passedLabel": "Шекті балдан өтті",
      "failedLabel": "Шекті балдан төмен",
      "riskTitle": "Тәуекел тобындағы оқушылар",
      "riskDescription": "Өту балын жинамаған оқушылар",
      "resultsTitle": "Оқушылардың нәтижелері",
      "studentHeader": "Оқушы",
      "classHeader": "Сынып",
      "scoreHeader": "Балл",
      "thresholdHeader": "Шекті балл",
      "statusHeader": "Мәртебе",
      "passed": "Өтті",
      "failed": "Өтпеді",
      "noRisk": "Тәуекел тобындағы оқушылар жоқ",
      "noResults": "Әзірге нәтижелер жоқ",
      "testNotFound": "Тест табылмады",
      "teacher": "Мұғалім",
      "classes": "Сыныптар",
      "noTeacher": "Көрсетілмеген",
      "noClass": "Көрсетілмеген",
      "unknownStudent": "Белгісіз оқушы"
    },
    "en": {
      "navOverview": "Overview",
      "navClasses": "All Classes",
      "navTeachers": "Teachers",
      "navTests": "Tests",
      "navResults": "Results",
      "navAnalytics": "Analytics",
      "backLabel": "Back to tests",
      "pageTitle": "Test Analysis",
      "completedLabel": "Completions",
      "averageLabel": "Average score",
      "passedLabel": "Passed threshold",
      "failedLabel": "Below threshold",
      "riskTitle": "Students at Risk",
      "riskDescription": "Students who scored below the passing threshold",
      "resultsTitle": "Student Results",
      "studentHeader": "Student",
      "classHeader": "Class",
      "scoreHeader": "Score",
      "thresholdHeader": "Threshold",
      "statusHeader": "Status",
      "passed": "Passed",
      "failed": "Failed",
      "noRisk": "No students at risk",
      "noResults": "No results yet",
      "testNotFound": "Test not found",
      "teacher": "Teacher",
      "classes": "Classes",
      "noTeacher": "Not specified",
      "noClass": "Not specified",
      "unknownStudent": "Unknown student"
    },
    "kk": {
      "navOverview": "Шолу",
      "navClasses": "Барлық сыныптар",
      "navTeachers": "Мұғалімдер",
      "navTests": "Тесттер",
      "navResults": "Нәтижелер",
      "navAnalytics": "Талдау",
      "backLabel": "Тесттерге оралу",
      "pageTitle": "Тестті талдау",
      "completedLabel": "Орындалған тесттер",
      "averageLabel": "Орташа балл",
      "passedLabel": "Шекті балдан өтті",
      "failedLabel": "Шекті балдан төмен",
      "riskTitle": "Тәуекел тобындағы оқушылар",
      "riskDescription": "Өту балын жинамаған оқушылар",
      "resultsTitle": "Оқушылардың нәтижелері",
      "studentHeader": "Оқушы",
      "classHeader": "Сынып",
      "scoreHeader": "Балл",
      "thresholdHeader": "Шекті балл",
      "statusHeader": "Мәртебе",
      "passed": "Өтті",
      "failed": "Өтпеді",
      "noRisk": "Тәуекел тобындағы оқушылар жоқ",
      "noResults": "Әзірге нәтижелер жоқ",
      "testNotFound": "Тест табылмады",
      "teacher": "Мұғалім",
      "classes": "Сыныптар",
      "noTeacher": "Көрсетілмеген",
      "noClass": "Көрсетілмеген",
      "unknownStudent": "Белгісіз оқушы"
    }
  },
  "vice-principal-home": {
    "ru": {
      "welcome": "Добро пожаловать",
      "vpOverview": "Обзор",
      "vpClasses": "Все классы",
      "vpTeachers": "Учителя",
      "vpTests": "Тесты",
      "vpResults": "Результаты",
      "vpAnalytics": "Аналитика",
      "vpRole": "Завуч · ADVANTA Pulse",
      "vpDashboard": "Контроль качества обучения",
      "vpDashboardDescription": "Успеваемость классов, работа учителей и проблемные зоны.",
      "vpStudents": "Ученики",
      "vpAverage": "Средний балл",
      "vpCriticalClasses": "Критические классы и предметы",
      "vpCriticalDescription": "Направления, требующие вмешательства завуча.",
      "vpTeacherPerformance": "Контроль работы учителей",
      "vpTeacher": "Учитель",
      "vpSubject": "Предмет",
      "vpStatus": "Статус",
      "vpClassPerformance": "Успеваемость по классам",
      "vpClassPerformanceDescription": "Результаты по предметам с указанием учителей.",
      "vpNoData": "Пока нет результатов тестирования.",
      "vpNoCritical": "Критических направлений пока не обнаружено.",
      "vpCritical": "Критический",
      "vpAttention": "Требует внимания",
      "vpGood": "Хороший",
      "vpExcellent": "Высокий",
      "vpInsufficient": "Недостаточно данных",
      "vpCompleted": "Завершённых тестов",
      "vpStudentsTested": "Учеников с результатами",
      "vpNoTeachers": "Учителя пока не добавлены",
      "vpUnknownTeacher": "Учитель не назначен",
      "vpUnknownSubject": "Предмет не указан",
      "vpUnassigned": "Без закреплённых классов"
    },
    "kz": {
      "welcome": "Қош келдіңіз",
      "vpOverview": "Шолу",
      "vpClasses": "Барлық сыныптар",
      "vpTeachers": "Мұғалімдер",
      "vpTests": "Тесттер",
      "vpResults": "Нәтижелер",
      "vpAnalytics": "Талдау",
      "vpRole": "Оқу ісінің меңгерушісі · ADVANTA Pulse",
      "vpDashboard": "Оқу сапасын бақылау",
      "vpDashboardDescription": "Сынып үлгерімі, мұғалім жұмысы және назар аударатын бағыттар.",
      "vpStudents": "Оқушылар",
      "vpAverage": "Орташа балл",
      "vpCriticalClasses": "Күрделі сыныптар мен пәндер",
      "vpCriticalDescription": "Оқу ісінің меңгерушісі назар аударуы қажет бағыттар.",
      "vpTeacherPerformance": "Мұғалімдердің жұмысын бақылау",
      "vpTeacher": "Мұғалім",
      "vpSubject": "Пән",
      "vpStatus": "Мәртебе",
      "vpClassPerformance": "Сыныптар бойынша үлгерім",
      "vpClassPerformanceDescription": "Мұғалімдер көрсетілген пәндік нәтижелер.",
      "vpNoData": "Әзірге тест нәтижелері жоқ.",
      "vpNoCritical": "Күрделі бағыттар әзірге анықталған жоқ.",
      "vpCritical": "Күрделі",
      "vpAttention": "Назар аудару қажет",
      "vpGood": "Жақсы",
      "vpExcellent": "Жоғары",
      "vpInsufficient": "Деректер жеткіліксіз",
      "vpCompleted": "Аяқталған тесттер",
      "vpStudentsTested": "Нәтижесі бар оқушылар",
      "vpNoTeachers": "Мұғалімдер әлі қосылмаған",
      "vpUnknownTeacher": "Мұғалім тағайындалмаған",
      "vpUnknownSubject": "Пән көрсетілмеген",
      "vpUnassigned": "Бекітілген сыныптар жоқ"
    },
    "en": {
      "welcome": "Welcome",
      "vpOverview": "Overview",
      "vpClasses": "All Classes",
      "vpTeachers": "Teachers",
      "vpTests": "Tests",
      "vpResults": "Results",
      "vpAnalytics": "Analytics",
      "vpRole": "Vice Principal · ADVANTA Pulse",
      "vpDashboard": "Learning Quality Monitoring",
      "vpDashboardDescription": "Class performance, teacher activity and areas of concern.",
      "vpStudents": "Students",
      "vpAverage": "Average Score",
      "vpCriticalClasses": "Critical Classes and Subjects",
      "vpCriticalDescription": "Areas requiring vice principal intervention.",
      "vpTeacherPerformance": "Teacher Performance Monitoring",
      "vpTeacher": "Teacher",
      "vpSubject": "Subject",
      "vpStatus": "Status",
      "vpClassPerformance": "Class Performance",
      "vpClassPerformanceDescription": "Subject results with assigned teachers.",
      "vpNoData": "No test results yet.",
      "vpNoCritical": "No critical areas have been identified.",
      "vpCritical": "Critical",
      "vpAttention": "Needs attention",
      "vpGood": "Good",
      "vpExcellent": "High",
      "vpInsufficient": "Insufficient data",
      "vpCompleted": "Completed tests",
      "vpStudentsTested": "Students with results",
      "vpNoTeachers": "No teachers have been added",
      "vpUnknownTeacher": "No teacher assigned",
      "vpUnknownSubject": "Subject not specified",
      "vpUnassigned": "No assigned classes"
    },
    "kk": {
      "welcome": "Қош келдіңіз",
      "vpOverview": "Шолу",
      "vpClasses": "Барлық сыныптар",
      "vpTeachers": "Мұғалімдер",
      "vpTests": "Тесттер",
      "vpResults": "Нәтижелер",
      "vpAnalytics": "Талдау",
      "vpRole": "Оқу ісінің меңгерушісі · ADVANTA Pulse",
      "vpDashboard": "Оқу сапасын бақылау",
      "vpDashboardDescription": "Сынып үлгерімі, мұғалім жұмысы және назар аударатын бағыттар.",
      "vpStudents": "Оқушылар",
      "vpAverage": "Орташа балл",
      "vpCriticalClasses": "Күрделі сыныптар мен пәндер",
      "vpCriticalDescription": "Оқу ісінің меңгерушісі назар аударуы қажет бағыттар.",
      "vpTeacherPerformance": "Мұғалімдердің жұмысын бақылау",
      "vpTeacher": "Мұғалім",
      "vpSubject": "Пән",
      "vpStatus": "Мәртебе",
      "vpClassPerformance": "Сыныптар бойынша үлгерім",
      "vpClassPerformanceDescription": "Мұғалімдер көрсетілген пәндік нәтижелер.",
      "vpNoData": "Әзірге тест нәтижелері жоқ.",
      "vpNoCritical": "Күрделі бағыттар әзірге анықталған жоқ.",
      "vpCritical": "Күрделі",
      "vpAttention": "Назар аудару қажет",
      "vpGood": "Жақсы",
      "vpExcellent": "Жоғары",
      "vpInsufficient": "Деректер жеткіліксіз",
      "vpCompleted": "Аяқталған тесттер",
      "vpStudentsTested": "Нәтижесі бар оқушылар",
      "vpNoTeachers": "Мұғалімдер әлі қосылмаған",
      "vpUnknownTeacher": "Мұғалім тағайындалмаған",
      "vpUnknownSubject": "Пән көрсетілмеген",
      "vpUnassigned": "Бекітілген сыныптар жоқ"
    }
  },
  "test": {
    "ru": {
      "testNotFound": "Тест не найден",
      "noQuestions": "В этом тесте нет вопросов",
      "accessDenied": "Этот тест назначен другому классу",
      "testUnavailable": "Этот тест сейчас недоступен",
      "alreadyCompleted": "Вы уже прошли этот тест",
      "answerAll": "Ответьте на все вопросы",
      "question": "Вопрос",
      "of": "из",
      "mathematics": "Математика",
      "timeExpired": "Время вышло. Тест будет отправлен автоматически."
    },
    "kz": {
      "testNotFound": "Тест табылмады",
      "noQuestions": "Бұл тестте сұрақтар жоқ",
      "accessDenied": "Бұл тест басқа сыныпқа тағайындалған",
      "testUnavailable": "Бұл тест қазір қолжетімсіз",
      "alreadyCompleted": "Сіз бұл тестті өтіп қойдыңыз",
      "answerAll": "Барлық сұрақтарға жауап беріңіз",
      "question": "Сұрақ",
      "of": "/",
      "mathematics": "Математика",
      "timeExpired": "Уақыт аяқталды. Тест автоматты түрде жіберіледі."
    },
    "en": {
      "testNotFound": "Test not found",
      "noQuestions": "This test has no questions",
      "accessDenied": "This test is assigned to another class",
      "testUnavailable": "This test is currently unavailable",
      "alreadyCompleted": "You have already completed this test",
      "answerAll": "Please answer all questions",
      "question": "Question",
      "of": "of",
      "mathematics": "Mathematics",
      "timeExpired": "Time is up. The test will be submitted automatically."
    },
    "kk": {
      "testNotFound": "Тест табылмады",
      "noQuestions": "Бұл тестте сұрақтар жоқ",
      "accessDenied": "Бұл тест басқа сыныпқа тағайындалған",
      "testUnavailable": "Бұл тест қазір қолжетімсіз",
      "alreadyCompleted": "Сіз бұл тестті өтіп қойдыңыз",
      "answerAll": "Барлық сұрақтарға жауап беріңіз",
      "question": "Сұрақ",
      "of": "/",
      "mathematics": "Математика",
      "timeExpired": "Уақыт аяқталды. Тест автоматты түрде жіберіледі."
    }
  },
  "staff-classes": {
    "ru": {
      "description": "Выберите класс для перехода в его кабинет",
      "students": "учеников",
      "requests": "заявок",
      "tests": "тестов",
      "openClass": "Открыть класс"
    },
    "kz": {
      "description": "Сынып кабинетіне өту үшін сыныпты таңдаңыз",
      "students": "оқушы",
      "requests": "өтінім",
      "tests": "тест",
      "openClass": "Сыныпты ашу"
    },
    "en": {
      "description": "Select a class to open its dashboard",
      "students": "students",
      "requests": "requests",
      "tests": "tests",
      "openClass": "Open class"
    },
    "kk": {
      "description": "Сынып кабинетіне өту үшін сыныпты таңдаңыз",
      "students": "оқушы",
      "requests": "өтінім",
      "tests": "тест",
      "openClass": "Сыныпты ашу"
    }
  },
  "vice-principal-classes": {
    "ru": {
      "navOverview": "Обзор",
      "navClasses": "Все классы",
      "navTeachers": "Учителя",
      "navTests": "Тесты",
      "navResults": "Результаты",
      "navAnalytics": "Аналитика",
      "pageTitle": "Все классы",
      "pageDescription": "Мониторинг классов и успеваемости",
      "totalClasses": "Всего классов",
      "totalStudents": "Всего учеников",
      "average": "Средний балл",
      "search": "Поиск класса",
      "placeholder": "Например, 5Б",
      "classesTitle": "Список классов",
      "class": "Класс",
      "students": "Ученики",
      "teacher": "Учитель",
      "score": "Средний балл",
      "status": "Статус",
      "action": "Действие",
      "details": "Подробнее",
      "good": "Хорошо",
      "attention": "Требует внимания",
      "critical": "Критический",
      "noData": "Нет данных",
      "noTeacher": "Не назначен",
      "empty": "Классы не найдены"
    },
    "kz": {
      "navOverview": "Шолу",
      "navClasses": "Барлық сыныптар",
      "navTeachers": "Мұғалімдер",
      "navTests": "Тесттер",
      "navResults": "Нәтижелер",
      "navAnalytics": "Талдау",
      "pageTitle": "Барлық сыныптар",
      "pageDescription": "Сыныптар мен үлгерімді бақылау",
      "totalClasses": "Сыныптар саны",
      "totalStudents": "Оқушылар саны",
      "average": "Орташа балл",
      "search": "Сыныпты іздеу",
      "placeholder": "Мысалы, 5Б",
      "classesTitle": "Сыныптар тізімі",
      "class": "Сынып",
      "students": "Оқушылар",
      "teacher": "Мұғалім",
      "score": "Орташа балл",
      "status": "Мәртебе",
      "action": "Әрекет",
      "details": "Толығырақ",
      "good": "Жақсы",
      "attention": "Назар аудару қажет",
      "critical": "Критикалық",
      "noData": "Дерек жоқ",
      "noTeacher": "Тағайындалмаған",
      "empty": "Сыныптар табылмады"
    },
    "en": {
      "navOverview": "Overview",
      "navClasses": "All Classes",
      "navTeachers": "Teachers",
      "navTests": "Tests",
      "navResults": "Results",
      "navAnalytics": "Analytics",
      "pageTitle": "All Classes",
      "pageDescription": "Class and performance monitoring",
      "totalClasses": "Total classes",
      "totalStudents": "Total students",
      "average": "Average score",
      "search": "Search class",
      "placeholder": "For example, 5B",
      "classesTitle": "Class list",
      "class": "Class",
      "students": "Students",
      "teacher": "Teacher",
      "score": "Average score",
      "status": "Status",
      "action": "Action",
      "details": "Details",
      "good": "Good",
      "attention": "Needs attention",
      "critical": "Critical",
      "noData": "No data",
      "noTeacher": "Not assigned",
      "empty": "No classes found"
    },
    "kk": {
      "navOverview": "Шолу",
      "navClasses": "Барлық сыныптар",
      "navTeachers": "Мұғалімдер",
      "navTests": "Тесттер",
      "navResults": "Нәтижелер",
      "navAnalytics": "Талдау",
      "pageTitle": "Барлық сыныптар",
      "pageDescription": "Сыныптар мен үлгерімді бақылау",
      "totalClasses": "Сыныптар саны",
      "totalStudents": "Оқушылар саны",
      "average": "Орташа балл",
      "search": "Сыныпты іздеу",
      "placeholder": "Мысалы, 5Б",
      "classesTitle": "Сыныптар тізімі",
      "class": "Сынып",
      "students": "Оқушылар",
      "teacher": "Мұғалім",
      "score": "Орташа балл",
      "status": "Мәртебе",
      "action": "Әрекет",
      "details": "Толығырақ",
      "good": "Жақсы",
      "attention": "Назар аудару қажет",
      "critical": "Критикалық",
      "noData": "Дерек жоқ",
      "noTeacher": "Тағайындалмаған",
      "empty": "Сыныптар табылмады"
    }
  },
  "app": {
    "ru": {
      "description": "Система срезов знаний и аналитики успеваемости",
      "loginTitle": "Вход в систему",
      "email": "Email",
      "emailPlaceholder": "Введите email",
      "password": "Пароль",
      "passwordPlaceholder": "Введите пароль",
      "login": "Войти",
      "loggingIn": "Вход...",
      "registrationQuestion": "Ученик и ещё нет аккаунта?",
      "registration": "Зарегистрироваться",
      "fillFields": "Введите email и пароль.",
      "wrongCredentials": "Неверный email или пароль.",
      "pending": "Ваша заявка ещё ожидает подтверждения учителя.",
      "rejected": "Ваша заявка была отклонена. Обратитесь к учителю или администрации школы.",
      "approvedError": "Заявка подтверждена, но аккаунт ученика не найден. Обратитесь к учителю.",
      "inactive": "Ваш аккаунт сейчас неактивен.",
      "showPassword": "Показать пароль",
      "hidePassword": "Скрыть пароль"
    },
    "kz": {
      "description": "Білім деңгейін тексеру және үлгерімді талдау жүйесі",
      "loginTitle": "Жүйеге кіру",
      "email": "Email",
      "emailPlaceholder": "Email енгізіңіз",
      "password": "Құпия сөз",
      "passwordPlaceholder": "Құпия сөзді енгізіңіз",
      "login": "Кіру",
      "loggingIn": "Кіру...",
      "registrationQuestion": "Оқушысыз ба және аккаунтыңыз әлі жоқ па?",
      "registration": "Тіркелу",
      "fillFields": "Email және құпия сөзді енгізіңіз.",
      "wrongCredentials": "Email немесе құпия сөз дұрыс емес.",
      "pending": "Сіздің өтінішіңіз мұғалімнің растауын күтіп тұр.",
      "rejected": "Сіздің өтінішіңіз қабылданбады. Мұғалімге немесе мектеп әкімшілігіне хабарласыңыз.",
      "approvedError": "Өтініш расталды, бірақ оқушы аккаунты табылмады. Мұғалімге хабарласыңыз.",
      "inactive": "Сіздің аккаунтыңыз қазір белсенді емес.",
      "showPassword": "Құпия сөзді көрсету",
      "hidePassword": "Құпия сөзді жасыру"
    },
    "en": {
      "description": "Knowledge assessment and academic analytics system",
      "loginTitle": "Sign in",
      "email": "Email",
      "emailPlaceholder": "Enter email",
      "password": "Password",
      "passwordPlaceholder": "Enter password",
      "login": "Sign in",
      "loggingIn": "Signing in...",
      "registrationQuestion": "Are you a student without an account?",
      "registration": "Register",
      "fillFields": "Enter your email and password.",
      "wrongCredentials": "Incorrect email or password.",
      "pending": "Your registration request is still waiting for teacher approval.",
      "rejected": "Your registration request was rejected. Please contact your teacher or school administration.",
      "approvedError": "Your request was approved, but the student account could not be found. Please contact your teacher.",
      "inactive": "Your account is currently inactive.",
      "showPassword": "Show password",
      "hidePassword": "Hide password"
    },
    "kk": {
      "description": "Білім деңгейін тексеру және үлгерімді талдау жүйесі",
      "loginTitle": "Жүйеге кіру",
      "email": "Email",
      "emailPlaceholder": "Email енгізіңіз",
      "password": "Құпия сөз",
      "passwordPlaceholder": "Құпия сөзді енгізіңіз",
      "login": "Кіру",
      "loggingIn": "Кіру...",
      "registrationQuestion": "Оқушысыз ба және аккаунтыңыз әлі жоқ па?",
      "registration": "Тіркелу",
      "fillFields": "Email және құпия сөзді енгізіңіз.",
      "wrongCredentials": "Email немесе құпия сөз дұрыс емес.",
      "pending": "Сіздің өтінішіңіз мұғалімнің растауын күтіп тұр.",
      "rejected": "Сіздің өтінішіңіз қабылданбады. Мұғалімге немесе мектеп әкімшілігіне хабарласыңыз.",
      "approvedError": "Өтініш расталды, бірақ оқушы аккаунты табылмады. Мұғалімге хабарласыңыз.",
      "inactive": "Сіздің аккаунтыңыз қазір белсенді емес.",
      "showPassword": "Құпия сөзді көрсету",
      "hidePassword": "Құпия сөзді жасыру"
    }
  }
};
  pageDictionaries["director-teachers"] = {
  "ru": {
    "navOverview": "Обзор",
    "navClasses": "Классы",
    "navTeachers": "Учителя",
    "navTests": "Тесты",
    "navResults": "Результаты",
    "navAnalytics": "Аналитика",
    "title": "Учителя школы",
    "subtitle": "Предметы, классы и результаты тестирования",
    "total": "Всего учителей",
    "active": "Создавали тесты",
    "attention": "Ниже 70 баллов",
    "search": "Поиск учителя",
    "allSubjects": "Все предметы",
    "teacher": "Учитель",
    "subject": "Предмет",
    "classes": "Классы",
    "tests": "Тесты",
    "average": "Средний балл",
    "status": "Уровень",
    "details": "Подробнее",
    "none": "Учителей пока нет",
    "notSpecified": "Не указан",
    "noClasses": "Не закреплены",
    "noResults": "Нет результатов",
    "detailsTitle": "Результаты учителя",
    "class": "Класс",
    "completions": "Выполнений",
    "students": "Учеников",
    "close": "Закрыть",
    "riskNote": "Статус основан на среднем балле завершённых тестов (это не оценка работы учителя).",
    "risk": "Требует внимания",
    "good": "В норме",
    "unknown": "Недостаточно данных",
    "noClassResults": "Для этого класса нет результатов"
  },
  "kz": {
    "navOverview": "Шолу",
    "navClasses": "Сыныптар",
    "navTeachers": "Мұғалімдер",
    "navTests": "Тесттер",
    "navResults": "Нәтижелер",
    "navAnalytics": "Талдау",
    "title": "Мектеп мұғалімдері",
    "subtitle": "Пәндер, сыныптар және тестілеу нәтижелері",
    "total": "Мұғалімдер саны",
    "active": "Тест құрастырғандар",
    "attention": "70 балдан төмен",
    "search": "Мұғалімді іздеу",
    "allSubjects": "Барлық пәндер",
    "teacher": "Мұғалім",
    "subject": "Пән",
    "classes": "Сыныптар",
    "tests": "Тесттер",
    "average": "Орташа балл",
    "status": "Деңгей",
    "details": "Толығырақ",
    "none": "Әзірге мұғалімдер жоқ",
    "notSpecified": "Көрсетілмеген",
    "noClasses": "Бекітілмеген",
    "noResults": "Нәтижелер жоқ",
    "detailsTitle": "Мұғалім нәтижелері",
    "class": "Сынып",
    "completions": "Орындалғаны",
    "students": "Оқушылар",
    "close": "Жабу",
    "riskNote": "Мәртебе аяқталған тесттердің орташа балына негізделеді (бұл мұғалім жұмысының бағасы емес).",
    "risk": "Назар аудару керек",
    "good": "Қалыпты",
    "unknown": "Деректер жеткіліксіз",
    "noClassResults": "Бұл сынып бойынша нәтижелер жоқ"
  },
  "en": {
    "navOverview": "Overview",
    "navClasses": "Classes",
    "navTeachers": "Teachers",
    "navTests": "Tests",
    "navResults": "Results",
    "navAnalytics": "Analytics",
    "title": "School teachers",
    "subtitle": "Subjects, classes and test performance",
    "total": "Total teachers",
    "active": "Created tests",
    "attention": "Below 70 points",
    "search": "Search teachers",
    "allSubjects": "All subjects",
    "teacher": "Teacher",
    "subject": "Subject",
    "classes": "Classes",
    "tests": "Tests",
    "average": "Average score",
    "status": "Level",
    "details": "Details",
    "none": "No teachers found",
    "notSpecified": "Not specified",
    "noClasses": "Not assigned",
    "noResults": "No results",
    "detailsTitle": "Teacher results",
    "class": "Class",
    "completions": "Completions",
    "students": "Students",
    "close": "Close",
    "riskNote": "Status is based on average completed-test score (not an assessment of teacher performance).",
    "risk": "Needs attention",
    "good": "On track",
    "unknown": "Insufficient data",
    "noClassResults": "No results for this class"
  },
  "kk": {
    "navOverview": "Шолу",
    "navClasses": "Сыныптар",
    "navTeachers": "Мұғалімдер",
    "navTests": "Тесттер",
    "navResults": "Нәтижелер",
    "navAnalytics": "Талдау",
    "title": "Мектеп мұғалімдері",
    "subtitle": "Пәндер, сыныптар және тестілеу нәтижелері",
    "total": "Мұғалімдер саны",
    "active": "Тест құрастырғандар",
    "attention": "70 балдан төмен",
    "search": "Мұғалімді іздеу",
    "allSubjects": "Барлық пәндер",
    "teacher": "Мұғалім",
    "subject": "Пән",
    "classes": "Сыныптар",
    "tests": "Тесттер",
    "average": "Орташа балл",
    "status": "Деңгей",
    "details": "Толығырақ",
    "none": "Әзірге мұғалімдер жоқ",
    "notSpecified": "Көрсетілмеген",
    "noClasses": "Бекітілмеген",
    "noResults": "Нәтижелер жоқ",
    "detailsTitle": "Мұғалім нәтижелері",
    "class": "Сынып",
    "completions": "Орындалғаны",
    "students": "Оқушылар",
    "close": "Жабу",
    "riskNote": "Мәртебе аяқталған тесттердің орташа балына негізделеді (бұл мұғалім жұмысының бағасы емес).",
    "risk": "Назар аудару керек",
    "good": "Қалыпты",
    "unknown": "Деректер жеткіліксіз",
    "noClassResults": "Бұл сынып бойынша нәтижелер жоқ"
  }
};
  // Centralized keys shared by all new frontend pages.
  Object.assign(dictionary, {
  "navOverview": [
    "Обзор",
    "Шолу",
    "Overview"
  ],
  "navClasses": [
    "Классы",
    "Сыныптар",
    "Classes"
  ],
  "navTeachers": [
    "Учителя",
    "Мұғалімдер",
    "Teachers"
  ],
  "navTests": [
    "Тесты",
    "Тесттер",
    "Tests"
  ],
  "navResults": [
    "Результаты",
    "Нәтижелер",
    "Results"
  ],
  "navAnalytics": [
    "Аналитика",
    "Талдау",
    "Analytics"
  ],
  "navStaff": [
    "Сотрудники",
    "Қызметкерлер",
    "Staff"
  ],
  "navAdmin": [
    "Администратор",
    "Әкімші",
    "Administrator"
  ],
  "dirTestsTitle": [
    "Тесты школы",
    "Мектеп тесттері",
    "School tests"
  ],
  "dirResultsTitle": [
    "Результаты школы",
    "Мектеп нәтижелері",
    "School results"
  ],
  "totalTests": [
    "Всего тестов",
    "Тесттер саны",
    "Total tests"
  ],
  "totalResults": [
    "Выполнено тестов",
    "Орындалған тесттер",
    "Completions"
  ],
  "avgScore": [
    "Средний балл",
    "Орташа балл",
    "Average score"
  ],
  "atRisk": [
    "Ниже порога",
    "Шекті балдан төмен",
    "Below threshold"
  ],
  "filterClass": [
    "Все классы",
    "Барлық сыныптар",
    "All classes"
  ],
  "filterSubject": [
    "Все предметы",
    "Барлық пәндер",
    "All subjects"
  ],
  "searchTests": [
    "Поиск теста",
    "Тестті іздеу",
    "Search tests"
  ],
  "searchResults": [
    "Поиск ученика или теста",
    "Оқушыны немесе тестті іздеу",
    "Search student or test"
  ],
  "colTest": [
    "Тест",
    "Тест",
    "Test"
  ],
  "colSubject": [
    "Предмет",
    "Пән",
    "Subject"
  ],
  "colTeacher": [
    "Учитель",
    "Мұғалім",
    "Teacher"
  ],
  "colClasses": [
    "Классы",
    "Сыныптар",
    "Classes"
  ],
  "colStatus": [
    "Статус",
    "Мәртебе",
    "Status"
  ],
  "colCompleted": [
    "Выполнений",
    "Орындалғаны",
    "Completions"
  ],
  "colAvg": [
    "Средний балл",
    "Орташа балл",
    "Average score"
  ],
  "colStudent": [
    "Ученик",
    "Оқушы",
    "Student"
  ],
  "colClass": [
    "Класс",
    "Сынып",
    "Class"
  ],
  "colScore": [
    "Балл",
    "Балл",
    "Score"
  ],
  "colThreshold": [
    "Проходной балл",
    "Өту балы",
    "Passing score"
  ],
  "colDate": [
    "Дата",
    "Күні",
    "Date"
  ],
  "colAction": [
    "Действие",
    "Әрекет",
    "Action"
  ],
  "emptyData": [
    "Данных пока нет",
    "Әзірге деректер жоқ",
    "No data yet"
  ],
  "unknown": [
    "Не указано",
    "Көрсетілмеген",
    "Not specified"
  ],
  "adminTitle": [
    "Панель администратора",
    "Әкімші панелі",
    "Administrator dashboard"
  ],
  "adminStaffTitle": [
    "Сотрудники и заявки",
    "Қызметкерлер мен өтінімдер",
    "Staff and applications"
  ],
  "adminStaffInfo": [
    "Создание аккаунтов и подтверждение заявок",
    "Аккаунт ашу және өтінімдерді мақұлдау",
    "Create accounts and approve applications"
  ],
  "staffRegisterTitle": [
    "Регистрация сотрудника",
    "Қызметкерді тіркеу",
    "Staff registration"
  ],
  "fullName": [
    "ФИО",
    "Толық аты-жөні",
    "Full name"
  ],
  "staffEmail": [
    "Электронная почта",
    "Электрондық пошта",
    "Email"
  ],
  "staffPassword": [
    "Пароль (минимум 8 символов)",
    "Құпиясөз (кемінде 8 таңба)",
    "Password (8 characters minimum)"
  ],
  "requestAccess": [
    "Отправить заявку",
    "Өтінім жіберу",
    "Submit application"
  ],
  "requestPending": [
    "Заявка отправлена. Ожидайте решения администратора.",
    "Өтінім жіберілді. Әкімшінің шешімін күтіңіз.",
    "Application submitted. Wait for approval."
  ],
  "accountCreate": [
    "Создать сотрудника",
    "Қызметкер құру",
    "Create staff account"
  ],
  "staffRole": [
    "Роль",
    "Рөл",
    "Role"
  ],
  "staffSubjects": [
    "Предметы (через запятую)",
    "Пәндер (үтір арқылы)",
    "Subjects (comma separated)"
  ],
  "staffClasses": [
    "ID классов (через запятую)",
    "Сынып ID (үтір арқылы)",
    "Class IDs (comma separated)"
  ],
  "approveStaff": [
    "Одобрить",
    "Мақұлдау",
    "Approve"
  ],
  "rejectStaff": [
    "Отклонить",
    "Қабылдамау",
    "Reject"
  ],
  "staffActive": [
    "Активный",
    "Белсенді",
    "Active"
  ],
  "staffPending": [
    "На рассмотрении",
    "Қаралуда",
    "Pending"
  ],
  "staffRejected": [
    "Отклонён",
    "Қабылданбады",
    "Rejected"
  ],
  "staffList": [
    "Сотрудники",
    "Қызметкерлер",
    "Staff"
  ],
  "staffRequests": [
    "Заявки",
    "Өтінімдер",
    "Applications"
  ],
  "registrationLink": [
    "Регистрация сотрудника",
    "Қызметкерді тіркеу",
    "Staff registration"
  ],
  "noPasswordShare": [
    "Демо-режим: учётные записи хранятся только в этом браузере.",
    "Демо режимі: аккаунттар тек осы браузерде сақталады.",
    "Demo mode: accounts are stored in this browser only."
  ],
  "created": [
    "Создано",
    "Құрылды",
    "Created"
  ],
  "pendingApproval": [
    "Ожидает подтверждения",
    "Мақұлдауды күтуде",
    "Pending approval"
  ],
  "goToLogin": [
    "Вернуться ко входу",
    "Кіруге қайту",
    "Back to login"
  ],
  "saveStaff": [
    "Сохранить сотрудника",
    "Қызметкерді сақтау",
    "Save staff member"
  ],
  "reset": [
    "Сбросить фильтры",
    "Сүзгілерді тазалау",
    "Reset filters"
  ],
  "teacherMissing": [
    "Нет профиля сотрудника",
    "Қызметкер профилі жоқ",
    "Staff profile missing"
  ]
});
  const translations = { ru: {}, kz: {}, en: {} };
  for (const [key, values] of Object.entries(dictionary)) {
    translations.ru[key] = values[0];
    translations.kz[key] = values[1];
    translations.en[key] = values[2];
  }
  translations.kk = translations.kz;
  function normalizeLanguage(value) {
    return value === "kz" || value === "kk" ? "kz" : value === "en" ? "en" : "ru";
  }
  function getCurrentLanguage() {
    return normalizeLanguage(localStorage.getItem("language") || localStorage.getItem("advantaLanguage") || "ru");
  }
  function t(key, scope) {
    const lang = getCurrentLanguage();
    if (scope && pageDictionaries[scope]) {
      const dict = pageDictionaries[scope];
      return dict[lang]?.[key] ?? dict.ru?.[key] ?? key;
    }
    return translations[lang]?.[key] ?? translations.ru?.[key] ?? key;
  }
  function applyLanguage() {
    const lang = getCurrentLanguage();
    document.documentElement.lang = lang === "kz" ? "kk" : lang;
    document.querySelectorAll("[data-i18n]").forEach(node => {
      node.textContent = t(node.dataset.i18n, node.dataset.i18nScope);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(node => {
      node.placeholder = t(node.dataset.i18nPlaceholder, node.dataset.i18nScope);
    });
    document.querySelectorAll("[data-i18n-title]").forEach(node => {
      node.title = t(node.dataset.i18nTitle, node.dataset.i18nScope);
    });
    const selector = document.getElementById("languageSelect");
    if (selector) {
      const option = Array.from(selector.options).some(o => o.value === "kz") ? "kz" : "kk";
      selector.value = lang === "kz" ? option : lang;
    }
  }
  function setLanguage(value) {
    const lang = normalizeLanguage(value);
    localStorage.setItem("language", lang);
    localStorage.setItem("advantaLanguage", lang);
    applyLanguage();
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: {language: lang} }));
  }
  function initializeLanguage() {
    const selector = document.getElementById("languageSelect");
    if (selector) {
      // Захват предотвращает конфликт со старыми прямыми обработчиками страниц.
      selector.addEventListener("change", e => {
        e.stopImmediatePropagation();
        setLanguage(e.target.value);
      }, true);
    }
    applyLanguage();
  }
  window.AdvantaI18n = { scope(name) {
    const value = pageDictionaries[name];
    if (!value) throw new Error("Unknown language scope: " + name);
    return value;
  }, t, normalizeLanguage };
  window.translations = translations;
  window.t = t;
  window.setLanguage = setLanguage;
  window.applyLanguage = applyLanguage;
  window.getCurrentLanguage = getCurrentLanguage;
  window.normalizeLanguage = normalizeLanguage;
  window.addEventListener("languageChanged", applyLanguage);
  window.addEventListener("storage", e => {
    if (e.key === "language" || e.key === "advantaLanguage") {
      applyLanguage();
      window.dispatchEvent(new Event("languageChanged"));
    }
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeLanguage);
  else initializeLanguage();
})();
