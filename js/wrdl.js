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

let word = dict[Math.floor(Math.random() * dict.length)].split("");

console.log(word);

//ok there has to be a better way to store this info. Try implementing the algo you wrote here instead.

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
}*/

// console.log(dubs);

let Lc = [];

for (let i = 0; i < word.length; i++) {
  let curr = word[i];
  Lc.push([word[i], 0]);
  for (let j = 0; j < word.length; j++) {
    if (curr === word[j]) {
      console.log("Lc: " + Lc);
      console.log(Lc[j]);
      // there's an error occuring here but only when encountering a duplicate entry, chase down the bug
      // are we even sure this is constructing a 2d array and not a string? console logging doesn't inspire confidence
      console.log("Addition to Lc[j]: " + Lc[j]);
      Lc[j][1]++;
      console.log("Value after addition: " + Lc[j][1]);
    }
  }
}

let guess = [];

let grid = document.getElementById("g1").getElementsByClassName("tile");

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

document.addEventListener("keydown", function (event) {
  if (event.key === "Backspace" && guess.length > 0) {
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
      //concatenate the individual letters together for a dictionary check
      for (let i = 0; i < guess.length; i++) {
        gComp += guess[i];
        console.log(guess[i]);
      }

      //implement a check to see if guess is identical to gcomp here before worrying about letter positions and crap

      //yes, here

      //run dictionary check to ensure that the word exists
      for (let i = 0; i < dict.length; i++) {
        dictChk++;
        //triggered if word is found
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
        }
      }
      if (dictChk === dict.length) {
        alert("Word invalid");
      }
    }
  }
});
