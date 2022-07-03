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
  "QUIRK",
  "PLACE",
  "VITAL",
  "FLARE",
  "CABLE",
  "HORSE",
  "FIGHT",
  "JOUST",
  "DOLLY",
  "LEACH",
  "OUTRO",
  "RALLY",
  "TABLE",
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
          //ok, I think I've found the exact spot to try implementing the CSS solution: right here. Try applying the commented-out code below to all grid styles
          //animation: fadeBackground 6s;
          // grid[i].style.backgroundColor = "Green";
          //well it took a lot of fiddling to get it working properly but she's purring away now.
          //if you want to look at making the letters fade in sequentially try taking this code apart and spreading it into and object, then modifying the delay before the animation starts.
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
          console.log("do individual letter validation here");
          //needs a redesign with another nested for loop to check every individual letter's position and relevence

          //not sure about the above statement but I do need to account for repeating letters in words, could possibly use a better system for storing and retrieving them.

          //ok, so far as i can see at the moment the place to insert logic checking for repeating characters is in the nested loop below. Firstly, figure out how to gray the letters.

          //ugh, graying these out is going to be a bit more difficult than i thought. Taking a break now, will come back to this logic in a bit.

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
          //genuinely not sure if the following code is working properly. Or rather, the issue seems to arise when applying animations to the code above instead of applying backgroundColor designations
          //I think I've figured this out, it's a combination of trying to apply colourfades in the above code (before the actual color is designated, which is what that code is supposed to do) and not handling duplicate letters properly.
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
