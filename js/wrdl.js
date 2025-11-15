let dict = []

let word = ''

fetch('../dict.json')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    dict = data.dictionary
    console.log(dict)
    word = dict[Math.floor(Math.random() * dict.length)].split("");
    console.log(word)
  })

//word = dict[Math.floor(Math.random() * dict.length)].split("");


console.log(word);

// which of the 6 guesses the player is on

let gNum = 1;

let gridP = "g" + gNum;
 
console.log("gridP: " + gridP);

// storage for current guess' letters

let guess = [];

// the HTML elements used to display those letters

let grid = document.getElementById(gridP).getElementsByClassName("tile");

for (let i=0; i < grid.length; i++) {
  console.log(grid[i])
}

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

function restart() {
  word = dict[Math.floor(Math.random() * dict.length)].split("");
  gNum = 1
  gridP = "g" + gNum
  guess = [];
  grid = document.getElementById(gridP).getElementsByClassName("tile");
  let clearArr = document.getElementsByClassName("tile")
    for (let i=0; i < clearArr.length; i++) {
      clearArr[i].innerHTML = ""
      clearArr[i].style.animation = "fadeB 1s ease 0s 1 forwards"
      clearArr[i].style.backgroundColor = ''
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
    // fixed a lot of nonsense, now words and guesses are being compared properly as long as they exist in the dictionary
    // create conditions for failure to guess correctly
    // create a reset or new game option
    if (guess.length === 5) {
      //concatenate the individual letters together for a dictionary check
      let gComp = guess.join('')
      let wComp = word.join('')

      console.log(guess);
      console.log(word);
      console.log(typeof guess)
      console.log(typeof word)
      console.log(gComp)
      console.log(wComp)
      console.log(typeof gComp)
      console.log(typeof wComp)

      // a check to see if guess is identical to word and skip a lot of logic

      if (gComp == wComp) {
        for (let i = 0; i < grid.length; i++) {
          grid[i].style.animation = "fadeG 3s ease 0s 1 forwards";
        }
        gNum = 0;
        if (confirm("You win! Play again?")) {
          restart()
        }
        else {
          alert("Ok! Click on the title if you change your mind!")
        }
      }

      //run dictionary check to ensure that the word exists

      let dictItem = 'https://freedictionaryapi.com/api/v1/entries/en/' + gComp.toLowerCase()

      console.log(dictItem)

      fetch(dictItem).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Or .text(), .blob(), etc., depending on expected response type
      })
      .then(data => {
        console.log(data);
        console.log(data.entries)
        console.log(data.entries.length)
        if (data.entries.length > 0) {
          console.log(data.entries[0])
          let wordTmp = word.slice();

          //logic to assign the appropriate colours to squares

          for (let i = 0; i < 5; i++) {
            if (guess[i] === word[i]) {
            grid[i].style.backgroundColor = "Green";
            console.log(
              "grid[" +
                i +
                "].style.backgroundColor: " +
                grid[i].style.backgroundColor
              );
              wordTmp.splice(wordTmp.indexOf(guess[i]), 1);
              console.log("wordTmp: " + wordTmp);
              console.log("word: " + word);
            }
          }

          for (let i = 0; i < grid.length; i++) {
            if (wordTmp.indexOf(grid[i].innerHTML) !== -1) {
              let spliceIndex = wordTmp.indexOf(grid[i].innerHTML);
              console.log("get color: " + window.getComputedStyle(grid[i]).backgroundColor)
              if (grid[i].style.backgroundColor !== "green") {
                wordTmp.splice(spliceIndex, 1);
                console.log("After wordTmp: " + wordTmp);
                grid[i].style.backgroundColor = "Orange";
              }
              console.log("spliceIndex: " + spliceIndex);
              console.log("Prior wordTmp: " + wordTmp);
            }
          }

          //Colour fadeins are working properly now.
          if (guess.length === 5) {
            for (let i = 0; i < 5; i++) {
              console.log(
                "grid[" +
                  i +
                  "].style.backgroundColor: " +
                  grid[i].style.backgroundColor +
                  " firing inside of fadeIns"
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
            gComp = "";
            gNum++;
            console.log("gNum: " + gNum);
            gridP = "g" + gNum;
          }
          // added the gComp clear to address a weird bug. Not sure if it's actually working but further testing should make it clear
          // OH I think I may know what's happening actually, this /would/ run multiple times if there are multiple instances of a word that exist in the dictionary, and there ARE repeat entries for some of these words...
          // So it seems to be both; gComp being cleared avoids it matching any further entries in the dictionary.
          // Now it's time to create win and lose conditions as well as colors being assigned properly
          // After that implement a dictionary API to make sure that guesses are actual words
          if (gNum < 7) {
            grid = document.getElementById(gridP).getElementsByClassName("tile");
          }
          else {
            function gameOver() {
              if (confirm("Game over! Try again?")) {
                restart()
              } else {
                alert("Ok! Click on the title if you change your mind!")
              }
            }
            gameOver()
          }
        }
        else {
          alert("Word not recognized")
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
    }
  }
});
