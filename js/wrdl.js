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
  "CRACK",
  "PALED",
  "SORRY",
  "QUART",
  "OPENS",
  "CRATE",
  "DEALT",
  "FLUTE",
  "HIRED",
  "JERKY",
  "LEAKY",
  "OPERA",
  "READY",
  "TEARY",
  "VITAL",
  "FLARE",
  "HORSE",
  "JOUST",
  "LEACH",
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

      //define colors by individual elements so that the alpha values can be changed dynamically

      let green = { r: 59, b: 128, g: 4, a: 0 };

      let orange = { r: 239, b: 164, g: 28, a: 0 };

      // OK, this is where the actual construction is happening. The interval / colour logic is a mess currently, I know what needs to be done but achieving it is maddening.

      // need a function to pass to setInterval. This is currently a test, I believe the next step is... hold on

      function fadeInTest() {
        // for (i = 0; i < 1; i += 0.1) {
        console.log("Ok, popped!");
        console.log(fadeTime);
      }

      let fadeTime = 1000;

      function winSet() {
        for (let i = 0; i < grid.length; i++) {
          grid[i].style.background =
            "rgba(" +
            green.r +
            "," +
            green.b +
            "," +
            green.g +
            "," +
            green.a +
            ")";
          console.log("grid[i].style.background: " + grid[i].style.background);
          setInterval(fadeInTest, fadeTime);
          fadeTime += 1000;
          console.log(fadeTime);
        }
      }

      // a check to see if guess is identical to word and skip a lot of logic

      console.log(guess);
      console.log(word);
      //triggers if the guess is correct
      if (gComp === wComp) {
        // repackaging this into its own function, should help me immensely in applying it to guesses later.
        // so the for-loop below is already a part of greenSet. Test it out before wrapping the nested loop into the new logic.

        winSet();

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
