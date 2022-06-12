//dictionary

let dict = [
  "STORY",
  "ALIVE",
  "BLEAK",
  "GLORY",
  "SWORD",
  "APPLE",
  "BREAK",
  "GROUP",
  "CRABS",
  "PALES",
  "SORRY",
  "QUART",
  "OPENS",
  "CRATE",
  "DEALS",
  "FLEAS",
  "HIRED",
  "JERKS",
  "LEAKY",
  "OPERA",
  "READY",
  "TEARY",
  "VIALS",
  "FLARE",
  "HOURS",
  "JEERS",
  "LOBES",
  "OUTRO",
  "RALLY",
  "TABLE",
  "VOILA",
];

//word randomly chosen from dictionary

let word = dict[Math.floor(Math.random() * dict.length)].split("");

console.log(word);

// deprecated algo to find and store duplicate letters

/*let dubs = [];

for (let i = 0; i < word.length; i++) {
  let count = 0;
  for (let j = 0; j < word.length; j++) {
    if (word[i] === word[j]) {
      count++;
      console.log("ding, " + word[i]);
      if (count > 1) {
        dubs.push(word[i]);
      }
    }
  }
}

console.log(dubs);*/

// array to store duplicate letters and their amounts

let Lc = [];

// temp storage for value that may be pushed to Lc

let curr = [];

// algo to find repeating letters

for (let i = 0; i < word.length; i++) {
  curr = [[word[i]], [0]];
  let currL = word[i];
  console.log("curr: " + curr);
  console.log("currL: " + currL);
  for (let j = 0; j < word.length; j++) {
    if (currL === word[j]) {
      curr[1]++;
      if (curr[1] > 1) {
        Lc.push(curr);
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
    console.log("works");
    guess.push(event.key.toUpperCase());
    fillClr();
    console.log(guess);
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

      // a check to see if guess is identical to word and skip a lot of logic

      console.log(guess);
      console.log(word);
      if (gComp === wComp) {
        for (let i = 0; i < grid.length; i++) {
          grid[i].style.backgroundColor = "Green";
          console.log(
            "grid[i].style.background: " + grid[i].style.backgroundColor
          );
          grid[i].style.opacity = 0;
          console.log("grid[i].style.opacity: " + grid[i].style.opacity);
          for (j = 0; j < 1; j += 0.1) {
            //floating-point number systems blow. this 0.1 value isn't always being read as intended and needs to be sanitized.
            //actually fuck that, this should be a function that is only invoked in every colour-opacity situation. That doesn't invalidate the previous statement, it's just that the only time this needs to happen is under very specific conditions.

            console.log("j: " + j);
            setInterval(10000, (grid[i].style.opacity = j));
            grid[i].style.opacity = j;
          }
          console.log(grid[i].style);
        }
        gNum = 0;
        return alert("You win!");
      }

      //run dictionary check to ensure that the word exists

      for (let i = 0; i < dict.length; i++) {
        dictChk++;

        //triggered if guess matches a word existing in the dictionary.

        if (gComp === dict[i]) {
          console.log("do individual letter validation here");
          //needs a redesign with another nested for loop to check every individual letter's position and relevence

          //not sure about the above statement but I do need to account for repeating letters in words, could possibly use a better system for storing and retrieving them.

          for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
              if (guess[i] === word[j]) {
                grid[i].style.backgroundColor = "Orange";
              }
              if (guess[i] === word[j] && i === j) {
                grid[i].style.backgroundColor = "Green";
              }
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
