function appendleaderboard(leaderboard, id) {
  let firstThree = 0;
  for (const i of leaderboard) {
    let x = document.createElement('div');

    x.className = 'name';
    if (firstThree == 0) {
      x.innerHTML = `<span>
        <i class="fa-solid fa-medal" style="color: #ffd700"></i></span>${i.name}`;
      console.log(x);
    } else if (firstThree == 1) {
      x.innerHTML = `<span>
        <i class="fa-solid fa-medal" style="color: #c0c0c0"></i></span>${i.name}`;
    } else if (firstThree == 2) {
      x.innerHTML = `<span>
        <i class="fa-solid fa-medal" style="color: #cd7f32"></i></span>${i.name}`;
    } else {
      x.innerHTML = `<span>${firstThree + 1}</span>${i.name}`;
    }

    document.getElementById(id).appendChild(x);
    firstThree++;
  }
}
