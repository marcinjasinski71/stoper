const startBtn = document.querySelector(`.start`);
const pauseBtn = document.querySelector(`.pause`);
const stopBtn = document.querySelector(`.stop`);
const resetBtn = document.querySelector(`.reset`);
const historyBtn = document.querySelector(`.history`);
const stopwatch = document.querySelector(`.stopwatch`);
const time = document.querySelector(`.time`);
const timeList = document.querySelector(`.time-list`);
const infoBtn = document.querySelector(`.info`);
const modalShadow = document.querySelector(`.modal-shadow`);
const closeModalBtn = document.querySelector(`.close`);

let countTime;
let minutes = 0;
let seconds = 0;

let timesArr = [];

const handleStart = () => {
	clearInterval(countTime); // blokujemy mozliwosc wielokrotnego przyspieszenia intervala

	countTime = setInterval(() => {
		if (seconds < 9) {
			// 0-10sek
			seconds++;
			stopwatch.textContent = `${minutes}:0${seconds}`;
		} else if (seconds >= 9 && seconds < 59) {
			// 10-59sek
			seconds++;
			stopwatch.textContent = `${minutes}:${seconds}`;
		} else {
			//min+
			minutes++;
			seconds = 0;
			stopwatch.textContent = `${minutes}:00`;
		}
	}, 100); //1s
};
const handleStop = () => {
	time.innerHTML = `Ostatni czas: ${stopwatch.textContent}`; // ostatni czas na stop button

	if (stopwatch.textContent !== '0:00') {
		time.style.visibility = `visible`;
		// pokazywanie czasu =/= niż 0:00 pod timerem(ost czas)
		timesArr.push(stopwatch.textContent);
		// dodajemy czasy do tablicy timesArr
	}

	clearStuff();
};

const handlePause = () => {
	clearInterval(countTime); // zatrzymujemy interwał
};

const handleReset = () => {
	time.style.visibility = `hidden`; // chowamy paragraf time
	timesArr = []; // czyscimy tablice
	clearStuff(); // clear
};

const clearStuff = () => {
	// funkcja czyszcząca - reset interwału, stopwatch 0:00, timelist pusty, sekundy i minuty puste
	clearInterval(countTime);
	stopwatch.textContent = '0:00';
	timeList.textContent = ``;
	seconds = 0;
	minutes = 0;
};

startBtn.addEventListener(`click`, handleStart);
pauseBtn.addEventListener(`click`, handlePause);
stopBtn.addEventListener(`click`, handleStop);
resetBtn.addEventListener(`click`, handleReset);
