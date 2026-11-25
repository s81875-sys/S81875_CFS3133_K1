// 1. CHECK STUDENT MARK FUNCTION
function checkMark(event) {

    // Prevent the page from refreshing after form submission
    event.preventDefault();

    // Get student's name and mark
    let name = document.forms["gradeForm"]["name"].value;
    let mark = document.forms["gradeForm"]["mark"].value;

    // Check for empty name
    if (name.trim() === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Check for empty mark
    if (mark.trim() === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Check whether mark is numeric
    if (isNaN(mark.trim())) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    // Convert mark into a number
    mark = Number(mark);

    // Check mark range
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Declare grade variable
    let grade;

    // Determine student's grade
    if (mark >= 80) {
        grade = "A";

    } else if (mark >= 65) {
        grade = "B";

    } else if (mark >= 50) {
        grade = "C";

    } else {
        grade = "F";
    }

    // Display student's result
    document.getElementById("result").innerHTML =
        name + " got grade " + grade;

    // Change result colour according to grade
    if (grade === "A" || grade === "B") {
        document.getElementById("result").style.color = "green";

    } else if (grade === "C") {
        document.getElementById("result").style.color = "orange";

    } else {
        document.getElementById("result").style.color = "red";
    }

    // Display date and time using Date()
    document.getElementById("checkTime").innerHTML =
        "Checked on: " + new Date();

    return false;
}


// 2. SHOW GRADE TABLE FUNCTION
function showTable() {

    // Arrays containing grades and mark ranges
    let grades = ["A", "B", "C", "F"];

    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    // Create table heading
    let tableHTML = "<table>";

    tableHTML += "<tr>";
    tableHTML += "<th>Grade</th>";
    tableHTML += "<th>Mark Range</th>";
    tableHTML += "</tr>";

    // Use for loop to display all grades
    for (let i = 0; i < grades.length; i++) {

        tableHTML += "<tr>";

        tableHTML += "<td>" + grades[i] + "</td>";

        tableHTML += "<td>" + ranges[i] + "</td>";

        tableHTML += "</tr>";
    }

    tableHTML += "</table>";

    // Display the table on the webpage
    document.getElementById("tableContainer").innerHTML =
        tableHTML;
}


// 3. RANDOM MARK FUNCTION
function randomMark() {

    // Generate a random whole number from 0 to 100
    let randomNumber = Math.floor(Math.random() * 101);

    // Put the random number into the mark input field
    document.getElementById("mark").value = randomNumber;

}
