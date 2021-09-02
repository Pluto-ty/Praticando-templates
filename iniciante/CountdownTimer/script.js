let timeInterval;
let timeIntervalCheck = false;
let snd = new Audio("./alarm.wav");
const countDownTimer = {
   futureDateArray: [],

   countDown: function (i) {
      if (countDownTimer.verify(i)) {
         let name = document.getElementById("js-name").value;
         document.getElementById("js-eventName").innerHTML = name;
         let checkButton = document.getElementById("js-button-start").innerHTML;
         if (checkButton == "Start") {
            document.getElementById("js-button-start").innerHTML = "Stop";
            countDownTimer.startCountDown(i);
         } else if (checkButton == "Stop") {
            document.getElementById("js-button-start").innerHTML = "Start";
            countDownTimer.stopCountDown(i);
         }
      } else {
         alert("Digite o nome para o Evento");
      }
   },
   verify: (i) => {
      let name = document.getElementById("js-name").value;
      let date = document.getElementById("js-date").value;
      let FutureDate = countDownTimer.futureDateCalc(i);
      let currentTime = new Date();

      if (name != "" && date != "" && FutureDate > currentTime) {
         return true;
      } else {
         console.log(FutureDate);
         console.log("Errado");
         return false;
      }
   },
   startCountDown: (i) => {
      let timeLeft = countDownTimer.timeLeftCalc(i);
      if (timeLeft == "") return;

      if (i == "normal") {
         document.getElementById(
            "js-time-counter"
         ).innerHTML = `${timeLeft.months}m ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;
      } else {
         document.getElementById(
            `js-event${i}`
         ).innerHTML = `${timeLeft.months}m ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;
      }

      if (timeIntervalCheck == false) {
         if (i == "normal") {
            timeInterval = setInterval(() => {
               countDownTimer.startCountDown(i);
            }, 1000);
            document.querySelectorAll("input").forEach((input) => {
               input.readOnly = true;
            });
            timeIntervalCheck = true;
         } else {
            if (i == 1) {
               timeInterval1 = setInterval(() => {
                  countDownTimer.startCountDown(i);
               }, 1000);
               return;
            }
            if (i == 2) {
               timeInterval2 = setInterval(() => {
                  countDownTimer.startCountDown(i);
               }, 1000);
               return;
            }
            if (i == 3) {
               timeInterval3 = setInterval(() => {
                  countDownTimer.startCountDown(i);
               }, 1000);
               return;
            }
            if (i == 0) {
               timeInterval0 = setInterval(() => {
                  countDownTimer.startCountDown(i);
               }, 1000);
               return;
            }
         }
      }
   },
   stopCountDown: (i) => {
      if (i == "normal") {
         clearInterval(timeInterval);
      } else {
         if (i == 1) {
            clearInterval(timeIntervalEvent1);
            return;
         }
         if (i == 2) {
            clearInterval(timeIntervalEvent2);
            return;
         }
         if (i == 3) {
            clearInterval(timeIntervalEvent3);
            return;
         }
         if (i == 0) {
            clearInterval(timeIntervalEvent0);
            return;
         }
      }
      timeIntervalCheck = false;
      document.querySelectorAll("input").forEach((input) => {
         input.readOnly = false;
      });
   },
   futureDateCalc: (i) => {
      if (i == "normal") {
         let hoursMinInput = document.getElementById("js-time").value;
         let dateInput = document.getElementById("js-date").value.split("-");

         let FutureDate;
         if (hoursMinInput != "") {
            hoursMinInput = hoursMinInput.split(":");
            FutureDate = new Date(
               `${dateInput[0]}-${dateInput[1]}-${dateInput[2]} ${hoursMinInput[0]}:${hoursMinInput[1]}`
            );
         } else {
            FutureDate = new Date(
               ` ${dateInput[1]} ${Number(dateInput[2])} ${dateInput[0]}`
            );
         }
         return FutureDate;
      } else {
         let FutureDate = countDownTimer.futureDateArray[i].data;
         return FutureDate;
      }
   },
   timeLeftCalc: (i) => {
      let FutureDate = countDownTimer.futureDateCalc(i);

      let currentTime = new Date();
      let totalSeconds = (FutureDate - currentTime) / 1000;
      if (totalSeconds < 0) {
         countDownTimer.createModal(i);
         console.log("ACabou");
         countDownTimer.stopCountDown(i);
         return "";
      }

      let months = Math.floor(totalSeconds / 3600 / 24 / 30);
      let days = Math.floor(totalSeconds / 3600 / 24);
      let hours = Math.floor(totalSeconds / 3600) % 24;
      let minutes = Math.floor(totalSeconds / 60) % 60;
      let seconds = Math.floor(totalSeconds % 60);
      return {
         months,
         days,
         hours,
         minutes,
         seconds,
      };
   },

   createModal: (i) => {
      snd.play();
      snd.volume = 0.3;
      snd.loop = true;
      document.querySelector("#js-modal").classList.add("c-modal-container");
      if (i == "normal") {
         document.querySelector("#js-modal").innerHTML = `
         <div id="js-modal" class="c-modal">
            <h1>ALARM!!! Nome do Evento</h1>
           
            <button onclick="countDownTimer.clearModal()">OKAY</button>
         </div>
         `;
      } else {
         document.querySelector("#js-modal").innerHTML = `
         <div id="js-modal" class="c-modal">
            <h1>ALARM!!! ${countDownTimer.futureDateArray[i.name]}</h1>
            <button onclick="countDownTimer.clearModal()">OKAY</button>
         </div>
         `;
      }
   },
   clearModal: () => {
      snd.pause();
      document.querySelector("#js-modal").classList.remove("c-modal-container");
      document.querySelector("#js-modal").innerHTML = "";
   },
   saveEvent: (i) => {
      let nome = document.getElementById("js-name").value;
      let FutureDate = countDownTimer.futureDateCalc(i);

      let event = {
         name: nome,
         data: FutureDate,
      };
      countDownTimer.futureDateArray.push(event);
   },
   renderEvents: () => {
      document.querySelector("#js-saved-events").innerHTML = "";
      let events = countDownTimer.futureDateArray;
      events.forEach((i, index) => {
         document.querySelector("#js-saved-events").innerHTML += `
         <div class="c-event">
            <h1>${i.name}</h1>
            <p id="js-event${index}">00m 00d 00h 00m 00s</p>
            <button onclick"deleteEvent(${index})">Deletar</button>
         </div>
      `;
         console.log(index);
         countDownTimer.startCountDown(index);
      });
   },
   deleteEvent: (i) => {
      // Deletar evento clicado, para deletar ele vai pegar o valor do index. Apagar os dados e o index no array e repetir a renderização, parecendo que apagou.
      // Colocar que quando o array for alterado ele vai acionar o stop de todos os intervalos para n ter conflito nos setinterval e depois disso ai renderizar todos novamente e começar os intervalos de novo.
   },
   clearInputs: () => {
      document.getElementById("js-name").value = "";
      document.getElementById("js-date").value = "";
      document.getElementById("js-time").value = "";
      document.getElementById("js-time-counter").innerHTML = "0m 0d 0h 0m 0s";
   },
};

document.getElementById("js-button-start").addEventListener("click", () => {
   let normal = "normal";
   countDownTimer.countDown(normal);
});

document.getElementById("js-save").addEventListener("click", () => {
   if (timeIntervalCheck == false) {
      if (countDownTimer.verify("normal")) {
         countDownTimer.saveEvent("normal");
         countDownTimer.renderEvents();
         countDownTimer.clearInputs();
      }
   }
});
