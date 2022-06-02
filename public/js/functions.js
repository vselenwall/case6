

// DELETE EVENT 

 async function deleteEvent(id) {
    const response = await fetch(`/events/${id}`, {
        method: "delete"
    });
    if (response.redirected) {
        window.location.href = response.url;
    }
}

// EDIT EVENT

async function editEvent(event) {

    const container = event.target.parentElement;
    const id = container.querySelector(".edit").getAttribute("data-id");
    const title = container.querySelector(".element-title");
    const date = container.querySelector("#element-date");

    // Make content editable
    if (!title.isContentEditable && !date.isContentEditable) {
        title.contentEditable = true;
        date.contentEditable = true;

        // Save changes with checkmark button
        event.target.innerHTML = '<i class="fa-solid fa-check"></i>';
    } else {

        // Save new quote w innertext
        const newEvent = {
            title: title.innerText,
            date: date.innerText
        };

        const response = await fetch(`/events/${id}`, {
            method: "put",
            body: JSON.stringify(newEvent),
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Redirect
        if (response.redirected) {
            window.location.href = response.url;
        }
    }
}

// Onclick edit event
document.querySelectorAll(".edit").forEach((btn) => (btn.onclick = editEvent));

// Show menu in header - add events
function showMenu() {
    const menu = document.getElementById("event-creator");
    const menuBg = document.getElementById("overlay-bg");

    if (menu.style.display === "none") {
        menu.style.display = "block";
        menuBg.style.display = "block";
    } else {
        menu.style.display = "none";
        menuBg.style.display = "none";
    }

}

// DATES
let date = new Date();

date.setDate(date.getDate() - 7);
let yearMonthDay = date.toLocaleDateString();

let weekday = date.getDay();

let savedEvents = [];

let calendarDay = createDates(date);
fetch("index/api", {
        method: "GET"
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (events) {
        savedEvents = events;
        showDates(calendarDay);
    })

function createDates(date) {
    let day = new Date(date);
    let weekday = day.getDay();
    let daysBefore = -weekday;
    let daysAfter = 7 + daysBefore;
    let dates = [];
    day.setDate(day.getDate() + daysBefore);
    for (let i = daysBefore; i < daysAfter; i++) {
        day.setDate(day.getDate() + 1);
        let yearMonthDay = day.toLocaleDateString();
        let obj = {
            date: yearMonthDay,
            dd: day.getUTCDate()
        }
        dates.push(obj);
    }
    return dates;
}
// SHOW DATES  
let calendar = createDates(date);

const calendarDates = document.getElementById("calendar-dates")
calendarDates.addEventListener("click", (event) => {

    // Div w dates in eventlist 
    let elementDate = document.getElementById("element-date")
    // Div w dates in calendar
    let dataDate = event.target.getAttribute("data-date")

    let li = document.getElementById("list");

    savedEvents.events.forEach(events => {
        let result = savedEvents.events.filter((e) => {
            return e.date === dataDate;
        });

        result.forEach(events => {
            li.classList.add("remove-this");
        });


        //console.log(result);
    });
    let showAll = document.getElementById("show-all");
    showAll.addEventListener("click", showAllEvents)

    function showAllEvents() {
        let li = document.getElementById("list");
        li.classList.remove("remove-this");

    };
});

function showDates(dates) {
    calendarDates.innerText = "";
    dates.forEach(element => {
        let div = document.createElement("div");
        div.classList.add("date-element");
        div.setAttribute("data-date", element.date);

        div.innerText = element.date;
        calendarDates.appendChild(div);

    });
}

// NAVIGATION
const previous = document.getElementById("previous");
const next = document.getElementById("next");
previous.addEventListener("click", () => {

    let firstWeekday = document.querySelector(".date-element");

    let thisMonday = firstWeekday.innerText;

    let day = new Date(thisMonday);
    day.setDate(day.getDate() - 7);

    calendar = createDates(day);
    showDates(calendar);
});
next.addEventListener("click", () => {

    let firstWeekday = document.querySelector(".date-element");

    let thisMonday = firstWeekday.innerText;

    let day = new Date(thisMonday);

    day.setDate(day.getDate() + 7);

    calendar = createDates(day);
    showDates(calendar);
});

