let dict = ["STORY", "ALIVE", "BLEAK", "GLORY"];

let word = dict[Math.floor(Math.random() * dict.length)].split("");

console.log(word);

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
      for (let i = 0; i < guess.length; i++) {
        gComp += guess[i];
        console.log(guess[i]);
      }
      for (let i = 0; i < dict.length; i++) {
        dictChk++;
        if (gComp === dict[i]) {
          console.log("do individual letter validation here");
        }
      }
      if (dictChk === dict.length) {
        alert("Word invalid, not in dictionary");
      }
    }
  }
});
