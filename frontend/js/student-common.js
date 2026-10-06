const savedStudent = JSON.parse(
    localStorage.getItem("registeredStudent")
);

if (savedStudent) {

    document
        .querySelectorAll(".student-name")
        .forEach(element => {

            element.textContent =
                `${savedStudent.firstName} ${savedStudent.lastName}`;

        });

}