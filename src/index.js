import "./styles.css";

const array = [[0]];
array[0][0] = 1;

console.log(
  Array(10)
    .fill()
    .map(() => Array(10).fill(null))
);
