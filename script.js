const display = document.getElementById('digital-clock');
const alarmhistory = document.querySelector('#alarmhistory');
const addAlarm = document.querySelector('.Alarmset');
const audio = new Audio("https://www.soundjay.com/free-music/sounds/barn-beat-01.mp3");
let alarmTimeout = null;
audio.loop = true;
let alarmTime = null;
const alarmList = [];

// calling updateTime() every second
setInterval(updateTime, 1000);

function updateTime() {
    var today = new Date();
    const dispayTime = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
    display.innerText = dispayTime;
    // console.log(dispayTime);
    if (alarmList.includes(dispayTime)) {
        audio.play();
        alert(`Hey! It's Alarm time ${dispayTime}`)
    }
}



// function used for stop alarm ring
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}


// set new alarm while click on submit button
addAlarm.addEventListener('submit', e => {
    e.preventDefault();
    let new_h = addAlarm.hours.value;
    if (new_h.substring(0, 1) === '0') {
        new_h = new_h.substring(1, 2);
    }

    let new_m = addAlarm.minutes.value;
    
    let new_s = addAlarm.seconds.value;
    let meridian = "";
    if (document.getElementById('am').checked) {
        meridian = "AM";
    } else if (document.getElementById('pm').checked) {
        meridian = "PM";
    }else{
        alert('Select AM or PM !!!');

        return;
    }

    const newAlarm = `${new_h}:${new_m}:${new_s}`
    //     add new alarm in the list 
    if (isNaN(newAlarm)) {
        if (!alarmList.includes(newAlarm + " " + meridian)) {
            alarmList.push(newAlarm + " " + meridian);
            console.log(alarmList);
            console.log(alarmList.length);
            AddNewAlarm(newAlarm + " " + meridian);
            addAlarm.reset();
        } else {
            alert(`Alarm for ${newAlarm + " " + meridian} already set.`);
        }
    } else {
        alert("Invalid Time Entered")
    }
})

// adding new alarm list below alarm list
function AddNewAlarm(newAlarm) {
    const html = `
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    alarmhistory.innerHTML += html
};

// for delete alarm history
alarmhistory.addEventListener('click', e => {
    console.log("removing element")
    if (e.target.classList.contains("deleteAlarm")) {
        e.target.parentElement.remove();
    }
})

// while delete alarm clicked on the remove alarm list
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                 
    alarmList.push.apply(alarmList, newList);
}

