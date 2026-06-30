const WORK_DURATION = 25 * 60;
let timeLeft = WORK_DURATION;
let timerId = null;

function getTime() {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function formatTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
}

function updateDisplay() {
    document.getElementById("timerValue").textContent = formatTime(timeLeft);
    document.getElementById("time").textContent = getTime();
}

function startTimer() {
    if (timerId) {
        return;
    }

    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft -= 1;
            updateDisplay();
        } else {
            clearInterval(timerId);
            timerId = null;
            updateDisplay();
            alert("Pomodoro complete! Time for a break.");
            resetTimer();
        }
    }, 1000);
}

function pauseTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
}

function resetTimer() {
    pauseTimer();
    timeLeft = WORK_DURATION;
    updateDisplay();
}

const welcomeModal = document.getElementById("startingscreen");
const closeWelcomeButton = document.getElementById("closeStartScreen");

if (closeWelcomeButton) {
    closeWelcomeButton.addEventListener("click", () => {
        welcomeModal.style.display = "none";
    });
}

const calendarOpen = document.getElementById("calendar");
calendarOpen.addEventListener("click", () => {
    document.getElementById("startWindow").style.display = "none";
    document.getElementById("calendarWindow").style.display = "block";
});

const calendarBack = document.getElementById("backButton3");
calendarBack.addEventListener("click", () => {
    document.getElementById("calendarWindow").style.display = "none";
    document.getElementById("startWindow").style.display = "block";
});

const timerButton = document.getElementById("Timer");
timerButton.addEventListener("click", () => {
    document.getElementById("startWindow").style.display = "none";
    document.getElementById("timerWindow").style.display = "block";
    updateDisplay();
});

const backButton = document.getElementById("backButton");
backButton.addEventListener("click", () => {
    pauseTimer();
    document.getElementById("timerWindow").style.display = "none";
    document.getElementById("startWindow").style.display = "block";
});
const backButton2 = document.getElementById("backButton2");
backButton2.addEventListener("click", () => {
    document.getElementById("todolistWindow").style.display = "none";
    document.getElementById("startWindow").style.display = "block";
});

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
    startTimer();
});

const pauseButton = document.getElementById("pauseButton");
pauseButton.addEventListener("click", () => {
    pauseTimer();
});

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
    resetTimer();
});
const todolistbutton = document.getElementById("list");
todolistbutton.addEventListener("click", () => {
    document.getElementById("startWindow").style.display = "none";
    document.getElementById("todolistWindow").style.display = "block";
});

const aboutButton = document.getElementById("about");
aboutButton.addEventListener("click", () => {
    document.getElementById("startWindow").style.display="none"
    document.getElementById("aboutWindow").style.display = "";
});

const backButton3 = document.getElementById("backButton3")
backButton3.addEventListener("click",() => {
    document.getElementById("startWindow").style.display="block"
    document.getElementById("aboutWindow").style.display="none"
});


resetTimer();

const taskInputs = [document.getElementById("taskInput"), document.getElementById("taskInput2")].filter(Boolean);
const addTaskButtons = [document.getElementById("addTaskButton"), document.getElementById("addTaskButton2")].filter(Boolean);
const taskLists = [document.getElementById("taskList"), document.getElementById("taskList2")].filter(Boolean);
let tasks = [];

function renderTasks() {
    taskLists.forEach((taskList) => {
        taskList.innerHTML = "";
        tasks.forEach((taskText) => {
            const listItem = document.createElement("li");
            listItem.textContent = taskText;
            taskList.appendChild(listItem);
        });
    });
}

function addTaskFromInput(inputElement) {
    const taskText = inputElement.value.trim();
    if (!taskText) {
        return;
    }

    tasks.push(taskText);
    inputElement.value = "";
    renderTasks();
}

addTaskButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const inputElement = button.previousElementSibling;
        if (inputElement) {
            addTaskFromInput(inputElement);
        }
    });
});

taskInputs.forEach((inputElement) => {
    inputElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addTaskFromInput(inputElement);
        }
    });
});

renderTasks();
timeOnWebpage = 0;
setInterval(() => {
    timeOnWebpage += 1;
    screenwarning();
}, 60000);

function screenwarning () {
    if (timeOnWebpage > 30) {
        alert("You have been on the webpage for more than 30 minutes. Please take a break.");
    }
}