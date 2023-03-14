//dictionary

let dict = [
  "AGILE",
  "ALIVE",
  "APPLE",
  "AWFUL",
  "BAKER",
  "BLEAK",
  "BOUND",
  "BREAK",
  "CABLE",
  "CLOUT",
  "CORKY",
  "CRACK",
  "CRATE",
  "DARED",
  "DEALT",
  "DOLLY",
  "DOUBT",
  "FAIRY",
  "FERRY",
  "FIGHT",
  "FLARE",
  "FLUTE",
  "GLEAN",
  "GLIDE",
  "GLORY",
  "GROUP",
  "HAIRY",
  "HIRED",
  "HORSE",
  "HOUSE",
  "JEERS",
  "JERKY",
  "JOUST",
  "LEACH",
  "LEAKY",
  "LEASE",
  "MAKER",
  "MIRED",
  "MOUND",
  "MOUTH",
  "OPENS",
  "OPERA",
  "OUTRO",
  "PALED",
  "PEACE",
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
  "TOUGH",
  "VALID",
  "VITAL",
  "VOILA",
];

//word randomly chosen from dictionary

// let word = dict[Math.floor(Math.random() * dict.length)].split("");

let word = ["S", "T", "O", "R", "Y"];

console.log(word);

// array to store duplicate letters and their amounts

let Lc = [];

// temp storage for value that may be pushed to Lc

let curr = [];

// algo to find repeating letters in chosen word
// need this duplicated to run on guess submission to get repeating characters

for (let i = 0; i < word.length; i++) {
  //defines variable
  let curr = [[word[i]], [0]];
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

console.log("Lc after population: " + Lc);

//so i suppose the best way to do what i want to do is to remove duplicate entries AFTER the array is populated, right here. removing the dynamic aspect from this nonsense hopefully makes it fly straighter.
//works like a charm!

for (let i = 0; i < Lc.length; i++) {
  let letR = Lc[i][0];
  for (let j = Lc.length - 1; j > 0; j--) {
    if (Lc[j][0] === letR) {
      Lc.splice(j);
    }
  }
}

console.log("Lc: " + Lc);

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

// array to hold orange letters

oJ = [];

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
              if (
                guess[i] === word[j] &&
                grid[i].style.backgroundColor !== "green"
              ) {
                console.log(
                  "Before set: grid[" +
                    i +
                    "].style.backgroundColor: " +
                    grid[i].style.backgroundColor
                );
                grid[i].style.backgroundColor = "Orange";
                console.log(
                  "After set: grid[" +
                    i +
                    "].style.backgroundColor: " +
                    grid[i].style.backgroundColor
                );
                oJ.push(guess[i]);
                console.log("oJ: " + oJ);
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
