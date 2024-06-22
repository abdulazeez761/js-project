function appendleaderboard(leaderboard, id) {
  for (const i of leaderboard) {
    let x = document.createElement("div");
    x.className = "name";
    if (i.id == 1) {
      x.innerHTML = `<span>
      <i class="fa-solid fa-medal" style="color: #ffd700"></i></span>${i.name}`;
      console.log(x);
    } else if (i.id == 2) {
      x.innerHTML = `<span>
      <i class="fa-solid fa-medal" style="color: #c0c0c0"></i></span>${i.name}`;
    } else if (i.id == 3) {
      x.innerHTML = `<span>
      <i class="fa-solid fa-medal" style="color: #cd7f32"></i></span>${i.name}`;
    } else {
      xinnerHTML = `<span>${i.id}</span>${i.name}`;
    }
    document.getElementById(id).appendChild(x);
  }
}
