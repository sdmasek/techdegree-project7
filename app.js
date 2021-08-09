const alertBanner = document.getElementById("alert");
const trafficCanvas = document.getElementById("traffic-chart").getContext('2d');
const dailyCanvas = document.getElementById("daily-chart").getContext('2d');
const userDeviceCanvas = document.getElementById("user-device-chart").getContext('2d');
const user = document.getElementById("user-field");
const message = document.getElementById("messageField");
const send = document.getElementById("send");
const trafficNavs = document.querySelectorAll(".traffic-nav-link");
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







//create object literal to hold canvas chart's data
let trafficData = {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3",
        "4-10", "11-17", "18-24", "25-31"],
    datasets: [{
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,
            2500],
        backgroundColor: 'rgba(116, 119, 191, .3)',
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












