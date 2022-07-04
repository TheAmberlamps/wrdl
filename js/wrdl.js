//dictionary

let dict = [
  "AGILE",
  "ALIVE",
  "APPLE",
  "BLEAK",
  "BOUND",
  "BREAK",
  "CABLE",
  "CORKY",
  "CRACK",
  "CRATE",
  "DEALT",
  "DOLLY",
  "DOUBT",
  "FIGHT",
  "FLARE",
  "FLUTE",
  "GLIDE",
  "GLORY",
  "GROUP",
  "HIRED",
  "HORSE",
  "JERKY",
  "JOUST",
  "LEACH",
  "LEAKY",
  "MOUND",
  "OPENS",
  "OPERA",
  "OUTRO",
  "PALED",
  "PLACE",
  "QUART",
  "QUIRK",
  "RALLY",
  "READY",
  "RELAY",
  "SORRY",
  "STORY",
  "SWORD",
  "TABLE",
  "TEARY",
  "VITAL",
  "VOILA",
];

//word randomly chosen from dictionary

let word = dict[Math.floor(Math.random() * dict.length)].split("");

console.log(word);

// array to store duplicate letters and their amounts

let Lc = [];

// temp storage for value that may be pushed to Lc

let curr = [];

// algo to find repeating letters

for (let i = 0; i < word.length; i++) {
  curr = [[word[i]], [0]];
  let currL = word[i];
  for (let j = 0; j < word.length; j++) {
    if (currL === word[j]) {
      curr[1]++;
      //still passes the conditional below... i must be missing something. Take a hard, hard look at how this is all being juggled because the mystery lies here, guaranteed.
      console.log("Lc: " + Lc);
      console.log("curr: " + curr);
      if (curr[1] > 1 && Lc.includes(curr[0][0]) === false) {
        console.log("Lc: " + Lc);
        console.log("Lc.includes(curr[0]): " + Lc.includes(curr[0]));
        console.log("Lc.includes(curr[0][0]): " + Lc.includes(curr[0][0]));
        console.log("curr being pushed: " + curr);
        console.log("curr[0]: " + curr[0]);
        console.log("curr[1]: " + curr[1]);
        console.log("curr[0][0]: " + curr[0][0]);
        console.log("curr[0][1]: " + curr[0][1]);
        Lc.push(curr);
        console.log("Lc: " + Lc);
      }
    }
  }
}

console.log(Lc);

// which of the 6 guesses the player is on

let gNum = 1;

let gridP = "g" + gNum;

console.log("gridP: " + gridP);

// storage for current guess' letters

let guess = [];

// the HTML elements used to display those letters

let grid = document.getElementById(gridP).getElementsByClassName("tile");

// function used to populate and depopulate those elements

function fillClr() {
  for (let i = 0; i < guess.length; i++) {
    grid[i].innerHTML = guess[i];
  }
  if (guess.length < 5) {
    for (let i = guess.length; i < 5; i++) {
      grid[i].innerHTML = "";
    }
  }
}

// may well have to rework these event listeners since they're accepting numbers and characters

// eh, they'll never pass the test because they don't belong in the dictionary. maybe add an alert if they try it?

// keylisteners for population, depopulation and submission of guess array

document.addEventListener("keydown", function (event) {
  if (event.key === "Backspace" && guess.length > 0 && gNum > 0) {
    console.log("popped");
    guess.splice(-1, 1);
    fillClr();
    console.log(guess);
  }
});

document.addEventListener("keypress", function (event) {
  if (event.key !== "Enter" && guess.length < 5) {
    guess.push(event.key.toUpperCase());
    fillClr();
  }
  if (event.key === "Enter") {
    if (guess.length < 5) {
      alert("Not enough letters");
    }
    if (guess.length === 5) {
      let dictChk = 0;
      let gComp = "";
      let wComp = "";

      //concatenate the individual letters together for a dictionary check

      for (let i = 0; i < guess.length; i++) {
        gComp += guess[i];
        wComp += word[i];
        console.log(guess[i]);
        console.log(word[i]);
      }

      console.log(guess);
      console.log(word);

      // a check to see if guess is identical to word and skip a lot of logic

      if (gComp === wComp) {
        for (let i = 0; i < grid.length; i++) {
          grid[i].style.animation = "fadeG 3s ease 0s 1 forwards";
        }
        gNum = 0;
        return alert("You win!");
      }

      //run dictionary check to ensure that the word exists

      for (let i = 0; i < dict.length; i++) {
        dictChk++;

        //triggered if guess matches a word existing in the dictionary.

        if (gComp === dict[i]) {
          //assigns the appropriate colour to squares

          for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
              if (guess[i] === word[j]) {
                grid[i].style.backgroundColor = "Orange";
                console.log(
                  "grid[" +
                    i +
                    "].style.backgroundColor: " +
                    grid[i].style.backgroundColor
                );
              }
              if (guess[i] === word[j] && i === j) {
                grid[i].style.backgroundColor = "Green";
                console.log(
                  "grid[" +
                    i +
                    "].style.backgroundColor: " +
                    grid[i].style.backgroundColor
                );
              }
            }
          }
          //I was right, fadeins are working properly now. Last step (?) is ironing out duplicate letters.
          for (let i = 0; i < 5; i++) {
            let styleCheck = grid[i].style;
            console.log(
              "grid[" +
                i +
                "].style.backgroundColor: " +
                grid[i].style.backgroundColor
            );
            console.log(styleCheck);
            if (grid[i].style.backgroundColor === "") {
              console.log("tripGrey");
              grid[i].style.animation = "fadeGrey 3s ease 0s 1 forwards";
            }
            if (grid[i].style.backgroundColor === "green") {
              console.log("tripG");
              grid[i].style.animation = "fadeG 3s ease 0s 1 forwards";
            }
            if (grid[i].style.backgroundColor === "orange") {
              console.log("tripO");
              grid[i].style.animation = "fadeOj 3s ease 0s 1 forwards";
            }
          }
          guess = [];
          gNum++;
          console.log("gNum: " + gNum);
          gridP = "g" + gNum;
          grid = document.getElementById(gridP).getElementsByClassName("tile");
        } else {
          if (dictChk === dict.length) {
            alert("Word invalid or not found in our dictionary");
          }
        }
      }
    }
  }
});
