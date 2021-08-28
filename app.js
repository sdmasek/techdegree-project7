const alertBanner = document.getElementById("alert");
const trafficCanvas = document.getElementById("traffic-chart").getContext('2d');
const dailyCanvas = document.getElementById("daily-chart").getContext('2d');
const userDeviceCanvas = document.getElementById("user-device-chart").getContext('2d');
const user = document.getElementById("user-field");
const message = document.getElementById("messageField");
const send = document.getElementById("send");
const trafficSection = document.querySelector(".traffic");
const trafficNav = document.querySelector(".traffic-nav");
const trafficContainer = document.querySelector(".widget-container-full");


const bellNotification = document.querySelector(".notifs-container");
const notifContainer = document.querySelector(".bell-icon");
//get the form element for the message section
const messageForm = document.querySelector(".widget-form");

//create the html that will make the banner appear
alertBanner.innerHTML =
    //here create two new classes that will help display and close
    //the alertBanner
    `
 <div class="alert-banner">
    <p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks
    to complete</p>
    <p class="alert-banner-close">x</p>
</div>`;



//close the alertBanner
alertBanner.addEventListener('click', e => {
    const element = e.target;
    if (element.classList.contains("alert-banner-close")) {
        alertBanner.style.display = "none";
    }
});

//create an event listener where two notifications are display
//simultaneously via drop down

//create a var to hold the child element of bellNotification
const newNotif = document.createElement("div");
addNotifs = () => {
    newNotif.className = "notifs-container-dropdown";
    newNotif.innerHTML =
        `
    <ul class="notifs-content-dropdown">
        <li class="content">You are now online</li>
        <li class="content">You have 3 unread messages</li>
    </ul>
        `;
    bellNotification.appendChild(newNotif);
    bellNotification.style.width = "100px";
    document.querySelector('.notifs-content-dropdown').classList.add("display-flexcolumn");
    newNotif.firstElementChild.style.display = "flex";
}

// function to remove the innerHTML and restore the notifs - container
// div to its original width
removeNotifs = () => {
    bellNotification.removeChild(newNotif);

    bellNotification.style.width = "initial";
    newNotif.firstElementChild.style.display = "none";
}

bellNotification.addEventListener("click", () => {
    if (document.querySelector('.notifs-content-dropdown')) {
        removeNotifs();
    } else {
        addNotifs();
    }

});


//all data that goes into the different traffic line charts
let trafficData = {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3",
        "4-10", "11-17", "18-24", "25-31"],
    datasets: [{
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,
            2500],
        backgroundColor: 'rgba(120, 101, 189, .3)',
        fill: true,
        tension: .5,
        borderWidth: 1,
    }]
};
//insert this data into the addEventListener for selecting each
//traffic nav INSTEAD OF the above traffic data
let trafficDefault = {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3",
        "4-10", "11-17", "18-24", "25-31"],
    datasets: [{
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,
            2500],
        backgroundColor: 'rgba(120, 101, 189, .3)',
        fill: true,
        tension: .5,
        borderWidth: 1,
    }]
};

let trafficData2 = {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3",
        "4-10", "11-17", "18-24", "25-31"],
    datasets: [{
        data: [1100, 550, 850, 1200, 1550, 1700, 1350, 1400, 1650, 2000,
            1550],
        backgroundColor: 'rgba(120, 101, 189, .3)',
        fill: true,
        tension: .5,
        borderWidth: 1,
    }]
};


let trafficData3 = {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3",
        "4-10", "11-17", "18-24", "25-31"],
    datasets: [{
        data: [1700, 850, 1850, 1000, 1150, 700, 1350, 1200, 500, 700,
            800],
        backgroundColor: 'rgba(120, 101, 189, .3)',
        fill: true,
        tension: .5,
        borderWidth: 1,
    }]
};

let trafficData4 = {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3",
        "4-10", "11-17", "18-24", "25-31"],
    datasets: [{
        data: [400, 550, 1050, 700, 1250, 600, 2000, 1500, 1700, 1350,
            1200],
        backgroundColor: 'rgba(120, 101, 189, .3)',
        fill: true,
        tension: .5,
        borderWidth: 1,
    }]
};

let trafficOptions = {
    aspectRatio: 2.5,
    maintainAspectRatio: false,
    responsive: true,
    animation: {
        duration: 0
    },
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
};

let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: trafficDefault,
    options: trafficOptions
});

//function to update charts
const updateChart = (chart, newData) => {
    chart.data.labels = newData.labels;
    chart.data.datasets[0].data = newData.datasets[0].data;
    chart.update();
};

//create a new chart by selecting a different link


trafficNav.addEventListener("click", (e) => {
    const trafficChildren = trafficNav.children;
    //if what I'm pressing isn't part of the ul
    if (e.target !== trafficNav) {
        //get all of the nav links in the ul
        const navs =
            trafficNav.querySelectorAll('li');
        //loop through all the nav links and remove the select
        navs.forEach(nav => {
            nav.classList.remove("traffic-nav-select");


            if (e.target === trafficChildren[0]) {
                updateChart(trafficChart, trafficData);
            } else if (e.target === trafficChildren[1]) {
                updateChart(trafficChart, trafficData2);
            } else if (e.target === trafficChildren[2]) {
                updateChart(trafficChart, trafficData3);
            } else if (e.target === trafficChildren[3]) {
                updateChart(trafficChart, trafficData4);
            }

        });
        //add the class to the element you click
        e.target.classList.add("traffic-nav-select");

    }



});

const dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
        label: '# of Hits',
        data: [75, 115, 175, 125, 225, 200, 100],
        backgroundColor: 'rgba(120, 101, 189, .9)',
        borderWidth: 1
    }]
};

const dailyOptions = {
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
};

let dailyChart = new Chart(dailyCanvas, {
    type: 'bar',
    data: dailyData,
    options: dailyOptions
});

const userDeviceData = {
    labels: ["Desktop", "Tablet", "Phones"],
    datasets: [{
        label: "# of Users",
        data: [2000, 550, 500],
        borderWidth: 0,
        backgroundColor: [
            '#7477BF',
            '#78CF82',
            '#51B6C8'
        ]
    }]
};

const userDeviceOptions = {
    //added this as advised from fullstack.com because height will 
    //auto-generate to a size larger than the parent container
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'right',
            labels: {
                boxWidth: 20,
                fontStyle: 'bold'

            }
        }
    }
};



let userDeviceChart = new Chart(userDeviceCanvas, {
    type: 'doughnut',
    data: userDeviceData,
    options: userDeviceOptions
});

//This event listener displays messages depending on what or
//what's not in the message field form
send.addEventListener('click', () => {
    if (user.value === "" && message.value === "") {
        alert("Please fill out user and message fields");
    } else if (user.value === "") {
        alert("Please fill out user field before sending");
    } else if (message.value === "") {
        alert("Please fill out message field before sending");
    } else {
        alert(`Message successfully sent to: ${user.value}`);
    }
});

//get the input for the "search for user" input field
const messageInput = messageForm.firstElementChild;
const userNames = document.getElementsByClassName("name");

const userDiv = document.createElement("div");
const userLi = document.createElement("li");

userDiv.className = "user-list";
userLi.className = "user-item";

// create a function that takes an array of names and creates a div
createUserList = (names) => {

    for (let i = 0; i < names.length; i++) {
        //let the input's value be identical to the text content
        //of the li's
        userLi.textContent = messageInput.value;
        userDiv.innerHTML =
            `<ul> 
        <li class="user-item">${names}</li>
     </ul>
    `;
        //if there's no names or letters in the div
        //take away the div element


    }
    messageForm.appendChild(userDiv);
    if (userLi.textContent === "") {
        messageForm.removeChild(userDiv);
    }


}
//return only the letters pressed down that match the
//letters in the users' names
returnNameLetter = () => {
    return Array.from(userNames).forEach(username => {
        let splitname = username.split("");
        return splitname;
    });
}

//create an automatic search for the message field


messageInput.addEventListener("keyup", (e) => {

    let search = e.target.value.toLowerCase();

    for (let i = 0; i < userNames.length; i++) {
        let userText = userNames[i].textContent;
        if (userText.includes(search)) {
            createUserList(userText);
            console.log(returnNameLetter());
        }
    }

});

//further things to do:
//-Create a function that creates and appends a div that lists
//all the names that match what you type in
//add the function to the event listener
//create another event listener tied to the document that closes
//the div anytime you click outside the document










