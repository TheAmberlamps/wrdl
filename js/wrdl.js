let dict = ["STORY", "ALIVE", "BLEAK", "GLORY"];

let word = dict[Math.floor(Math.random() * dict.length)].split("");

console.log(word);

let guess = [];

let grid = document.getElementById("g1").getElementsByClassName("tile");

document.addEventListener("keydown", function (event) {
  if (event.key === "Backspace" && guess.length > 0) {
    console.log("popped");
    guess.splice(-1, 1);
    for (let i = 0; i < guess.length; i++) {
      grid[i].innerHTML = guess[i];
    }
    console.log(guess);
  }
});

document.addEventListener("keypress", function (event) {
  if (event.key !== "Enter" && guess.length < 5) {
    console.log("works");
    guess.push(event.key);
    for (let i = 0; i < guess.length; i++) {
      grid[i].innerHTML = guess[i];
    }
  }
  let test = event.key;
  console.log(test);
  console.log(guess);
  console.log(grid);
});
