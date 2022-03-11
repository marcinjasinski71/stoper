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
	}, 1000); //1s
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

//history

const showHistory = () => {
	timeList.textContent = ``; //czyścimy liste, odpalamy pętle:

	let num = 1; //num dla numerow pomiarow

	timesArr.forEach(time => {
		// iterujemy po tablicy, tworzymy nowe LI,
		const newTime = document.createElement(`li`);
		newTime.innerHTML = `Pomiar nr ${num}: <span>${time}</span>`; //wewnatrz LI newTime umieszczamy template string z num + time

		timeList.appendChild(newTime); //kiedy nowa linijka z czasem zostanie dodana, dodajemy num++
		num++;
	});
};

const showModal = () => {
	if (!(modalShadow.style.display === `block`)) {
		// modal -> jezeli nie ma display block, to nadajemy style display block -> potem else display none
		modalShadow.style.display = `block`;
	} else {
		modalShadow.style.display = `none`;
	}
	modalShadow.classList.add(`modal-animation`); // + animacja zeby byla plynnosc
};

startBtn.addEventListener(`click`, handleStart);
pauseBtn.addEventListener(`click`, handlePause);
stopBtn.addEventListener(`click`, handleStop);
resetBtn.addEventListener(`click`, handleReset);
historyBtn.addEventListener(`click`, showHistory);
infoBtn.addEventListener(`click`, showModal);
closeModalBtn.addEventListener(`click`, showModal);
window.addEventListener(`click`, e =>
	e.target === modalShadow ? showModal() : false
); // zamykanie modalShadow -> sprawdzamy czy naszym targetem przy kliku jest modalShadow (cień naokoło instrukcji) -> jeżeli tak, to wywołujemy funkcję showModal, jezeli nie to nie robimy kompletnie nic
