// Selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
const result_box = document.querySelector(".result_box");

// If startQuiz button clicked
start_btn.onclick = () => {
    // Display courses
    let courseButtons = questions.map((course, index) => {
        return `<button onclick="selectCourse(${index})">${course.course}</button>`;
    }).join("");
    info_box.innerHTML = `<div class="info-title"><span>Select a Course</span></div>${courseButtons}`;
    info_box.classList.add("activeInfo");
}

let selectedCourseIndex = -1;

// Function to select course
function selectCourse(index) {
    selectedCourseIndex = index;
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0); // Display first question of selected course
    queCounter(1); // Update question counter
    startTimer(15); // Start timer
    startTimerLine(0); // Start timer line
}

// Function to show questions based on selected course
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    que_text.innerHTML = ''; // Clear previous question

    const selectedCourse = questions[selectedCourseIndex];
    const currentQuestion = selectedCourse.data[index];

    // Display current question
    let que_tag = '<span>' + currentQuestion.numb + ". " + currentQuestion.question + '</span>';
    let option_tag = currentQuestion.options.map(option => {
        return '<div class="option"><span>' + option + '</span></div>';
    }).join("");

    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");

    // Set onclick attribute to all available options
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

// Function to start timer
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; // Changing the value of timeCount with time value
        time--; // Decrement the time value
        if (time < 9) { // If timer is less than 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; // Add a 0 before time value
        }
        if (time < 0) { // If timer is less than 0
            clearInterval(counter); // Clear counter
            timeText.textContent = "Time Off"; // Change the time text to time off
            const allOptions = option_list.children.length; // Getting all option items
            let correcAns = questions[selectedCourseIndex].data[que_count].answer; // Getting correct answer from array
            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) { // If there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); // Adding green color to matched option
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); // Once user select an option then disable all options
            }
            next_btn.classList.add("show"); // Show the next button if user selected any option
        }
    }
}

// Function to start timer line
function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1; // Upgrading time value with 1
        time_line.style.width = time + "px"; // Increasing width of time_line with px by time value
        if (time > 549) { // If time value is greater than 549
            clearInterval(counterLine); // Clear counterLine
        }
    }
}

// Function to count questions
function queCounter(index) {
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions[selectedCourseIndex].data.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; // Adding new span tag inside bottom_ques_counter
}

// If option selected
function optionSelected(answer) {
    clearInterval(counter); // Clear counter
    clearInterval(counterLine); // Clear counterLine
    let userAns = answer.textContent; // Getting user selected option
    let correcAns = questions[selectedCourseIndex].data[que_count].answer; // Getting correct answer from array
    const allOptions = option_list.children.length; // Getting all option items

    if (userAns == correcAns) { // If user selected option is equal to array's correct answer
        userScore += 1; // Upgrading score value with 1
        answer.classList.add("correct"); // Adding green color to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect"); // Adding red color to correct selected option
        console.log("Wrong Answer");

        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) { // If there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); // Adding green color to matched option
            }
        }
    }
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); // Once user select an option then disabled all options
    }
    next_btn.classList.add("show"); // Show the next button if user selected any option
}

// If Next Que button clicked
next_btn.onclick = () => {
    if (que_count < questions[selectedCourseIndex].data.length - 1) { // If question count is less than total question length
        que_count++; // Increment the que_count value
        que_numb++; // Increment the que_numb value
        showQuestions(que_count); // Calling showQuestions function
        queCounter(que_numb); // Passing que_numb value to queCounter
        clearInterval(counter); // Clear counter
        clearInterval(counterLine); // Clear counterLine
        startTimer(timeValue); // Calling startTimer function
        startTimerLine(widthValue); // Calling startTimerLine function
        timeText.textContent = "Time Left"; // Change the timeText to Time Left
        next_btn.classList.remove("show"); // Hide the next button
    } else {
        clearInterval(counter); // Clear counter
        clearInterval(counterLine); // Clear counterLine
        showResult(); // Calling showResult function
    }
}

// Function to show result
function showResult() {
    info_box.classList.remove("activeInfo"); // Hide info box
    quiz_box.classList.remove("activeQuiz"); // Hide quiz box
    result_box.classList.add("activeResult"); // Show result box
    const scoreText = result_box.querySelector(".score_text");
    let scoreTag = '<span>and sorry 😐, You got only <p>' + userScore + '</p> out of <p>' + questions[selectedCourseIndex].data.length + '</p></span>';
    if (userScore > 3) { // If user scored more than 3
        scoreTag = '<span>and congrats! 🎉, You got <p>' + userScore + '</p> out of <p>' + questions[selectedCourseIndex].data.length + '</p></span>';
    } else if (userScore > 1) { // If user scored more than 1
        scoreTag = '<span>and nice 😎, You got <p>' + userScore + '</p> out of <p>' + questions[selectedCourseIndex].data.length + '</p></span>';
    }
    scoreText.innerHTML = scoreTag; // Adding score tag to scoreText
}

// If restartQuiz button clicked
result_box.querySelector(".buttons .restart").onclick = () => {
    quiz_box.classList.add("activeQuiz"); // Show quiz box
    result_box.classList.remove("activeResult"); // Hide result box
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count); // Calling showQuestions function
    queCounter(que_numb); // Passing que_numb value to queCounter
    clearInterval(counter); // Clear counter
    clearInterval(counterLine); // Clear counterLine
    startTimer(timeValue); // Calling startTimer function
    startTimerLine(widthValue); // Calling startTimerLine function
    timeText.textContent = "Time Left"; // Change the text of timeText to Time Left
    next_btn.classList.remove("show"); // Hide the next button
}

// If quitQuiz button clicked
result_box.querySelector(".buttons .quit").onclick = () => {
    window.location.reload(); // Reload the current window
}
