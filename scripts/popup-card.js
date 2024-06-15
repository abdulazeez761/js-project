for (let index = 0; index < 2; index++) {
  let blur = document.getElementsByClassName("selection-btn");
  blur[index].addEventListener("click", () => {
    document.getElementById("screen-blur").style.display = "block";
    console.log(blur[index]);
  });
}
document.getElementById("cancel-btn").addEventListener("click", () => {
  document.getElementById("screen-blur").style.display = "none";
});
