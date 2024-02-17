let timers = [];

function addTimerToDisplay(timer) {
  timers.push(timer);

  const timerDiv = document.createElement('div');
  timerDiv.innerHTML = `<p>${formatTime(timer)}</p><button onclick="stopTimer(${timers.length - 1})">Stop Timer</button>`;
  document.getElementById('active-timers-section').appendChild(timerDiv);
}

function startCountdown(timer) {
  const intervalId = setInterval(function () {
    if (timer.seconds > 0) {
      timer.seconds--;
    } else if (timer.minutes > 0) {
      timer.seconds = 59;
      timer.minutes--;
    } else if (timer.hours > 0) {
      timer.seconds = 59;
      timer.minutes = 59;
      timer.hours--;
    } else {
      clearInterval(intervalId);
      handleTimerEnd();
      removeTimerFromDisplay(timer);
    }

    updateTimerDisplay(timer);
  }, 1000);
}

function updateTimerDisplay(timer) {
  const timerIndex = timers.findIndex(t => t === timer);
  document.getElementById('active-timers-section').children[timerIndex].innerHTML = `<p>${formatTime(timer)}</p><button onclick="stopTimer(${timerIndex})">Stop Timer</button>`;
}

function stopTimer(index) {
  clearInterval(timers[index].intervalId);
  removeTimerFromDisplay(timers[index]);
  timers.splice(index, 1);
}

function removeTimerFromDisplay(timer) {
  const timerIndex = timers.findIndex(t => t === timer);
  document.getElementById('active-timers-section').children[timerIndex].remove();
}

function formatTime(timer) {
  return `${String(timer.hours).padStart(2, '0')}:${String(timer.minutes).padStart(2, '0')}:${String(timer.seconds).padStart(2, '0')}`;
}

function startNewTimer() {
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const seconds = parseInt(document.getElementById('seconds').value) || 0;

  if (hours === 0 && minutes === 0 && seconds === 0) {
    alert('Please enter a valid time.');
    return;
  }

  const timer = { hours, minutes, seconds };
  addTimerToDisplay(timer);

  timer.intervalId = startCountdown(timer);
}

function handleTimerEnd() {
    const lastTimerIndex = timers.length - 1;
    const lastTimerDiv = document.getElementById('active-timers-section').children[lastTimerIndex];
  
    lastTimerDiv.style.backgroundColor = '#ffcccb'; 
  
    const audio = new Audio('/'); 
    audio.play();
  }
  