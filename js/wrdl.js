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
    guess.push(event.key);
    fillClr();
    console.log(guess);
  }
  if (event.key === "Enter") {
  }
});
