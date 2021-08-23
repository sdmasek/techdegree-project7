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
    data: trafficData,
    options: trafficOptions
});

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

        });
        //add the class to the element you click
        e.target.classList.add("traffic-nav-select");
        trafficChart.destroy();


        do {
            trafficChart = new Chart(trafficCanvas, {
                type: 'line',
                data: trafficData2,
                options: trafficOptions
            });
        } while (e.target === trafficChildren[1]);


        trafficChart.destroy();

        do {
            trafficChart = new Chart(trafficCanvas, {
                type: 'line',
                data: trafficData3,
                options: trafficOptions
            });
        } while (e.target === trafficChildren[2]);

        trafficChart.destroy();

        do {
            trafficChart = new Chart(trafficCanvas, {
                type: 'line',
                data: trafficData4,
                options: trafficOptions
            });
        } while (e.target === trafficChildren[3]);

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












