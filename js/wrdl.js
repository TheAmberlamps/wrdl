let dict = ["STORY", "ALIVE", "BLEAK", "GLORY"];

let word = dict[Math.floor(Math.random() * dict.length)].split("");

console.log(word);

let guess = [];

let w1 = document.getElementById("g1");
console.log(w1);

document.addEventListener("keydown", function (event) {
  if (event.key === "Backspace" && guess.length > 0) {
    console.log("popped");
    guess.splice(-1, 1);
    console.log(guess);
  }
});

document.addEventListener("keypress", function (event) {
  if (event.key !== "Enter" && guess.length < 5) {
    console.log("works");
    guess.push(event.key);
  }
  let test = event.key;
  console.log(test);
  console.log(guess);
});
